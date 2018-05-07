game.Villain = game.Troop.extend({

    /**
     * constructor
     */
    init:function (x, y) {
        // call the constructor
        var image = me.loader.getImage("villain");
        this._super(me.Entity, 'init', [300, 300, {
        	image: image,
        	width: 32,
        	height: 32}]);

        this.name = "testVillain";
		this.renderable.flipX(true);
		this.body.gravity = 0;
		console.log("VILLAIN COMIN");
	//	this.anchorPoint.set(10, 10);
		this.body.setVelocity(1, 1);
		this.body.collisionType = me.collision.types.ENEMY_OBJECT;
		this.alwaysUpdate = true;
	//	this.renderable.addAnimation('walk', [2, 3, 4, 5, 6], 100);
	//	this.renderable.addAnimation('walkV', [12], 100);
	//	this.renderable.addAnimation('stand', [0, 1], 300);
	//	this.renderable.addAnimation('standV', [1, 2], 300);
	//	this.renderable.addAnimation('fire', [14]);
	//	this.renderable.setCurrentAnimation('walk');
		this.needsMoveX = false;
		this.needsMovey = false;
		this.clickpos = null;
		this.autoTransform = true;
		//this.unit_sel_img = me.loader.getImage("unit_selected");
		this.selected = false;
		//console.log(this);

		this.type = 'armyUnit';
		this.hasSelectBox = false;
		this.myBox = me.game.world.addChild(me.pool.pull("unitSelected"));
		this.attacking = false;

		// Unit Traits
		this.hp = 15;
		this.attack = 3;
		this.attackType = "melee";
		this.body.setVelocity(1, 1);
		this.armor = 0;
   }});