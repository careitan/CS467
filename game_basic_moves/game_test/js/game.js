
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        //if (!me.video.init(1728, 1152, {wrapper : "screen", scale : "auto"})) {
        if (!me.video.init(960, 576, {wrapper : "screen", scale : "1.2"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        //me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("Knight", game.Knight);
        me.pool.register("Cavalry", game.Cavalry);
        me.pool.register("Archer", game.Archer);
        me.pool.register("Recruit", game.Recruit);
        me.pool.register("selectbox", game.selectbox);
        me.pool.register("unitSelected", game.unitSelected);
        me.pool.register("peasant", game.Peasant);
        me.pool.register("barracks", game.Barracks);
		me.pool.register("camera", game.Camera);
		me.pool.register("goldmine", game.Goldmine);


        // Enable for testing
        me.debug.renderHitBox = true


        // Start the game.
        me.state.change(me.state.PLAY);


  	
    }

};

