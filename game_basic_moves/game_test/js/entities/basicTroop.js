game.Troop = me.Entity.extend({

    init : function() {
		this.clickpos = me.input.globalToLocal(0,0);
		this.team = team;
		this.myTarget = null;
		this.attacking = false;
		this.beingAttacked = false;
		this.attacker = null;
		this.alive = true;
		this.engagedInCombat = false;
		this.nextAttackTick = 999999999;
		this.alwaysUpdate = true;
		this.teamContainer = null;
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

		// TODO: Make it possible for units to kite each other. This would probably be implemented by locking a unit in place if it
		// has an attack queued.

		if (this.hp <= 0) {
			this.alive = false;
			this.teamContainer.removeChild(this.myBox);
			this.teamContainer.removeChild(this);
			var deadUnit = this;
			this.teamContainer.forEach(function (child){
	   			if(child.type === 'armyUnit' && child.attacker === deadUnit){
	   					child.attacker = null;
	   					child.beingAttacked = false;
	   					child.engagedInCombat = false;
	   			}
	   		})
			
		}
		// First attempt at making the targeted unit begin to counterattack. Currently the original attacker gets locked in combat
		// even after its target has been killed. Needs revision. -tb 5/9/18
		// Fixed by implementing a living/dead check on the unit registered as the 'attacker' of the unit in question. -tb 5/14/18
		if (this.attacker != null) {
			if (!this.attacking && this.beingAttacked && this.attacker.alive) {
				this.attacking = true;
				this.myTarget = this.attacker;
				this.clickpos = this.myTarget.pos;
			}
		}

		// Some checks to handle unit death and clear flags -tb 5/14/18
		if (this.attacking) {
			if (!this.myTarget.alive) {
				this.attacking = false;
				this.attackTarget = false;
				this.engagedInCombat = false;
			}
		}
		if (this.attacker != null) {
			if (!this.attacker.alive) {
				this.attacker = null;
			}
		}

		// Handles distance from target calculations for attack purposes. Differentiates between combat styles -tb 5/14/18
		if (this.attacking) {
			if (this.attackType === 'melee') {
				var distanceToTargetX = Math.abs(this.pos.x - this.myTarget.pos.x);
				var distanceToTargetY = Math.abs(this.pos.y - this.myTarget.pos.y);
				//console.log(distanceToTargetX);
				//console.log(distanceToTargetY);
				if (distanceToTargetX > 17 || distanceToTargetY > 17) {
					this.needsMoveX = true;
					this.needsMoveY = true;
					this.engagedInCombat = false;
				}
			}
			if (this.attackType === 'ranged') {
				var distanceToTargetX = Math.abs(this.pos.x - this.myTarget.pos.x);
				var distanceToTargetY = Math.abs(this.pos.y - this.myTarget.pos.y);
				//console.log(distanceToTargetX);
				//console.log(distanceToTargetY);
				if (distanceToTargetX > this.attackRange || distanceToTargetY > this.attackRange) {
					this.needsMoveX = true;
					this.needsMoveY = true;
					this.engagedInCombat = false;
				}
			}
		}



	   // else if (me.input.isKeyPressed('leftclick')) DEPRECATED
	   	if(me.input.isKeyPressed('rightclick') && this.selected === true){
	   		// Need to make sure that these flags are cleared whenever a new right click is registered -tb
	   		this.attacking = false;
	   		this.attackTaget = false;
	   		this.engagedInCombat = false;
	   		this.beingAttacked = false;
	   		// Using these local variables because I was running into scope issues inside of the forEach function below when trying
	   		// to directly assign values to class variables using the 'this' keyword -tb
	   		var pointerX = me.input.pointer.gameX;
	   		var pointerY = me.input.pointer.gameY;
	   		var clickSpot = new me.Renderable(pointerX, pointerY, 0, 0);
	   		var attackRegistered = false;
	   		var attackTarget = null;
	   		var myself = this;
	   		// This is ugly and I'm sure there is a better way to pick a unit than spawning a 0x0 rect and seeing what overlaps it.
	   		// But it is all I've been able to get to work so far. -tb
			this.teamContainer.otherTeamReference.forEach(function (child){
	   			if(clickSpot.overlaps(child) && (child.type === 'armyUnit' || child.type ==='building') && (child != myself) && (child.team != myself.team)){
	   					attackRegistered = true;
	   					attackTarget = child;
	   			}
	   		})
	   		if (attackRegistered) {
	   			// Here the scope has changed so I can refer to the unit using the keyword -tb
	   			this.attacking = true;
	   			this.myTarget = attackTarget;
	   		}
			if(this.attacking === true){
				// If attacking is true, set the destination to be equal to the location of the targeted unit -tb
				this.clickpos = this.myTarget.pos;
			}
			else {
	   		this.clickpos = me.input.globalToLocal(me.input.pointer.clientX, me.input.pointer.clientY);
	   		}

	   		//me.game.world.removeChild(clickSpot);
	   		this.needsMoveX = true;
	   		this.needsMoveY = true;
	   	}
	   	else if (this.needsMoveY || this.needsMoveX) {
	   		// I set up these vars to track whether criteria is met for ending movement on both axes and only turn off movement when both are satisfied. -tb
	   		var Xcontinue = true;
	   		var Ycontinue = true;
		    //X MOVEMENT
	   		if(this.needsMoveX && this.pos.x < this.clickpos.x - 16){
		    	this.renderable.flipX(true);
		    	this.body.vel.x += this.body.accel.x * me.timer.tick;

		    	//stop moving if close
		    	// Changed 15 to 10 in these lines. Seemed to resolve an issue where unit would get stuck on corner and flip back and forth indefinitely. -tb
		    	if(this.pos.x < this.clickpos.x - 10 && this.pos.x > this.clickpos.x - 17){
		    		Xcontinue = false;
		    		this.body.vel.x = 0;
		    	}
		    }
		  	else if(this.needsMoveX && this.pos.x > this.clickpos.x + 16){
	    	    this.renderable.flipX(false);
		    	this.body.vel.x -= this.body.accel.x * me.timer.tick;

		    	if(this.pos.x < this.clickpos.x - 10 && this.pos.x > this.clickpos.x - 17){
		    		Xcontinue = false;
		    		this.body.vel.x = 0;
		    	}
		    }
		    else{
		    	Xcontinue = false;
		    }


		    //Y MOVEMENT
	   		if(this.needsMoveY && this.pos.y < this.clickpos.y - 16){
		    	this.body.vel.y += this.body.accel.y * me.timer.tick;

		    	if(this.pos.y < this.clickpos.y - 10 && this.pos.y > this.clickpos.y - 17){
		    		Ycontinue = false;
		    		this.body.vel.y = 0;
		    	}
		    }
		  	else if(this.needsMoveY && this.pos.y > this.clickpos.y + 16){
		    	this.body.vel.y -= this.body.accel.y * me.timer.tick;


		    	if(this.pos.y < this.clickpos.y - 10 && this.pos.y > this.clickpos.y - 17){
		    		Ycontinue = false;
		    		this.body.vel.y = 0;
		    	}
		    }		  
		    else{
		    	Ycontinue = false;
		    }

		    // Stopping conditions for ranged units must be handled differently from those of melee units, but movement calculations are
		    // identical, so the check can be performed here at the end of the block -tb 5/14/18
		    if (this.attackType === 'ranged' && this.attacking) {
		    	var distanceToTargetX = Math.abs(this.pos.x - this.myTarget.pos.x);
				var distanceToTargetY = Math.abs(this.pos.y - this.myTarget.pos.y);
				//console.log(distanceToTargetX);
				//console.log(distanceToTargetY);
				if (distanceToTargetX <= this.attackRange && distanceToTargetY <= this.attackRange) {
					this.needsMoveX = false;
					this.needsMoveY = false;
			    }
			}
	    	
		    	// Unit has satisfied the movement criteria for both axes. -tb
			    if (!Ycontinue && !Xcontinue){
			    	this.needsMoveY = false;
			    	this.needsMoveX = false;
			    }
	  		}
	  	
	    if (!this.needsMoveX && !this.needsMoveY) {
	      this.body.vel.x = 0;
	      this.body.vel.y = 0;
	    }

	    // The attacking flag is triggered if the unit is targeting another unit and has been pursuing it.
	    // There is a check to make sure that the attacker has reached its target before inflicting any damage.
	    // The engagedInCombat flag is just there to handle the initial strike. It is used to trigger the collection of a baseline timestamp.
	    // Once the current time reaches the baseline timestamp plus the attack delay, the attack handler is called. -tb
    	if (this.attacking && !this.needsMoveX && !this.needsMoveY) {
    		var tick = me.timer.getTime();
    		if (!this.engagedInCombat) {
    			this.nextAttackTick = (tick + 1000);
    			this.engagedInCombat = true;
    		}
    		else if (tick > this.nextAttackTick) {
    			this.attackHandler(this, this.myTarget);
    			this.nextAttackTick = tick + 1000;
    		}
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
    },

    // The attack handler takes both entities engaged in combat as its parameters
    // It deducts the 'attack strength' value of the attacking unit from the hp pool of the defending unit. -tb
    attackHandler : function (attacker, target) {
    	// The next line is currently unused but will enable the targeted unit to fight back -tb
    	target.attacker = attacker;
    	target.beingAttacked = true;
    	target.hp = target.hp - attacker.attack;
    	console.log(target.hp);
    	if (target.hp <= 0) {
    		attacker.myTarget = null;
    		attacker.engagedInCombat = false;
    		attacker.attacking = false;
    	}
    	return true;
    },
    
    
    
    
	/// colision handler
	onCollision : function (response) {
		//response.a = entity that is moving
		//response.b = entity that a collided with
		//stop moving if colliding with b &&
		// a is trying to move to a point that is inside b
		//console.log(response.a.clickpos.x);
		if(response.b.containsPoint(response.a.clickpos.x, response.a.clickpos.y)){
	   		response.a.needsMoveY = false;
	   		response.a.needsMoveX = false;
	   	}
		//else if(response.a.containsPoint(response.b.clickpos.x, response.b.clickpos.y)){
	   	//	response.b.needsMoveY = false;
	   	//	response.b.needsMoveX = false;
	   	//}
	


	   	//NOTE: currently slightly buggy with cavalry/fast units
		//BUILDING/WORLD COLLISION
		if(response.a.type === 'building' || response.b.type === 'building'){
		    //X AXIS COLLISION
		    //UNIT IS ON BOTTOM OF BUILDING
		    if(response.overlapV.y < 0){
		    	if(response.a.type === 'armyUnit'){
		    		response.a.pos.y++;
		    		//console.log('col1');
		    	}
		    	else{
		    		response.b.pos.y--;
		    	}
		    }
		    //UNIT IS ON TOP OF BUILDING
		    else if(response.overlapV.y > 0){
		    	if(response.a.type === 'armyUnit'){
		    		response.a.pos.y--;
		    		//console.log('col2');
		    	}
		    	else{
		    		response.b.pos.y++;
		    	}
		    }
		    //Y AXIS COLLISION
		    //UNIT IS TO RIGHT OF BUILDING
		    if(response.overlapV.x < 0){
		    	if(response.a.type === 'armyUnit'){
		    		response.a.pos.x++;
		    		//console.log('col3');
		    	}
		    	else{
		    		response.b.pos.x--;
		    	}
		    }
		    //UNIT IS TO LEFT OF BUILDING
		    else if(response.overlapV.x > 0){
		    	if(response.a.type === 'armyUnit'){
		    		response.a.pos.x--;
		    		//console.log('col4');
		    	}
		    	else{
		    		response.b.pos.x++;
		    	}
		    }
		}




	   	//UNIT COLLISION
		//ONE COLLISION ALTERNATIVE: PUSH EACH OTHER
		else if(response.a.type === 'armyUnit' && response.b.type === 'armyUnit'){
		    //X AXIS COLLISION
		    //a's bottom edge collided with b (a is on top)
		    if(response.overlapV.y < 0){
		   		//a move up and b move down
		   		response.a.pos.y++;
		   		response.b.pos.y--;
		    }
		    //a's top edge collided with b (a is on bottom)
		    else if(response.overlapV.y > 0){
		   		//a move down and b move up
		   		response.a.pos.y--;
		   		response.b.pos.y++;
		    }
		    //Y AXIS COLLISION
		    //a's right edge collided with b (a is on b's left)
		    if(response.overlapV.x < 0){
		   		//a move left and b move right
		   		response.a.pos.x--;
		   		response.b.pos.x++;
		    }
		    //a's left edge collided with b (a is on b's right)
		    else if(response.overlapV.x > 0){
		   		//a move right and b move left
		   		response.a.pos.x++;
		   		response.b.pos.x--;
		    }
		}
		

	    // Make the object solid
	    // false because this is only the illusion of collision
	    // returning true causes strange teleporting behavior
	    return false;
	},

	
	
});
