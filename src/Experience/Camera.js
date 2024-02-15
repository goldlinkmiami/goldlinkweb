import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;

    this.cameraObject = {
      fov: 35,
      aspect: this.sizes.aspect,
      near: 0.001,
      far: 1000,
    };

    this.setUpPerspectiveCamera();
    // this.setUpControls();

    // document.addEventListener("click", () => {
    //   console.log(this.perspectiveCamera.position);
    //   console.log(this.perspectiveCamera.rotation);
    // });
  }

  setUpPerspectiveCamera() {
    this.instanceGroup = new THREE.Group();
    this.scene.add(this.instanceGroup);
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      this.cameraObject.fov,
      this.cameraObject.aspect,
      this.cameraObject.near,
      this.cameraObject.far
    );
    this.perspectiveCamera.position.set(0, 0, 9);
  }

  setUpControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.cameraObject.aspect = this.sizes.aspect;
    this.perspectiveCamera.aspect = this.cameraObject.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  update() {
    // this.controls.update();
  }
}
