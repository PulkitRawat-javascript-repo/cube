import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
            
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement); 
			
            window.addEventListener('resize',function()
            {
                renderer.setSize(window.innerWidth,window.innerHeight);
                camera.aspect = window.innerWidth/window.innerHeight;
                camera.updateProjectionMatrix();
            });
            
			const orbit = new OrbitControls(camera, renderer.domElement);
            // Orbit controls allow the camera to orbit around a target.
			camera.position.set(0,0,5);	
            // the starting position of camera

			orbit.update();
			
			const boxGeometry = new THREE.BoxGeometry(3,3,3);

            var cubeMaterial = 
            [
                new THREE.MeshBasicMaterial({color:0x00FF00,side:THREE.DoubleSide}), //right
                new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}), //left
                new THREE.MeshBasicMaterial({color:0x00ffff,side:THREE.DoubleSide}), //top
                new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}), //bottom
                new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}), //front
                new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide})  //back
            ];

		    // const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
		    const boxMaterial = new THREE.MeshFaceMaterial(cubeMaterial)
			const box = new THREE.Mesh(boxGeometry, boxMaterial);
			scene.add(box);
            
            // console.log(box.geometry.faces[ 3 ])
            // box.geometry.faces[ 3 ].color.setHex( 0x00ffff );  
            // box.geometry.colorsNeedUpdate = true;
		
			function animate(){
				
				renderer.render(scene, camera);

			}

			renderer.setAnimationLoop(animate);
            console.log(boxGeometry.faces.length); 