import Global from './Global.js';
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

export { intersectsEnemy };