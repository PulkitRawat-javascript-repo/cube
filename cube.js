import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
            


			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement); 
			
            const axeshelper = new THREE.AxesHelper(5);
			scene.add(axeshelper);

			const orbit = new OrbitControls(camera, renderer.domElement);

			camera.position.set(0,2,5);	
			orbit.update();
			
			const boxGeometry = new THREE.BoxGeometry();
		    const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00} );
			const box = new THREE.Mesh(boxGeometry, boxMaterial);
			scene.add(box);

			box.rotation.x=3;
			box.rotation.y=3;

			function animate(){
				// box.rotation.y +=0.01;
				// box.rotation.x += 0.01;
				renderer.render(scene, camera);

			}

			renderer.setAnimationLoop(animate);
