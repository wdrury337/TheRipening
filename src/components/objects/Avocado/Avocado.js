import { Group, Box3, Vector3 } from 'three';
import { Global, intersectsWalls, collision, intersectsEnemy } from 'global';
import MODEL from './avocado.gltf';

class Avocado extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = { 
            maxHealth: 10,
            health: 10,
            speed: Math.random() * .015 + .02,
            damage: 17,
            velocity: new Vector3(),
            xp: 3,
            baseColor: [],
        }

        // Object fetched from https://poly.google.com/view/4tOmpD9-xsV
        const loader = Global.loader;
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1/1000000);
            gltf.scene.position.set(-1, 0, -1);
            for (let i = 0; i < gltf.scene.children[0].children.length; i++) {
                this.state.baseColor.push(gltf.scene.children[0].children[i].material.color);
            }
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {

        // Movement
        const prevPosition = this.position;
        const box = new Box3().setFromObject(this).clone();
        const center = new Vector3();
        box.getCenter(center);
        const dir = Global.clock.position.clone().sub(center).setY(0).normalize();
        this.position.add(dir.multiplyScalar(this.state.speed)); 

        // Wall intersection
        for (const wall of Global.walls) {
            if(intersectsWalls(new Box3().setFromObject(this), wall)) {
                this.position.copy(prevPosition);
                this.state.velocity = new Vector3();
                collision(this, wall.normal, Global.CLOCK_KICKBACK);
            }
        }

        // Correct for wall collisoion
        if (this.state.velocity.length() > .01){
            this.position.add(this.state.velocity)
            this.state.velocity.multiplyScalar(.75);
        }

        // Handle enemy collision
        const enemy = intersectsEnemy(this);
        if (enemy !== undefined){
            const n = this.position.clone().sub(enemy.position.clone()).normalize();
            this.position.copy(prevPosition.clone().add(n.clone().multiplyScalar(.05)));
        }
    }
}

export default Avocado;
