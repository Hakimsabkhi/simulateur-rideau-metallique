
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const setupControls = (camera, canvas) => {
    const controls = new OrbitControls(camera, canvas);

    // Initial target
    controls.target.set(0, 0.5, 0);

    // Enable damping for smooth interactions
    controls.enableDamping = true;

    // Limit zoom distance
    controls.minDistance = 1.5; // Minimum zoom
    controls.maxDistance = 3; // Maximum zoom

    // Limit vertical rotation (up/down)
    controls.minPolarAngle = Math.PI / 4; // 45 degrees
    controls.maxPolarAngle = Math.PI / 1.5; // 120 degrees

    return controls;
};
