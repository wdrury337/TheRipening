export default {

    /*************************************
    * Variables
    **************************************/

    camera: null,
    scene: null,
    clock: null,

    enemies: [],
    walls: [],
    text: [],

    state: 1,

    xp: 0,
    level_xp: 0,
    level: 1,

    spawn: true,

    clock_hit_cooldown: 0,
    dice_cooldown: 0,

    /*************************************
    * Constants
    **************************************/

    // Clock
    CLOCK_ROTATION_OFFSET: .775 * Math.PI,

    // Dice
    DICE_COOLDOWN_MAX: 15,

    // Arena
    ARENA_SIZE: 20,

    // Game States
    START: 1,
    PLAY: 2, 
    DEFEAT: 3,
};