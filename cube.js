import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
window.addEventListener('resize',resize)
window.addEventListener('mousemove',hover)

function resize()
{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
};

//creating scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xecffdc);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// scene.receiveShadow = true;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;


scene.add(new THREE.AmbientLight(0xffffff,0.5))

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let activePlane = null;
let planes = [];

// creating a plane to show shadow
const plane = new THREE.Mesh(new THREE.PlaneGeometry(30,30,20),new THREE.MeshPhongMaterial({color:0xc1e1c1,side:THREE.DoubleSide}))
plane.receiveShadow = true;
plane.rotation.x=-Math.PI/2
scene.add(plane)
plane.position.y = -2.7;

// creating cube
const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(5,5,5),new THREE.MeshPhongMaterial({color:0x00ff00,side:THREE.DoubleSide}))
plane1.castShadow = true;
plane1.rotation.x=-Math.PI/2
plane1.position.y = -2.5; 
planes.push(plane1)
scene.add(plane1)

const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(5,5,5),new THREE.MeshPhongMaterial({color:0x00ff00,side:THREE.DoubleSide}))
plane2.castShadow = true;
plane2.position.z = 2.5;
planes.push(plane2)
scene.add(plane2)

const plane3 = new THREE.Mesh(new THREE.PlaneGeometry(5,5,5),new THREE.MeshPhongMaterial({color:0x00ff00,side:THREE.DoubleSide}))
plane3.castShadow = true;
plane3.position.z = -2.5;
planes.push(plane3)
scene.add(plane3)

const plane4 = new THREE.Mesh(new THREE.PlaneGeometry(5,5,5),new THREE.MeshPhongMaterial({color:0x00ff00,side:THREE.DoubleSide}))
plane4.castShadow = true;
plane4.rotation.y=-Math.PI/2
plane4.position.x = -2.5;
planes.push(plane4)
scene.add(plane4)

const plane5 = new THREE.Mesh(new THREE.PlaneGeometry(5,5,5),new THREE.MeshPhongMaterial({color:0x00ff00,side:THREE.DoubleSide}))
plane5.castShadow = true;
plane5.rotation.y=Math.PI/2
plane5.position.x = 2.5;
planes.push(plane5)
scene.add(plane5)

const plane6 = new THREE.Mesh(new THREE.PlaneGeometry(5,5,5),new THREE.MeshPhongMaterial({color:0x00ff00,side:THREE.DoubleSide}))
plane6.castShadow = true;
plane6.rotation.x=-Math.PI/2
plane6.position.y = 2.5;
planes.push(plane6)
scene.add(plane6)

// lighting
const directionalLight = new THREE.DirectionalLight(0x00ff00,0.95);
directionalLight.position.x += 20;
directionalLight.position.y += 20;
directionalLight.position.z += 20;
directionalLight.castShadow=true;
// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))
scene.add(directionalLight);

// hovering
function hover(e){
    mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (e.clientY / renderer.domElement.clientHeight) * 2 + 1;
  
    if(activePlane){
      activePlane.material.color.setHex(0x00ff00)
      activePlane.material.needsUpdate = true;
      activePlane=null;
    }
    raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children);
    for  (var i=0; i<7; i++){
          if (intersects.length > 0 && intersects[0].object != plane) {
              activePlane = intersects[0].object;
              activePlane.material.color.setHex(0x097969) ;
              activePlane.material.needsUpdate = true;
          }
    }
  }
camera.position.z = 10;
const controls = new OrbitControls(camera, renderer.domElement);
var animate = function () {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}


document.body.appendChild(renderer.domElement);
animate();
