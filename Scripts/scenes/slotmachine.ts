/*
 *******************************************************************************
 * Source file name : slotmachine.ts                                           *
 * Author's name : Duc Minh Tran (300771859)                                   *
 * Last Modified by : Duc Minh Tran (300771859)                                *
 * Last Modified date : Feb 2016                                               *
 * Program description : This web game, by using create js, is kind of         *
 *                     simulation of a slot machine. User can spin the Reels   *
 *                     and enjoy the fun of it                                 *
 * Revision History : 2.1                                                      *
 * References:                                                                 *
 * 1.)http://www.catswhocode.com/blog/using-keyboard-shortcuts-in-javascript   *
 *******************************************************************************
*/

// MENU SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _playerMoneyLabel: objects.Label;
        private _playerBetLabel: objects.Label;
        private _jackpotLabel: objects.Label;
        private _winningsLabel: objects.Label;
        private _mainBG: createjs.Bitmap;
        private _spinButton: objects.Button;
        private _exitButton: objects.Button;
        private _resetButton: objects.Button;
        private _firstWindow: createjs.Bitmap;
        private _secondWindow: createjs.Bitmap;
        private _thirdWindow: createjs.Bitmap;
        private _spinResult;
        private _jackpot: number;


        //bet control
        private _plusButton: objects.Button;
        private _minusButton: objects.Button;
        private _clearBetButton: objects.Button;
        private _bet1: objects.Button;
        private _bet10: objects.Button;
        private _bet50: objects.Button;
        private _bet100: objects.Button;
        private _bet500: objects.Button;
        private _playerBet: number;


        //Fruits

        private _grapes: number = 0;
        private _bananas: number = 0;
        private _oranges: number = 0;
        private _cherries: number = 0;
        private _bars: number = 0;
        private _bells: number = 0;
        private _sevens: number = 0;
        private _blanks: number = 0;

        // result location
        private _w1x: number;
        private _w1y: number;
        private _w2x: number;
        private _w2y: number;
        private _w3x: number;
        private _w3y: number;

        //player stuff
        private _playerMoney: number;
        private _winnings: number;

        //Extra feature
        public static cheat: boolean;
        private _fruits;
        private static _counter: number;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {
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
            
            this._setupBackground("mainBG");
            this._fadeIn(500);
            
            

            //add spin button
            this._spinButton = new objects.Button(
                "SpinButton",
                config.Screen.CENTER_X + 209,
                config.Screen.CENTER_Y + 206,
                220, 54);
            this._spinButton.on("click", this._spinButtonClick, this);


            this.addChild(this._spinButton);


            //add exit button
            this._exitButton = new objects.Button(
                "ExitButton",
                config.Screen.WIDTH - 130,
                662,
                236, 50);
            this._exitButton.on("click", this._exitButtonClick, this);

            this.addChild(this._exitButton);

            //add reset button
            this._resetButton = new objects.Button(
                "ResetButton",
                config.Screen.WIDTH - 75,
                30,
                102, 44);
            this._resetButton.on("click", this._resetButtonClick, this);

            this.addChild(this._resetButton);

            //add bet control +++++++++++++++++++++++++++

            //add bet
            this._plusButton = new objects.Button(
                "PlusButton",
                331, config.Screen.CENTER_Y + 206,
                51, 54);
            this._plusButton.on("click", this._plusButtonClick, this);

            this.addChild(this._plusButton);

            //minus bet
            this._minusButton = new objects.Button(
                "MinusButton",
                158, config.Screen.CENTER_Y + 206,
                52, 53);
            this._minusButton.on("click", this._minusButtonClick, this);

            this.addChild(this._minusButton);


            //$1 bet
            this._bet1 = new objects.Button(
                "bet1",
                50, 662,
                80, 44);
            this._bet1.on("click", this._bet1ButtonClick, this);

            this.addChild(this._bet1);

            //$10 bet
            this._bet10 = new objects.Button(
                "bet10",
                125 + 15, 662,
                96, 44);
            this._bet10.on("click", this._bet10ButtonClick, this);

            this.addChild(this._bet10);

            //$50 bet
            this._bet50 = new objects.Button(
                "bet50",
                208 + 30, 662,
                96, 44);
            this._bet50.on("click", this._bet50ButtonClick, this);

            this.addChild(this._bet50);

            //$100 bet
            this._bet100 = new objects.Button(
                "bet100",
                296 + 45, 662,
                109, 44);
            this._bet100.on("click", this._bet100ButtonClick, this);

            this.addChild(this._bet100);

            //$500 bet
            this._bet500 = new objects.Button(
                "bet500",
                391 + 60, 662,
                109, 44);
            this._bet500.on("click", this._bet500ButtonClick, this);

            this.addChild(this._bet500);

            //Clear Bet Button
            this._clearBetButton = new objects.Button(
                "ClearBetButton",
                515 + 65, 662,
                143, 44);
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
            this._playerMoneyLabel = new objects.Label(
                "$" + this._playerMoney.toFixed(2),
                "bold 25px Satisfy",
                "#976d1b",
                115,
                25);
            this.addChild(this._playerMoneyLabel);

            // add bet lable to the scene
            this._playerBetLabel = new objects.Label(
                "$" + this._playerBet,
                "bold 25px Satisfy",
                "#976d1b",
                215,
                config.Screen.CENTER_Y + 203);
            this.addChild(this._playerBetLabel);

            // add jackpot lable to the scene
            this._jackpotLabel = new objects.Label(
                "$" + this._jackpot,
                "bold 25px Satisfy",
                "#ff3333",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y - 253);
            this.addChild(this._jackpotLabel);

            // add winning Money lable to the scene
            this._winningsLabel = new objects.Label(
                "$" + this._winnings,
                "bold 25px Satisfy",
                "#976d1b",
                config.Screen.CENTER_X - 40,
                config.Screen.CENTER_Y + 203);
            this.addChild(this._winningsLabel);


            // add this scene to the global stage container
            stage.addChild(this);



            //Cheatmode    
            
            //This Section is copied from http://www.catswhocode.com/blog/using-keyboard-shortcuts-in-javascript
            //I have been doing some modifications to full-fill my goal of this project       

            var ctrlKeyHold = false;
            
            //make sure only ctrl + J works 
            document.onkeyup = function(e) {
                if (e.which == 17) ctrlKeyHold = false;
            }
            document.onkeydown = function(e) {
                if (e.which == 17) ctrlKeyHold = true;  //code:17 = ctrl down
                if (e.which == 74 && ctrlKeyHold == true) { //code:74 = button J down
                    SlotMachine.cheat = true;
                    alert('Cheatmode Enabled! \nThere will be no losing\nJackpot comes everytime');
                    return false;
                }
            }
            //End

        }

        // SLOT_MACHINE Scene updates here
        
        public update(): void {

            //shufflein 5 secconds
            //60FPS 
            if (SlotMachine._counter < 350) {
                //disable the spin button                
                this._spinButton.mouseEnabled = false;

                if (SlotMachine._counter < 120) {
                    this.shuffleFirstImage(); 
                    this.shuffleSecondImage();
                    this.shuffleThirdImage();
                }
                else if (SlotMachine._counter == 120) {
                    this._firstWindow.image = assets.getResult(this._spinResult[0]);                    
                    createjs.Sound.play("Ping");

                }
                else if (SlotMachine._counter < 220) {
                    this.shuffleSecondImage();
                    this.shuffleThirdImage();
                }
                else if (SlotMachine._counter == 220) {
                    this._secondWindow.image = assets.getResult(this._spinResult[1]);                    
                    createjs.Sound.play("Ping");

                }
                else if (SlotMachine._counter < 299) {
                    this.shuffleThirdImage();
                }
                else if (SlotMachine._counter == 299) {
                    this._thirdWindow.image = assets.getResult(this._spinResult[2]); 
                    createjs.Sound.play("Ping");
                }

                SlotMachine._counter++;

            }

            //++++++ After a bit delay, show the message

            if (SlotMachine._counter == 350) {
                this.afterAnimation();
                SlotMachine._counter = 1000;
                
                //enable spin button for the next spin                
                this._spinButton.mouseEnabled = true;
            }



        }


        //EVENT HANDLERS ++++++++++++++++++++




        /* Utility function to reset all fruit tallies */
        public resetFruitTally() {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }

        public checkJackPot() {
            /* compare two random values */

            console.log(SlotMachine.cheat);

            if (SlotMachine.cheat) {
                var jackPotTry = 1;
                var jackPotWin = 1;
            } else {
                var jackPotTry = Math.floor(Math.random() * 51 + 1);
                var jackPotWin = Math.floor(Math.random() * 51 + 1);
            }


            if (jackPotTry == jackPotWin) {
                //play wining jackpot Sound
                createjs.Sound.stop();
                var jackpotSound = createjs.Sound.play("JackpotSound", 0, 0, 0, 0, 1);
                //play BMG right back
                jackpotSound.on("complete", this.playBMG, this);

                alert("You Won the $" + this._jackpot + " Jackpot!!")

                this._playerMoney += this._jackpot;
                this._playerMoneyLabel.text = "$" + this._playerMoney;
                this._jackpot = 1000;
                this._jackpotLabel.text = "$" + this._jackpot;
            }
        }
        public showWinMessage(): void {
            this.playNormalWinSound();
            this._winningsLabel.text = "$" + this._winnings;

            alert("You Won $" + this._winnings)
            this._playerMoney += this._winnings;
            this._playerMoneyLabel.text = "$" + this._playerMoney;
            this.resetFruitTally();
            this.checkJackPot();
        }
        public showLossMessage(): void {
            this.playLoseSound();


            alert("You Lose Your $" + (this._winnings * -1) + " Bet !");

            this._winningsLabel.text = "$" + this._winnings;
            this._playerMoney -= this._playerBet;
            this._playerMoneyLabel.text = "$" + this._playerMoney;
            this.resetFruitTally();
        }


        public determineWinnings(): void {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._winnings = this._playerBet * 10;
                } else if (this._bananas == 3) {
                    this._winnings = this._playerBet * 20;
                } else if (this._oranges == 3) {
                    this._winnings = this._playerBet * 30;
                } else if (this._cherries == 3) {
                    this._winnings = this._playerBet * 40;
                } else if (this._bars == 3) {
                    this._winnings = this._playerBet * 50;
                } else if (this._bells == 3) {
                    this._winnings = this._playerBet * 75;
                } else if (this._sevens == 3) {
                    this._winnings = this._playerBet * 100;
                } else if (this._grapes == 2) {
                    this._winnings = this._playerBet * 2;
                } else if (this._bananas == 2) {
                    this._winnings = this._playerBet * 2;
                } else if (this._oranges == 2) {
                    this._winnings = this._playerBet * 3;
                } else if (this._cherries == 2) {
                    this._winnings = this._playerBet * 4;
                } else if (this._bars == 2) {
                    this._winnings = this._playerBet * 5;
                } else if (this._bells == 2) {
                    this._winnings = this._playerBet * 10;
                } else if (this._sevens == 2) {
                    this._winnings = this._playerBet * 20;
                } else if (this._sevens == 1) {
                    this._winnings = this._playerBet * 5;
                } else {
                    this._winnings = this._playerBet * 1;
                }

                this.showWinMessage();
            } else {
                this._winnings = this._playerBet * (-1);
                this.showLossMessage();
            }
        }

        public _spinButtonClick(): void {


            console.log("Spinnn !")
            //Initially, there is no money, so player should not be able to spin the Reels
            if (this._playerMoney > 0) {
                if (this._playerBet == 0) {

                    //++++++++++++++++++++++++++++++++++++++++++
                    //this line will remain the same after build
                    //it will simply display a Better alert Box
                    /// <reference path="../lib/sweetalert.min.js" />

                    alert("You Should Add Some Bets To Spin The Reels !")
                } else if (this._playerBet > this._playerMoney) {


                    alert("You Dont Have Enough Money To Place That Bet !")
                } else if (this._playerBet <= this._playerMoney) {
                    
                    //this will start the animation
                    //after the animation, the result will be affected
                    SlotMachine._counter = 0;
                    //play spin sound
                    this.playSpinSound();
                    
                    //determine result now, then show animation
                    this.beforeAnimation();
                    
                    //clear previous wining money
                    this._winnings = 0;
                    this._winningsLabel.text = "$" + this._winnings;
                }
            } else if (this._playerMoney == 0) {
                //Reset the game

               
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    console.log("Play Again !");
                    scene = config.Scene.SLOT_MACHINE;
                    changeScene();
                }
                else {
                    console.log("Nothing !");
                }

            }

        }


        public beforeAnimation(): void {
            //i try to collect the spin result before do the animation
            this._spinResult = this.Reels();


        }

        public afterAnimation(): void {


            this.determineWinnings();            

            /*
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
            this.addChild(this._thirdWindow);*/
        }


        /* Utility function to check if a value falls within a range of bounds */
        public checkRange(value, lowerBounds, upperBounds): number | boolean {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            } else {
                return !value;
            }
        }

        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        public Reels() {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                if (SlotMachine.cheat) {
                    //radom from 28 => 65. That means there are no blanks
                    outCome[spin] = (Math.floor(Math.random() * 37) + 28);
                } else {
                    outCome[spin] = Math.floor((Math.random() * 65) + 1);
                }
                switch (outCome[spin]) {
                    case this.checkRange(outCome[spin], 1, 27): // 41.5% probability
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this.checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this.checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this.checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this.checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this.checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this.checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this.checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        }



        //the bet after click the plus button always greater than 1, so i will eneble mouseclick 
        public _plusButtonClick(): void {
            this.playInsertSound();
            this._playerBet++;
            this._playerBetLabel.text = "$" + this._playerBet;
            this._minusButton.mouseEnabled = true;
        }

        //if the bet is 0, there is no way to make it lower
        public _minusButtonClick(): void {
            this.playInsertSound();
            if (this._playerBet > 0) {
                this._playerBet--;
                this._playerBetLabel.text = "$" + this._playerBet;
            } else {
                this._minusButton.mouseEnabled = false;
            }


        }

        //clear the playerBet;
        public _clearBetButtonClick(): void {
            this._playerBet = 0;
            this._playerBetLabel.text = "$" + this._playerBet;
        }


        public _bet1ButtonClick(): void {
            this.playInsertSound();
            this._playerBet += 1;
            this._playerBetLabel.text = "$" + this._playerBet;
        }
        public _bet10ButtonClick(): void {
            this.playInsertSound();
            this._playerBet += 10;
            this._playerBetLabel.text = "$" + this._playerBet;
        }
        public _bet50ButtonClick(): void {
            this.playInsertSound();
            this._playerBet += 50;
            this._playerBetLabel.text = "$" + this._playerBet;
        }
        public _bet100ButtonClick(): void {
            this.playInsertSound();
            this._playerBet += 100;
            this._playerBetLabel.text = "$" + this._playerBet;
        }
        public _bet500ButtonClick(): void {
            this.playInsertSound();
            this._playerBet += 500;
            this._playerBetLabel.text = "$" + this._playerBet;
        }

        public _exitButtonClick(): void {
            //window.open('', '_self', '');
            //window.close();
            this._fadeOut(500, () => {
            scene = config.Scene.GAME_OVER;
            changeScene();
            });

        }

        public _resetButtonClick(): void {
            //I will just remove the current scene and add it back again :)

            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }

        public playInsertSound(): void {
            var InsertCoinSound = createjs.Sound.play("InsertCoin");
        }

        public playBMG(): void {
            var BMG = createjs.Sound.play("BMG");
            BMG.pan = 0;
        }

        public playNormalWinSound(): void {
            var normalWin = createjs.Sound.play("NormalWin");
        }

        public playSpinSound(): void {
            var spin = createjs.Sound.play("Spin");
        }

        public playLoseSound(): void {
            var lose = createjs.Sound.play("Lose");
            lose.setVolume(1);
        }
        
        
        //shuffle images
        public shuffleFirstImage(): void {
            this._firstWindow.image = assets.getResult(this._fruits[Math.floor((Math.random() * 7) + 1)]);

        }

        public shuffleSecondImage(): void {
            this._secondWindow.image = assets.getResult(this._fruits[Math.floor((Math.random() * 7) + 1)]);
        }

        public shuffleThirdImage(): void {
            this._thirdWindow.image = assets.getResult(this._fruits[Math.floor((Math.random() * 7) + 1)]);
        }

    }
}