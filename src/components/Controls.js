import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const setupControls = (camera, canvas) => {
    const controls = new OrbitControls(camera, canvas);

    controls.target.set(0, 0.3, 0);

    // Enable damping for smoother controls
    controls.enableDamping = true;

    // Limit zooming
    controls.minDistance = 1; // Minimum distance from the target
    controls.maxDistance = 3; // Maximum distance from the target

    // Limit vertical rotation
    controls.minPolarAngle = Math.PI / 4; // 45 degrees
    controls.maxPolarAngle = Math.PI / 1.5; // ~120 degrees

    // Define pan limits
    const panLimits = {
        minX: -1,
        maxX: 1,
        minY: 0,
        maxY: 1,
        minZ: -1,
        maxZ: 1, 
    };

    // Custom panning logic: Override `controls.update` to apply pan limits
    const originalUpdate = controls.update.bind(controls);
    controls.update = () => {
        // Apply the original update logic
        originalUpdate();

        // Clamp the target position to pan limits
        const target = controls.target;
        target.x = THREE.MathUtils.clamp(target.x, panLimits.minX, panLimits.maxX);
        target.y = THREE.MathUtils.clamp(target.y, panLimits.minY, panLimits.maxY);
        target.z = THREE.MathUtils.clamp(target.z, panLimits.minZ, panLimits.maxZ);

        // Make sure the camera respects the updated target
        camera.lookAt(target);
    };

    return controls;
};
