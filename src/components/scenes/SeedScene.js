import { Scene, Color } from 'three';
import { Clock, Land, Banana, Room, Apple, Avocado, Dice} from 'objects';
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
        const clock = new Clock(this);
        Global.clock = clock;

        const lights = new BasicLights();
        const land = new Land();

        const apple = new Apple(this);
        const avocado = new Avocado(this);
        const banana = new Banana(this);
        Global.enemies.push(apple);
        Global.enemies.push(avocado);
        Global.enemies.push(banana);

        const sides = {"up": true, 'down': true, 'left': true, 'right': true};
        new Room(this, 0, 0, 20, 0x700000, sides);
        console.log(Global.walls)
        
        
        this.state.clock = clock;
        this.add(clock, land, banana, lights);
        Global.clock = clock;
        this.add(clock, land, banana, apple, avocado, lights, dice);

    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        
        
    }
}

export default SeedScene;
