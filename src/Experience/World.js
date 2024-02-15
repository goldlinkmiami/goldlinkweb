import * as THREE from "three";
import Experience from "./Experience";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import flagVertexShader from "../shaders/flag/vertexShader.glsl";
import flagFragmentShader from "../shaders/flag/fragmentShader.glsl";
import Partshade from "./PartShade";

export default class World {
  constructor() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    this.experience = new Experience();
    this.loadingScreen = this.experience.loadingScreen;
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.perspectiveCamera;

    this.partShade = new Partshade();

    this.objectDistance = 8;
    this.scrollY = window.scrollY;
    this.mobileDeivce = this.sizes.width < 825 ?? true;

    //? PARALLAX OBJECT MOVEMENT
    this.cursor = {};
    this.cursor.x = 0;
    this.cursor.y = 0;
    this.#setUpParallaxMovement();

    //!!!!! RESOURCES READY ----
    this.resources.on("resourcesReady", () => {
      //? html
      this.nav = this.loadingScreen.nav.firstElementChild;

      //? textures
      this.envTexture = this.resources.items.environmentTexture;
      this.envTexture.colorSpace = THREE.SRGBColorSpace;
      this.africaTexture = this.resources.items.africaTexture;
      this.posterTexture = this.resources.items.poster;

      console.log(this.posterTexture);

      this.scene.environment = this.envTexture;

      //? objects
      this.object = this.resources.items.object;

      this.object.scene.traverse((e) => {
        if (e.type === "Mesh") {
          e.material.transparent = true;
          e.material.opacity = 0;
          gsap.to(e.material, {
            duration: 1,
            opacity: 1,
            delay: 2,
          });
        }
      });

      this.scene.add(this.object.scene);

      //? AFRICA FLAG SECOND SECTION

      this.flagMaterial = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          time: { value: 1.0 },
          resolution: { value: new THREE.Vector2() },
          uDiffuse: { value: this.africaTexture },
        },
        vertexShader: flagVertexShader,
        fragmentShader: flagFragmentShader,
      });
      this.flagGeometry = new THREE.PlaneGeometry(3.5, 2.25, 1, 1);
      this.flagMesh = new THREE.Mesh(this.flagGeometry, this.flagMaterial);
      this.scene.add(this.flagMesh);

      //? poster flag

      this.posterMaterial = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          time: { value: 1.0 },
          resolution: { value: new THREE.Vector2() },
          uDiffuse: { value: this.posterTexture },
        },
        vertexShader: flagVertexShader,
        fragmentShader: flagFragmentShader,
      });

      this.posterGeometry = new THREE.PlaneGeometry(2.25, 3.5, 1, 1);
      this.posterMesh = new THREE.Mesh(
        this.posterGeometry,
        this.posterMaterial
      );
      this.scene.add(this.posterMesh);

      //! positioning MODELS BASED ON USER DEVICE

      if (this.mobileDeivce) {
        this.object.scene.scale.set(0.6, 0.6, 0.6);
        this.object.scene.position.set(0, 0.3, 0);
        this.flagMesh.scale.set(0.8, 0.8, 0.8);
        this.flagMesh.position.y = -this.objectDistance * 0.9;
        this.posterMesh.scale.set(0.7, 0.7, 0.7);
        this.posterMesh.position.y = -this.objectDistance * 1.9;
      } else {
        this.object.scene.scale.set(0.8, 0.8, 0.8);
        this.object.scene.position.set(2, -0.3, 0);
        this.flagMesh.position.x = -2;
        this.flagMesh.position.y = -this.objectDistance * 1;
        this.posterMesh.position.y = -this.objectDistance * 2;
        this.posterMesh.position.x = 2;
      }

      //? EVENT LISTENERS

      window.addEventListener("scroll", (e) => {
        this.scrollY = window.scrollY;
      });

      this.nav.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("about")) {
          gsap.to(window, {
            duration: 2,
            scrollTo: `#${e.target.getAttribute("section")}`,
          });
        }
        //? investors
        if (e.target.classList.contains("investors")) {
          gsap.to(window, {
            duration: 3,
            scrollTo: `#${e.target.getAttribute("section")}`,
          });
        }
        //? logo
        if (e.target.classList.contains("logo")) {
          gsap.to(window, {
            duration: 3,
            scrollTo: `#${e.target.getAttribute("section")}`,
          });
        }
      });
    });
  }

  #setUpParallaxMovement() {
    window.addEventListener("mousemove", (event) => {
      this.cursor.x = event.clientX / this.sizes.width - 0.5;
      this.cursor.y = event.clientY / this.sizes.height - 0.5;
    });
  }

  setBackgroundColor(pallete, time) {
    gsap.to(this.plane.material.uniforms.uColor.value[0], {
      duration: time,
      r: pallete[0].r,
      g: pallete[0].g,
      b: pallete[0].b,
    });
    gsap.to(this.plane.material.uniforms.uColor.value[1], {
      duration: time,
      r: pallete[1].r,
      g: pallete[1].g,
      b: pallete[1].b,
    });
    gsap.to(this.plane.material.uniforms.uColor.value[2], {
      duration: time,
      r: pallete[2].r,
      g: pallete[2].g,
      b: pallete[2].b,
    });
    gsap.to(this.plane.material.uniforms.uColor.value[3], {
      duration: time,
      r: pallete[3].r,
      g: pallete[3].g,
      b: pallete[3].b,
    });
    gsap.to(this.plane.material.uniforms.uColor.value[4], {
      duration: time,
      r: pallete[4].r,
      g: pallete[4].g,
      b: pallete[4].b,
    });
  }

  update() {
    this.partShade.update();

    //? give parallax movement
    this.parallaxX = this.cursor.x * 0.5;
    this.parallaxY = this.cursor.y * 0.5;

    if (this.object) {
      // this.flagMaterial.uniforms.time.value =
      //   this.partShade.elapsedTime * 0.000015;

      // this.posterMaterial.uniforms.time.value =
      //   this.partShade.elapsedTime * 0.000015;

      this.camera.position.y =
        (-this.scrollY / this.sizes.height) * this.objectDistance;

      this.object.scene.rotation.y += Math.sin(0.025) * 0.65;

      this.object.scene.rotation.x -=
        (-this.parallaxY + this.object.scene.rotation.x) * 0.1;

      // //?
      // this.posterMesh.rotation.y -= Math.sin(0.025) * 0.65;
      // this.posterMesh.rotation.x -=
      //   (-this.parallaxY + this.posterMesh.rotation.x) * 0.1;

      // //? flag follow cursor
      // this.flagMesh.rotation.y -=
      //   (-this.parallaxX + this.flagMesh.rotation.y) * 0.1;

      // this.flagMesh.rotation.x -=
      //   (-this.parallaxY + this.flagMesh.rotation.x) * 0.1;
    }
  }
}
