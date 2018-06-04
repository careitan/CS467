game.teamContainer = me.Container.extend({

    init : function(PLAYER_OR_AI, team) {
    	this._super(me.Container, "init");
    	//"PLAYER" or "AI"
    	this.PLAYER_OR_AI = PLAYER_OR_AI;
		this.team = team;
		this.gold = 50;
		this.otherTeamReference = null;
		this.numBarracks = 0;
		this.numTavern = 0;
		this.numCastle = 0;
		this.numRange = 0;
		this.numStables = 0;
		//this.army = [];
		//this.peasants = [];
		if(PLAYER_OR_AI === "PLAYER"){
			this.name = "playerContainer";
		}
		else if(PLAYER_OR_AI === "AI"){
			this.name = "aiContainer";
		}

		if(me.game.world.LOAD_FROM_COOKIE){
			console.log("LOAD_FROM_COOKIE INIT ACTIVATED");
			this.loadFromCookie();
		}
		
   },

   initializeTeam : function() {
   		if(this.PLAYER_OR_AI == "PLAYER") {
			this.addUnitToContainer("castle", 760, 410);
   			this.addUnitToContainer("peasant", 770, 515);
   			this.addUnitToContainer("peasant", 800, 515);
   			this.addUnitToContainer("peasant", 830, 515);
   			this.addUnitToContainer("peasant", 860, 515);
   		}
   		else if(this.PLAYER_OR_AI == "AI") {
			this.addUnitToContainer("castle", 50, 50);
   			this.addUnitToContainer("peasant", 60, 155);
   			this.addUnitToContainer("peasant", 90, 155);
   			this.addUnitToContainer("peasant", 120, 155);
   			this.addUnitToContainer("peasant", 150, 155);
   		}
   		else{
   			console.log("init team error : team is " + this.team);
   		}
   },

   addUnitToContainer : function(unitName, x, y) {
   		var unit = me.pool.pull(unitName, x, y, this.team, this);
   		this.addChild(unit);  
   		unit.teamContainer = this;
   },

   loadFromCookie : function() {
   		//take cookie apart; split into unit, building functions; else gold or ai difficulty
   		console.log('loadin from cooki');
   },


});