import React, { useEffect, useRef } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { fitObjectToSize } from '../../utils/geometry'


// ModelLoader: loads glb and auto-fits scale & center.
export default function ModelLoader({ url, onPointerDown }){
    const gltf = useLoader(GLTFLoader, url)
    const ref = useRef()
    const { camera } = useThree()


    useEffect(() => {
        if(!gltf) return
        const { scale, center } = fitObjectToSize(gltf.scene, 1.5)
        
        camera.position.set(0, 0, 3 / scale)
        camera.updateProjectionMatrix()

    }, [gltf, camera])

    return (
        <primitive
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