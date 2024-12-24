import * as THREE from 'three';

export const setupLights = (scene, gui) => {
    // Create Ambient Light for base illumination
    const ambientLight = new THREE.AmbientLight('#ffffff', 3); // Soft white light
    scene.add(ambientLight);

    // GUI controls for ambient light
    gui.add(ambientLight, 'intensity').min(0).max(10).step(0.01).name('Ambient Intensity');

    // Create DirectionalLight for sunlight
    const sunlight = new THREE.DirectionalLight('#ffffff', 3);
    sunlight.position.set(-8, 5.3, 1.8);
    sunlight.castShadow = true;

    // Configure shadow properties for sunlight
    sunlight.shadow.mapSize.set(8192, 8192); // High resolution for sharp shadows
    sunlight.shadow.camera.near = 0.5; // Near clipping plane
    sunlight.shadow.camera.far = 50; // Far clipping plane
    sunlight.shadow.camera.left = -10;
    sunlight.shadow.camera.right = 10;
    sunlight.shadow.camera.top = 10;
    sunlight.shadow.camera.bottom = -10;
    sunlight.shadow.bias = -0.0001;
    sunlight.shadow.normalBias = 0.05;

    // Add sunlight to the scene
    scene.add(sunlight);

    // Add helpers for sunlight position
    const sunlightHelper = new THREE.DirectionalLightHelper(sunlight, 1);
    scene.add(sunlightHelper);

    // Shadow camera helper
    const shadowCameraHelper = new THREE.CameraHelper(sunlight.shadow.camera);
    scene.add(shadowCameraHelper);

    // GUI controls for sunlight
    gui.add(sunlight, 'intensity').min(0).max(10).step(0.01).name('Sun Intensity');
    gui.add(sunlight.position, 'x').min(-20).max(20).step(0.1).name('Sun Position X');
    gui.add(sunlight.position, 'y').min(-20).max(20).step(0.1).name('Sun Position Y');
    gui.add(sunlight.position, 'z').min(-20).max(20).step(0.1).name('Sun Position Z');

    gui.add(sunlight, 'castShadow').name('Enable Shadows');
    gui.add(sunlight.shadow, 'bias').min(-0.01).max(0.01).step(0.0001).name('Shadow Bias');
    gui.add(sunlight.shadow, 'normalBias').min(-0.05).max(0.05).step(0.0001).name('Normal Bias');

    // GUI toggle for sunlightHelper visibility
    const sunlightHelperConfig = { visible: true };
    gui.add(sunlightHelperConfig, 'visible').name('Show Sun Helper').onChange((value) => {
        sunlightHelper.visible = value;
    });

    // GUI toggle for shadowCameraHelper visibility
    const shadowHelperConfig = { visible: true };
    gui.add(shadowHelperConfig, 'visible').name('Show Shadow Helper').onChange((value) => {
        shadowCameraHelper.visible = value;
    });
};
