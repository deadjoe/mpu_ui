'use client'

import { useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

interface Location {
  name: string
  lat: number
  lng: number
  size: number
}

interface WorldMapProps {
  locations: Location[]
}

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const MAP_ASPECT_RATIO = 2.5
const MAP_HEIGHT = 420
const MAP_WIDTH = MAP_HEIGHT * MAP_ASPECT_RATIO

// 需要过滤的地区
const FILTERED_REGIONS = [
  'Antarctica',
  'Greenland',
  'French Southern and Antarctic Lands',
  'Heard Island and McDonald Islands',
]

export default function WorldMap({ locations }: WorldMapProps) {
  const markers = useMemo(() => locations, [locations])

  return (
    <div className="w-full h-[500px] bg-[#0A0A0A] rounded-lg p-4">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 160,
          center: [0, 40],
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        height={MAP_HEIGHT}
        width={MAP_WIDTH}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              if (FILTERED_REGIONS.includes(geo.properties.name)) return null
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#0A0A0A"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: '#FFA500',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#FFA500',
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
        {markers.map(({ name, lat, lng, size }, index) => (
          <Marker key={index} coordinates={[lng, lat]}>
            <circle r={4 + size} fill="#3b82f6" stroke="#FFFFFF" strokeWidth={1} />
            <title>{name}</title>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
