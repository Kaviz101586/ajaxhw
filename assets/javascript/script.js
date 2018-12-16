
// Click handler for "ADD" button // - works
$("#run-search").on("click", function() {
    var topicAdd = $("#add-term").val();
    console.log(topicAdd);
    topics.push(topicAdd);
    console.log(topics);
    renderbuttons();
})

// Create buttons for the existing array and add a "data-" attribute// - works

var topics = ["yankees","islanders","pacers","jets","rangers","devils","mets","giants","knicks","nets"];

for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.attr("data-name", topics[i]);
    button.text(topics[i]);
    $("#buttonArea").append(button);
}

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

// Click handler for the AJAX call//

$("button").on("click",function() {

// AJAX call to GIPHY API //

    $("#giphysArea").empty();
    var teamPicked = $(this).attr("data-name");
    var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + teamPicked + "&api_key=dc6zaTOxFJmzC&limit=10";
console.log(queryURL);
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
console.log(response.data[0].rating);
    for (var j = 0; j < response.data.length; j++) {
        var teamDiv = $('<div class="team">');
        var rated = response.data[j].rating;
        console.log(rated);
        var p = $("<p>").text("Rating: " + rated);
        teamDiv.append(p);
    }

    for (var i = 0; i<response.data.length; i++) {
        $("#giphysArea").append('<div> <img src='+ response.data[i].images.fixed_height_small.url+'> </div>');
        $("img").attr("data-moving",response.data[i].images.fixed_height_small.url);
        $("img").attr("data-still",response.data[i].images.fixed_height_small_still.url);
        $("img").attr("data-state","moving");
    }
        
        
//     //     console.log(response.data[i].images.fixed_height_small.url);

    })})
    
// });

// Change from still to moving and vice-versa//
// $(".img")"function moving() {
//     var state = $(this).attr("data-state","moving");
    
//     if (state === "moving") {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     } else {
//         $(this).attr("src", $(this).attr("data-"))
//     }
