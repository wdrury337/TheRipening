import { Global } from './global';
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

export { intersectsEnemy }