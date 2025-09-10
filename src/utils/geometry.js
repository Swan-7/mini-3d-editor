import { Box3, Vector3 } from 'three'

// Fits a model into a bounding box of desired size, centers it
export function fitObjectToSize(object3d, desiredSize = 1.5){
    const box = new Box3().setFromObject(object3d)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())


    object3d.position.x -= center.x
    object3d.position.y -= center.y
    object3d.position.z -= center.z


    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = desiredSize / maxDim
    object3d.scale.setScalar(scale)

    return { size, center, scale }
}