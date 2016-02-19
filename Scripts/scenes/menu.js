/*
 *******************************************************************************
 * Source file name : menu.ts                                                  *
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
// MENU SCENE
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Menu.prototype.start = function () {
            //add BG
            this._menuBG = new createjs.Bitmap(assets.getResult("menuBG"));
            this.addChild(this._menuBG);
            // add the WELCOME Label to the MENU scene
            this._welcomeLabel = new objects.Label(".:Michael Slot Machine:.", "60px Satisfy", "#e4d66b", config.Screen.CENTER_X, 50);
            this.addChild(this._welcomeLabel);
            // add the WELCOME Label to the MENU scene
            this._tutorialLabel = new objects.Label("**Press F11 to switch to Full-Screen mode**" +
                "\nThis is a simple slotmachine made by me. In order to start the machine," +
                "\nyou will need to bet some money first, and then press the spin button" +
                "\nThe machine will operate and give you the result after 5 seconds." +
                "\nIt will also determine if you win or lose the bet. If you are lucky enough," +
                "\nyou will have a chance of getting the $5000 Jackpot. " +
                "\nThat is enough of talking ! Let's roll guys" +
                "\n\n\n**Press Ctrl+J after starting the game to see the magic :)", "25px Asap", "#e4d66b", config.Screen.CENTER_X, config.Screen.CENTER_Y - 90);
            this.addChild(this._tutorialLabel);
            // add the START button to the MENU scene
            this._startButton = new objects.Button("StartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 80, 178, 44);
            this.addChild(this._startButton);
            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // INTRO Scene updates here
        Menu.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // START Button click event handler
        Menu.prototype._startButtonClick = function (event) {
            // Switch to the mainGame Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };
        return Menu;
    })(objects.Scene);
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map