import { useEffect, useRef } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { fitObjectToSize } from '../../utils/geometry'
import { Box3, Sphere } from 'three'

export default function ModelLoader({ url, onPointerDown }) {
  const gltf = useLoader(GLTFLoader, url)
  const ref = useRef()
  const { camera, controls } = useThree()

  useEffect(() => {
    if (!gltf) return

    // Fit & center model
    fitObjectToSize(gltf.scene, 1.5)

    // Compute bounding sphere
    const box = new Box3().setFromObject(gltf.scene)
    const sphere = new Sphere()
    box.getBoundingSphere(sphere)

    // Place camera far enough back
    const fov = (camera.fov * Math.PI) / 180
    const distance = sphere.radius / Math.sin(fov / 2)

    camera.position.set(0, 0, distance * 1.2)
    camera.lookAt(sphere.center)
    camera.updateProjectionMatrix()

    // Sync OrbitControls target once
    if (controls) {
      controls.target.copy(sphere.center)
      controls.update()
    }
  }, [gltf, url, camera, controls])

  // Cleanup
  useEffect(() => {
    return () => {
      if (gltf?.scene) {
        gltf.scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose?.())
            } else {
              obj.material.dispose?.()
            }
          }
        })
      }
    }
  }, [gltf])

  return (
    <primitive
      key={url} // re-mount when URL changes
      ref={ref}
      object={gltf.scene}
      onPointerDown={(e) => {
        e.stopPropagation()
        const intersection = e.intersections?.[0] || { point: e.point }
        onPointerDown && onPointerDown(intersection)
      }}
    />
  )
}
