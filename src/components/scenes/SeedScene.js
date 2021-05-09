import { Scene, Color } from 'three';
import { Clock, Land, Banana, Room, Apple, Avocado} from 'objects';
import { BasicLights } from 'lights';
import { Global } from '../../global';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            updateList: [],
        };

        this.name = "scene";

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes ato scene
        const land = new Land();
        const banana = new Banana(this);
        const lights = new BasicLights();
        const clock = new Clock(this);
        const apple = new Apple(this);
        const avocado = new Avocado(this);

        const sides = {'up': true, 'down': true, 'left': true, 'right': true};
        //const room = new Room('roomName', 100, 200, 200, sides, 0x7ec0ee)

        Global.clock = clock;
        this.add(clock, land, banana, apple, avocado, lights);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;
        //this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        
        
    }
}

export default SeedScene;
