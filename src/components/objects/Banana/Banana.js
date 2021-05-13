import { Group, Box3, Box3Helper, Vector3, ArrowHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Global, intersectsWalls, collision } from 'global';
import MODEL from './banana.gltf';

class Banana extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();


        // store object's health
        this.state = { 
            health: 30,
            speed: Math.random() * .015 + .03,
            damage: 5,
            velocity: new Vector3()
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

export default Banana;
