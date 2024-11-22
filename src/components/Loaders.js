import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export const setupLoaders = () => {
    const gltfLoader = new GLTFLoader();
    const rgbeLoader = new RGBELoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    return { gltfLoader, rgbeLoader };
};

export const loadModel = (gltfLoader, scene, bakedMaterial) => {
    gltfLoader.load('/models/FlightHelmet/glTF/Model.gltf', (gltf) => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              
            }
        });
        scene.add(gltf.scene);
    });
};
