import * as THREE from "three";

export const setupLights = (scene, gui) => {
  const directionalLight = new THREE.DirectionalLight("#ffffff", 6);
  directionalLight.position.set(-4, 6.5, 2.5);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.far = 15;
  directionalLight.shadow.normalBias = 0.027;
  directionalLight.shadow.bias = -0.004;
  directionalLight.shadow.mapSize.set(512, 512);

  // Add GUI controls
  gui
    .add(directionalLight, "intensity")
    .min(0)
    .max(10)
    .step(0.001)
    .name("lightIntensity");
  gui
    .add(directionalLight.position, "x")
    .min(-10)
    .max(10)
    .step(0.001)
    .name("lightX");
  gui
    .add(directionalLight.position, "y")
    .min(-10)
    .max(10)
    .step(0.001)
    .name("lightY");
  gui
    .add(directionalLight.position, "z")
    .min(-10)
    .max(10)
    .step(0.001)
    .name("lightZ");
  gui.add(directionalLight, "castShadow");
  gui
    .add(directionalLight.shadow, "normalBias")
    .min(-0.05)
    .max(0.05)
    .step(0.001);
  gui.add(directionalLight.shadow, "bias").min(-0.05).max(0.05).step(0.001);

  scene.add(directionalLight);

  return directionalLight;
};
