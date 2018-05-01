game.Knight = me.Entity.extend({

    /**
     * constructor
     */
    init:function () {
        // call the constructor
        var image = me.loader.getImage("knight");
        this._super(me.Entity, 'init', [0, 0, {
        	image: image,
        	width: 32,
        	height: 32}]);

        this.name = "testKnight";
		this.renderable.flipX(true);
		this.body.gravity = 0;
		console.log("KNIGHT COMIN");
	//	this.anchorPoint.set(10, 10);
		this.body.setVelocity(1, 1);
	//	this.body.collisionType = me.collision.types.PLAYER_OBJECT;
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
		//console.log(this);
   },

    /**
     * update the entity
     */
    update : function (dt) {

	    //ARROW KEY MOVEMENT
	    if (me.input.isKeyPressed('left')) {
	      // flip the sprite on horizontal axis
	      this.renderable.flipX(false);

	      // update the entity velocity
	      this.body.vel.x -= this.body.accel.x * me.timer.tick;
	    }
	    else if (me.input.isKeyPressed('right')) {
	      // unflip the sprite
	      this.renderable.flipX(true);

	      // update the entity velocity
	      this.body.vel.x += this.body.accel.x * me.timer.tick;
	    }
	    else if (me.input.isKeyPressed('up')) {
	      // update the entity velocity
	      this.body.vel.y -= this.body.accel.y * me.timer.tick;
	    }
	    else if (me.input.isKeyPressed('down')) {
	      // update the entity velocity
	      this.body.vel.y += this.body.accel.y * me.timer.tick;
	    }
	   // else if (me.input.isKeyPressed('leftclick')) {
	   	else if(me.input.isKeyPressed('leftclick')){
	   		this.needsMoveX = true;
	   		this.needsMoveY = true;
		    this.clickpos = me.input.globalToLocal(me.input.pointer.clientX, me.input.pointer.clientY);
	   	}
	   	else if (this.needsMoveY || this.needsMoveX) {
	      // update the entity velocity
	      //this.body.vel.y += this.body.accel.y * me.timer.tick;
		   console.log(this.clickpos);
		   /*while (this.pos.x != clickpos.x &&
		   			this.pos.y != clickpos.y) {
		    	console.log("MOVING");
		    	if(this.pos.x < clickpos.x) {
		    		this.body.vel.x += this.body.accel.x * me.timer.tick;
		    	}
		    	else if(this.pos.x > clickpos.x) {
		    		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		    	}
		    	else {
		    		this.body.vel.x = 0;
		    	}
		    	if(this.pos.y < clickpos.y) {
		    		this.body.vel.y += this.body.accel.y * me.timer.tick;
		    	}
		    	else if(this.pos.y > clickpos.y) {
		    		this.body.vel.y -= this.body.accel.y * me.timer.tick;
		    	}
		    	else {
		    		this.body.vel.x = 0;
		    	}
		    	
		   }*/

		    //X MOVEMENT
	   		if(this.needsMoveX && this.pos.x < this.clickpos.x - 16){
		    	this.renderable.flipX(true);
		    	this.body.vel.x += this.body.accel.x * me.timer.tick;

		    	//stop moving if close
		    	if(this.pos.x < this.clickpos.x - 15 && this.pos.x > this.clickpos.x - 17){
		    		this.needsMoveX = false;
		    		this.body.vel.x = 0;
		    	}
		    }
		  	else if(this.needsMoveX && this.pos.x > this.clickpos.x - 16){
	    	    this.renderable.flipX(false);
		    	this.body.vel.x -= this.body.accel.x * me.timer.tick;

		    	if(this.pos.x < this.clickpos.x - 15 && this.pos.x > this.clickpos.x - 17){
		    		this.needsMoveX = false;
		    		this.body.vel.x = 0;
		    	}
		    }
		    else{
		    	this.needsMoveX = false;
		    }


		    //Y MOVEMENT
	   		if(this.needsMoveY && this.pos.y < this.clickpos.y - 16){
		    	this.body.vel.y += this.body.accel.y * me.timer.tick;

		    	if(this.pos.y < this.clickpos.y - 15 && this.pos.y > this.clickpos.y - 17){
		    		this.needsMoveY = false;
		    		this.body.vel.y = 0;
		    	}
		    }
		  	else if(this.needsMoveY && this.pos.y > this.clickpos.y - 16){
		    	this.body.vel.y -= this.body.accel.y * me.timer.tick;


		    	if(this.pos.y < this.clickpos.y - 15 && this.pos.y > this.clickpos.y - 17){
		    		this.needsMoveY = false;
		    		this.body.vel.y = 0;
		    	}
		    }		  
		    else{
		    	this.needsMoveY = false;
		    }

		   





	    }
		else if (me.input.isKeyPressed('rightlick')) {
	      // update the entity velocity
	      this.body.vel.x += this.body.accel.x * me.timer.tick;
	    }
	    else {
	      this.body.vel.x = 0;
	      this.body.vel.y = 0;
	    }






        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
       

        //return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    	return true;
    },







// onActivate function
 onActivateEvent: function () {
    // register on the 'pointerdown' event
    me.input.registerPointerEvent('pointerdown', me.game.viewport, this.pointerDown.bind(this));
    console.log("CLICK");
 },

 // pointerDown event callback
 pointerDown: function (pointer) {
   // do something
   console.log("CLICKPOINTERDOWN");
   // don"t propagate the event to other objects
   return false;
 },







   /**
     * colision handler
     * (called when colliding with other objects)
     */
//    onCollision : function (response, other) {
        // Make all other objects solid
//        return true;
//    }

 

});
