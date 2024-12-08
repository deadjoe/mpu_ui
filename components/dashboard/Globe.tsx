'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const GLOBE_RADIUS = 2
const MARKER_RADIUS = 0.05

interface Location {
  name: string
  lat: number
  lng: number
  size: number
}

interface GlobeProps {
  locations: Location[]
}

function DatacenterMarker({ lat, lng, size = 1 }) {
  const position = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    const x = -(GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta))
    const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
    const y = GLOBE_RADIUS * Math.cos(phi)
    return [x, y, z]
  }, [lat, lng])

  return (
    <group position={position as [number, number, number]}>
      <Sphere args={[MARKER_RADIUS * size, 16, 16]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
      </Sphere>
      <pointLight color="#3b82f6" intensity={1} distance={1} />
    </group>
  )
}

function GlobeObject({ locations }: { locations: Location[] }) {
  const globeRef = useRef<THREE.Mesh>(null)
  const gridRef = useRef<THREE.LineSegments>(null)

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001
    }
    if (gridRef.current) {
      gridRef.current.rotation.y += 0.001
    }
  })

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.EdgesGeometry(new THREE.SphereGeometry(GLOBE_RADIUS + 0.01, 36, 36))
    return geometry
  }, [])

  return (
    <>
      <Sphere ref={globeRef} args={[GLOBE_RADIUS, 64, 64]}>
        <meshPhongMaterial
          color="#2a4365"
          emissive="#1a365d"
          specular="#60a5fa"
          shininess={5}
          opacity={0.9}
          transparent
        />
      </Sphere>
      <lineSegments ref={gridRef} geometry={gridGeometry}>
        <lineBasicMaterial color="#60a5fa" transparent opacity={0.2} />
      </lineSegments>
      {locations.map((location, index) => (
        <DatacenterMarker key={index} lat={location.lat} lng={location.lng} size={location.size} />
      ))}
    </>
  )
}

export default function Globe({ locations }: GlobeProps) {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <GlobeObject locations={locations} />
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
