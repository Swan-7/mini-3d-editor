import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function HotspotProjector({ hotspots, onProject }) {
  const { camera, size } = useThree()

  useFrame(() => {
    const projected = hotspots.map((h) => {
      const vector = new THREE.Vector3(...h.position)
      vector.project(camera)

      const x = (vector.x * 0.5 + 0.5) * size.width
      const y = (-vector.y * 0.5 + 0.5) * size.height

      return { ...h, x, y }
    })
    onProject(projected)
  })

  return null // doesn't render anything in 3D
}
