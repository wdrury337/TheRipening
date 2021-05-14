import { Group, Box3, Vector3 } from 'three';
import { Global, intersectsWalls, collision } from 'global';
import { intersectsEnemy } from '../../../global';
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
            velocity: new Vector3()
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
            
            const text = new DefeatText(Global.scene);
            Global.scene.add(text);

            Global.state = Global.DEFEAT;
            Global.scene.updateList = [];
            for (const enemy of Global.enemies) {
                Global.scene.remove(enemy);
            }
            Global.enemies = [];

            console.log(this);
            
            return
        }
        else {
            const prevPosition = this.position.clone();

            // Update clock to always face the camera position
            const cameraXY = Global.camera.position.clone().setY(0); 
            this.lookAt(cameraXY);
            this.rotateOnAxis(this.up, Global.CLOCK_ROTATION_OFFSET);

            const toClock = this.position.clone().sub(Global.camera.position);
            const dir = new Vector3(toClock.x, 0, toClock.z).normalize().multiplyScalar(Global.MOVEMENT_SPEED);

            // Handle events triggered by key presses
            if (this.state.moveForward) {
                this.position.add(dir);
                const distToCamera = this.position.distanceTo(Global.camera.position);
                if (distToCamera >= Global.DISTANCE_TO_CAMERA) {
                    Global.camera.position.add(dir);
                }
            }
            if (this.state.moveBackward) {
                this.position.add(dir.clone().multiplyScalar(-1));
                const distToCamera = this.position.distanceTo(Global.camera.position);
                if (distToCamera <= Global.DISTANCE_TO_CAMERA) {
                    Global.camera.position.add(dir.clone().multiplyScalar(-1));
                }
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
            
            if (Global.CLOCK_HIT_COOLDOWN == 0){
                if (enemy !== undefined){
                    const n = prevPosition.clone().sub(enemy.position.clone());
                    collision(this, n, Global.CLOCK_KICKBACK);
                    Global.CLOCK_HIT_COOLDOWN = 17;
                    this.state.health -= enemy.state.damage;
                    console.log(this.state.health)
                }
            }

            else Global.CLOCK_HIT_COOLDOWN -= 1

            // Test wall collision. If interesects, set position to previous position
            for (const wall of Global.walls) {
                if(intersectsWalls(new Box3().setFromObject(this), wall)) {
                    this.state.velocity = new Vector3();
                    collision(this, wall.normal, .24);
                    //this.position.copy(prevPosition);
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
