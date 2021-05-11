import { Global } from 'global';
import { Box3 } from 'three';
import { Clock, Land, Banana, Room, Apple, Avocado, Dice} from 'objects';


function intersectsEnemy(box) {
    if (Global.enemies == undefined) return undefined;
    for (const enemy of Global.enemies) {
        const enemyBox = new Box3().setFromObject(enemy);
        if (box.intersectsBox(enemyBox)) {
            enemy.state.health -= Math.random() * 6;
            return enemy;
        }
    }
    return undefined;
}

// Test wall collision 
function intersectsWalls(box) {
    for (const wall of Global.walls) {
        if (box.intersectsPlane(wall)) {
            return true;
        }
    }
    return false;
}
export { intersectsEnemy, intersectsWalls}
