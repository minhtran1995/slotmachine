/*
 *******************************************************************************
 * Source file name : config.ts                                                *
 * Author's name : Duc Minh Tran (300771859)                                   *
 * Last Modified by : Duc Minh Tran (300771859)                                *
 * Last Modified date : Feb 2016                                               *
 * Program description : This web game, by using create js, is kind of         *
 *                     simulation of a slot machine. User can spin the Reels   *
 *                     and enjoy the fun of it                                 *
 * Revision History : 2                                                        *
 *******************************************************************************
*/
var config;
(function (config) {
    // Scene Constants
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.SLOT_MACHINE = 1;
        Scene.GAME_OVER = 2;
        Scene.LOADING = 3;
        return Scene;
    })();
    config.Scene = Scene;
    // Screen Constants
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 900;
        Screen.HEIGHT = 701;
        Screen.CENTER_X = 450;
        Screen.CENTER_Y = 350.5;
        return Screen;
    })();
    config.Screen = Screen;
    // Game Constants
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        return Game;
    })();
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map