if("geolocation" in navigator) {
	console.log("Geolocation is available");
	var options = {enableHighAccuracy: true};
	navigator.geolocation.getCurrentPosition(onLocation, onError, options)
} else {

	console.log("Geolocation is NOT available");
}


function onLocation (position) {	
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	var locations = [
		['Title A', lat-0.005,lon-0.005, 1],
		['Title B', lat+0.005,lon-0.005, 2],
		['Title C', lat+0.005,lon+0.005, 3],
		['Title D', lat-0.005,lon+0.005, 4]
		];

	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: new google.maps.LatLng(lat,lon),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

	var infowindow = new google.maps.InfoWindow;

	var marker, i;

	for (i = 0; i < locations.length; i++) {  
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map
			});

			google.maps.event.addListener(marker, 'click', addMarker(infowindow, locations, marker, i) );
		}
	}

	function addMarker (infowindow,locations,marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
	}

	function onError (error) {
		console.log(error);
	}