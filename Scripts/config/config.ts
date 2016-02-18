module config {

    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static SLOT_MACHINE: number = 1;
        public static GAME_OVER: number = 2;
        public static LOADING: number = 3;
    }
    
    
    // Screen Constants
    export class Screen {
        public static WIDTH: number = 900;
        public static HEIGHT: number = 701;
        public static CENTER_X: number = 450;
        public static CENTER_Y: number = 350.5;
    }
    
    // Game Constants
    export class Game {
        public static FPS: number = 60;
    }
}