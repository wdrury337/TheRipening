import { Group, Box3, Vector3 } from 'three';
import { Global, intersectsWalls, intersectsEnemy, collision } from 'global';
import MODEL from './banana.gltf';

class Banana extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = { 
            maxHealth: 30,
            health: 30,
            speed: Math.random() * .015 + .03,
            damage: 5,
            velocity: new Vector3(),
            xp: 10,
            baseColor: [],
            rotationOffset: 0.05*Math.PI,
        }

        // Load object
        const loader = Global.loader;
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 70);
            gltf.scene.position.set(-1, .7, 1);
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
        const prevPosition = this.position.clone();
        const box = new Box3().setFromObject(this).clone();
        const c = new Vector3();
        box.getCenter(c)
        const dir = Global.clock.position.clone().sub(c).setY(0).normalize();
        this.position.add(dir.multiplyScalar(this.state.speed));
        
        // Rotation
        this.lookAt(Global.clock.position.clone());
        this.rotateOnAxis(this.up, this.state.rotationOffset);

        
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
        const enemy = intersectsEnemy(this);
        
        if (enemy !== undefined){
            const n = this.position.clone().sub(enemy.position.clone()).normalize();
            this.position.copy(prevPosition.clone().add(n.clone().multiplyScalar(.005)));
        }

    }
}

export default Banana;
