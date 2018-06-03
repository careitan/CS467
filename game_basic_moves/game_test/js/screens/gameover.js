game.GameOverScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
       	this.font = new me.Font("Arial", 20, "#FFD700");
    	this.font.textAlign = "right";


    	me.game.world.addChild(new me.ColorLayer("background", "#000000"), 1);
	    //this.font.draw(me.renderer, me.game.world.endState, 230, 140);



	    let wording = new (me.Renderable.extend({

            init : function() {
                this._super(me.Renderable, 'init', [480, 288, me.game.viewport.width, me.game.viewport.height]);
                this.font = new me.Font("Arial", 32, "#FFD700");
    			this.font.textAlign = "center";
            },

            draw : function(renderer) {
                this.font.draw(renderer, me.game.world.endState, this.pos.x+480, this.pos.y+288);
                    
            },
            update : function(dt) {
                return true;
            },
        }));

        me.game.world.addChild(wording, 2);

    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        ; // TODO
    }
});
