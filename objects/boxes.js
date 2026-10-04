import * as THREE from "three";
import { CONFIG } from "../config.js";

/**
 * Creates floating glowing wireframe cubes scattered along the curve path.
 * Efficiently shares a single EdgesGeometry and LineBasicMaterial across all boxes.
 * @param {THREE.Curve} curvePath
 * @param {Object} options
 * @returns {THREE.Group}
 */
export function createBoxes(curvePath, options = CONFIG.boxes) {
  const group = new THREE.Group();
  const boxGeo = new THREE.BoxGeometry(options.size, options.size, options.size);
  const boxEdges = new THREE.EdgesGeometry(boxGeo, options.edgeThresholdAngle);
  const lineMaterial = new THREE.LineBasicMaterial({ color: options.color });

  for (let i = 0; i < options.count; i += 1) {
    const p = (i / options.count + Math.random() * 0.1) % 1;
    const pos = curvePath.getPointAt(p);

    // Apply random position jitter around the path
    pos.x += Math.random() - options.jitterRange;
    pos.z += Math.random() - options.jitterRange;

    const boxLines = new THREE.LineSegments(boxEdges, lineMaterial);
    boxLines.position.copy(pos);
    boxLines.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    group.add(boxLines);
  }

  return group;
}
