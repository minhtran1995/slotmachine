// GAME_OVER SCENE
module scenes {
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startOverButton: objects.Button;
        private _gameOverLabel: objects.Label;
        private _overBG: createjs.Bitmap;

        private static _flag: number;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            GameOver._flag = 1;
                
            //add BG
            this._overBG = new createjs.Bitmap(assets.getResult("OverBG"));
            this.addChild(this._overBG);
            
            // add the gameOver Label to the MENU scene
            this._gameOverLabel = new objects.Label(
                "GAME OVER",
                "60px Satisfy",
                "#e4d66b",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y - 30);
            this.addChild(this._gameOverLabel);      
                   
            // add the START button to the MENU scene
            this._startOverButton = new objects.Button(
                "StartOverButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 80, 150, 44);
            this.addChild(this._startOverButton);
            
            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
           
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {
            
            //Freetime Animation
            if (GameOver._flag <= 180) {
                this._startOverButton.x += 1;
                GameOver._flag++;
            }
            else if (GameOver._flag > 180 && GameOver._flag < 360 + 180) {
                this._startOverButton.x -= 1;
                GameOver._flag++;
            }
            else {
                GameOver._flag = -180;
            }




        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startOverButtonClick(event: createjs.MouseEvent) {

            createjs.Sound.stop();
            scene = config.Scene.MENU;
            changeScene();
        }

    }
}