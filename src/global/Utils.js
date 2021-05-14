import { Global } from 'global';
import { Box3 } from 'three';
import { Banana, Apple, Avocado } from 'objects';


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

function collision(obj, normal, factor) {
    obj.state.velocity = normal.clone().multiplyScalar(factor);
}

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
export { intersectsEnemy, intersectsWalls, collision, spawnRandom}
