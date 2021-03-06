import { Group, Box3, Vector3 } from 'three';
import { Global, intersectsWalls, collision, intersectsEnemy } from 'global';
import MODEL from './apple.gltf';

class Apple extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = { 
            maxHealth: 55,
            health: 55,
            speed: Math.random() * .01 + .015,
            damage: 15,
            velocity: new Vector3(),
            xp: 20,
            baseColor: [],
        }

        // Object fetched from https://poly.google.com/view/4tOmpD9-xsV
        const loader = Global.loader;
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 10);
            gltf.scene.position.set(1, .05, 1);
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
        const c = new Vector3();
        box.getCenter(c)
        const dir = Global.clock.position.clone().sub(c).setY(0).normalize();
        this.position.add(dir.multiplyScalar(this.state.speed));

        // Rotation
        this.lookAt(Global.clock.position.clone());

        // Wall intersection
        for (const wall of Global.walls) {
            if(intersectsWalls(new Box3().setFromObject(this), wall)) {
                this.state.velocity = new Vector3();
                collision(this, wall.normal, Global.CLOCK_KICKBACK);
            }
        }

        // Handle wall collision
        if (this.state.velocity.length() > .01){
            this.position.add(this.state.velocity)
            this.state.velocity.multiplyScalar(.75);
        }
        
        // Handle enemy collision
        const enemy = intersectsEnemy(this);
        if (enemy !== undefined){
            const n = this.position.clone().sub(enemy.position.clone()).normalize();
            this.position.copy(prevPosition.clone().add(n.clone().multiplyScalar(.005)));
        }
    }
}

export default Apple;
