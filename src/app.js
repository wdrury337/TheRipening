/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Clock } from 'objects';
import { PlayScene } from 'scenes';
import { Global } from './global';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Dice from './components/objects/Dice/Dice';

// Initialize core ThreeJS components
const loader = new GLTFLoader();
Global.loader = loader;

const camera = new PerspectiveCamera();
camera.position.set(0, 10, -70);
camera.lookAt(new Vector3(0, 0, 0));
Global.camera = camera;

const scene = new PlayScene();
Global.scene = scene;
const clock = new Clock(scene);
const cameraXY = Global.camera.position.clone().setY(0); 
clock.lookAt(cameraXY);
clock.rotateOnAxis(clock.up, Global.CLOCK_ROTATION_OFFSET);
Global.clock = clock;

Global.state = Global.START;

const renderer = new WebGLRenderer({ antialias: true });

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.maxPolarAngle = Math.PI/2.1;
controls.minPolarAngle = Math.PI/3;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    switch (Global.state) {

        case Global.START:
            controls.enableRotate = false;
            controls.update();
            camera.lookAt(Global.clock.position);
            renderer.render(scene, camera);
            window.requestAnimationFrame(onAnimationFrameHandler);
            break;

        case Global.PLAY:
            controls.update();
            camera.lookAt(Global.clock.position);
            renderer.render(scene, camera);
            scene.update && scene.update(timeStamp);
            window.requestAnimationFrame(onAnimationFrameHandler);
            break;

        case Global.DEFEAT:
            camera.position.set(0, 10, -70);
            controls.update();
            camera.lookAt(new Vector3(0,0,0));
            renderer.render(scene, camera);
            window.requestAnimationFrame(onAnimationFrameHandler);
            break;
    }
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};

// Keydown handler
const onKeyDown = (event) => {
    switch (event.key) {
        case 'w': 
            clock.state.moveForward = true;
            break;
        case 'a':
            clock.state.moveLeft = true;
            break;
        case 's':
            clock.state.moveBackward = true;
            break;
        case 'd': 
            clock.state.moveRight = true;
            break;
        case ' ':
            if (Global.state == Global.START || Global.state == Global.DEFEAT) {
                for (const text of Global.text) {
                    Global.scene.remove(text);
                }
                controls.enableRotate = true;
                Global.state = Global.PLAY;
            }
            if (Global.DICE_COOLDOWN <= 0){
                const dice = new Dice();
                Global.scene.add(dice);
                Global.scene.state.updateList.push(dice);
                Global.DICE_COOLDOWN = Math.floor(Global.DICE_COOLDOWN_MAX/Math.min(3,Global.LEVEL));
            } 
            break;
    }
};

// Keyup Handler
const onKeyUp = (event) => {
    switch (event.key) {
        case 'w': 
            clock.state.moveForward = false;
            break;
        case 'a':
            clock.state.moveLeft = false;
            break;
        case 's':
            clock.state.moveBackward = false;
            break;
        case 'd': 
            clock.state.moveRight = false;
            break;
    }
};

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

