
window.onload = function(){
	//sendJQUERY();
}

function sendAJAX() {

	var llamada = new XMLHttpRequest();

	llamada.onreadystatechange = recibirrespuesta;

	llamada.open("GET", "https://ironhack-characters.herokuapp.com/characters");

	llamada.send();
}

	function recibirrespuesta(event) {

		var httpRequest = event.currentTarget;

		if (httpRequest.readyState == 0){
			console.log('00000000000');
		}

		if (httpRequest.readyState == 1){
			console.log('1111111111');
		}

		if (httpRequest.readyState == 2){
			console.log('2222222222');
		}


		if (httpRequest.readyState == 3){
			console.log('Loading...');
		}

		if (httpRequest.readyState == 4 && httpRequest.status == 200){
			var respuesta = JSON.parse( httpRequest.response );
			console.log(respuesta);
		}

};

function sendJQUERY() {
		$.ajax({
			url: 'https://ironhack-characters.herokuapp.com/characters',
			type: 'GET',
			dataType: 'json',
			success: showCharacters2,
			error: handleError
		})
};

function showCharacters(response) {
	var charactersArray = response;

	charactersArray.forEach( function(theCharacter) {
		var html = `
			<li> 
				<h2>${theCharacter.name}</h2>
			</li>
		`;
		$('.js-character-list').append(html);
		console.log(html)
	});
};

function showCharacters2(characters) {
	var list = $('.js-character-list');

	characters.forEach( function(character) {
		var element = $('<li>')
			.append($('<h2>')
				.text(character.name + ' - ' + character.occupation)
		);
		list.append(element);
	});
	console.log('Success: ', characters);
};

function handleError(error) {
				console.log("error");
				console.log(error.responseText);
			}

function sendPOST() {
	$('form').on('submit', function(e){
		e.preventDefault();
		var Data = {};
		data.name = $('input[name=name]').val();
		data.occupation = $('input[name=occupation]').val();
		data.weapon = $('input[name=weapon]').val();
		data.debt = $('input[name=debt]').val();
	
		$.ajax({
			url: 'https://ironhack-characters.herokuapp.com/characters',
			type: 'POST',
			dataType: 'json',
			data: data,
			success: showCharacters2,
			error: handleError
		});
	})
};




if("geolocation" in navigator) {
	console.log("Geolocation is available");
	var options = {enableHighAccuracy: true};
	navigator.geolocation.getCurrentPosition(onLocation, onError, options)
} else {

	console.log("Geolocation is NOT available");
}

function onLocation (position) {	
	console.log('Your latitude is ' + position.coords.latitude);	 
	console.log('Your longitude is ' + position.coords.longitude);
	document.getElementById('position').src = "https://maps.googleapis.com/maps/api/staticmap?center=" + 
		position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=400x300" +
		"&markers=color:blue|label:I|" + position.coords.latitude + "," + position.coords.longitude
}

function onError (error) {
	console.log(error);
}

/* 

READY STATES 

0 - request not initialized
1 - request has been set up
2 - request has been sent
3 - request is in process
4 - request is complete

*/