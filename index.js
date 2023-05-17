import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const planeGeometry = new THREE.PlaneGeometry(200, 200); // Increase the dimensions
const planeMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);


plane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
plane.position.y = -10; // Move the plane down in the scene


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensity
scene.add(ambientLight);


const loader = new GLTFLoader();
loader.load('path/to/tree/model.glb', (gltf) => {
  const tree = gltf.scene;
  tree.position.set(10, 10, 10); // Set the position of the tree
  scene.add(tree);
});

// stool
const geometry1 = new THREE.BoxGeometry(15, 20, 20);
const material1 = new THREE.MeshBasicMaterial({ color: "red" });
const stool = new THREE.Mesh(geometry1, material1);
stool.position.set(-47, 1, -20);
scene.add(stool);

// stool1
const geometry2 = new THREE.BoxGeometry(15, 20, 20);
const material2 = new THREE.MeshBasicMaterial({ color: "purple" });
const stool1 = new THREE.Mesh(geometry2, material2);
stool1.position.set(38, 1, 55);
scene.add(stool1);

// stool2
const geometry3 = new THREE.BoxGeometry(15, 20, 20);
const material3 = new THREE.MeshBasicMaterial({ color: "blue" });
const stool2 = new THREE.Mesh(geometry3, material3); 
stool2.position.set(-85, 1, 55);
scene.add(stool2);

//table

const geometry4 = new THREE.CylinderGeometry(50, -50, 20);
const material4 = new THREE.MeshBasicMaterial({ color: "green" });
const table = new THREE.Mesh(geometry4, material4);
table.position.set(-25, 6, 40);
scene.add(table);

const controllers = new PointerLockControls( camera, document.body );
scene.add(controllers.getObject);

const movement = function(event){

  switch (event.keyCode){
    case 38:
      controllers.moveForward(1.5);
      break;
      case 40:
        controllers.moveForward(-1.5);
        break;
    case 37:
      controllers.moveRight(-1.5);
      break;
    case 39:
      controllers.moveRight(1,5);
      break;
  }
}

document.addEventListener("keydown",movement);

document.addEventListener("click",function(){
  controllers.lock();
});

controllers.addEventListener("lock",function(){
  controllers.enabled = true;
})


camera.position.set(50, 20, 100);
const controls = new OrbitControls(camera, renderer.domElement);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
movement();

