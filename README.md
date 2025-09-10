# Mini 3D Editor (React + Three.js)

A lightweight production-grade 3D editor that:

- Imports `.glb` models
- Allows orbit, zoom, and pan around the scene
- Lets users add labeled hotspots by clicking the model
- Hotspots can be edited, removed, and exported to JSON


---


# Setup

npm install
npm run dev

Open http://localhost:3000.

# Build & Deploy

npm run build


# Testing

npx vitest

# Folder Structure

See main documentation in /src. Key components:

-EditorCanvas.jsx: main 3D scene

-ModelLoader.jsx: loads and auto-fits models

-Hotspot.jsx: renders one hotspot label

-HotspotUI.jsx: overlay UI for hotspot controls

-useHotspots.js: React hook for hotspot state

-sanitize.js: prevents unsafe HTML

-geometry.js: fits model to scene

# Security

-Client-side only, no server upload

-File size limit: 50MB

-Labels sanitized to prevent XSS
