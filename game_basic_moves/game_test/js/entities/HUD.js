/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function(x, y, width, height, label) {
        // call the constructor
        this._super(me.Container, 'init', [x, y, width, height]);
        this.anchorPoint.set(0, 0);

        // persistent across level change
        this.isPersistent = true;

        //draw in front
        this.z = Infinity;

        this.floating = true;

        // make sure we use screen coordinates
        this.floating = true;

        //this.width = 100;
        //this.height = 100;

        // give a name
        this.name = "HUD";

        this.backPanel = new (me.Renderable.extend({
        	init: function() {
        		this._super(me.Renderable, 'init', [100,100,100,100]);
        	},

   /*     	draw : function(renderer) {
            	renderer.setColor('#008e99');
            	renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);

        	},*/
        }));
        this.addChild(this.backPanel);




        // add our child score object at the top left corner
        //this.addChild(new game.HUD.ScoreItem(5, 5));
    }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // local copy of the global score
        this.score = -1;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (context) {
        // draw it baby !
    }

});
