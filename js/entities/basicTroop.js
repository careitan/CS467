game.Troop = me.Entity.extend({

    init : function() {
		this.myBox = me.game.world.addChild(me.pool.pull("unitSelected"));


   },


    update : function (dt) {

    	/*
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
		*/



	   // else if (me.input.isKeyPressed('leftclick')) {
	   	if(me.input.isKeyPressed('rightclick') && this.selected === true){
	   		this.clickpos = me.input.globalToLocal(me.input.pointer.clientX, me.input.pointer.clientY);
	   		//console.log(this.pos.z);
	   		var pointerX = me.input.pointer.gameX;
	   		var pointerY = me.input.pointer.gameY;
	   		var clickSpot = new me.Renderable(pointerX, pointerY, 10, 10);
			me.game.world.forEach(function (child){
	   			if(clickSpot.overlaps(child) && child.type === 'armyUnit'){
	   					console.log("hit");
	   					this.attacking = true;
	   			}
	   		});
	   		//me.game.world.removeChild(clickSpot);
	   		this.needsMoveX = true;
	   		this.needsMoveY = true;
	   	}
	   	else if (this.needsMoveY || this.needsMoveX) {
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
	    else {
	      this.body.vel.x = 0;
	      this.body.vel.y = 0;
	    }


	    //me.video.renderer.drawImage(this.unit_sel_img, 10,10,10,10);

	    if(this.selected === true){
	    	//console.log(me.video.renderer);
   			this.myBox.width = this.width;
   			this.myBox.height = this.height;
   			this.myBox.pos.x = this.pos.x;
   			this.myBox.pos.y = this.pos.y;
   			//console.log('drawin img');
   			//me.CanvasRenderer.drawImage(this.unit_sel_img, this.pos.x, this.pos.y,0,0,0,0,0,0);
   		}
   		else{
   			this.myBox.width = 0;
   			this.myBox.height = 0;
   		}



        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
       

        //return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    	return true;
    }});
