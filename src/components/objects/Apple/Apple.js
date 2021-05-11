import { Group, Box3, Box3Helper, Vector3, ArrowHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Global, intersectsWalls } from 'global';
import MODEL from './apple.gltf';

class Apple extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // store object's information
        this.state = { 
            health: 1000,
            speed: .01,
        }
        // Load object
        // Object fetched from https://poly.google.com/view/4tOmpD9-xsV
        const loader = Global.loader;
        
        this.name = 'apple';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 10);
            gltf.scene.position.set(1, .05, 1);
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        // Advance tween animations, if any exist
        TWEEN.update();

        // Movement        
        const prevPosition = this.position;

        const box = new Box3().setFromObject(this).clone();
        const dir = Global.clock.position.clone().sub(box.getCenter()).setY(0).normalize()
        this.position.add(dir.multiplyScalar(this.state.speed));

        // Wall intersection
        if(intersectsWalls(new Box3().setFromObject(this))) {
            this.position.copy(prevPosition);
        }
    }
}

export default Apple;
