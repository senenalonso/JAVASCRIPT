
/*function welcomeBuilder(course) {
	return function (name) {
		console.log("Welcome " + name + ", to the course " + course + " for Dummies. This is the welcome nunmber: " + index++);
	}
}

var index = 1;
var cursoJS = welcomeBuilder("Javascript");
var cursoRUBY = welcomeBuilder("Ruby");

cursoJS("Senén");
cursoRUBY("Javier");

*/

function getSeatPassenger(name, passengers) {

	for(var i = 0; i < passengers.length; i++){

		if (passengers[i] == name) {
			return function () {
				console.log("The passenger " + name + " is seatted in the number: " + (i+1))	;
			}
		}

	}

	return function () {
		console.log("The passenger " + name + " isn't in the passenger List")	;
	}
}

var passengerList = ["Senén", "Javier", "Rodrigo"];
var employeeList = ["Senén", "Javier", "Rodrigo", "Marta"];

employeeList.forEach( function(name) {
	getSeatPassenger(name, passengerList)();
});
