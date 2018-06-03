game.Barracks = game.BasicProductionBuilding.extend({

    /**
     * constructor
     */
    init : function(x, y, team, teamContainer) {
    	if (team === 'yellow') {
        	var image = me.loader.getImage("barracks_yellow");
        }
        else if (team === 'blue') {
        	var image = me.loader.getImage("barracks_blue");
        }
        else if (team === 'red') {
        	var image = me.loader.getImage("barracks_red");
        }
        else if (team === 'green') {
        	var image = me.loader.getImage("barracks_green");
        }
        // call the constructor
        this._super(me.Entity, 'init', [x, y, {
        	image: image,
        	width: 128,
        	height: 128}]);

        this.name = "barracks";
        this.type = 'building';

		// Unit Traits
		this.hp = 15;
		this.attack = 3;
		this.attackType = "melee";

		this.armor = 0;

		

		//reset collision make smaller
		this.body.removeShape(this.body.getShape(0));
		this.body.addShape(new me.Rect(0,0,128,93));
		this.body.getShape(0).translate(0,20);
		this.teamContainer = teamContainer;
		
	//***FIX - temp disable spawning while units etc. being finalized ***
	//	this.spawnId = this._super(game.BasicProductionBuilding, 'spawnUnit', ['Knight', 3000, 10, this.pos.x, this.pos.y]);
	//	console.log(this.spawnId);
   },



    update : function (dt) {


		if (this.hp <= 0) {
			this.alive = false;
			//stop spawning units since the building is dead
			me.timer.clearInterval(this.spawnId);
			me.game.world.removeChild(this);
			var deadUnit = this;
			me.game.world.forEach(function (child){
	   			if(child.type === 'armyUnit' && child.attacker === deadUnit){
	   					child.attacker = null;
	   					child.beingAttacked = false;
	   					child.engaged = false;
	   			}
	   		})
			
		}
		// First attempt at making the targeted unit begin to counterattack. Currently the original attacker gets locked in combat
		// even after its target has been killed. Needs revision. -tb 5/9/18
		//if (!this.attacking && this.beingAttacked) {
		//	this.attacking = true;
		//	this.myTarget = this.attacker;
		//	this.clickpos = this.myTarget.pos;
		//}


/*
	   // else if (me.input.isKeyPressed('leftclick')) DEPRECATED
	   	if(me.input.isKeyPressed('rightclick') && this.selected === true){
	   		// Need to make sure that these flags are cleared whenever a new right click is registered -tb
	   		this.attacking = false;
	   		this.attackTaget = false;
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
			me.game.world.forEach(function (child){
	   			if(clickSpot.overlaps(child) && child.type === 'armyUnit' && child != myself){
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
	    	
	    	// Unit has satisfied the movement criteria for both axes. -tb
		    if (!Ycontinue && !Xcontinue){
		    	this.needsMoveY = false;
		    	this.needsMoveX = false;
		    }
	    }
	    else {
	      this.body.vel.x = 0;
	      this.body.vel.y = 0;
	    }

	    // The attacking flag is triggered if the unit is targeting another unit and has been pursuing it.
	    // There is a check to make sure that the attacker has reached its target before inflicting any damage.
	    // The engaged flag is just there to handle the initial strike. It is used to trigger the collection of a baseline timestamp.
	    // Once the current time reaches the baseline timestamp plus the attack delay, the attack handler is called. -tb
    	if (this.attacking && !this.needsMoveX && !this.needsMoveY) {
    		var tick = me.timer.getTime();
    		if (!this.engaged) {
    			this.nextAttackTick = (tick + 1000);
    			this.engaged = true;
    		}
    		else if (tick > this.nextAttackTick) {
    			this.attackHandler(this, this.myTarget);
    			this.nextAttackTick = tick + 1000;
    		}
    	}


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

*/


    	return true;
    },


});