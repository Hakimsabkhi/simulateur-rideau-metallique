import * as THREE from 'three';

export const setupCamera = (sizes) => {
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(4, 5, 4);
    return camera;
};
