import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Global } from '../../../global';
import MODEL from './land.gltf';

class Land extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = Global.loader;

        this.name = 'land';
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }
}

export default Land;
