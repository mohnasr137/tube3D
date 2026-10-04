import * as THREE from "three";
import { CONFIG } from "../config.js";

/**
 * Creates the wireframe tube and glowing edge outlines.
 * @param {THREE.CatmullRomCurve3} splinePath
 * @param {Object} options
 * @returns {{ group: THREE.Group, geometry: THREE.TubeGeometry, mesh: THREE.Mesh, lines: THREE.LineSegments }}
 */
export function createTube(splinePath, options = CONFIG.tube) {
  const group = new THREE.Group();

  const geometry = new THREE.TubeGeometry(
    splinePath,
    options.tubularSegments,
    options.radius,
    options.radialSegments,
    options.closed
  );

  const tubeMaterial = new THREE.MeshBasicMaterial({
    color: options.wireframeColor,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, tubeMaterial);
  group.add(mesh);

  const edges = new THREE.EdgesGeometry(geometry, options.edgeThresholdAngle);
  const lineMaterial = new THREE.LineBasicMaterial({ color: options.edgeColor });
  const lines = new THREE.LineSegments(edges, lineMaterial);
  group.add(lines);

  return { group, geometry, mesh, lines };
}
