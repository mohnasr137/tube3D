/**
 * tube-3d Configuration
 * Centralized settings for geometry, visuals, camera, and post-processing.
 */
export const CONFIG = {
  // Tube geometry and styling
  tube: {
    tubularSegments: 222,
    radius: 0.65,
    radialSegments: 16,
    closed: true,
    wireframeColor: 0x0000ff, // Blue wireframe
    edgeColor: 0xff0000,      // Red edge highlights
    edgeThresholdAngle: 0.2,
  },

  // Floating cubes along spline
  boxes: {
    count: 50,
    size: 0.075,
    color: 0xffff00,          // Yellow edge glow
    edgeThresholdAngle: 0.2,
    jitterRange: 0.4,
  },

  // Camera animation
  camera: {
    fov: 75,
    near: 0.1,
    far: 100,
    initialZ: 3,
    loopTimeMs: 12000,        // Scaled loop time (t * 0.1 / loopTimeMs)
    lookAhead: 0.03,          // Offset along spline curve for lookAt
  },

  // Orbit controls
  controls: {
    enableDamping: true,
    dampingFactor: 0.2,
    minDistance: 2.3,
    maxDistance: 8,
  },

  // Atmosphere / Fog
  fog: {
    color: 0x000000,
    density: 0.6,
  },

  // Unreal bloom postprocessing
  bloom: {
    exposure: 1.5,
    strength: 3.5,
    radius: 0,
    threshold: 0.002,
  },
};
