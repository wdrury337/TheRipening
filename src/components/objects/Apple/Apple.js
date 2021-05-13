import { Group, Box3, Box3Helper, Vector3, ArrowHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Global, intersectsWalls, collision } from 'global';
import MODEL from './apple.gltf';

class Apple extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // store object's information
        this.state = { 
            health: 55,
            speed: Math.random() * .01 + .015,
            damage: 15,
            velocity: new Vector3()
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
        const c = new Vector3();
        box.getCenter(c)
        const dir = Global.clock.position.clone().sub(c).setY(0).normalize();
        this.position.add(dir.multiplyScalar(this.state.speed));

        // Wall intersection
        for (const wall of Global.walls) {
            if(intersectsWalls(new Box3().setFromObject(this), wall)) {
                this.state.velocity = new Vector3();
                collision(this, wall.normal, Global.CLOCK_KICKBACK);
            }
        }

        if (this.state.velocity.length() > .01){
            this.position.add(this.state.velocity)
            this.state.velocity.multiplyScalar(.75);
        }
    }
}

export default Apple;
