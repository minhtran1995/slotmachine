/*
 *******************************************************************************
 * Source file name : game.ts                                                  *
 * Author's name : Duc Minh Tran (300771859)                                   *
 * Last Modified by : Duc Minh Tran (300771859)                                *
 * Last Modified date : Feb 2016                                               *
 * Program description : This web game, by using create js, is kind of         *
 *                     simulation of a slot machine. User can spin the Reels   *
 *                     and enjoy the fun of it                                 *
 * Revision History : 2                                                        *
 *******************************************************************************
*/
/// <reference path = "_reference.ts" />
// global variables
var assets;
var canvas;
var stage;
var stats;
var currentScene;
var scene;
// Game Scenes
var loading;
var menu;
var slotMachine;
var gameOver;
var assetData = [
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "Nextbutton", src: "../../Assets/images/Nextbutton.png" },
    { id: "SpinButton", src: "../../Assets/images/spinBtn.jpg" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "StartOverButton", src: "../../Assets/images/StartOverButton.png" },
    { id: "ExitButton", src: "../../Assets/images/QuitButton.png" },
    { id: "QuitButton", src: "../../Assets/images/QuitButton.png" },
    { id: "mainBG", src: "../../Assets/images/slotmachine-fixed.png" },
    { id: "menuBG", src: "../../Assets/images/menuBG-fixed.jpg" },
    { id: "OverBG", src: "../../Assets/images/GameOver-fixed.jpg" },
    { id: "ResetButton", src: "../../Assets/images/ResetButton.png" },
    { id: "StartOverButton", src: "../../Assets/images/StartOverButton.png" },
    //bet buttons
    { id: "PlusButton", src: "../../Assets/images/addBet.jpg" },
    { id: "MinusButton", src: "../../Assets/images/minusBet.jpg" },
    { id: "ClearBetButton", src: "../../Assets/images/ClearBetButton.png" },
    { id: "bet1", src: "../../Assets/images/bet1.png" },
    { id: "bet10", src: "../../Assets/images/bet10.png" },
    { id: "bet50", src: "../../Assets/images/bet50.png" },
    { id: "bet100", src: "../../Assets/images/bet100.png" },
    { id: "bet500", src: "../../Assets/images/bet500.png" },
    //Fruits
    { id: "Blank", src: "../../Assets/images/blank.jpg" },
    { id: "Grapes", src: "../../Assets/images/grapes.jpg" },
    { id: "Banana", src: "../../Assets/images/banana.jpg" },
    { id: "Orange", src: "../../Assets/images/orange.jpg" },
    { id: "Cherry", src: "../../Assets/images/cherries.jpg" },
    { id: "Bar", src: "../../Assets/images/bar.jpg" },
    { id: "Bell", src: "../../Assets/images/bell.jpg" },
    { id: "Seven", src: "../../Assets/images/seven.jpg" },
    //sound
    { id: "InsertCoin", src: "../../Assets/sounds/InsertCoins.mp3" },
    { id: "BMG", src: "../../Assets/sounds/BMG.mp3" },
    { id: "JackpotSound", src: "../../Assets/sounds/jackpot.mp3" },
    { id: "NormalWin", src: "../../Assets/sounds/normalWin.mp3" },
    { id: "Spin", src: "../../Assets/sounds/spin.mp3" },
    { id: "Lose", src: "../../Assets/sounds/lose.mp3" },
    { id: "Ping", src: "../../Assets/sounds/Ping.mp3" },
];
function preload() {
    scene = config.Scene.MENU;
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", changeScene, this);
    assets.loadManifest(assetData);
}
function init() {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    // create our main display list container
    stage = new createjs.Stage(canvas);
    // Enable mouse events
    stage.enableMouseOver(20);
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    // sets up our stats counting workflow
    setupStats();
    // set initial scene
    scene = config.Scene.LOADING;
    changeScene();
    preload();
}
// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event) {
    // start collecting stats for this frame
    stats.begin();
    // calling State's update method
    currentScene.update();
    // redraw/refresh stage every frame
    stage.update();
    // stop collecting stats for this frame
    stats.end();
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// Finite State Machine used to change Scenes
function changeScene() {
    stage.removeAllChildren();
    // Launch various scenes
    switch (scene) {
        case config.Scene.LOADING:
            // show the loading scene            
            loading = new scenes.Loading();
            currentScene = loading;
            console.log("Starting loading Scene");
            break;
        case config.Scene.MENU:
            // show the MENU scene            
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the PLAY scene            
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the game OVER scene
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    console.log(currentScene.numChildren);
}
//make sure to call this outside
window.onload = init;
//# sourceMappingURL=game.js.map