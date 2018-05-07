game.selectbox = me.Renderable.extend({

    /**
     * constructor
     */
    init : function () {
        // call the constructor
        //this._super(me.Renderable, "init", [0,0,0,0]);
        this._super(me.Renderable, "init", [100,100,100,100]);
        //console.log(this);


        this.name = "selectbox";
	//	this.body.gravity = 0;
		this.anchorPoint.set(0, 0);
	//	this.body.setVelocity(1, 1);
		this.alwaysUpdate = true;
		this.moved = false;
		this.clickpos = null;
		this.setOpacity(.4);
        },

        draw : function(renderer) {
            renderer.setColor('#FF0000');
            renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);

        },
    /**
     * update the entity
     */
    update : function (dt) {
    	//initial left click
	   	if(me.input.isKeyPressed('leftclick') && !this.moved){
	   		//console.log(this.pos.z);
		    this.clickpos = me.input.globalToLocal(me.input.pointer.clientX, me.input.pointer.clientY);
		    this.pos.x = this.clickpos.x;
	   		this.pos.y = this.clickpos.y;
	   		this.moved = true;
	   	}
	   	//drag while still holding left click
	   	else if(me.input.isKeyPressed('leftclick')){
	   		var dragpos = me.input.globalToLocal(me.input.pointer.clientX, me.input.pointer.clientY);
	   		this.height = dragpos.y - this.clickpos.y;
	   		this.width = dragpos.x - this.clickpos.x;

	   		/*
	   		//minimum box size so single click targeting works
	   		if(this.height <= 4){
	   			this.height = 16;
	   		}	   		
	   		if(this.width <= 4){
	   			this.width = 16;
	   		}
	   		*/
	   	}
	   	else{
	   		//releasing left click
	   		if(this.moved == true){
	   			var selectbox = this;

	   			//reposition selector box if width or height were negative
	   			//(w or h is negative if mouse moves up or left while dragging)
	   			if(selectbox.height < 0){
	   				selectbox.pos.y = selectbox.pos.y + selectbox.height;
	   				selectbox.height = Math.abs(selectbox.height);
	   			}
	   			if(selectbox.width < 0){
	   				selectbox.pos.x = selectbox.pos.x + selectbox.width;
	   				selectbox.width = Math.abs(selectbox.width);
	   			}

	   			
	   			//select army units
	   			me.game.world.forEach(function (child){
	   				if(selectbox.overlaps(child) && child.type === 'armyUnit'){
	   					child.selected = true;
	   				}
	   				else if(child.type === 'armyUnit'){
	   					child.selected = false;
	   				}
	   			});

	   			//add building selection here?
	   			//condition = can't select army units and buildings at same time
	   			//or maybe for now just make buildings automatically create units every X seconds
	   			//to at least get something basic working

	   		}
	   		this.moved = false;
	   		this.height = 0;
	   		this.width = 0;
	   	}
	   	

	   	
	   	/*
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




*/

        // apply physics to the body (this moves the entity)
        //this.body.update(dt);

        // handle collisions against other shapes
        //me.collision.check(this);

        // return true if we moved or if the renderable was updated
       

        //return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    	return false;
    },






/*
// onActivate function
 onActivateEvent: function () {
    // register on the 'pointerdown' event
    me.input.registerPointerEvent('pointerup', me.game.viewport, this.pointerUp.bind(this));
    console.log("CLICK");
 },

 // pointerDown event callback
 pointerUp: function (pointer) {
   // do something
   this.anchorPoint.set(0,0);
   console.log("CLICKPOINTERUP");
   // don"t propagate the event to other objects
   return true;
 },

*/





   /**
     * colision handler
     * (called when colliding with other objects)
     */
//    onCollision : function (response, other) {
        // Make all other objects solid
//        return true;
//    }

 

});
