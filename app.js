// Variables

var topics = [];

// Functions

// when go is clicked...
$("#go").click( function (){

    // prevent form from submitting
    event.preventDefault();

    // erase old buttons
    $("#buttons").empty();

    // capture form value and push to array
    topics.push($("#input").val().trim());

    // loop through array...
    for (i=0; i < topics.length; i++){

        // create a button for each index
        $("#buttons").append(
            $("<button>").text(topics[i]).attr("id", "newButton").addClass("btn").css("margin", "5px")
        ); 
    }

});

// when a dynamically created button is clicked...
$(document).on("click", "#newButton", function(){

    // clear old gifs
    $("#column1").empty();
    $("#column2").empty();
    $("#column3").empty();

    // get the value from the form
    var character = $("input").val().trim();

    // create queryURL variable
    var key = "pMpwz0TMTwYpO8vVl51K1Z9OcgE1NR91";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=" + key + "&limit=30";

    // implement ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( function(response){
        console.log(response);

        var data = response.data;

        // loop through the response data
        for (i=0; i < data.length; i++){

            // add the first 10 gifs to column1
            if (i <= 9){
                $("#column1").append(
                    $("<img>")
                    .attr("src", data[i].images.fixed_height_still.url)
                    .addClass("newGif").css("width", "100%")
                    .attr("still-url", data[i].images.fixed_height_still.url)
                    .attr("moving-url", data[i].images.fixed_height.url)
                    .attr("state", "still")
                )
            }

            // add the next 10 gifs to column2
            if ((i > 9) && (i <= 19)) {
                $("#column2").append(
                    $("<img>")
                    .attr("src", data[i].images.fixed_height_still.url)
                    .addClass("newGif").css("width", "100%")
                    .attr("still-url", data[i].images.fixed_height_still.url)
                    .attr("moving-url", data[i].images.fixed_height.url)
                    .attr("state", "still")
                )
            }

            // add the last 10 gifs to column3
            if ((i > 19) && (i <= 29)) {
                $("#column3").append(
                    $("<img>")
                    .attr("src", data[i].images.fixed_height_still.url)
                    .addClass("newGif").css("width", "100%")
                    .attr("still-url", data[i].images.fixed_height_still.url)
                    .attr("moving-url", data[i].images.fixed_height.url)
                    .attr("state", "still")
                )
            }

        }
    })

});

// when a dynamically created gif is clicked
$(document).on("click", ".newGif", function(){

    var currentState = $(this).attr("state");

    if (currentState === "still") {

        var source = $(this).attr("src");
        source = $(this).attr("moving-url");

        $(this).attr("src", source);
        $(this).attr("state", "moving");

    }
    else if (currentState === "moving") {

        source = $(this).attr("still-url");
        $(this).attr("src", source);
        $(this).attr("state", "still");
    }
    
});



    