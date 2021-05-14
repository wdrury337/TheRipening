import { Group, TextGeometry, MeshToonMaterial, Mesh, FontLoader } from 'three';
import { Global } from 'global';
import TITLE_FONT from './Melted_Monster_Regular.json';

class StartText extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'startText';

        const loader = new FontLoader();
        loader.load(TITLE_FONT, function(font) {

            // title
            var material = new MeshToonMaterial({color: 0x9c4444});
            var titleGeometry = new TextGeometry("The Ripening", {
                font: font,
                size: 200,
            });
    
            var title = new Mesh(titleGeometry, material);
            title.position.set(8, 3, 0);
            title.rotation.set(0, Math.PI, 0);
            title.scale.multiplyScalar(0.01);

            // start instructions
            var startGeometry = new TextGeometry("Press Space to Start", {
                font: font,
                size: 50,
            });
    
            var start = new Mesh(startGeometry, material);
            start.position.set(3.4, 1, -1);
            start.rotation.set(0, Math.PI, 0);
            start.scale.multiplyScalar(0.01);

            parent.add(title);
            parent.add(start);
            Global.text.push(title);
            Global.text.push(start);
        });
    }
}

export default StartText;