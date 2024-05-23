import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const color = 0xFF0000;
const light = new THREE.DirectionalLight(color, 2);
const light2 = new THREE.DirectionalLight(0x8b00ff, 2);
light.position.set(1, 0, 1);
light.position.set(0, 1, 1);
scene.add(light);
scene.add(light2);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xaaaaaa);

camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);

const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "SpaceStation.glb",
  function (gltf) {
    console.log(gltf);
    controls.update();
    const object = gltf.scene;
    const door = object.getObjectByName("Plane002");
    const cubeNames = [
      "Cube021",
      "Cube022",
      "Cube023",
      "Cube027",
      "Cube028",
      "Cube029",
      "Cube033",
      "Cube034",
      "Cube035",
    ];
    let direction = 1;
    let directionDoor = 1;
    const cubes = cubeNames.map((name) => object.getObjectByName(name));

    scene.add(object);
    object.position.set(-4, -8, -6);
    object.scale.set(0.2, 0.2, 0.2);

    function animate() {
      requestAnimationFrame(animate);
      object.rotation.y = 210;
      if (door.rotation.y >= 1.3) {
        directionDoor = 1;
      } else if (door.rotation.y <= -0.2) {
        directionDoor = -1;
      }

      door.position.x += 0.0045 * directionDoor;
      door.position.z -= 0.0025 * directionDoor;
      door.rotation.y -= 0.02 * directionDoor;

      cubes.forEach((cube) => {
        if (cube.rotation.x >= 2) {
          direction = -1;
        } else if (cube.rotation.x <= 0.7) {
          direction = 1;
        }

        cube.rotation.x += 0.01 * direction;
      });

      renderer.render(scene, camera);
    }

    animate();
  },
  undefined,
  function (error) {
    console.error("Произошла ошибка при загрузке GLB файла", error);
  }
);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
