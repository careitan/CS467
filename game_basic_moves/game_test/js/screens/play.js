game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

		me.levelDirector.loadLevel("map");

        game.selectbox = new game.selectbox();

        var sb =me.game.world.addChild(me.pool.pull("selectbox"));
        var gold1 = me.game.world.addChild(me.pool.pull("goldmine", 16, -12));
        var gold2 = me.game.world.addChild(me.pool.pull("goldmine", 905, 510));


		//me.game.world.addChild(me.pool.pull("camera"));

        //bind clicks
        me.input.bindKey(me.input.KEY.M, 'leftclick'); 
        me.input.bindPointer(me.input.KEY.M);
		me.input.bindKey(me.input.KEY.A, 'rightclick');
		me.input.bindPointer(me.input.pointer.RIGHT, me.input.KEY.A);
		me.input.bindKey(me.input.KEY.B, 'Bkey');
		me.input.bindKey(me.input.KEY.T, 'Tkey');
		me.input.bindKey(me.input.KEY.R, 'Rkey');
		me.input.bindKey(me.input.KEY.H, 'Hkey');
        //me.input.registerPointerEvent('pointerdown', me.game.viewport, this.pointerDown.bind(this));



        //Add PLAYER and AI containers
        var player = me.game.world.addChild(me.pool.pull("teamContainer", "PLAYER", "blue"));
        var ai = me.game.world.addChild(me.pool.pull("teamContainer", "AI", "red"));

    	player.initializeTeam();
    	ai.initializeTeam();
		

        player.otherTeamReference = ai;
        ai.otherTeamReference = player;

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.ScoreItem();
        me.game.world.addChild(this.HUD);

        //set handles to player container in relevant objs
        this.setPlayerContainerHandle(sb, player);
        this.setPlayerContainerHandle(gold1, player);
        this.setPlayerContainerHandle(gold2, player);
        this.setAiContainerHandle(gold1, ai);
        this.setAiContainerHandle(gold2, ai);
        this.setPlayerContainerHandle(this.HUD, player);


		//console.log('started game w/ ai difficulty set to '+me.game.world.AI_DIFFICULTY);
		//console.log("previous cookie is "+ JSON.stringify(document.cookie));
		this.refreshCookie(player,ai);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        me.game.world.forEach(function (child){
        	me.game.world.removeChild(child);
        })
    },

    //sets a handle to the player container in each object that will need it
    setPlayerContainerHandle : function(child, playerContainer) {
    	child.playerContainerHandle = playerContainer;
    },

    //sets a handle to the ai container in each object that will need it
    setAiContainerHandle : function(child, aiContainer) {
    	child.aiContainerHandle = aiContainer;
    },

    //refreshes cookie to store current game state every 10 seconds
    refreshCookie : function(player, ai) {
		me.timer.setInterval(function(){

    		// teamContainer.forEach(function (child){
    		// 	if(child.name === unitNameInPool && child.team === teamColor){
    		// 		spawnCount++;
    		// 		//console.log('counted ' + spawnCount + ' ' + unitNameInPool);
    		// 	}
    		// })

    		//clear all previous cookies 
    		clearAllCookies();
    		document.cookie = "aidifficulty="+me.game.world.AI_DIFFICULTY+";";
    		document.cookie = "playergold="+player.gold+";";
    		document.cookie = "aigold="+ai.gold+";";
    		console.log('ai gold is '+ai.gold);
    	}, 10000, false);
    },


});


//clear all cookies
//source : https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
function clearAllCookies(){
	document.cookie.split(";").forEach(function(c) {
		 document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
	 });
}


//prevent default right-click menu from popping up
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});
