import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import * as THREE from 'three';

export const setupLoaders = () => {
    const gltfLoader = new GLTFLoader();
    const rgbeLoader = new RGBELoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    return { gltfLoader, rgbeLoader };
};

export const loadModel = (gltfLoader, scene) => {
    return new Promise((resolve, reject) => {
        gltfLoader.load(
            '/models/RideauMetallique/text.gltf',
            (gltf) => {
                let mixer = null;

                // If the model has animations
                if (gltf.animations.length > 0) {
                    mixer = new THREE.AnimationMixer(gltf.scene);
                    const action = mixer.clipAction(gltf.animations[0]);
                    action.play();
                }

                // Traverse model to configure settings
                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        // Add emissive material to specific meshes
                        if (child.name === 'Light_Baked') {
                            child.material = new THREE.MeshStandardMaterial({
                            
                                emissive: new THREE.Color(0xfffff), // Emission color (yellow-orange)
                                emissiveIntensity: 8, // Adjust emission intensity
                            });
                        }
                    }
                });

                scene.add(gltf.scene);
                console.log(gltf.scene);
                resolve({ model: gltf.scene, animationMixer: mixer });
            },
            undefined,
            (error) => {
                console.error('Error loading the model:', error);
                reject(error);
            }
        );
    });
};
