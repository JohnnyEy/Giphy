$(document).ready(function() {

    var topics = ["Kanye West", "Jay-Z", "Outkast", "Rick Ross", "Eminem", "DJ Khaled", "Wu-Tang", "Camron"];

    function displayInfo() {
        var rapper = $(this).attr("rapper-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + rapper + "&api_key=fxh7SCOXVrv0bE0A28eVsbzjnEzApeeP";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            $("#rapper").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var rapperDiv = $("<div class='userRapper'>");

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                rapperDiv.append(gif);
                rapperDiv.append(pRate);

                $("#rapper").append(rapperDiv);
            }

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    function renderButtons() {

        $("#rapperButtons").empty();

        for (var i = 0; i < topics.length; i++) {

            var rapperRender = $("<button>");

            rapperRender.addClass("rapper");
            rapperRender.attr("rapper-name", topics[i]);
            rapperRender.text(topics[i]);
            $("#rapperButtons").append(rapperRender);
        }
    }

    $("#addRapper").on("click", function(event) {
        event.preventDefault();
        var rapper = $("#rapper-input").val().trim();

        topics.push(rapper);
            $("#rapper-input").val(" ");
        renderButtons();
    });

    $(document).on("click", ".rapper", displayInfo);

    renderButtons();

});