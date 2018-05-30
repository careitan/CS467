game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

		me.levelDirector.loadLevel("map");

        // reset the score
        game.data.score = 0;
        

        game.selectbox = new game.selectbox();


        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        me.game.world.addChild(me.pool.pull("Knight", 0, 20, 'blue'));
        me.game.world.addChild(me.pool.pull("Knight", 50, 70, 'green'));
        me.game.world.addChild(me.pool.pull("Knight", 100, 120, 'red'));
        me.game.world.addChild(me.pool.pull("Knight", 150, 170, 'yellow'));
        me.game.world.addChild(me.pool.pull("Archer", 50, 20, 'blue'));
        me.game.world.addChild(me.pool.pull("Archer", 100, 70, 'green'));
        me.game.world.addChild(me.pool.pull("Archer", 150, 120, 'red'));
        me.game.world.addChild(me.pool.pull("Archer", 200, 170, 'yellow'));
        me.game.world.addChild(me.pool.pull("Cavalry", 100, 20, 'blue'));
        me.game.world.addChild(me.pool.pull("Cavalry", 150, 70, 'green'));
        me.game.world.addChild(me.pool.pull("Cavalry", 200, 120, 'red'));
        me.game.world.addChild(me.pool.pull("Cavalry", 250, 170, 'yellow'));
        me.game.world.addChild(me.pool.pull("Recruit", 150, 20, 'blue'));
        me.game.world.addChild(me.pool.pull("Recruit", 200, 70, 'green'));
        me.game.world.addChild(me.pool.pull("Recruit", 250, 120, 'red'));
        me.game.world.addChild(me.pool.pull("Recruit", 300, 170, 'yellow'));
        me.game.world.addChild(me.pool.pull("selectbox"));
        me.game.world.addChild(me.pool.pull("unitSelected"));
        me.game.world.addChild(me.pool.pull("peasant", 400, 400));
		//me.game.world.addChild(me.pool.pull("barracks", 100, 350));
		me.game.world.addChild(me.pool.pull("camera"));
        me.game.world.addChild(me.pool.pull("goldmine",450, 450));



/*
        //bind arrow keys
        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        me.input.bindKey(me.input.KEY.UP, 'up');
        me.input.bindKey(me.input.KEY.DOWN, 'down'); 
*/

        //bind clicks
        me.input.bindKey(me.input.KEY.M, 'leftclick'); 
        me.input.bindPointer(me.input.KEY.M);
		me.input.bindKey(me.input.KEY.A, 'rightclick');
		me.input.bindPointer(me.input.pointer.RIGHT, me.input.KEY.A);
		me.input.bindKey(me.input.KEY.B, 'Bkey');
        //me.input.registerPointerEvent('pointerdown', me.game.viewport, this.pointerDown.bind(this));
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});



//prevent default right-click menu from popping up
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});
