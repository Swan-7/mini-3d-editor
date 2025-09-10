import { Html } from "@react-three/drei"

export default function Hotspot({ id, position, label, onEdit, onRemove }) {
  return (
    <group position={position}>
      {/* Marker sphere */}
      <mesh>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Stable label */}
      <Html
        position={[0, 0.05, 0]}   // offset a little above the marker
        center
        occlude
        transform={false}         // stops it from “wobbling”
      >
        <div
          style={{
            background: "rgba(0,0,0,0.65)",
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            pointerEvents: "auto",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}
