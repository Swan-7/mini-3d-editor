import { useRef } from "react"
import { exportHotspots } from "../../services.js/export"
import { sanitizeHotspotArray, sanitizeString } from "../../utils/sanitize"

export default function HotspotUI({
  hotspots = [],
  onUpdate,
  onImport,
  onClear,
  onRemove
}) {
  const fileRef = useRef(null)

  const handleImportFile = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    try {
      const text = await f.text()
      const json = JSON.parse(text)
      const safeHotspots = sanitizeHotspotArray(json)

      if (!Array.isArray(safeHotspots)) {
        throw new Error("Imported JSON must be an array of hotspots")
      }
      onImport?.(safeHotspots)
    } catch (err) {
      alert("Failed to import hotspots: " + (err.message || err))
    } finally {
      e.target.value = ""
    }
  }

  return (
    <div className="w-full bg-card text-foreground rounded-2xl p-3 shadow-md border border-border overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 gap-2">
        <div className="text-sm font-bold">
          Hotspots ({hotspots.length})
        </div>
        <div className="flex gap-2">
          <button className="btn text-xs" onClick={() => exportHotspots(hotspots)}>
            Export
          </button>
          <button className="btn text-xs" onClick={() => fileRef.current?.click()}>
            Import
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImportFile}
          />
        </div>
      </div>

      {/* List */}
      <div className="max-h-64 overflow-y-auto">
        {hotspots.length === 0 && (
          <div className="text-xs text-muted-foreground">
            No hotspots yet, click the 3D model to add one.
          </div>
        )}

        {hotspots.map((h) => (
          <div
            key={h.id}
            className="flex justify-between items-center py-2 border-b border-border/20"
          >
            <div>
              <div className="text-sm mb-2 font-medium">{h.label}</div>
              <div className="text-xs text-muted-foreground italic max-w-fit">
                x: {Number(h.position?.[0] ?? 0).toFixed(2)}&nbsp; <br />
                y: {Number(h.position?.[1] ?? 0).toFixed(2)}&nbsp; <br />
                z: {Number(h.position?.[2] ?? 0).toFixed(2)}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <button
                className="btn text-xs"
                onClick={() => {
                  const newLabel = prompt("Rename hotspot", h.label)
                  if (newLabel && newLabel !== h.label) {
                    onUpdate?.(h.id, { label: sanitizeString(newLabel) })
                  }
                }}
              >
                Rename
              </button>
              <button
                className="btn text-xs"
                onClick={() => onUpdate?.(h.id, { hidden: !h.hidden })}
              >
                {h.hidden ? "Show" : "Hide"}
              </button>
              <button
                className="btn text-xs text-red-500"
                onClick={() => onRemove?.(h.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-2">
        <button
          className="btn text-xs"
          onClick={() => {
            try {
              navigator.clipboard?.writeText(
                JSON.stringify(hotspots, null, 2)
              )
              alert("Hotspots JSON copied to clipboard")
            } catch {
              alert("Copy failed")
            }
          }}
        >
          Copy JSON
        </button>
        <button className="btn text-xs" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  )
}
