import { useRef } from "react"
import { sanitizeString } from "../../utils/sanitize"

export default function Topbar({ onFile, onUnload }) {
  const fileRef = useRef(null)
  const limitBytes = 50 * 1024 * 1024 // 50MB

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > limitBytes) {
      alert("File too large. Please use a smaller .glb (<= 50MB)")
      return
    }

    // Sanitize filename before showing anywhere
    const safeName = sanitizeString(f.name)
    document.title = `Mini 3D Editor - ${safeName}`

    const blobUrl = URL.createObjectURL(f)
    onFile(blobUrl)
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-brand-900 text-white shadow-md">
      <h1 className="text-lg font-semibold text-gray-100">Mini 3D Editor</h1>
      <div className="flex gap-2 items-center">
        <button
          className="bg-[#3085fc] hover:bg-blue-700 px-3 py-1 rounded-md text-white text-sm"
          onClick={() => fileRef.current?.click()}
        >
          Import .glb
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".glb,.gltf"
          className="hidden"
          onChange={handleFile}
        />
        <button
          className="px-3 py-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm"
          onClick={onUnload}
        >
          Unload
        </button>
      </div>
    </header>
  )
}