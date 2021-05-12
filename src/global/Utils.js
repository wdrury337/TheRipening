import { Global } from 'global';
import { Box3, Vector3 } from 'three';
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
function intersectsWalls(box, wall) {
    if (box.intersectsPlane(wall)) {
        return true;
    }
    return false;
}

function collision(obj, prevPosition, normal) {
    let v = obj.position.clone().sub(prevPosition);
    obj.state.velocity = normal.clone().multiplyScalar(.24);
}
export { intersectsEnemy, intersectsWalls, collision}
