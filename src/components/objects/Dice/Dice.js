import { Box3, Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './dice.gltf';
import { Global, intersectsEnemy, intersectsWalls, collision } from 'global';

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
    }

    update(timeStamp) {
        this.position.add(this.state.direction.clone().multiplyScalar(Global.DICE_MOVEMENT_SPEED));
        
        const enemy = intersectsEnemy(this);
        let wallContact = false;
        for (const wall of Global.walls) {
            if(intersectsWalls(new Box3().setFromObject(this), wall)) {
                wallContact = true;
                break;
            }
        }
        
        // Enemy collision
        if (enemy !== undefined) {
            let n = enemy.position.clone().sub(Global.clock.position);
            collision(enemy, n, Global.DICE_KICKBACK);
            enemy.state.health -= Math.random() * 6;

            // If enemy health is less than 0, dispose of object

            if (enemy.state.health <= 0) {
                Global.XP += enemy.state.xp;
                Global.LEVEL_XP += enemy.state.xp;
                if (Global.LEVEL_XP >= 100) {
                    Global.LEVEL += 1; 
                    Global.LEVEL_XP = 0;
                }
                Global.SPAWN = true;
                Global.scene.remove(enemy);
                let index = Global.enemies.indexOf(enemy);
                if (index > -1) Global.enemies.splice(index, 1);
                index = Global.scene.state.updateList.indexOf(enemy);
                if (index > -1) Global.scene.state.updateList.splice(index, 1);
                
            }
            let index = Global.scene.state.updateList.indexOf(this);
            if (index > -1) Global.scene.state.updateList.splice(index, 1);
            Global.scene.remove(this);

            
            
        }

        // Wall collision
        else if (wallContact) {
            Global.scene.remove(this);
        }
    }
}

export default Dice;
