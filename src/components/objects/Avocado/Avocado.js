import { Group, Box3, Box3Helper, Vector3, ArrowHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Global, intersectsWalls, collision, intersectsEnemy } from 'global';
import MODEL from './avocado.gltf';

class Avocado extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // store object's health
        this.state = { 
            health: 10,
            speed: Math.random() * .015 + .02,
            damage: 17,
            velocity: new Vector3(),
            xp: 3
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
                this.position.copy(prevPosition)
                this.state.velocity = new Vector3();
                collision(this, wall.normal, Global.CLOCK_KICKBACK);
            }
        }

        if (this.state.velocity.length() > .01){
            this.position.add(this.state.velocity)
            this.state.velocity.multiplyScalar(.75);
        }

        const enemy = intersectsEnemy(this);

        if (enemy !== undefined){
            const n = this.position.clone().sub(enemy.position.clone()).normalize();
            const point = this.position.clone();
            this.position.copy(prevPosition.clone().add(n.clone().multiplyScalar(.05)));
        }
    }
}

export default Avocado;
