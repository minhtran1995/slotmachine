// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startButton: objects.Button;
        private _welcomeLabel: objects.Label;
        private _tutorialLabel:objects.Label;
        private _menuBG:createjs.Bitmap;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            //add BG
            this._menuBG = new createjs.Bitmap(assets.getResult("menuBG"));
            this.addChild(this._menuBG);
            
            // add the WELCOME Label to the MENU scene
            this._welcomeLabel = new objects.Label(
                ".:Michael Slot Machine:.",
                "60px Satisfy",
                "#e4d66b",
                config.Screen.CENTER_X,
                50);
            this.addChild(this._welcomeLabel);
            
             // add the WELCOME Label to the MENU scene
            this._tutorialLabel = new objects.Label(
                "**Press F11 to switch to Full-Screen mode**"+
                "\nThis is a simple slotmachine made by me. In order to start the machine,"+
                "\nyou will need to bet some money first, and then press the spin button"+
                "\nThe machine will operate and give you the result after 5 seconds."+
                "\nIt will also determine if you win or lose the bet. If you are lucky enough,"+
                "\nyou will have a chance of getting the $5000 Jackpot. "+
                "\nThat is enough of talking ! Let's roll guys"+
                "\n\n\n**Press Ctrl+J after starting the game to see the magic :)",
                "25px Asap",
                "#e4d66b",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y-90);
            this.addChild(this._tutorialLabel);
                   
            // add the START button to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 80,
                178, 44
            );
            this.addChild(this._startButton);
            
            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);
           
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            // Switch to the mainGame Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }

    }
}