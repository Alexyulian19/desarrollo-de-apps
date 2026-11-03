import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import Layout from '../../components/Layout'
import MapView from '../../components/MapView'
import type { Point } from '../../components/MapView'
import { formatCOP, getErrorMessage } from '../../utils/errors'
import { PLACES } from './places'

interface Estimate {
  distance_km: number
  duration_min: number
  estimated_fare: number
}

interface ActiveRide {
  id: number
  status: string
  estimated_fare: number
  origin_name?: string
  destination_name?: string
  origin_latitude?: number | string
  origin_longitude?: number | string
  destination_latitude?: number | string
  destination_longitude?: number | string
  driver?: {
    rating_average: number
    user: { name: string; phone: string }
    latest_location?: { latitude: number | string; longitude: number | string } | null
  }
  vehicle?: { plate: string; brand: string; model: string; color: string }
}

interface Trip {
  id: number
  final_fare: number
  status: string
  completed_at: string | null
  driver?: { user: { name: string } }
  vehicle?: { plate: string }
}

const STATUS_TEXT: Record<string, string> = {
  requested: 'Buscando conductor…',
  assigned: 'Conductor asignado, va en camino',
  driver_arrived: 'Tu conductor llegó al punto de recogida',
  in_progress: 'Viaje en curso',
  completed: 'Viaje finalizado',
  cancelled: 'Viaje cancelado',
}

const CANCELLABLE = ['requested', 'assigned', 'driver_arrived']

const MY_LOCATION = 'Mi ubicación'

interface SearchResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

// Valor del selector según el punto elegido: mi ubicación, un lugar de la lista o un punto personalizado
function selectValue(point: Point | null) {
  if (!point) return ''
  if (point.name === MY_LOCATION) return 'me'
  const i = PLACES.findIndex((p) => p.name === point.name)
  return i >= 0 ? `p${i}` : 'custom'
}

// Distancia en línea recta entre dos puntos (fórmula de Haversine), en km
function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function ClientHome() {
  const [origin, setOrigin] = useState<Point | null>(null)
  const [destination, setDestination] = useState<Point | null>(null)
  const [picking, setPicking] = useState<'origin' | 'destination'>('origin')
  const [geoMessage, setGeoMessage] = useState('Buscando tu ubicación…')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const [active, setActive] = useState<ActiveRide | null>(null)
  const [trips, setTrips] = useState<Trip[]>([])
  const [ratingTrip, setRatingTrip] = useState<number | null>(null)
  const [rating, setRating] = useState({ score: 5, comment: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const coords = () => ({
    origin_latitude: origin!.latitude,
    origin_longitude: origin!.longitude,
    destination_latitude: destination!.latitude,
    destination_longitude: destination!.longitude,
  })

  // Pide la ubicación actual del navegador y la usa como origen
  const locateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoMessage('Tu navegador no permite obtener la ubicación. Marca el origen en el mapa.')
      return
    }
    setGeoMessage('Buscando tu ubicación…')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ name: MY_LOCATION, latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        setPicking('destination')
        setEstimate(null)
        setGeoMessage('')
      },
      () => setGeoMessage('No pudimos obtener tu ubicación. Marca el origen tocando el mapa.'),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  // Al abrir el panel, intenta usar la ubicación actual como origen
  useEffect(() => {
    const t = setTimeout(locateMe, 0)
    return () => clearTimeout(t)
  }, [locateMe])

  // Al tocar el mapa se fija el punto que esté seleccionado (origen o destino)
  const handlePick = (latitude: number, longitude: number) => {
    const point = { name: `Punto en el mapa (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`, latitude, longitude }
    if (picking === 'origin') {
      setOrigin(point)
      setPicking('destination')
    } else {
      setDestination(point)
    }
    setEstimate(null)
  }

  // Cambios en los selectores de origen y destino
  const handleOriginSelect = (value: string) => {
    if (value === 'me') {
      locateMe()
      return
    }
    if (value.startsWith('p')) {
      setOrigin(PLACES[Number(value.slice(1))])
      setPicking('destination')
      setEstimate(null)
    }
  }

  const handleDestinationSelect = (value: string) => {
    if (value.startsWith('p')) {
      setDestination(PLACES[Number(value.slice(1))])
      setEstimate(null)
    }
  }

  // Busca direcciones o lugares de Neiva con el buscador gratuito de OpenStreetMap (Nominatim)
  const handleSearch = async () => {
    if (query.trim().length < 3) return
    setSearching(true)
    setResults([])
    try {
      const url =
        'https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=co&q=' +
        encodeURIComponent(`${query}, Neiva, Huila`)
      const res = await fetch(url, { headers: { 'Accept-Language': 'es' } })
      const data: SearchResult[] = await res.json()
      setResults(data)
      if (data.length === 0) setError('No encontramos ese lugar en Neiva. Prueba con otro nombre o márcalo en el mapa.')
    } catch {
      setError('No se pudo buscar el lugar. Revisa tu conexión a internet.')
    } finally {
      setSearching(false)
    }
  }

  const handleResult = (r: SearchResult) => {
    const name = r.display_name.split(',').slice(0, 2).join(',').trim()
    const point = { name, latitude: Number(r.lat), longitude: Number(r.lon) }
    if (picking === 'origin') {
      setOrigin(point)
      setPicking('destination')
    } else {
      setDestination(point)
    }
    setResults([])
    setQuery('')
    setEstimate(null)
  }

  // Ubicación en tiempo real del mototaxi (llega en /client/active cada 5 segundos)
  const driverLocation = active?.driver?.latest_location
  const driverPoint: Point | null = driverLocation
    ? { name: 'Tu mototaxi', latitude: Number(driverLocation.latitude), longitude: Number(driverLocation.longitude) }
    : null
  const pickupKm =
    driverPoint && active?.origin_latitude !== undefined && active.status === 'assigned'
      ? distanceKm(driverPoint.latitude, driverPoint.longitude, Number(active.origin_latitude), Number(active.origin_longitude))
      : null

  const samePoint =
    origin && destination && origin.latitude === destination.latitude && origin.longitude === destination.longitude

  const hadActive = useRef(false)

  const loadTrips = useCallback(async () => {
    try {
      const { data } = await api.get('/client/trips')
      setTrips(data.trips?.data ?? [])
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }, [])

  const loadActive = useCallback(async () => {
    try {
      const { data } = await api.get('/client/active')
      const next: ActiveRide | null = data.has_active ? data.data : null
      // Si el viaje activo acaba de terminar, refresca el historial
      if (hadActive.current && !next) await loadTrips()
      hadActive.current = !!next
      setActive(next)
    } catch {
      /* se reintenta en el siguiente ciclo */
    }
  }, [loadTrips])

  // Seguimiento "en tiempo real": consulta el viaje activo cada 5 segundos
  useEffect(() => {
    const first = setTimeout(() => {
      void loadActive()
      void loadTrips()
    }, 0)
    const timer = setInterval(() => void loadActive(), 5000)
    return () => {
      clearTimeout(first)
      clearInterval(timer)
    }
  }, [loadActive, loadTrips])

  const run = async (action: () => Promise<void>) => {
    setError('')
    setMessage('')
    setLoading(true)
    try {
      await action()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleEstimate = () =>
    run(async () => {
      const { data } = await api.post('/client/estimate-fare', coords())
      setEstimate(data.estimate)
    })

  const handleRequest = () =>
    run(async () => {
      const { data } = await api.post('/client/ride-requests', {
        origin_name: origin!.name,
        destination_name: destination!.name,
        ...coords(),
      })
      setMessage(data.message)
      setEstimate(null)
      await loadActive()
    })

  const handleCancel = () =>
    run(async () => {
      if (!active) return
      const { data } = await api.post(`/client/cancel/${active.id}`, { reason: 'Cancelado por el cliente' })
      setMessage(data.message)
      hadActive.current = false
      setActive(null)
      await loadTrips()
    })

  const handleRate = (tripId: number) =>
    run(async () => {
      const { data } = await api.post(`/client/trips/${tripId}/rating`, { ...rating, has_incident: false })
      setMessage(data.message)
      setRatingTrip(null)
      setRating({ score: 5, comment: '' })
    })

  return (
    <Layout>
      {error && <p className="alert alert-error">{error}</p>}
      {message && <p className="alert alert-ok">{message}</p>}

      {active ? (
        <section className="card">
          <h2>{STATUS_TEXT[active.status] ?? active.status}</h2>
          {active.status === 'requested' && <div className="pulse" aria-hidden />}
          {active.origin_latitude !== undefined && active.destination_latitude !== undefined && (
            <MapView
              origin={{ name: 'Origen', latitude: Number(active.origin_latitude), longitude: Number(active.origin_longitude) }}
              destination={{ name: 'Destino', latitude: Number(active.destination_latitude), longitude: Number(active.destination_longitude) }}
              driver={driverPoint}
            />
          )}
          {pickupKm !== null && (
            <p className="eta">
              {'\u{1F3CD}\uFE0F'} Tu mototaxi está a <strong>{pickupKm < 1 ? `${Math.round(pickupKm * 1000)} m` : `${pickupKm.toFixed(1)} km`}</strong> de ti
            </p>
          )}
          {active.origin_name && (
            <p className="route">
              {active.origin_name} → {active.destination_name}
            </p>
          )}
          {active.driver && (
            <div className="driver">
              <p>
                <strong>{active.driver.user.name}</strong> ★ {active.driver.rating_average}
              </p>
              <p className="muted">Tel. {active.driver.user.phone}</p>
            </div>
          )}
          {active.vehicle && (
            <p>
              {active.vehicle.brand} {active.vehicle.model} · {active.vehicle.color} ·{' '}
              <span className="plate">{active.vehicle.plate}</span>
            </p>
          )}
          <p>Tarifa estimada: {formatCOP(active.estimated_fare)}</p>
          {CANCELLABLE.includes(active.status) && (
            <button className="btn btn-danger" onClick={handleCancel} disabled={loading}>
              Cancelar viaje
            </button>
          )}
        </section>
      ) : (
        <section className="card form">
          <h2>¿A dónde vas?</h2>

          <label>
            Origen
            <select value={selectValue(origin)} onChange={(e) => handleOriginSelect(e.target.value)}>
              <option value="" disabled>Elige el punto de partida…</option>
              <option value="me">{'\u{1F4CD}'} Mi ubicación actual</option>
              {PLACES.map((p, i) => (
                <option key={p.name} value={`p${i}`}>{p.name}</option>
              ))}
              {selectValue(origin) === 'custom' && <option value="custom">{origin!.name}</option>}
            </select>
          </label>
          {geoMessage && <p className="muted">{geoMessage}</p>}

          <label>
            Destino
            <select value={selectValue(destination)} onChange={(e) => handleDestinationSelect(e.target.value)}>
              <option value="" disabled>Elige a dónde vas…</option>
              {PLACES.map((p, i) => (
                <option key={p.name} value={`p${i}`}>{p.name}</option>
              ))}
              {selectValue(destination) === 'custom' && <option value="custom">{destination!.name}</option>}
            </select>
          </label>

          <div className="search">
            <p className="muted">
              ¿No está en la lista? Busca una dirección o lugar de Neiva, o tócalo en el mapa. Se usará como:
            </p>
            <div className="segmented">
              <button type="button" className={picking === 'origin' ? 'active' : ''} onClick={() => setPicking('origin')}>
                Origen
              </button>
              <button type="button" className={picking === 'destination' ? 'active' : ''} onClick={() => setPicking('destination')}>
                Destino
              </button>
            </div>
            <div className="row">
              <input
                placeholder="Ej: Universidad Surcolombiana, Calle 8 # 5-20…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button type="button" className="btn" onClick={handleSearch} disabled={searching || query.trim().length < 3}>
                {searching ? 'Buscando…' : 'Buscar'}
              </button>
            </div>
            {results.length > 0 && (
              <ul className="results">
                {results.map((r) => (
                  <li key={r.place_id}>
                    <button type="button" onClick={() => handleResult(r)}>
                      {r.display_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <MapView origin={origin} destination={destination} onPick={handlePick} />

          {!origin || !destination ? (
            <p className="muted">Marca el origen y el destino para calcular la tarifa.</p>
          ) : samePoint ? (
            <p className="muted">El origen y el destino deben ser distintos.</p>
          ) : estimate ? (
            <>
              <div className="estimate">
                <span>{estimate.distance_km} km · {estimate.duration_min} min</span>
                <strong>{formatCOP(estimate.estimated_fare)}</strong>
              </div>
              <button className="btn" onClick={handleRequest} disabled={loading}>
                Solicitar viaje
              </button>
            </>
          ) : (
            <button className="btn" onClick={handleEstimate} disabled={loading}>
              Calcular tarifa
            </button>
          )}
        </section>
      )}

      <section className="card">
        <h2>Mis viajes</h2>
        {trips.length === 0 ? (
          <p className="muted">Aún no tienes viajes. Cuando termines uno aparecerá aquí.</p>
        ) : (
          <ul className="list">
            {trips.map((t) => (
              <li key={t.id}>
                <div className="list-row">
                  <div>
                    <strong>{formatCOP(t.final_fare ?? 0)}</strong>
                    <p className="muted">
                      {t.driver?.user.name ?? 'Sin conductor'} · {t.vehicle?.plate ?? ''} ·{' '}
                      {t.completed_at ? new Date(t.completed_at).toLocaleString('es-CO') : STATUS_TEXT[t.status]}
                    </p>
                  </div>
                  {t.status === 'completed' && ratingTrip !== t.id && (
                    <button className="btn btn-ghost" onClick={() => setRatingTrip(t.id)}>
                      Calificar
                    </button>
                  )}
                </div>
                {ratingTrip === t.id && (
                  <div className="form rating">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-label={`${n} estrellas`}
                          className={n <= rating.score ? 'on' : ''}
                          onClick={() => setRating({ ...rating, score: n })}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Comentario (opcional)"
                      value={rating.comment}
                      onChange={(e) => setRating({ ...rating, comment: e.target.value })}
                    />
                    <div className="row">
                      <button className="btn" onClick={() => handleRate(t.id)} disabled={loading}>
                        Enviar calificación
                      </button>
                      <button className="btn btn-ghost" onClick={() => setRatingTrip(null)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  )
}
