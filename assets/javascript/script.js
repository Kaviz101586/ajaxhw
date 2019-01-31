// Create buttons for the existing array and add a "data-" attribute// - works

var topics = ["yankees","islanders","pacers","jets","rangers","devils","mets","giants","knicks","nets"];

// Call function to create buttons for pre-existing topics// - works
renderbuttons();

// Click handler for "ADD" button // - works
$("#run-search").on("click", function() {
    var topicAdd = $("#add-term").val();
    console.log(topicAdd);
    topics.push(topicAdd);
    console.log(topics);
    renderbuttons();
})

// New terms added need buttons // - works

function renderbuttons() {

    $("#buttonArea").empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("team");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttonArea").append(button);
    }   
}

// AJAX call to GIPHY API //

function pullInfo() {

    $("#giphysArea").empty();
    
    var teamPicked = $(this).attr("data-name");
    var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + teamPicked + "&api_key=9LW26mPO68F64z19crdF1QhOFXAiv4HI&limit=10";
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
    console.log(response.data[0].rating);
        
        for (var i = 0; i<response.data.length; i++) {

            // Variables for the moving and still gifs//
            var moving = response.data[i].images.fixed_height_small.url;
            var still = response.data[i].images.fixed_height_small_still.url;

            // Create div for the images and an image tag//
            var teamDiv = $('<div class="team">');
            var image = $("<img src=" + moving + ">")
            
            // Variable to capture the rating and put the text in the html//
            var rated = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rated);
            teamDiv.append(p);
            console.log(rated);
            
            // Handle the images - add class, data-state, and append it to the text and gif area (giphysArea) //
                    
            image.attr("data-moving",moving);
            image.attr("data-still",still);
            image.attr("data-state","animate");
            image.addClass("image");
            teamDiv.append(image);
            $("#giphysArea").append(teamDiv);
        }
    })
}

// Function to change from still to moving and vice-versa//

function stateChange() {
    
    var state = $(this).attr("data-state");
    
    if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } 
    
    else {
        $(this).attr("src", $(this).attr("data-moving"));
        $(this).attr("data-state","animate");
    }
}

// Call API info on dynamic buttons//

$(document).on("click",".team", pullInfo);

// Change state of gifs//

$(document).on("click",".image", stateChange);