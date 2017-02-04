/*$(document).ready(function(){

	$('form').on('submit', function(e){
		e.preventDefault();
	
		$.ajax({
			url: 'https://api.spotify.com/v1/search?type=artist&q='+$('input[name=name]').val(),
			type: 'GET',
			dataType: 'json',
			success: showArtist,
			error: handleError
		});
	})
})
*/

	var TIME = 30

$(document).ready(function(){
	$('.btn-play')[0].addEventListener("click", playOrPauseTrack, false);
	$('.js-player')[0].addEventListener("timeupdate", progressBar, false);
	$('.author')[0].addEventListener("click", showInfoArtist, false);
});

function handleError(error) {
				console.log("error");
				console.log(error.responseText);
			}

function handleResponse(respose) {
				console.log("Success!!");
				console.log(respose);
			}

function getArtistsAlbums(id) {
	$.ajax({
			url: 'https://api.spotify.com/v1/artists/'+id+'/albums',
			type: 'GET',
			dataType: 'json',
			success: showAlbums,
			error: handleError
		});
}

function getTracks(id) {
	$.ajax({
			url: 'https://api.spotify.com/v1/albums/'+id+'/tracks',
			type: 'GET',
			dataType: 'json',
			success: showTracks,
			error: handleError
		});
}


function showArtist(response) {
	$('.js-artist-list').empty();
	var artists = response.artists.items;
	var poster;

	artists.forEach( function(artist) {

		artist.images[0] ? poster = artist.images[0].url : poster = "./cd.jpg"

		var html = `
				<h3>${artist.name}</h3>
				<a href="#" onclick="getArtistsAlbums('${artist.id}')">
					<img width="100" height="100" src="${poster}">
				</a>
		`;
		$('.js-artist-list').append(html);
	});
};


function showAlbums(response) {
	$('.js-album-list').empty();
	var albums = response.items;

	var html = `
				<h3>${albums[0].artists[0].name}'s albums</h3>
				<ul>
		`;
		$('.js-album-list').append(html);

	albums.forEach( function(album) {

		html = `
				<li>
					<a href="#" onclick="getTracks('${album.id}')">
						${album.name}
					</a>
				</li>
		`;
		$('.js-album-list').append(html);
	});
	$('.js-album-list').append("</li>");
};

function showTracks(response) {
	$('.js-track-list').empty();
	var tracks = response.items;

	var html = `
				<h3>${tracks[0].artists[0].name}'s tracks</h3>
				<ul>
		`;
		$('.js-track-list').append(html);

	tracks.forEach( function(track) {

		html = `
				<li>
					${track.name}				
				</li>
		`;
		$('.js-track-list').append(html);
	});
	$('.js-track-list').append("</li>");
};


function searchSong() {
	$.ajax({
			url: 'https://api.spotify.com/v1/search?type=track&q='+$('input[name=name]').val(),
			type: 'GET',
			dataType: 'json',
			success: showTrack,
			error: handleError
		}); 
}


function showTrack(response) {
	var track = response.tracks.items[0];
	window.localStorage.setItem("artist", track.artists[0].id);
	$('.song').removeClass('hidden');	
	$('progress').attr("value",0);

	$('.title').html(track.name);
	$('.author').html(`
		<a class="authorLink" href="#">${track.artists[0].name}</a>
		`);
	$('.clock').html(`(0.${TIME})`);
	$('.cover > img').attr("src",track.album.images[0].url);
	$('.js-player').attr("src",track.preview_url);
};

function playOrPauseTrack(){
	if ($('.btn-play').hasClass("disabled")){
			$('.js-player').trigger('play');
	} else {
		$('.js-player').trigger('pause');
	}	
	changeStatus()
}

function changeStatus() {	
	$('.btn-play').toggleClass('playing');
	$('.btn-play').toggleClass('disabled'); 
}

function printTime() {
  var current = $('.js-player').prop('currentTime');
}

function progressBar() {	
	var slotTime = TIME-Math.round($('.js-player').prop('currentTime'))
	printTime();	
	$('.clock').html(`(0.${slotTime})`);
	$('progress').attr("value",TIME-slotTime);
}

function showInfoArtist (e) {
	 if (e.target && e.target.matches("a.authorLink")) {	
	 	getInfoArtist(window.localStorage.getItem("artist"));
		$('.js-modal').modal("show");
	}
}

function getInfoArtist (id) {
	$.ajax({
			url: 'https://api.spotify.com/v1/artists/'+id,
			type: 'GET',
			dataType: 'json',
			success: setInfoArtist,
			error: handleError
		}); 
}

function setInfoArtist (artist) {
	  $('.modal-header > h2').html(`${artist.name}`);
    $('.modal-body').html(`
    	<div class="center">
    		<img class="poster center" src="${artist.images[0].url}" alt="${artist.name}">
    	</div>
    	<hr>
    	<div class="infoArtist">
	    	<p><b>Genres:</b> ${artist.genres}</p>
	    	<p><b>Followers:</b> ${artist.followers.total}</p>
	    	<p><b>Popularity:</b> ${artist.popularity}</p>
    	</div>
    	`); 
}