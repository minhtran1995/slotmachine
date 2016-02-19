/*
 *******************************************************************************
 * Source file name : slotmachine.ts                                           *
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
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            //Fruits
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            //extra feature
            SlotMachine.cheat = false;
            this._fruits = ["", "Blank", "Grapes", "Banana", "Orange", "Cherry", "Bar", "Bell", "Seven"];
            SlotMachine._counter = 1000;
            //play BMG 
            createjs.Sound.stop();
            createjs.Sound.play("BMG", 0, 0, 0, -1, 0.5);
            //init result location
            this._w1x = 175;
            this._w1y = 220;
            this._w2x = 365;
            this._w2y = 220;
            this._w3x = 555;
            this._w3y = 220;
            //init player stuff
            this._playerMoney = 1000;
            this._playerBet = 0;
            this._winnings = 0;
            //Jackpot
            this._jackpot = 5000;
            //add background
            this._mainBG = new createjs.Bitmap(assets.getResult("mainBG"));
            this.addChild(this._mainBG);
            //add spin button
            this._spinButton = new objects.Button("SpinButton", config.Screen.CENTER_X + 209, config.Screen.CENTER_Y + 206, 220, 54);
            this._spinButton.on("click", this._spinButtonClick, this);
            this.addChild(this._spinButton);
            //add exit button
            this._exitButton = new objects.Button("ExitButton", config.Screen.WIDTH - 130, 662, 236, 50);
            this._exitButton.on("click", this._exitButtonClick, this);
            this.addChild(this._exitButton);
            //add reset button
            this._resetButton = new objects.Button("ResetButton", config.Screen.WIDTH - 75, 30, 102, 44);
            this._resetButton.on("click", this._resetButtonClick, this);
            this.addChild(this._resetButton);
            //add bet control +++++++++++++++++++++++++++
            //add bet
            this._plusButton = new objects.Button("PlusButton", 331, config.Screen.CENTER_Y + 206, 51, 54);
            this._plusButton.on("click", this._plusButtonClick, this);
            this.addChild(this._plusButton);
            //minus bet
            this._minusButton = new objects.Button("MinusButton", 158, config.Screen.CENTER_Y + 206, 52, 53);
            this._minusButton.on("click", this._minusButtonClick, this);
            this.addChild(this._minusButton);
            //$1 bet
            this._bet1 = new objects.Button("bet1", 50, 662, 80, 44);
            this._bet1.on("click", this._bet1ButtonClick, this);
            this.addChild(this._bet1);
            //$10 bet
            this._bet10 = new objects.Button("bet10", 125 + 15, 662, 96, 44);
            this._bet10.on("click", this._bet10ButtonClick, this);
            this.addChild(this._bet10);
            //$50 bet
            this._bet50 = new objects.Button("bet50", 208 + 30, 662, 96, 44);
            this._bet50.on("click", this._bet50ButtonClick, this);
            this.addChild(this._bet50);
            //$100 bet
            this._bet100 = new objects.Button("bet100", 296 + 45, 662, 109, 44);
            this._bet100.on("click", this._bet100ButtonClick, this);
            this.addChild(this._bet100);
            //$500 bet
            this._bet500 = new objects.Button("bet500", 391 + 60, 662, 109, 44);
            this._bet500.on("click", this._bet500ButtonClick, this);
            this.addChild(this._bet500);
            //Clear Bet Button
            this._clearBetButton = new objects.Button("ClearBetButton", 515 + 65, 662, 143, 44);
            this._clearBetButton.on("click", this._clearBetButtonClick, this);
            this.addChild(this._clearBetButton);
            //add the 3 images
            this._firstWindow = new createjs.Bitmap(assets.getResult("Blank"));
            this._firstWindow.x = this._w1x;
            this._firstWindow.y = this._w1y;
            this._secondWindow = new createjs.Bitmap(assets.getResult("Blank"));
            this._secondWindow.x = this._w2x;
            this._secondWindow.y = this._w2y;
            this._thirdWindow = new createjs.Bitmap(assets.getResult("Blank"));
            this._thirdWindow.x = this._w3x;
            this._thirdWindow.y = this._w3y;
            this.addChild(this._firstWindow);
            this.addChild(this._secondWindow);
            this.addChild(this._thirdWindow);
            // add the Player Money Label to the scene
            this._playerMoneyLabel = new objects.Label("$" + this._playerMoney.toFixed(2), "bold 25px Satisfy", "#976d1b", 115, 25);
            this.addChild(this._playerMoneyLabel);
            // add bet lable to the scene
            this._playerBetLabel = new objects.Label("$" + this._playerBet, "bold 25px Satisfy", "#976d1b", 215, config.Screen.CENTER_Y + 203);
            this.addChild(this._playerBetLabel);
            // add jackpot lable to the scene
            this._jackpotLabel = new objects.Label("$" + this._jackpot, "bold 25px Satisfy", "#ff3333", config.Screen.CENTER_X, config.Screen.CENTER_Y - 253);
            this.addChild(this._jackpotLabel);
            // add winning Money lable to the scene
            this._winningsLabel = new objects.Label("$" + this._winnings, "bold 25px Satisfy", "#976d1b", config.Screen.CENTER_X - 40, config.Screen.CENTER_Y + 203);
            this.addChild(this._winningsLabel);
            // add this scene to the global stage container
            stage.addChild(this);
            //Cheat
            shortcut.add("Ctrl+J", function () {
                swal({
                    title: "Nice !",
                    text: "You Have Enabled The Cheat Mode\nYou Will Always Win  \nJackpot Will Come Everytime You Win",
                    type: "success",
                    confirmButtonText: "K Then !"
                });
                SlotMachine.cheat = true;
                console.log(SlotMachine.cheat);
            });
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
            //shufflein 5 secconds
            //60FPS 
            if (SlotMachine._counter < 300) {
                this.shuffleImages();
                SlotMachine._counter++;
            }
            if (SlotMachine._counter == 300) {
                this.afterAnimation();
                SlotMachine._counter = 1000;
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        /* Utility function to reset all fruit tallies */
        SlotMachine.prototype.resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        SlotMachine.prototype.checkJackPot = function () {
            /* compare two random values */
            console.log(SlotMachine.cheat);
            if (SlotMachine.cheat) {
                var jackPotTry = 1;
                var jackPotWin = 1;
            }
            else {
                var jackPotTry = Math.floor(Math.random() * 51 + 1);
                var jackPotWin = Math.floor(Math.random() * 51 + 1);
            }
            if (jackPotTry == jackPotWin) {
                //play wining jackpot Sound
                createjs.Sound.stop();
                var jackpotSound = createjs.Sound.play("JackpotSound", 0, 0, 0, 0, 1);
                //play BMG right back
                jackpotSound.on("complete", this.playBMG, this);
                swal({
                    title: "Nice",
                    text: "You Won the $" + this._jackpot + " Jackpot!!",
                    type: "success",
                    confirmButtonText: "K Then !"
                });
                this._playerMoney += this._jackpot;
                this._playerMoneyLabel.text = "$" + this._playerMoney;
                this._jackpot = 1000;
                this._jackpotLabel.text = "$" + this._jackpot;
            }
        };
        SlotMachine.prototype.showWinMessage = function () {
            this.playNormalWinSound();
            this._winningsLabel.text = "$" + this._winnings;
            swal({
                title: "Nice",
                text: "You Won $" + this._winnings,
                type: "success",
                confirmButtonText: "K Then !",
                allowOutsideClick: true
            });
            this._playerMoney += this._winnings;
            this._playerMoneyLabel.text = "$" + this._playerMoney;
            this.resetFruitTally();
            this.checkJackPot();
        };
        SlotMachine.prototype.showLossMessage = function () {
            this.playLoseSound();
            swal({
                title: "Not Cool",
                text: "You Lose Your $" + (this._winnings * -1) + " Bet !",
                type: "error",
                confirmButtonText: "K Then !",
                allowOutsideClick: true
            });
            this._winningsLabel.text = "$" + this._winnings;
            this._playerMoney -= this._playerBet;
            this._playerMoneyLabel.text = "$" + this._playerMoney;
            this.resetFruitTally();
        };
        SlotMachine.prototype.determineWinnings = function () {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._bananas == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._oranges == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._cherries == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._bars == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._bells == 3) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._sevens == 3) {
                    this._winnings = this._playerBet * 100;
                }
                else if (this._grapes == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._bananas == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._oranges == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._cherries == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._bars == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._bells == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._sevens == 2) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._sevens == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                this.showWinMessage();
            }
            else {
                this._winnings = this._playerBet * (-1);
                this.showLossMessage();
            }
        };
        SlotMachine.prototype._spinButtonClick = function () {
            this.removeChild(this._firstWindow);
            this.removeChild(this._secondWindow);
            this.removeChild(this._thirdWindow);
            //Initially, there is no money, so player should not be able to spin the Reels
            if (this._playerMoney > 0) {
                if (this._playerBet == 0) {
                    //++++++++++++++++++++++++++++++++++++++++++
                    //this line will remain the same after build
                    //it will simply display a Better alert Box
                    /// <reference path="../lib/sweetalert.min.js" />
                    swal({
                        title: "Error!",
                        text: "You Should Add Some Bets To Spin The Reels !",
                        type: "error",
                        confirmButtonText: "K Then !"
                    });
                }
                else if (this._playerBet > this._playerMoney) {
                    swal({
                        title: "Error!",
                        text: "You Dont Have Enough Money To Place That Bet !",
                        type: "error",
                        confirmButtonText: "Okay !"
                    });
                }
                else if (this._playerBet <= this._playerMoney) {
                    //this will start the animation
                    //after the animation, the result will be affected
                    SlotMachine._counter = 0;
                    //play spin sound
                    this.playSpinSound();
                    //clear previous wining money
                    this._winnings = 0;
                    this._winningsLabel.text = "$" + this._winnings;
                }
            }
            else if (this._playerMoney == 0) {
                //Reset the game
                swal({
                    title: "You Are Broke !",
                    text: "Do You Want To Play The Game Again",
                    type: "info",
                    confirmButtonText: "Play Again",
                    showCancelButton: true,
                    showConfirmButton: true
                }, 
                //This function is called onConfirmButton Click
                function (isConfirm) {
                    if (isConfirm) {
                        console.log("Play Again !");
                        scene = config.Scene.SLOT_MACHINE;
                        changeScene();
                    }
                    else {
                        console.log("Do nothing !");
                    }
                });
            }
        };
        SlotMachine.prototype.afterAnimation = function () {
            console.log("Spinnn !");
            this._spinResult = this.Reels();
            //console.log(this._spinResult);
            this.determineWinnings();
            //add the 3 new images based on result
            this._firstWindow = new createjs.Bitmap(assets.getResult(this._spinResult[0]));
            this._firstWindow.x = this._w1x;
            this._firstWindow.y = this._w1y;
            this._secondWindow = new createjs.Bitmap(assets.getResult(this._spinResult[1]));
            this._secondWindow.x = this._w2x;
            this._secondWindow.y = this._w2y;
            this._thirdWindow = new createjs.Bitmap(assets.getResult(this._spinResult[2]));
            this._thirdWindow.x = this._w3x;
            this._thirdWindow.y = this._w3y;
            this.addChild(this._firstWindow);
            this.addChild(this._secondWindow);
            this.addChild(this._thirdWindow);
        };
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype.checkRange = function (value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype.Reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                if (SlotMachine.cheat) {
                    //radom from 28 => 65. That means there are no blanks
                    outCome[spin] = (Math.floor(Math.random() * 37) + 28);
                }
                else {
                    outCome[spin] = Math.floor((Math.random() * 65) + 1);
                }
                switch (outCome[spin]) {
                    case this.checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this.checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this.checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this.checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this.checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this.checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this.checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this.checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };
        //the bet after click the plus button always greater than 1, so i will eneble mouseclick 
        SlotMachine.prototype._plusButtonClick = function () {
            this.playInsertSound();
            this._playerBet++;
            this._playerBetLabel.text = "$" + this._playerBet;
            this._minusButton.mouseEnabled = true;
        };
        //if the bet is 0, there is no way to make it lower
        SlotMachine.prototype._minusButtonClick = function () {
            this.playInsertSound();
            if (this._playerBet > 0) {
                this._playerBet--;
                this._playerBetLabel.text = "$" + this._playerBet;
            }
            else {
                this._minusButton.mouseEnabled = false;
            }
        };
        //clear the playerBet;
        SlotMachine.prototype._clearBetButtonClick = function () {
            this._playerBet = 0;
            this._playerBetLabel.text = "$" + this._playerBet;
        };
        SlotMachine.prototype._bet1ButtonClick = function () {
            this.playInsertSound();
            this._playerBet += 1;
            this._playerBetLabel.text = "$" + this._playerBet;
        };
        SlotMachine.prototype._bet10ButtonClick = function () {
            this.playInsertSound();
            this._playerBet += 10;
            this._playerBetLabel.text = "$" + this._playerBet;
        };
        SlotMachine.prototype._bet50ButtonClick = function () {
            this.playInsertSound();
            this._playerBet += 50;
            this._playerBetLabel.text = "$" + this._playerBet;
        };
        SlotMachine.prototype._bet100ButtonClick = function () {
            this.playInsertSound();
            this._playerBet += 100;
            this._playerBetLabel.text = "$" + this._playerBet;
        };
        SlotMachine.prototype._bet500ButtonClick = function () {
            this.playInsertSound();
            this._playerBet += 500;
            this._playerBetLabel.text = "$" + this._playerBet;
        };
        SlotMachine.prototype._exitButtonClick = function () {
            scene = config.Scene.GAME_OVER;
            changeScene();
        };
        SlotMachine.prototype._resetButtonClick = function () {
            //I will just remove the current scene and add it back again :)
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };
        SlotMachine.prototype.playInsertSound = function () {
            var InsertCoinSound = createjs.Sound.play("InsertCoin");
        };
        SlotMachine.prototype.playBMG = function () {
            var BMG = createjs.Sound.play("BMG");
            BMG.pan = 0;
        };
        SlotMachine.prototype.playNormalWinSound = function () {
            var normalWin = createjs.Sound.play("NormalWin");
        };
        SlotMachine.prototype.playSpinSound = function () {
            var spin = createjs.Sound.play("Spin");
        };
        SlotMachine.prototype.playLoseSound = function () {
            var lose = createjs.Sound.play("Lose");
            lose.setVolume(0.5);
        };
        //shuffle images
        SlotMachine.prototype.shuffleImages = function () {
            this.removeChild(this._firstWindow);
            this.removeChild(this._secondWindow);
            this.removeChild(this._thirdWindow);
            this._firstWindow = new createjs.Bitmap(assets.getResult(this._fruits[Math.floor((Math.random() * 7) + 1)]));
            this._firstWindow.x = this._w1x;
            this._firstWindow.y = this._w1y;
            this._secondWindow = new createjs.Bitmap(assets.getResult(this._fruits[Math.floor((Math.random() * 7) + 1)]));
            this._secondWindow.x = this._w2x;
            this._secondWindow.y = this._w2y;
            this._thirdWindow = new createjs.Bitmap(assets.getResult(this._fruits[Math.floor((Math.random() * 7) + 1)]));
            this._thirdWindow.x = this._w3x;
            this._thirdWindow.y = this._w3y;
            this.addChild(this._firstWindow);
            this.addChild(this._secondWindow);
            this.addChild(this._thirdWindow);
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map