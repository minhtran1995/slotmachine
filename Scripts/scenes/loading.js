var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// LOADING SCENE
var scenes;
(function (scenes) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Loading() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Loading.prototype.start = function () {
            //add background
            this._mainBG = new createjs.Bitmap("../../Assets/images/loading.jpg");
            //i tried to get height and width of a bitmap            
            this._mainBG.regX = this._mainBG.getBounds().width * 0.5;
            this._mainBG.regY = this._mainBG.getBounds().height * 0.5;
            this._mainBG.x = config.Screen.CENTER_X;
            this._mainBG.y = config.Screen.CENTER_Y - 150;
            this.addChild(this._mainBG);
            this._preloader = new createjs.Bitmap("../../Assets/images/preloader.png");
            //i tried to get height and width of a bitmap            
            this._preloader.regX = this._preloader.getBounds().width * 0.5;
            this._preloader.regY = this._preloader.getBounds().height * 0.5;
            this._preloader.x = config.Screen.CENTER_X;
            this._preloader.y = config.Screen.CENTER_Y + 50;
            this.addChild(this._preloader);
            //adding label
            this._lodingLable = new objects.Label("Loading", "25px Arial", "#ff751a", config.Screen.CENTER_X, config.Screen.CENTER_Y + 130);
            this.addChild(this._lodingLable);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // INTRO Scene updates here
        Loading.prototype.update = function () {
            this._preloader.rotation += 10;
        };
        return Loading;
    })(objects.Scene);
    scenes.Loading = Loading;
})(scenes || (scenes = {}));
//# sourceMappingURL=loading.js.map