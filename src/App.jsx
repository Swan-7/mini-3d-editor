import { useState } from 'react'
import EditorCanvas from './components/editor/EditorCanvas'
import Topbar from './components/ui/Topbar'
import useHotspots from './hooks/useHotspots'
import './App.css'

export default function App(){
  const [modelUrl, setModelUrl] = useState(null)
  const {
    hotspots,
    addHotspot,
    removeHotspot,
    updateHotspot,
    clearHotspots,
    setFromArray,
  } = useHotspots()

  // Unload handler: clears both model and hotspots
  const handleUnload = () => {
     if (modelUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(modelUrl);
    }
    setModelUrl(null)
    clearHotspots()
  }

  const handleSetModel = (url) => {
     if (modelUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(modelUrl);
    }
    clearHotspots();
    setModelUrl(url);
  }

  return (
    <div style={{height: '100vh', position:'relative'}}>
      <Topbar onFile={handleSetModel} onUnload={handleUnload} />
      <EditorCanvas
        modelUrl={modelUrl}
        hotspots={hotspots}
        addHotspot={addHotspot}
        removeHotspot={removeHotspot}
        updateHotspot={updateHotspot}
        clearHotspots={clearHotspots}
        setFromArray={setFromArray}
        onUnload={handleUnload}
      />
    </div>
  )
}