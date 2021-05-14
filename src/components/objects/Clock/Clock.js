import { Group, Box3, Vector3 } from 'three';
import { Global, intersectsWalls, intersectsEnemy, collision } from 'global';
import { DefeatText } from 'objects';
import MODEL from './clock.gltf';

class Clock extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false,
            boundingBox: new Box3(),
            health: 100,
            kickback: .24,
            speed: .1,
            velocity: new Vector3(),
        };

        // Load object
        // Object fetched from https://poly.google.com/view/4t8wFjBwJVI
        const loader = Global.loader;

        this.name = 'clock';
        loader.load(MODEL, (gltf) => {

            // Add object to scene
            gltf.scene.scale.set(.005, .005, .005);
            gltf.scene.position.set(0, 0, 0);
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.add(this);
        this.position.z = -5;
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        if (this.state.health <= 0) {
            this.state.health = 100;
            this.position.set(0, 0, -5);
            this.lookAt(new Vector3(0, 0, -70));
            this.rotateOnAxis(this.up, Global.CLOCK_ROTATION_OFFSET);
            this.state.velocity = new Vector3(0, 0, 0);
            const text = new DefeatText(Global.scene);
            Global.scene.add(text);
            Global.state = Global.DEFEAT;
        }
        else {
            const prevPosition = this.position.clone();

            // Rotation
            this.lookAt(Global.camera.position.clone().setY(0));
            this.rotateOnAxis(this.up, Global.CLOCK_ROTATION_OFFSET);
            const toClock = this.position.clone().sub(Global.camera.position);
            const dir = new Vector3(toClock.x, 0, toClock.z).normalize().multiplyScalar(this.state.speed);

            // Handle events triggered by key presses
            if (this.state.moveForward) {
                this.position.add(dir);
                Global.camera.position.add(dir);

            }
            if (this.state.moveBackward) {
                this.position.add(dir.clone().multiplyScalar(-1));
                Global.camera.position.add(dir.clone().multiplyScalar(-1));
            }
            if (this.state.moveLeft) {
                this.position.add(dir.clone().cross(this.up).multiplyScalar(-1));
                Global.camera.position.add(dir.clone().cross(this.up).multiplyScalar(-1));
            }
            if (this.state.moveRight) {
                this.position.add(dir.clone().cross(this.up));
                Global.camera.position.add(dir.clone().cross(this.up));
            }

            const enemy = intersectsEnemy(this);
            if (Global.clock_hit_cooldown == 0){
                if (enemy !== undefined){
                    const n = prevPosition.clone().sub(enemy.position.clone());
                    collision(this, n, this.state.kickback);
                    Global.clock_hit_cooldown = 17;
                    this.state.health -= enemy.state.damage;
                }
            }

            else Global.clock_hit_cooldown -= 1;

            // Test wall collision. If interesects, set position to previous position
            for (const wall of Global.walls) {
                if(intersectsWalls(new Box3().setFromObject(this), wall)) {
                    this.state.velocity = new Vector3();
                    collision(this, wall.normal, .24);
                    this.position.copy(prevPosition);
                }
            }

            if (this.state.velocity.length() > .01){
                this.position.add(this.state.velocity)
                this.state.velocity.multiplyScalar(.75);
            }
        }
    }
}

export default Clock;
