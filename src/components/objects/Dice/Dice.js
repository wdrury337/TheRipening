import { Box3, Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './dice.gltf';
import { Globals, intersectsEnemy } from '../../../global';

class Dice extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init
        this.state = { 
            direction: Globals.clock.position.clone().normalize(),
        }

        // Load object
        const loader = new GLTFLoader();

        this.name = 'dice';
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.multiplyScalar(1 / 200);
            gltf.scene.position.set(-1, 0, -1);
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        const newPos = this.position.add(
            this.state.direction.clone().multiplyScalar(Globals.DICE_MOVEMENT_SPEED)
        );
        // Check to see if new position is out of bounds
        // const diceBox = new Box3().setFromObject(this);
        // if (intersectsEnemy(this.))
    }
}

export default Dice;
