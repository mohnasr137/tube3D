import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { CONFIG } from "../config.js";
import { spline } from "../objects/spline.js";
import { createTube } from "../objects/tube.js";
import { createBoxes } from "../objects/boxes.js";

/**
 * Main application class managing Three.js scene, rendering, and flight loop.
 */
export class App {
  /**
   * @param {HTMLElement} container - DOM element to attach the WebGL canvas.
   */
  constructor(container = document.body) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initControls();
    this.initPostProcessing();
    this.buildWorld();

    window.addEventListener("resize", this.onWindowResize);
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(CONFIG.fog.color, CONFIG.fog.density);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      this.width / this.height,
      CONFIG.camera.near,
      CONFIG.camera.far
    );
    this.camera.position.z = CONFIG.camera.initialZ;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = CONFIG.controls.enableDamping;
    this.controls.dampingFactor = CONFIG.controls.dampingFactor;
    this.controls.minDistance = CONFIG.controls.minDistance;
    this.controls.maxDistance = CONFIG.controls.maxDistance;
  }

  initPostProcessing() {
    const renderScene = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      CONFIG.bloom.exposure,
      0.4,
      100
    );
    this.bloomPass.threshold = CONFIG.bloom.threshold;
    this.bloomPass.strength = CONFIG.bloom.strength;
    this.bloomPass.radius = CONFIG.bloom.radius;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(this.bloomPass);
  }

  buildWorld() {
    // Generate tube mesh and outline wireframe
    const { group: tubeGroup, geometry: tubeGeometry } = createTube(spline, CONFIG.tube);
    this.tubeGeometry = tubeGeometry;
    this.scene.add(tubeGroup);

    // Generate floating scattered wireframe cubes along the spline
    const boxesGroup = createBoxes(spline, CONFIG.boxes);
    this.scene.add(boxesGroup);
  }

  updateCamera(timestamp) {
    const time = timestamp * 0.1;
    const looptime = CONFIG.camera.loopTimeMs;
    const progress = (time % looptime) / looptime;

    const path = this.tubeGeometry.parameters.path;
    const position = path.getPointAt(progress);
    const lookAt = path.getPointAt((progress + CONFIG.camera.lookAhead) % 1);

    this.camera.position.copy(position);
    this.camera.lookAt(lookAt);
  }

  onWindowResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
  }

  animate(timestamp = 0) {
    this.updateCamera(timestamp);
    this.composer.render();
    this.controls.update();
  }

  start() {
    this.renderer.setAnimationLoop(this.animate);
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  destroy() {
    this.stop();
    window.removeEventListener("resize", this.onWindowResize);
    this.controls.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
