window.onload = function() {

    /*console.log("Primer texto");
    $.get("data/friends.json", function(data){
        console.log(data);
    });
    console.log("Otro texto");*/

    function handleError(jqXHR, textStatus, error){
        console.log(error);
    }


    function loadVideos(){

        $.ajax({
            type:   "GET",
            url:    "data/videos.json",
            success: function(data){
                console.log(data);
            },
            error: handleError
        });

    }

    function loadTweets(){

        $.ajax({
            type:   "GET",
            url:    "data/tweets.json",
            success: function(data){

                console.log(data);
                loadVideos();

            },
            error: handleError
        });

    }


    $.ajax({
        type:   "GET",
        url:    "data/friends.json",
        success: function(data){

            console.log(data);
            loadTweets();

        },
        error: handleError
    });


};
