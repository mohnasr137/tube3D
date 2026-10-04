# Tube3D - Neon Tunnel Fly-Through

An interactive, high-performance 3D sci-fi tunnel simulation built with **Three.js** and **Vite**. The application renders an endless camera fly-through along a 3D Catmull-Rom spline curve with glowing wireframe geometry, floating neon debris, and post-processing bloom effects.

---

## ✨ Features

- **Continuous Spline Fly-Through**: Smooth camera movement driven along a 3D Catmull-Rom curve with look-ahead orientation.
- **Neon Wireframe Aesthetics**: Glowing dual-layer tube structure with base mesh wireframes and highlighted edge segments.
- **UnrealBloom Post-Processing**: Cinematic bloom pass for vivid neon glow across edges and floating objects.
- **Scattered Floating Cubes**: Dynamic 3D wireframe boxes distributed along the track with random rotations and jitter.
- **Interactive Orbit Controls**: Mouse/touch orbit controls with smooth damping and distance clamping.
- **Responsive Viewport**: Automatic canvas and post-processing composer resizing on window resize.
- **Hardware Capability Check**: Graceful WebGL2 compatibility check with user-friendly fallback messaging.
- **Modular & Config-Driven**: Fully separated architecture with centralized configuration in `config.js`.

---

## 📁 Project Structure

```text
tube3D/
├── index.html              # HTML entry point and canvas mount container
├── main.js                 # Application bootstrap & WebGL2 capability detection
├── style.css               # Full-screen styling, canvas reset, and theme
├── config.js               # Centralized visual, camera, and post-processing settings
├── package.json            # Project metadata, scripts, and dependencies
├── .gitignore              # Git ignore rules for node_modules and builds
├── README.md               # Project documentation
├── core/
│   └── app.js              # Main App class managing Three.js lifecycle & flight loop
└── objects/
    ├── spline.js           # 3D curve coordinates and CatmullRomCurve3 generator
    ├── tube.js             # Tube geometry, wireframe mesh, and edge lines
    └── boxes.js            # Floating wireframe cubes scattered along curve
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` (comes bundled with Node.js)

### Installation

1. Clone or navigate to the repository:
   ```bash
   cd tube3D
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

- **Development Server**:
  ```bash
  npm run dev
  ```
  Open the displayed local URL (typically `http://localhost:5173`) in your browser with hot module replacement (HMR).

- **Production Build**:
  ```bash
  npm run build
  ```
  Generates optimized production assets in the `dist/` directory.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```
  Spins up a local web server serving the built `dist/` files.

---

## 🎮 Controls & Interaction

| Action | Control | Description |
|---|---|---|
| **Rotate View** | Left Click + Drag / Touch Drag | Rotate perspective with OrbitControls |
| **Zoom** | Mouse Wheel / Pinch | Zoom in or out within clamped min/max distance |
| **Auto Navigation** | Automatic | Camera continuously traverses the tunnel spline |

---

## ⚙️ Customization (`config.js`)

You can easily customize visuals, geometry, and animation speeds in `config.js`:

```javascript
export const CONFIG = {
  // Tube geometry and colors
  tube: {
    tubularSegments: 222,
    radius: 0.65,
    radialSegments: 16,
    closed: true,
    wireframeColor: 0x0000ff, // Blue wireframe
    edgeColor: 0xff0000,      // Red edge highlights
    edgeThresholdAngle: 0.2,
  },

  // Floating debris boxes
  boxes: {
    count: 50,
    size: 0.075,
    color: 0xffff00,          // Yellow edge glow
    edgeThresholdAngle: 0.2,
    jitterRange: 0.4,
  },

  // Flight speed and camera
  camera: {
    fov: 75,
    loopTimeMs: 12000,        // Traversal cycle speed
    lookAhead: 0.03,          // Look-ahead vector on curve
  },

  // Post-processing bloom
  bloom: {
    exposure: 1.5,
    strength: 3.5,
    radius: 0,
    threshold: 0.002,
  },
};
```

---

## 🛠️ Built With

- [Three.js](https://threejs.org/) - 3D WebGL rendering engine
- [Vite](https://vitejs.dev/) - Next-generation frontend build tool
