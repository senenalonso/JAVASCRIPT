window.onload = function() {

/*	$.get(
		"data/friends.json", 
		function(data)	{
			console.log(data);
		},
		"json"
	);
*/
		$.ajax({
			url: 'data/friends.json',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				console.log("success");
				console.log(data);
			},
			error: function(data) {
				console.log("error");
			}
		})
};
