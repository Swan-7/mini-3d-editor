export default function HotspotLabels({ labels }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {labels.map(
        (p) =>
          !p.hidden && (
            <div
              key={p.id}
              style={{
                position: "absolute",
                transform: `translate(${p.x}px, ${p.y}px)`,
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                textShadow: "0 1px 2px black"
              }}
            >
              {p.label}
            </div>
          )
      )}
    </div>
  )
}
