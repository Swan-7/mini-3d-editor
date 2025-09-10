import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { sanitizeString } from "../utils/sanitize"

export default function useHotspots(initial = []) {
  const [hotspots, setHotspots] = useState(initial)

  // Add a hotspot
  const addHotspot = useCallback((h) => {
    const normalized = {
      id: uuidv4(),
      position: Array.isArray(h.position) ? h.position : [0, 0, 0],
      label: sanitizeString(h.label || "hotspot"),
      hidden: !!h.hidden
    }
    setHotspots((prev) => [...prev, normalized])
  }, [])

  // Remove by id
  const removeHotspot = useCallback((id) => {
    setHotspots((prev) => prev.filter((p) => p.id !== id))
  }, [])

  // Update by id
  const updateHotspot = useCallback((id, patch) => {
    setHotspots((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              ...sanitizePatch(patch)
            }
          : h
      )
    )
  }, [])

  // Clear all hotspots
  const clearHotspots = useCallback(() => setHotspots([]), [])

  // Replace state from an array (e.g. imported JSON).
  const setFromArray = useCallback((arr) => {
    if (!Array.isArray(arr)) return
    const normalized = arr.map((a) => ({
      id: a.id || uuidv4(),
      position: Array.isArray(a.position) ? a.position : [0, 0, 0],
      label: sanitizeString(a.label || "hotspot"),
      hidden: !!a.hidden
    }))
    setHotspots(normalized)
  }, [])

  // helper to sanitize patch updates
  function sanitizePatch(patch) {
    const safe = { ...patch }
    if (safe.label) safe.label = sanitizeString(safe.label)
    return safe
  }

  return {
    hotspots,
    addHotspot,
    removeHotspot,
    updateHotspot,
    clearHotspots,
    setFromArray
  }
}
