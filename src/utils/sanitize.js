/**
 * Sanitize user-supplied strings (labels, file names, etc.)
 * - Removes unsafe characters
 * - Limits length to prevent abuse
 */
export function sanitizeString(str = "", maxLen = 100) {
  if (typeof str !== "string") return ""
  return str
    .replace(/[^a-z0-9 _-]/gi, "") // only letters, numbers, space, _, -
    .trim()
    .slice(0, maxLen)
}

/**
 * Sanitize hotspot JSON before importing
 * - Ensures it's an array
 * - Drops invalid entries
 */
export function sanitizeHotspotArray(arr) {
  if (!Array.isArray(arr)) return []
  return arr.map((h, i) => ({
    id: typeof h.id === "string" ? sanitizeString(h.id, 36) : `imported-${i}`,
    position: Array.isArray(h.position) && h.position.length === 3
      ? h.position.map((n) => (typeof n === "number" ? n : 0))
      : [0, 0, 0],
    label: sanitizeString(h.label || "hotspot"),
    hidden: !!h.hidden
  }))
}
