export default {

    // Objects
    camera: null,
    scene: null,
    clock: null,
    enemies: [],
    walls: [],
    /*************************************
    * Constants
    **************************************/

    // Clock
    MOVEMENT_SPEED: .1,
    CLOCK_ROTATION_OFFSET: .75 * Math.PI,
    DISTANCE_TO_CAMERA: 10,
    CLOCK_HIT_COOLDOWN: 0,

    // Dice
    DICE_ROTATION_SPEED: -.1,
    DICE_MOVEMENT_SPEED: .2,
    DICE_COOLDOWN: 0,

    // Arena
    ARENA_SIZE: 20,

        // Flags
    SPAWN: false,
    GAMEOVER: false
};