import { Group, Box3, Box3Helper, Vector3, ArrowHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Global, intersectsWalls } from 'global';
import MODEL from './avocado.gltf';

class Avocado extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // store object's health
        this.state = { 
            health: 10,
            speed: .007,

        }

        // Load object
        // Object fetched from https://poly.google.com/view/4tOmpD9-xsV
        const loader = Global.loader;

        this.name = 'avocado';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1/1000000);
            gltf.scene.position.set(-1, 0, -1);
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        // Advance tween animations, if any exist
        TWEEN.update();

        if (this.state.health <= 0){
            Global.scene.remove(this);
            let index = Global.enemies.indexOf(this);
            if (index > -1) Global.enemies.splice(index, 1);
            index = Global.scene.state.updateList.indexOf(this);
            if (index > -1) Global.scene.state.updateList.splice(index, 1);
            return
        }

        // Movement
        const prevPosition = this.position;

        const box = new Box3().setFromObject(this).clone();
        const dir = Global.clock.position.clone().sub(box.getCenter()).setY(0).normalize()
        this.position.add(dir.multiplyScalar(this.state.speed));

        // Wall intersection
        if(intersectsWalls(new Box3().setFromObject(this))) this.position.copy(prevPosition);

    }
}

export default Avocado;
