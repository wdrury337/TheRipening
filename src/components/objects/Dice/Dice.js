import { Box3, Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './dice.gltf';
import { Global, intersectsEnemy, intersectsWalls } from 'global';

class Dice extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = { 
            direction: Global.clock.position.clone().sub(Global.camera.position).setY(0).normalize(),
        }

        // Load object
        const loader = Global.loader;

        this.name = 'dice';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 200);
            gltf.scene.position.set(Global.clock.position.x, Global.clock.position.y, Global.clock.position.z);
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.add(this.state.direction.clone().multiplyScalar(Global.DICE_MOVEMENT_SPEED));
        // this.rotateOnAxis(this.state.direction.clone().cross(this.up), Global.DICE_ROTATION_SPEED);
        
        const diceBox = new Box3().setFromObject(this);
        const enemy = intersectsEnemy(diceBox);
        const wall = intersectsWalls(diceBox)
        
        // Enemy collision
        if (enemy !== undefined) {
            Global.scene.remove(this);

            // If enemy health is less than 0, dispose of object
            if (enemy.state.health <= 0) {
                Global.scene.remove(enemy);
                let index = Global.enemies.indexOf(enemy);
                if (index > -1) Global.enemies.splice(index, 1);
                index = Global.scene.state.updateList.indexOf(enemy);
                if (index > -1) Global.scene.state.updateList.splice(index, 1);
            }
        }

        // Wall collision
        else if (wall) {
            Global.scene.remove(this);
        }
    }
}

export default Dice;
