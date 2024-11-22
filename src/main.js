import './style.css';
import { createScene } from './components/Scene';
import { setupCamera } from './components/Camera';
import { setupControls } from './components/Controls';
import { setupRenderer } from './components/Renderer';
import { setupLights } from './components/Lights';
import { setupLoaders, loadModel } from './components/Loaders';
import * as THREE from 'three';
import GUI from 'lil-gui';

const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Scene
const scene = createScene();

// GUI
const gui = new GUI();

// Camera
const camera = setupCamera(sizes);
scene.add(camera);

// Controls
const controls = setupControls(camera, canvas);

// Renderer
const renderer = setupRenderer(canvas, sizes, gui);

// Lights
setupLights(scene, gui);

// Loaders and models
const { gltfLoader, rgbeLoader } = setupLoaders();

// Load environment map
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
});

// Load textures
const textureLoader = new THREE.TextureLoader();
const bakedTexture = textureLoader.load('/models/FlightHelmet/glTF/ground baked.jpg');
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

// Load the model
loadModel(gltfLoader, scene, bakedMaterial);

// Resize handler
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

tick();
