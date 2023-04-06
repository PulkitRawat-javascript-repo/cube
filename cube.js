import * as THREE from 'three'
// import { BufferGeometry } from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { STLloader } from 'three/addons/loaders/STLLoader.js';
window.addEventListener('resize',function()
{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xecffdc);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// scene.receiveShadow = true;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;


scene.add(new THREE.AmbientLight(0xffffff,0.5))

const plane = new THREE.Mesh(new THREE.PlaneGeometry(30,30,20),new THREE.MeshPhongMaterial({color:0xc1e1c1}))
plane.receiveShadow = true;
plane.rotation.x=-Math.PI/2
scene.add(plane)
plane.position.y = -1.5



const directionalLight = new THREE.DirectionalLight(0x00ff00,0.9);
directionalLight.position.x += 20;
directionalLight.position.y += 20;
directionalLight.position.z += 20;

directionalLight.castShadow=true;
// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))
scene.add(directionalLight);

camera.position.z = 10;
const controls = new OrbitControls(camera, renderer.domElement);
var animate = function () {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}


document.body.appendChild(renderer.domElement);
animate();
