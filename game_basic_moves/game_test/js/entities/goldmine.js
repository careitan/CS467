game.Goldmine = game.BasicProductionBuilding.extend({

    /**
     * constructor
     */
    init : function(x, y) {
        // call the constructor
        var image = me.loader.getImage("goldmine");
        this._super(me.Entity, 'init', [x, y, {
        	image: image,
        	width: 64,
        	height: 64}]);

        this.name = "goldmine";


	
		

		//reset collision make smaller
		this.body.removeShape(this.body.getShape(0));
		this.body.addShape(new me.Rect(0,0,64,64));
		this.body.getShape(0).translate(0,0);

		//this.spawnId = this._super(game.BasicProductionBuilding, 'spawnUnit', ['testKnight', 3000, 10, this.pos.x, this.pos.y]);
		//console.log(this.spawnId);
   },



    update : function (dt) {
    	var gmine = this;
		me.game.world.forEach(function (child){
   			if(child.name === 'peasant'){
   				if(gmine.overlaps(child)){
	   				if(child.mining === false){
		   				child.mining = true;
		   				console.log('peasant mining +1 gold!');
		   				child.miningId = child.givePlayerGold(1);
		   			}
		   		}
		   		else{
		   			if(child.mining === true){
		   				child.mining = false;
		   				me.timer.clearInterval(child.miningId);
		   			}
	   			}
   			}
   		})
		



    	return false;
    },



});