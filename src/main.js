import './style.css';
import { createScene } from './components/Scene';
import { setupCamera } from './components/Camera';
import { setupControls } from './components/Controls';
import { setupRenderer } from './components/Renderer';
import { setupLights } from './components/Lights';
import { setupLoaders, loadModel } from './components/Loaders';
import * as THREE from 'three';
import GUI from 'lil-gui';

// Canvas and Sizes
const canvas = document.querySelector('canvas.webgl');
const sizes = { width: window.innerWidth, height: window.innerHeight };

// Scene and Environment
const scene = createScene();
const gui = new GUI();

// Camera
const camera = setupCamera(sizes);
scene.add(camera);

// Controls
const controls = setupControls(camera, canvas);

// Renderer
const renderer = setupRenderer(canvas, sizes, gui);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Lights
const light = setupLights(scene, gui);

// Loaders and Environment Map
const { gltfLoader, rgbeLoader } = setupLoaders();
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();


// Load Environment Map
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = new THREE.Color("#F4D8FF");
    
    scene.environment = environmentMap;
});



// Rotation State
let isRotating = false;
let rotatingObject = null;
let mixer = null; // Animation Mixer for Models
let isMixerPlaying = true; // State for controlling animation playback

// Load Model
loadModel(gltfLoader, scene, light).then(({ model, animationMixer }) => {
    rotatingObject = model;
    mixer = animationMixer;
});

// Resize Event Listener
const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
window.addEventListener('resize', handleResize);

// Camera and Rotation Controls
const cameraPositionElement = document.getElementById('camera-position');
const cameraTargetElement = document.getElementById('camera-target');
const rotateButton = document.getElementById('rotate-button');

// Toggle Rotation
rotateButton.addEventListener('click', () => {
    isRotating = !isRotating;
    rotateButton.textContent = isRotating ? 'Stop Rotation' : 'Start Rotation';
});

// Animation Mixer Control
const animationButton = document.getElementById('animation-button');
animationButton.addEventListener('click', () => {
    if (mixer) {
        isMixerPlaying = !isMixerPlaying;
        animationButton.textContent = isMixerPlaying ? 'Stop Animation' : 'Start Animation';

        if (isMixerPlaying) {
            mixer.timeScale = 1; // Resume animation
        } else {
            mixer.timeScale = 0; // Pause animation
        }
    }
});

// Animation Loop
const clock = new THREE.Clock();
const tick = () => {
    const deltaTime = clock.getDelta();

    // Update animations if playing
    if (mixer && isMixerPlaying) {
        mixer.update(deltaTime);
    }

    // Rotate the model if enabled
    if (isRotating && rotatingObject) {
        rotatingObject.rotation.y += 0.01; // Adjust rotation speed
    }

    // Update controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);

    // Update camera position and target information
    const cameraPosition = camera.position;
    const targetPosition = controls.target;
    cameraPositionElement.textContent = `x: ${cameraPosition.x.toFixed(2)}, y: ${cameraPosition.y.toFixed(2)}, z: ${cameraPosition.z.toFixed(2)}`;
    cameraTargetElement.textContent = `x: ${targetPosition.x.toFixed(2)}, y: ${targetPosition.y.toFixed(2)}, z: ${targetPosition.z.toFixed(2)}`;

    // Request the next frame
    requestAnimationFrame(tick);
};

// Start the animation loop
tick();
