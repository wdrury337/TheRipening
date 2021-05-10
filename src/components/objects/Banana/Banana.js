import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Global } from 'global';
import MODEL from './banana.gltf';

class Banana extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();


        // store object's health
        this.state = { 
            health: 100,
        }

        // Load object
        const loader = Global.loader;

        this.name = 'banana';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 70);
            gltf.scene.position.set(-1, .7, 1);
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        // Advance tween animations, if any exist
        TWEEN.update();

        // Remove if health is depleted
        if (this.state.health <= 0){
            Global.scene.remove(this);
            let index = Global.enemies.indexOf(this);
            if (index > -1) Global.enemies.splice(index, 1);
            index = Global.scene.state.updateList.indexOf(this);
            if (index > -1) Global.scene.state.updateList.splice(index, 1);
        }
    }
}

export default Banana;
