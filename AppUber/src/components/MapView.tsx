import { useEffect, useState } from 'react'
import { divIcon } from 'leaflet'
import { MapContainer, TileLayer, CircleMarker, Marker, Polyline, Tooltip, useMap, useMapEvents } from 'react-leaflet'

export interface Point {
  name: string
  latitude: number
  longitude: number
}

interface Props {
  origin?: Point | null
  destination?: Point | null
  driver?: Point | null
  onPick?: (latitude: number, longitude: number) => void
}

const NEIVA: [number, number] = [2.9273, -75.2819]

// Icono del mototaxi
const driverIcon = divIcon({
  className: 'driver-marker',
  html: '&#x1F3CD;&#xFE0F;',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

// Detecta los clics sobre el mapa
function ClickHandler({ onPick }: { onPick?: Props['onPick'] }) {
  useMapEvents({
    click(e) {
      onPick?.(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

// Ajusta el tamaño del mapa cuando se amplía o se reduce
function ResizeHandler({ expanded }: { expanded: boolean }) {
  const map = useMap()
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 50)
    return () => clearTimeout(t)
  }, [map, expanded])
  return null
}

// Centra el mapa para que se vean todos los puntos (se reajusta cuando alguno se mueve)
function FitView({ points }: { points: Point[] }) {
  const map = useMap()
  const key = points.map((p) => `${p.latitude},${p.longitude}`).join('|')

  useEffect(() => {
    if (!key) return
    const coords = key.split('|').map((pair) => pair.split(',').map(Number) as [number, number])
    if (coords.length === 1) map.setView(coords[0], 15)
    else map.fitBounds(coords, { padding: [50, 50] })
  }, [map, key])

  return null
}

export default function MapView({ origin, destination, driver, onPick }: Props) {
  const [expanded, setExpanded] = useState(false)

  // Con el mapa ampliado: Esc lo cierra y la página de fondo no se desplaza
  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [expanded])

  return (
    <div className={expanded ? 'map-wrap map-expanded' : 'map-wrap'}>
      <MapContainer center={NEIVA} zoom={14} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {origin && (
          <CircleMarker
            center={[origin.latitude, origin.longitude]}
            radius={10}
            pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#05944f', fillOpacity: 1 }}
          >
            <Tooltip direction="top" offset={[0, -10]} permanent>Origen</Tooltip>
          </CircleMarker>
        )}

        {destination && (
          <CircleMarker
            center={[destination.latitude, destination.longitude]}
            radius={10}
            pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#000000', fillOpacity: 1 }}
          >
            <Tooltip direction="top" offset={[0, -10]} permanent>Destino</Tooltip>
          </CircleMarker>
        )}

        {origin && destination && (
          <Polyline
            positions={[
              [origin.latitude, origin.longitude],
              [destination.latitude, destination.longitude],
            ]}
            pathOptions={{ color: '#1a73e8', weight: 5, opacity: 0.9 }}
          />
        )}

        {driver && (
          <Marker position={[driver.latitude, driver.longitude]} icon={driverIcon}>
            <Tooltip direction="top" offset={[0, -20]} permanent>{driver.name}</Tooltip>
          </Marker>
        )}

        <ClickHandler onPick={onPick} />
        <FitView points={[origin, destination, driver].filter((p): p is Point => !!p)} />
        <ResizeHandler expanded={expanded} />
      </MapContainer>

      <button type="button" className="map-toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? '✕ Cerrar' : '⤢ Ampliar mapa'}
      </button>
    </div>
  )
}
