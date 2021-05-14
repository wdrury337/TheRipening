import { Box3, Group } from 'three';
import MODEL from './dice.gltf';
import { Global, intersectsEnemy, intersectsWalls, collision, spawn } from 'global';

class Dice extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = { 
            direction: Global.clock.position.clone().sub(Global.camera.position).setY(0).normalize(),
            rotationSpeed: -.1,
            movementSpeed: .3,
            kickback: .05,
        }

        // Load object
        const loader = Global.loader;
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 200);
            gltf.scene.position.set(Global.clock.position.x, Global.clock.position.y, Global.clock.position.z);
            this.add(gltf.scene);
        });
    }

    update(timeStamp) {

        // Update dice position
        this.position.add(this.state.direction.clone().multiplyScalar(this.state.movementSpeed));
        
        // Test for wall collision
        for (const wall of Global.walls) {
            if(intersectsWalls(new Box3().setFromObject(this), wall)) {
                Global.scene.remove(this);
                let index = Global.scene.state.updateList.indexOf(this);
                if (index > -1) Global.scene.state.updateList.splice(index, 1);
                Global.scene.remove(this);
                return;
            }
        }
        
        // Test for enemy collision
        const enemy = intersectsEnemy(this);
        if (enemy !== undefined) {
            let direction = enemy.position.clone().sub(Global.clock.position);
            collision(enemy, direction, this.state.kickback);
            enemy.state.health -= Math.random() * 6;

            // Check if enemy dies
            if (enemy.state.health <= 0) {

                // Update xp
                Global.xp += enemy.state.xp;
                Global.level_xp += enemy.state.xp;
                if (Global.level_xp >= 100) {
                    Global.level += 1; 
                    Global.level_xp = Global.level_xp % 100;
                }

                // Spawn new enemies
                spawn();

                // Remove enemy from scene
                Global.scene.remove(enemy);
                let index = Global.enemies.indexOf(enemy);
                if (index > -1) Global.enemies.splice(index, 1);
                index = Global.scene.state.updateList.indexOf(enemy);
                if (index > -1) Global.scene.state.updateList.splice(index, 1);
            }

            // Change enemy color based on amout of damage taken
            const factor = .5 * enemy.state.health / enemy.state.maxHealth + .5;
            for (let i = 0; i < enemy.children[0].children[0].children.length; i++) {
                const baseColor = enemy.state.baseColor[i];
                enemy.children[0].children[0].children[i].material.color.setRGB(
                    baseColor.r * factor, baseColor.g * factor, baseColor.b * factor
                );
            }
        }
    }
}

export default Dice;
