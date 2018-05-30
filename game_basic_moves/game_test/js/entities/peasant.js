game.Peasant = game.Troop.extend({

    /**
     * constructor
     */
    init : function(x, y) {
        // call the constructor
        var image = me.loader.getImage("peasant");
        this._super(me.Entity, 'init', [x, y, {
        	image: image,
        	width: 32,
        	height: 32}]);

        this.name = "peasant";
		this.renderable.flipX(true);
		this.body.gravity = 0;
		//this.floating = true;
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;
		this.alwaysUpdate = true;
	//	this.renderable.addAnimation('walk', [2, 3, 4, 5, 6], 100);
	//	this.renderable.addAnimation('walkV', [12], 100);
	//	this.renderable.addAnimation('stand', [0, 1], 300);
	//	this.renderable.addAnimation('standV', [1, 2], 300);
	//	this.renderable.addAnimation('fire', [14]);
	//	this.renderable.setCurrentAnimation('walk');
		this.needsMoveX = false;
		this.needsMovey = false;
		this.autoTransform = true;
		//this.unit_sel_img = me.loader.getImage("unit_selected");
		this.selected = false;
		this.mining = false;
		this.miningId = null;
		//console.log(this);

		this.type = 'armyUnit';
		this.myBox = me.game.world.addChild(me.pool.pull("unitSelected"));

		// Unit Traits
		this.hp = 15;
		this.attack = 3;
		this.attackType = "melee";
		this.body.setVelocity(1, 1);
		this.armor = 0;

		this.oneBarracksOnlyForNowUntilResourcesImplemented = false;
		console.log('Select peasant and press B to build a barracks!');

		//reset collision make smaller
		this.body.removeShape(this.body.getShape(0));
		this.body.addShape(new me.Rect(0,0,13,13));
		//this.anchorPoint.set(0.5, .5);
		this.clickpos = me.input.globalToLocal(0,0);
   },

    update : function (dt) {
    	if (this.selected === true && me.input.isKeyPressed('Bkey')) {
    		if(this.oneBarracksOnlyForNowUntilResourcesImplemented === false){
    			me.game.world.addChild(me.pool.pull("barracks", this.pos.x+12, this.pos.y-100));
    			this.oneBarracksOnlyForNowUntilResourcesImplemented = true;
    		}
	    }

    	//call regular troop update
    	this._super(game.Troop, 'update', [dt]);
    },


    givePlayerGold : function(goldPerFiveSeconds) {
    	var id = me.timer.setInterval(function(){
    		console.log('giving ' + goldPerFiveSeconds + ' gold!');
    	}, 5000, false);

    	return id;
    }
});