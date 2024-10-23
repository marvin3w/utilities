const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 65, 80);
camera.lookAt(scene.position);
controls.update();

const atomicNumber = 6;
const neutrons = 6;
const electronShells = [2, 4];

const nucleusRadius = 3; // Aumentado o raio do núcleo
const shellScaleFactor = 4; // Aumentado o fator de escala para as camadas eletrônicas

// Iluminação
const ambientLight = new THREE.AmbientLight(0x404040, 0.7); // Aumentado a intensidade da luz ambiente
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6); // Reduzida a intensidade da luz direcional
directionalLight.position.set(50, 50, 50);
directionalLight.castShadow = true;

// Ajustes para suavizar as sombras
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.camera.near = 10;
directionalLight.shadow.camera.far = 200;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.radius = 4;

scene.add(directionalLight);

// Materiais com opacidade ajustada
const protonMaterial = new THREE.MeshPhongMaterial({
  color: 0xffcf66,
  emissive: 0xffcfdd,
  emissiveIntensity: 0.1,
  shininess: 100,
  transparent: true,
  opacity: 0.9 // Ajuste este valor para controlar a opacidade geral
});

const neutronMaterial = new THREE.MeshPhongMaterial({
  color: 0xff6666,
  emissive: 0xff6666,
  emissiveIntensity: 0.1,
  shininess: 100,
  transparent: true,
  opacity: 0.9 // Ajuste este valor para controlar a opacidade geral
});

const electronMaterial = new THREE.MeshPhongMaterial({
  color: 0x6ab8df,
  emissive: 0x6ab8df,
  emissiveIntensity: 0.2,
  shininess: 100,
  transparent: true,
  opacity: 0.8 // Ajuste este valor para controlar a opacidade geral
});

const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

const nucleusGroup = new THREE.Group();

// Ajuste o tamanho e posicionamento dos prótons e nêutrons
for (let i = 0; i < atomicNumber; i++) {
  const proton = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 38, 38), // Aumentado o tamanho do próton
    protonMaterial
  );
  proton.castShadow = true;
  proton.receiveShadow = true;
  let position;
  do {
    position = new THREE.Vector3(
      (Math.random() - 0.5) * nucleusRadius,
      (Math.random() - 0.5) * nucleusRadius,
      (Math.random() - 0.5) * nucleusRadius
    );
  } while (nucleusGroup.children.some(child => 
    child.position.distanceTo(position) < 1.8)); // Evita sobreposição excessiva
  proton.position.copy(position);
  nucleusGroup.add(proton);
}

for (let i = 0; i < neutrons; i++) {
  const neutron = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 38, 38), // Aumentado o tamanho do nêutron
    neutronMaterial
  );
  neutron.castShadow = true;
  neutron.receiveShadow = true;
  let position;
  do {
    position = new THREE.Vector3(
      (Math.random() - 0.5) * nucleusRadius,
      (Math.random() - 0.5) * nucleusRadius,
      (Math.random() - 0.5) * nucleusRadius
    );
  } while (nucleusGroup.children.some(child => 
    child.position.distanceTo(position) < 1.5)); // Evita sobreposição excessiva
  neutron.position.copy(position);
  nucleusGroup.add(neutron);
}

scene.add(nucleusGroup);

function createOrbit(radius) {
  const curve = new THREE.EllipseCurve(
    0, 0, // ax, ay
    radius, radius, // xRadius, yRadius
    0, 2 * Math.PI, // StartAngle, EndAngle
    false, // Clockwise
    0 // Rotation
  );
  
  const points = curve.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  const orbit = new THREE.Line(geometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2; // Ajusta a órbita para ficar no plano correto
  return orbit;
}

const electronGroup = new THREE.Group();

electronShells.forEach((numElectrons, shellIndex) => {
  const radius = (shellIndex + 1) * shellScaleFactor * nucleusRadius;

  // Cria órbita
  const orbit = createOrbit(radius);
  scene.add(orbit);

  for (let i = 0; i < numElectrons; i++) {
    const theta = (i / numElectrons) * Math.PI * 2;
    const electron = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32), // Aumentado o tamanho do elétron
      electronMaterial
    );
    electron.castShadow = true;
    electron.position.set(
      radius * Math.cos(theta),
      0,
      radius * Math.sin(theta)
    );
    electronGroup.add(electron);
  }
});

scene.add(electronGroup);

function animate() {
  requestAnimationFrame(animate);

  // Rotaciona núcleo e elétrons para um efeito dinâmico
  nucleusGroup.rotation.y += 0.01;
  electronGroup.rotation.y += 0.02;

  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
