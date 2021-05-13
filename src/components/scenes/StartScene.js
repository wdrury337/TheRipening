import { Scene, Color } from 'three';
import { StartText } from 'objects';
import { BasicLights } from 'lights';

class StartScene extends Scene {

    constructor() {
        // Call parent Scene() constructor
        super();

        this.name = 'startScene';

        // Set background to a nice color
        this.background = new Color(0xccffff);

        // Add meshes to scene
        const lights = new BasicLights();
        const text = new StartText(this);
        this.add(lights, text);
    }
}

export default StartScene;