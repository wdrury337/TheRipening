import { Group, TextGeometry, MeshToonMaterial, Mesh, FontLoader } from 'three';
import { Global } from 'global';
import TITLE_FONT from '../StartText/Melted_Monster_Regular.json';

class DefeatText extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'defeatText';

        const loader = new FontLoader();
        loader.load(TITLE_FONT, function(font) {

            // defeat
            var material = new MeshToonMaterial({color: 0x9c4444});
            var defeatGeometry = new TextGeometry("Defeat", {
                font: font,
                size: 200,
            });
    
            var defeat = new Mesh(defeatGeometry, material);
            defeat.position.set(4.5, 3, 0);
            defeat.rotation.set(0, Math.PI, 0);
            defeat.scale.multiplyScalar(0.01);

            // restart instructions
            var restartGeometry = new TextGeometry("Press Space to restart", {
                font: font,
                size: 50,
            });
    
            var restart = new Mesh(restartGeometry, material);
            restart.position.set(3.9, 1, -1);
            restart.rotation.set(0, Math.PI, 0);
            restart.scale.multiplyScalar(0.01);

            // Score
            var scoreGeometry = new TextGeometry("Score: " + Global.XP, {
                font: font,
                size: 50,
            });
    
            var score = new Mesh(scoreGeometry, material);
            score.position.set(1.5, 1.8, -1);
            score.rotation.set(0, Math.PI, 0);
            score.scale.multiplyScalar(0.01);

            parent.add(defeat);
            parent.add(restart);
            parent.add(score);
            Global.text.push(defeat);
            Global.text.push(restart);
            Global.text.push(score);
        });
    }
}

export default DefeatText;