import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import sources from "./source";
import Resources from "./Utils/Resources";
import Camera from "./Camera";
import Renderer from "./Renderer";
import LoadingScreen from "./loadingScreen";
import World from "./World";

let instance = null;

export default class Experience {
  constructor(canvas) {
    this.canvas = canvas;
    this.sources = sources;

    if (instance) {
      return instance;
    }

    instance = this;
    // window.experience = this;

    this.scene = new THREE.Scene();

    //? UTILS
    this.sizes = new Sizes();
    this.time = new Time();
    this.resources = new Resources(this.sources);

    //! SETTING UP HTML
    this.loadingScreen = new LoadingScreen();

    //? WORLD
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}
