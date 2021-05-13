import { Group, TextGeometry, MeshBasicMaterial, Mesh, FontLoader } from 'three';
import FONT from './Melted_Monster_Regular.json';

class StartText extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'startText';

        const loader = new FontLoader();
        loader.load(FONT, function(font) {

            // title
            var material = new MeshBasicMaterial({color: 0xffb6c1});
            var titleGeometry = new TextGeometry("The Ripening", {
                font: font,
                size: 300,
            });
    
            var title = new Mesh(titleGeometry, material);
            title.position.set(11, -3, 10);
            title.rotation.set(0, Math.PI, 0);
            title.scale.multiplyScalar(0.01);
            parent.add(title);

            // start instructions
            var startGeometry = new TextGeometry("Press Space to Start", {
                font: font,
                size: 150,
            });
    
            var start = new Mesh(startGeometry, material);
            start.position.set(10, -30, 20);
            start.rotation.set(0, Math.PI, 0);
            start.scale.multiplyScalar(0.01);
            parent.add(start);
        });

    }
}

export default StartText;