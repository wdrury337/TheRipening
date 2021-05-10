import { Global } from './';
import { Box3 } from 'three';

function intersectsEnemy(box) {
    for (const enemy of Global.enemies) {
        const enemyBox = new Box3().setFromObject(enemy);
        if (box.intersectsBox(enemyBox)) {
            return enemy;
        }
    }
    return undefined;
}

// Test wall collision 
function intersectsWalls(obj, prevPosition) {
    const box = new Box3().setFromObject(obj);
    for (const wall of Global.walls) {
        if (box.intersectsBox(wall)) {
            obj.position.copy(prevPosition);
        }
    }
}
export { intersectsEnemy, intersectsWalls}