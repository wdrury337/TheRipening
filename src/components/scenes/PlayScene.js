import { Scene, Color, Vector3 } from 'three';
import { Floor, Wall, StartText} from 'objects';
import { BasicLights } from 'lights';
import { Global, spawnRandom } from 'global';

class PlayScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0xccffff);

        // Add lights, text, and floor
        const lights = new BasicLights();
        const text = new StartText(this);
        const floor = new Floor(this, 20);

        // Wall colors
        const pink = 0xffb6c1;
        const purple = 0xcbc3e3;
        const green = 0xccffcc;
        const blue = 0x7ec0ee;

        // Wall orientations
        const left = new Vector3(0, 0, 0);
        const right = new Vector3(Math.PI, 0, 0);
        const front = new Vector3(0, 3*Math.PI/2, 0);
        const back = new Vector3(Math.PI, Math.PI/2, 0);

        const arenaRadius = Global.ARENA_SIZE/2;
        const lWall = new Wall(this, 0, arenaRadius, Global.ARENA_SIZE, 5, green, right);
        const rWall = new Wall(this, 0, -arenaRadius, Global.ARENA_SIZE, 5, purple, left);
        const fWall = new Wall(this, arenaRadius, 0, Global.ARENA_SIZE, 5, pink, front);
        const bWall = new Wall(this, -arenaRadius, 0, Global.ARENA_SIZE, 5, blue, back);     

        // Add all the objects to the initial scene
        this.add(floor, lWall, rWall, fWall, bWall, text, lights);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;

        // Update die cooldown 
        if (Global.dice_cooldown > 0) Global.dice_cooldown -= 1;
            
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        } 
    }
}

export default PlayScene;
