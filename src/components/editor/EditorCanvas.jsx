import HotspotLabels from "./HotspotLabels"
import { Suspense, useCallback, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"
import ModelLoader from "./ModelLoader"
import Hotspot from "./Hotspot"
import HotspotUI from "./HotspotUI"
import { exportHotspots } from "../../services.js/export"

// Project 3D hotspot positions to 2D screen coordinates
function HotspotProjector({ hotspots, setLabels }) {
  const { camera, size } = useThree()
  useFrame(() => {
    const projected = hotspots.map((h) => {
      const vector = new THREE.Vector3(...h.position)
      vector.project(camera)
      return {
        id: h.id,
        label: h.label,
        hidden: h.hidden,
        x: (vector.x * 0.5 + 0.5) * size.width,
        y: (-vector.y * 0.5 + 0.5) * size.height,
      }
    })
    setLabels(projected)
  })
  return null
}

export default function EditorCanvas({
  modelUrl,
  hotspots,
  addHotspot,
  removeHotspot,
  updateHotspot,
  clearHotspots,
  setFromArray,
}) {
  const [labels, setLabels] = useState([])

  const handlePointerDown = useCallback(
    (intersection) => {
      const pos = [intersection.point.x, intersection.point.y, intersection.point.z]
      addHotspot({ position: pos, label: "New hotspot" })
    },
    [addHotspot]
  )

  return (
    <div className="flex flex-col bg-gray-900 text-gray-600 relative w-full h-screen overflow-hidden">
      <div className="flex flex-1 flex-col sm:flex-row overflow-hidden">
        {/* 3D Canvas */}
        <div className="flex-1 relative min-w-0">
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />

            <Suspense fallback={<Html center>Loading model...</Html>}>
              {modelUrl ? (
                <ModelLoader url={modelUrl} onPointerDown={handlePointerDown} />
              ) : (
                <Html center>
                  <div className="px-4 py-2 rounded-lg bg-gray-800/20 text-sm">
                    Import a .glb file to start
                  </div>
                </Html>
              )}
            </Suspense>

            {(hotspots || []).map((h) => (
              <Hotspot
                key={h.id}
                id={h.id}
                position={h.position}
                onEdit={updateHotspot}
                onRemove={() => removeHotspot(h.id)}
              />
            ))}

            <OrbitControls makeDefault enableDamping enablePan />

            {/* Project 3D → screen coords */}
            <HotspotProjector hotspots={hotspots} setLabels={setLabels} />
          </Canvas>

          {/* Overlay labels at correct positions */}
          <HotspotLabels labels={labels} />
        </div>

        {/* Sidebar */}
        <aside className="w-80 shrink-0 p-4 overflow-y-auto overflow-x-hidden bg-white text-brand-700 shadow-xl border-l border-brand-500">
          <HotspotUI
            hotspots={hotspots}
            onUpdate={updateHotspot}
            onImport={setFromArray}
            onClear={clearHotspots}
            onRemove={removeHotspot}
            onExport={() => exportHotspots(hotspots)}
          />
        </aside>
      </div>
    </div>
  )
}