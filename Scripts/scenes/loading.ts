// LOADING SCENE
module scenes {
    export class Loading extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _mainBG: createjs.Bitmap;
        private _preloader: createjs.Bitmap;
        private _lodingLable: objects.Label;

        private _queue: createjs.LoadQueue;
        private static _flag: boolean;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            Loading._flag = false;
              
            //this part require a preload
            this._queue = new createjs.LoadQueue();
            this._queue.installPlugin(createjs.Sound);
            this._queue.loadManifest([
                { id: "PreloaderImage", src: "../../Assets/images/preloader.png" },
                { id: "MainBG", src: "../../Assets/images/loading.jpg" },
            ]);
            this._queue.on("complete", this.addBitMaps, this);

                   
            //adding label
            this._lodingLable = new objects.Label("Loading",
                "25px Arial",
                "#ff751a",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 130);
            this.addChild(this._lodingLable);
            
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {
            //im making sure that the preloader images is loaded, and then it will be modified here
            if (Loading._flag) {
                this._preloader.rotation += 10;
            }
        }


        public addBitMaps(): void {
            //add background
            this._mainBG = new createjs.Bitmap(this._queue.getResult("MainBG"));
            
            //i tried to get height and width of a bitmap            
            this._mainBG.regX = this._mainBG.getBounds().width * 0.5;
            this._mainBG.regY = this._mainBG.getBounds().height * 0.5;

            this._mainBG.x = config.Screen.CENTER_X;
            this._mainBG.y = config.Screen.CENTER_Y - 150;
            this.addChild(this._mainBG);
            
            this._preloader = new createjs.Bitmap(this._queue.getResult("PreloaderImage"));
            //i tried to get height and width of a bitmap            
            this._preloader.regX = this._preloader.getBounds().width * 0.5;
            this._preloader.regY = this._preloader.getBounds().height * 0.5;

            this._preloader.x = config.Screen.CENTER_X;
            this._preloader.y = config.Screen.CENTER_Y + 50;
            this.addChild(this._preloader);
            Loading._flag = true;
        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        
       
    }
}