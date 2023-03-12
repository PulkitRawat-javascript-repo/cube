import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

            
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement); 
			
            var mouse = new THREE.Vector2();
            var raycaster = new THREE.Raycaster();

            window.addEventListener( 'pointermove', onPointerMove,false);
            window.addEventListener('resize',function()
            {
                renderer.setSize(window.innerWidth,window.innerHeight);
                camera.aspect = window.innerWidth/window.innerHeight;
                camera.updateProjectionMatrix();
            });

            function onPointerMove( event ) {
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            }    
            
            // function onPointerMove(event) {
            //     const rect = renderer.domElement.getBoundingClientRect();
            
            //     mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
            //     mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
            // }
            
			const orbit = new OrbitControls(camera, renderer.domElement);
            // Orbit controls allow the camera to orbit around a target.
			camera.position.set(0,0,5);	
            // the starting position of camera

			orbit.update();
			
			const boxGeometry = new THREE.BoxGeometry(3,3,3);

            // var cubeMaterial = 
            // [
            //     new THREE.MeshBasicMaterial({color:0x00FF00,side:THREE.DoubleSide}), //right
            //     new THREE.MeshBasicMaterial({color:0x00FF00,side:THREE.DoubleSide}), //left
            //     new THREE.MeshBasicMaterial({color:0x00FF00,side:THREE.DoubleSide}), //top
            //     new THREE.MeshBasicMaterial({color:0x00FF00,side:THREE.DoubleSide}), //bottom
            //     new THREE.MeshBasicMaterial({color:0x00FF00,side:THREE.DoubleSide}), //front
            //     new THREE.MeshBasicMaterial({color:0x00FF00,side:THREE.DoubleSide})  //back
            // ];

		    const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
		    // const boxMaterial = new THREE.MeshFaceMaterial(cubeMaterial)
			const box = new THREE.Mesh(boxGeometry, boxMaterial);
			scene.add(box);
           
            // function selection(){
            //     raycaster.setFromCamera(mouse,camera);
            //     const intersects = raycaster.intersectObjects(scene.children);
            //     for (let i=0;i<intersects.length;i++){
            //         intersects[ i ].object.material.color.set( 0xff0000 );
            //     }
            // }

			function animate(){
				// selection();
				renderer.render(scene, camera);
                requestAnimationFrame(animate);
			}
           
			renderer.setAnimationLoop(animate);
            console.log(boxGeometry.faces.length); 