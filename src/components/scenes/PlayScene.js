import { Scene, Color, Vector3 } from 'three';
import { Clock, Banana, Apple, Avocado, Floor, Wall} from 'objects';
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
        this.name = "scene";

        // Set background to a nice color
        this.background = new Color(0xccffff);

        // Add meshes to scene
        const clock = new Clock(this);
        Global.clock = clock;

        const lights = new BasicLights();

        const apple = new Apple(this);
        const avocado = new Avocado(this);
        const banana = new Banana(this);
        Global.enemies.push(apple);
        Global.enemies.push(avocado);
        Global.enemies.push(banana);

        const floor = new Floor(this, 20);

        const arenaRadius = Global.ARENA_SIZE/2;

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

        const lWall = new Wall(this, 0, arenaRadius, Global.ARENA_SIZE, 5, pink, right);
        const rWall = new Wall(this, 0, -arenaRadius, Global.ARENA_SIZE, 5, purple, left);
        const fWall = new Wall(this, arenaRadius, 0, Global.ARENA_SIZE, 5, green, front);
        const bWall = new Wall(this, -arenaRadius, 0, Global.ARENA_SIZE, 5, blue, back);     
        
        // Clock here refers to the player
        this.state.clock = clock;
        Global.clock = clock;

        // Add all the objects to the initial scene
        this.add(clock, banana, apple, avocado, floor, lWall, rWall, fWall, bWall, lights);

    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;

        // Update die cooldown 
        if (Global.DICE_COOLDOWN > 0) Global.DICE_COOLDOWN -= 1;
            
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }

        // Spawn new
        if (Global.SPAWN){
            
            spawnRandom();
            spawnRandom();

            Global.SPAWN = false;
        }  
    }
}

export default PlayScene;