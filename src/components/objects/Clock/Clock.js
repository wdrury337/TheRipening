import { Group, Box3, Box3Helper, Vector3, ArrowHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './clock.gltf';
import { Global, intersectsWalls, collision } from 'global';
import { intersectsEnemy } from '../../../global';

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

            // Visualize the objects bounding box for debugging
            //const box = new Box3().setFromObject(gltf.scene);
            //this.state.boundingBox = box;
            //const helper = new Box3Helper(box, 0xFFFFFF);
            //this.add(helper);

            // Visualize origin
            const dir = new Vector3(0, 1, 0);
            const origin = new Vector3(0, 0, 0);
            const length = 1;
            const hex = 0xFFFFFF;
            const arrow = new ArrowHelper(dir, origin, length, hex);
            this.add(arrow);
        });

        // Add self to parent's update list
        this.position.z = -5;
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        if (this.state.health <= 0) {
            Global.scene.remove(this);
            Global.GAMEOVER = true;
            return
        }
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

        

        const enemy = intersectsEnemy(new Box3().setFromObject(this));
        
        if (Global.CLOCK_HIT_COOLDOWN == 0){
                if (enemy !== undefined){
                    const n = prevPosition.clone().sub(enemy.position.clone());
                    collision(this, n, .24);
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
        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Clock;
