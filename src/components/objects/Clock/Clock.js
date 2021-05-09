import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import MODEL from "\\src\\components\\objects\\Flower\\banana\\scene.gltf";

class Clock extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'land';
        loader.load("\\src\\components\\objects\\Clock\\clock.gltf", (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 20);
            this.add(gltf.scene);
        });
    }
}

export default Clock;