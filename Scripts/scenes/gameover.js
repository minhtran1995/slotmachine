/*
 *******************************************************************************
 * Source file name : gameover.ts                                              *
 * Author's name : Duc Minh Tran (300771859)                                   *
 * Last Modified by : Duc Minh Tran (300771859)                                *
 * Last Modified date : Feb 2016                                               *
 * Program description : This web game, by using create js, is kind of         *
 *                     simulation of a slot machine. User can spin the Reels   *
 *                     and enjoy the fun of it                                 *
 * Revision History : 1                                                        *
 *******************************************************************************
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// GAME_OVER SCENE
var scenes;
(function (scenes) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function GameOver() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        GameOver.prototype.start = function () {
            GameOver._flag = 1;
            //add BG
            this._setupBackground("OverBG");
            this._fadeIn(500);
            // add the gameOver Label to the MENU scene
            this._gameOverLabel = new objects.Label("GAME OVER", "60px Satisfy", "#e4d66b", config.Screen.CENTER_X, config.Screen.CENTER_Y - 30);
            this.addChild(this._gameOverLabel);
            // add the START button to the MENU scene
            this._startOverButton = new objects.Button("StartOverButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 80, 150, 44);
            this.addChild(this._startOverButton);
            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // INTRO Scene updates here
        GameOver.prototype.update = function () {
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
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // START Button click event handler
        GameOver.prototype._startOverButtonClick = function (event) {
            createjs.Sound.stop();
            scene = config.Scene.MENU;
            changeScene();
        };
        return GameOver;
    })(objects.Scene);
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map