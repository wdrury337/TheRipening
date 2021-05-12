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
            damage: 17

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

        // Movement
        const prevPosition = this.position;

        const box = new Box3().setFromObject(this).clone();
        const c = new Vector3();
        box.getCenter(c)
        const dir = Global.clock.position.clone().sub(c).setY(0).normalize();
        this.position.add(dir.multiplyScalar(this.state.speed));

        // Wall intersection
        for (const wall of Global.walls) {
            if(intersectsWalls(new Box3().setFromObject(this), wall)) {
                collision(this, prevPosition, wall.normal);
            }
        }

    }
}

export default Avocado;
