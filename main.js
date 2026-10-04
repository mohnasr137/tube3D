import "./style.css";
import WebGL from "three/addons/capabilities/WebGL.js";
import { App } from "./core/app.js";

const container = document.getElementById("app") || document.body;

if (WebGL.isWebGL2Available()) {
  const app = new App(container);
  app.start();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  container.appendChild(warning);
}
