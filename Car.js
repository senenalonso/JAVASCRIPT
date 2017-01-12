var Car =  function(model, noise){
	this.model = model;
	this.noise = noise;
	numberOfWheels = 4
};

Car.prototype.printNoise = function (){
	console.log(this.noise);
};


var Car2 =  function(model, noise){
	this.model = model;
	this.noise = noise;
	numberOfWheels = 4;

	this.printNoise = function (){
	console.log(this.noise);
	}
};