import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import Layout from '../../components/Layout'
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
  driver?: {
    rating_average: number
    user: { name: string; phone: string }
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

export default function ClientHome() {
  const [origin, setOrigin] = useState(0)
  const [destination, setDestination] = useState(1)
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const [active, setActive] = useState<ActiveRide | null>(null)
  const [trips, setTrips] = useState<Trip[]>([])
  const [ratingTrip, setRatingTrip] = useState<number | null>(null)
  const [rating, setRating] = useState({ score: 5, comment: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const coords = () => ({
    origin_latitude: PLACES[origin].latitude,
    origin_longitude: PLACES[origin].longitude,
    destination_latitude: PLACES[destination].latitude,
    destination_longitude: PLACES[destination].longitude,
  })

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
        origin_name: PLACES[origin].name,
        destination_name: PLACES[destination].name,
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
            <select value={origin} onChange={(e) => { setOrigin(Number(e.target.value)); setEstimate(null) }}>
              {PLACES.map((p, i) => (
                <option key={p.name} value={i}>{p.name}</option>
              ))}
            </select>
          </label>
          <label>
            Destino
            <select value={destination} onChange={(e) => { setDestination(Number(e.target.value)); setEstimate(null) }}>
              {PLACES.map((p, i) => (
                <option key={p.name} value={i}>{p.name}</option>
              ))}
            </select>
          </label>

          {origin === destination ? (
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