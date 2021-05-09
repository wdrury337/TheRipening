import { Group, Box3, Box3Helper, Vector3, ArrowHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './clock.gltf';
import { Global } from '../../../global';

class Clock extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false
        };

        // Load object
        // Object fetched from https://poly.google.com/view/6W1lwdXcafJ
        const loader = new GLTFLoader();

        this.name = 'clock';
        loader.load(MODEL, (gltf) => {

            // Add object to scene
            console.log(gltf.scene);
            gltf.scene.scale.set(.001, .001, .001);
            gltf.scene.position.set(0, 0, 0);
            this.add(gltf.scene);

            // Visualize the objects bounding box for debugging
            const box = new Box3().setFromObject(gltf.scene);
            const helper = new Box3Helper(box, 0xFFFFFF);
            this.add(helper);

            // Visualize origin
            const dir = new Vector3(0, 1, 0);
            const origin = new Vector3(0, 0, 0);
            const length = 1;
            const hex = 0xFFFFFF;
            const arrow = new ArrowHelper(dir, origin, length, hex);
            this.add(arrow);
        });
        this.boundingBox = new Box3();

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {

        // Update clock to always face the camera position
        const cameraXY = new Vector3(Global.camera.position.x, 0, Global.camera.position.z); 
        this.lookAt(cameraXY);

        this.boundingBox.setFromObject(this);
        const helper = new Box3Helper(this.boundingBox, 0xFFFFFF);
        this.add(helper);

        const toClock = this.position.clone().sub(Global.camera.position);
        const dir = new Vector3(toClock.x, 0, toClock.z).normalize().multiplyScalar(Global.MOVEMENT_SPEED);

        // Handle events triggered by key presses
        if (this.state.moveForward) {
            this.position.add(dir);
        }
        if (this.state.moveBackward) {
            this.position.add(dir.clone().multiplyScalar(-1));
        }
        if (this.state.moveLeft) {
            this.position.add(dir.clone().cross(this.up).multiplyScalar(-1));
        }
        if (this.state.moveRight) {
            this.position.add(dir.clone().cross(this.up));
        }

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Clock;
