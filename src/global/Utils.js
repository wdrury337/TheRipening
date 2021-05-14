import { Global } from 'global';
import { Box3, Vector3 } from 'three';
import { Banana, Apple, Avocado } from 'objects';

// Determine if clock or dice collides with 
function intersectsEnemy(obj) {
    const box = new Box3().setFromObject(obj);
    if (Global.enemies == undefined) return undefined;
    for (const enemy of Global.enemies) {
        const enemyInd = Global.enemies.indexOf(enemy)
        const objInd = Global.enemies.indexOf(obj)
        if(objInd != enemyInd){
            const enemyBox = new Box3().setFromObject(enemy);
            if (box.intersectsBox(enemyBox)) return enemy;   
        }
    }
    return undefined;
}

// Test wall collision 
function intersectsWalls(box, wall) {
    if (box.intersectsPlane(wall)) {
        return true;
    }
    return false;
}

// Change objects velocity after collision
function collision(obj, normal, factor) {
    obj.state.velocity = normal.clone().multiplyScalar(factor);
}

// Chose a random location to spawn new enemies
function spawnRandom() {
    const enemy = Math.random() * 100;
    if (enemy < 50){
        let enemy1 = new Avocado(Global.scene);
        Global.enemies.push(enemy1);
        Global.scene.add(enemy1);
    }
    else if(enemy < 80){
        let enemy1 = new Banana(Global.scene);
        Global.enemies.push(enemy1);
        Global.scene.add(enemy1);
    }
    else{
        let enemy1 = new Apple(Global.scene);
        Global.enemies.push(enemy1);
        Global.scene.add(enemy1);
    }
}

// Spawn new enemies
function spawn() {
    spawnRandom();
    spawnRandom();
}

// Reset global variables after defeat
function restart() {
    Global.state = Global.DEFEAT;
    Global.level = 1;
    Global.level_xp = 0;
    Global.scene.updateList = [];
    Global.camera.lookAt(new Vector3(0,0,0));
    for (const enemy of Global.enemies) {
        Global.scene.remove(enemy);
    }
    Global.enemies = [];
}

export { intersectsEnemy, intersectsWalls, collision, spawnRandom, restart, spawn }
