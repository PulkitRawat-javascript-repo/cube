import * as THREE from 'three'

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

// var objects = [];

// var geometry = new THREE.BoxGeometry(5, 5, 5);

// var materials = new THREE.MeshPhongMaterial({color: 0x00ff00, vertexColors:true })

//   var materials = 
//             [
//                 new THREE.MeshPhongMaterial({color:0x00FF00,side:THREE.DoubleSide,vertexColors:true}), //right
//                 new THREE.MeshPhongMaterial({color:0x00FF00,side:THREE.DoubleSide,vertexColors:true}), //left
//                 new THREE.MeshPhongMaterial({color:0x00FF00,side:THREE.DoubleSide,vertexColors:true}), //top
//                 new THREE.MeshPhongMaterial({color:0x00FF00,side:THREE.DoubleSide,vertexColors:true}), //bottom
//                 new THREE.MeshPhongMaterial({color:0x00FF00,side:THREE.DoubleSide,vertexColors:true}), //front
//                 new THREE.MeshPhongMaterial({color:0x00FF00,side:THREE.DoubleSide,vertexColors:true})  //back
//             ];

var geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,  
    1.0, 1.0, 1.0, //front
    -1.0, 1.0, 1.0,

    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0, // back
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,

    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, //top
    1.0, 1.0, -1.0,

    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,//bottom
    1.0, -1.0, 1.0, 
    1.0, -1.0, -1.0,

   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0,  1.0,//right
   1.0, -1.0,  1.0,

  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,//left
  -1.0,  1.0, -1.0,
])

const connects = [
    //front face
    0, 1, 2,
    0, 2, 3,
    
  
    // Back face
    4, 5, 6,
    4, 6, 7,
  
    // Top face
    8, 9, 10,
    8, 10, 11,
  
    // Bottom face
    12, 13, 14,
    12, 14, 15,
  
    // Right face
    16, 17, 18,
    16, 18, 19,
  
    // Left face
    20, 21, 22,
    20, 22, 23,
]

// const uv = new Float32Array([
//     0, 5,
//     1, 0,
//     1, 1,
//     0, 1
//   ])
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) )
// geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));

geometry.setIndex(new THREE.Uint16BufferAttribute(connects,1));
var materials = new THREE.MeshBasicMaterial({color:0x00ff00, side:THREE.DoubleSide});
var cube = new THREE.Mesh(geometry, materials);



cube.receiveShadow = true;
cube.castShadow = true;

scene.add(cube);
// objects[0] = cube;
camera.position.z = 5;

const directionalLight = new THREE.DirectionalLight(0x00ff00,0.9);
directionalLight.position.x += 20;
directionalLight.position.y += 20;
directionalLight.position.z += 20;

directionalLight.castShadow=true;
// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))
scene.add(directionalLight);

// console.log(cube)
const controls = new OrbitControls(camera, renderer.domElement);
// document.addEventListener('mousemove', MouseMove);

// let mouse = new THREE.Vector2();

var animate = function () {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}



function MouseMove(e) {
    e.preventDefault();

    // let pointArr = [];

    mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (e.clientY / renderer.domElement.clientHeight) * 2 + 1;

    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    let intersects = raycaster.intersectObjects(objects);
    // if ( intersects.length > 0 )
    // {
    //     var faceIndex = intersects[0].faceIndex;
    //     var obj = intersects[0].object;
    //     var geom = obj.geometry;
    //     var faces = obj.geometry.faces;
    //     var facesIndices = ["a","b","c"];
    //     facesIndices.forEach(function(indices){
    //         geom.vertices[faces[faceIndex][indices]].setZ(-10);
    //     });
    //     if(faceIndex%2 == 0){
    //         faceIndex = faceIndex+1;
    //     }
    //     else{
    //         faceIndex = faceIndex-1;
    //     }
    // }
    

    if (intersects.length > 0) {

        let close = [];
        for (let i = 0; i < intersects[0].object.geometry.vertices.length; i++) {
            let dist = intersects[0].point.distanceTo(intersects[0].object.geometry.vertices[i]);
            let obj = {
                index: i,
                dist: dist
            }
            close.push(obj);
        }
        close.sort(n);

        let facesArr = [];
        for (let i = 0; i < intersects[0].object.geometry.faces.length; i++) {
            let point = intersects[0].object.geometry.vertices[close[0].index];

            let a = intersects[0].object.geometry.faces[i].a;
            let b = intersects[0].object.geometry.faces[i].b;
            let c = intersects[0].object.geometry.faces[i].c;
            if (point.equals(intersects[0].object.geometry.vertices[a]) || point.equals(intersects[0].object.geometry.vertices[b]) || point.equals(intersects[0].object.geometry.vertices[c])) {
                facesArr.push(i);
            }
        }

        let centroids = [];

        for (let i = 0; i < facesArr.length; i++) {
            let a = intersects[0].object.geometry.faces[facesArr[i]].a;
            let b = intersects[0].object.geometry.faces[facesArr[i]].b;
            let c = intersects[0].object.geometry.faces[facesArr[i]].c;

            let vA = intersects[0].object.geometry.vertices[a];
            let vB = intersects[0].object.geometry.vertices[b];
            let vC = intersects[0].object.geometry.vertices[c];

            let meanX = (vA.x + vB.x + vC.x) / 3;
            let meanY = (vA.y + vB.y + vC.y) / 3;
            let meanZ = (vA.z + vB.z + vC.z) / 3;

            let v = new THREE.Vector3(meanX, meanY, meanZ);

            let vObj = {
                index: facesArr[i],
                v: v
            }

            centroids.push(vObj);
        }


        let closeCentroids = [];
        for (let i = 0; i < centroids.length; i++) {
            let dist = intersects[0].point.distanceTo(centroids[i].v);
            let obj = {
                index: i,
                dist: dist
            }
            closeCentroids.push(obj);
        }
        closeCentroids.sort(n);


        // scene.remove(cube);

        // console.log(closeCentroids[0]);
        // //intersects[0].object.geometry.faces[centroids[closeCentroids[0].index].index].color.setHex( 0xffffff);
        // intersects[0].object.geometry.faces[centroids[closeCentroids[0].index].index].materialIndex = 1;
        // intersects[0].object.geometry.colorsNeedUpdate = true;

        // var geometry = new THREE.BoxGeometry(5, 5, 5);

        // var materials = [
        //     new THREE.MeshBasicMaterial({ color: new THREE.Color("rgb(120,0,0)"), vertexColors: THREE.VertexColors, side: THREE.DoubleSide }),

        //     new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.75, vertexColors: THREE.VertexColors, side: THREE.DoubleSide })
        // ]; // the two materials 
        for (var i = 0; i < geometry.faces.length; i++) {
            // var j=0;
            // if (i%2==0){
            //     j = 2*i-(i-1);
            // }
            // else{
            //     j = i-1; 
            // }
          
            if (i == centroids[closeCentroids[0].index].index) {
                // intersects[i].face.color.setHex(0x4f7942);
                // intersects[ i ].object.material.color.set( 0x4f7942);
                geometry.faces[ i ].color.setHex( 0x097969);
                
            }
            // if (i == centroids[closeCentroids[0].index].index && i%2==0) {
                
            //     geometry.faces[ i+1 ].color.setHex( 0x097969)
            // }
            else{
                // intersects[i].face.color.setHex(0x00ff00);
                // intersects[ i ].object.material.color.set(0x00ff00);
                geometry.faces[ i ].color.setHex( 0x00ff00);
            }
            geometry.colorsNeedUpdate = true
        // }
        // for (var i = 0; i < geometry.faces.length-11; i++) {
        //     if (i == centroids[closeCentroids[0].index].index) {
        // }

          
        // cube = new THREE.Mesh(geometry, materials); //tell three.js that you will have several materials in your geometry

        // scene.add(cube);

        // var dotGeometry = new THREE.Geometry();
        // dotGeometry.vertices.push(centroids[closeCentroids[0].index].v);
        // var dotMaterial = new THREE.PointsMaterial({
        // size: 10,
        // sizeAttenuation: false
        // });
        // var dot = new THREE.Points(dotGeometry, dotMaterial);
        // scene.add(dot);

        }
    }


    // function n(a, b) {
    // return a.dist - b.dist;
    // }
}
document.body.appendChild(renderer.domElement);
animate();
