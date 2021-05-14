import { Group, TextGeometry, MeshToonMaterial, Mesh, FontLoader } from 'three';
import { Global } from 'global';
import TITLE_FONT from '../StartText/Melted_Monster_Regular.json';

class DefeatText extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Font fetched from https://www.dafont.com/theme.php?cat=110
        const loader = new FontLoader();
        loader.load(TITLE_FONT, function(font) {

            // "Defeat"
            let material = new MeshToonMaterial({color: 0x9c4444});
            let defeatGeometry = new TextGeometry("Defeat", {
                font: font,
                size: 200,
            });

            let defeat = new Mesh(defeatGeometry, material);
            defeat.position.set(4.5, 3, 0);
            defeat.rotation.set(0, Math.PI, 0);
            defeat.scale.multiplyScalar(0.01);

            // "Press space to restart"
            let restartGeometry = new TextGeometry("Press space to restart", {
                font: font,
                size: 50,
            });

            let restart = new Mesh(restartGeometry, material);
            restart.position.set(3.9, 1, -1);
            restart.rotation.set(0, Math.PI, 0);
            restart.scale.multiplyScalar(0.01);

            // "Score: "
            let scoreGeometry = new TextGeometry("Score: " + Global.xp, {
                font: font,
                size: 50,
            });
    
            let score = new Mesh(scoreGeometry, material);
            score.position.set(1.5, 1.8, -1);
            score.rotation.set(0, Math.PI, 0);
            score.scale.multiplyScalar(0.01);

            // Add text to scene
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