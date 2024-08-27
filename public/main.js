 import * as THREE from 'three';
 import { OBJLoader } from 'three_OBJ';
 import { OrbitControls } from 'three_OrbitControl';
 import { MTLLoader } from 'three_MTLLoader';
 import { VRButton } from 'three_VRButton'
 import {XRControllerModelFactory} from "three_xr"
 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-1, -1, -1).normalize();
scene.add(directionalLight2);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 1000;

const mtlLoader = new MTLLoader();
mtlLoader.setPath('Objekt/'); 
mtlLoader.load('test.mtl', (materials) => {
    materials.preload();

    for (const material in materials.materials) {
        materials.materials[material].side = THREE.DoubleSide;
    }

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials); 
    objLoader.setPath('Objekt/'); 
    objLoader.load('test.obj', (object) => {
        console.log('OBJ loaded successfully');
        scene.add(object);
    }, 
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('An error happened', error);
    });
}, 
(error) => {
    console.error('An error happened loading MTL', error);
});

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const controller1 = renderer.xr.getController(0);
const controller2 = renderer.xr.getController(1);
scene.add(controller1);
scene.add(controller2);

const controllerModelFactory = new XRControllerModelFactory();
const controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
scene.add(controllerGrip1);

const controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
scene.add(controllerGrip2);

const moveSpeed = 0.1;
const move = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

function onKeyDown(event) {
    switch (event.keyCode) {
        case 38: 
        case 87: 
            move.forward = true;
            break;
        case 37: 
        case 65: 
            move.left = true;
            break;
        case 40: 
        case 83: 
            move.backward = true;
            break;
        case 39: 
        case 68: 
            move.right = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.keyCode) {
        case 38: 
        case 87: 
            move.forward = false;
            break;
        case 37: 
        case 65: 
            move.left = false;
            break;
        case 40: 
        case 83: 
            move.backward = false;
            break;
        case 39: 
        case 68: 
            move.right = false;
            break;
    }
}

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    if (move.forward) camera.position.z -= moveSpeed;
    if (move.backward) camera.position.z += moveSpeed;
    if (move.left) camera.position.x -= moveSpeed;
    if (move.right) camera.position.x += moveSpeed;

    renderer.render(scene, camera);
}

document.body.appendChild(VRButton.createButton(renderer));

animate();
 