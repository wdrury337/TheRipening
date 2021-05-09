import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './clock.gltf';

class Clock extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            bob: true,
            twirl: 0,
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false
        };

        // Load object
        const loader = new GLTFLoader();

        this.name = 'clock';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 1000);
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Populate GUI
        this.state.gui.add(this.state, 'bob');
    }

    update(timeStamp) {
        if (this.state.bob) {
            // Bob back and forth
            this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        }
        if (this.state.twirl > 0) {
            // Lazy implementation of twirl
            this.state.twirl -= Math.PI / 8;
            this.rotation.y += Math.PI / 8;
        }

        // Handle events triggered by key presses
        if (this.state.moveForward) {
            this.position.x += .1
        }
        if (this.state.moveBackward) {
            this.position.x -= .1
        }
        if (this.state.moveLeft) {
            this.position.z -= .1
        }
        if (this.state.moveRight) {
            this.position.z += .1
        }

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Clock;
