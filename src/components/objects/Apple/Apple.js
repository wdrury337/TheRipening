import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './apple.gltf';

class Apple extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Load object
        // Object fetched from https://poly.google.com/view/4tOmpD9-xsV
        const loader = new GLTFLoader();

        this.name = 'apple';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 10);
            gltf.scene.position.set(1, 0, 1);
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Apple;
