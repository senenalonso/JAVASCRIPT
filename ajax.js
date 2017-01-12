
window.onload = function(){

	var llamada = new XMLHttpRequest();

	llamada.open("GET", "data/tweets.json", true);

	llamada.send();

	llamada.onreadystatechange = recibirrespuesta;

	console.log("Otro ejemplo");
	console.log("A ver qué se pinta primero");


	function recibirrespuesta() {

		if( llamada.readyState == 3 ){
			console.log('Loading...');
		}

		if( llamada.readyState == 4 && llamada.status == 200 ){
			var respuesta = JSON.parse( llamada.response );
			console.log( respuesta );
			alert( respuesta.Tweets[0].texto );
		}

	}

};





/* 

READY STATES 

0 - request not initialized
1 - request has been set up
2 - request has been sent
3 - request is in process
4 - request is complete

*/