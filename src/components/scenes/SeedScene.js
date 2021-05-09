import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Clock, Land, Banana, Room} from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state

        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            clock: undefined
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes ato scene
        const land = new Land();
        const banana = new Banana(this);
        const lights = new BasicLights();
        const clock = new Clock(this);

        const sides = {'up': true, 'down': true, 'left': true, 'right': true} 
        //const room = new Room('roomName', 100, 200, 200, sides, 0x7ec0ee)
     
        this.state.clock = clock;
        this.add(clock, land, banana, lights);

        // Populate GUI
        //this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        //this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        
        
    }
}

export default SeedScene;
