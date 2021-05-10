import { Global } from './';
import { Box3 } from 'three';

function intersectsEnemy(box) {
    if (Global.enemies == undefined) return undefined;
    for (const enemy of Global.enemies) {
        const enemyBox = new Box3().setFromObject(enemy);
        if (box.intersectsBox(enemyBox)) {
            return enemy;
        }
    }
    return undefined;
}

// Test wall collision 
function intersectsWalls(box) {
    for (const wall of Global.walls) {
        if (box.intersectsBox(wall)) {
            return true;
        }
    }
    return false;
}
export { intersectsEnemy, intersectsWalls}
