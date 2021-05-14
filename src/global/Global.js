export default {

    // Objects
    camera: null,
    scene: null,
    clock: null,
    enemies: [],
    walls: [],
    state: 1,

    /*************************************
    * Constants
    **************************************/

    // Clock
    MOVEMENT_SPEED: .1,
    CLOCK_ROTATION_OFFSET: .75 * Math.PI,
    DISTANCE_TO_CAMERA: 10,
    CLOCK_HIT_COOLDOWN: 0,
    CLOCK_KICKBACK: .24,
    XP: 0,
    LEVEL_XP: 0,
    LEVEL: 1,

    // Dice
    DICE_ROTATION_SPEED: -.1,
    DICE_MOVEMENT_SPEED: .3,
    DICE_COOLDOWN: 0,
    DICE_COOLDOWN_MAX: 15,
    DICE_KICKBACK: .05,

    // Arena
    ARENA_SIZE: 20,

    // Flags
    SPAWN: false,

    // Game States
    START: 1,
    PLAY: 2, 
    DEFEAT: 3,
};