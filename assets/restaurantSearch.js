
function restaurantSearch(zipcode){
    // $(document).foundation();
    var zip = zipcode.substring(0,5)
    console.log(zip)

    var restName
    var restPhone
    var restAddress
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/"
                + zip
                + "?page=1",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
            "x-rapidapi-key": "c775624d1bmsha92167b41ec9708p16ea60jsn22d51256668b"
        }
    }


    $.ajax(settings).done(function (data) {
        console.log(data);
        var restaurantResults = $("<section>").attr("id", "restaurantResults")
        restaurantResults.addClass("accordion")

        // This doesn't work
        restaurantResults.attr("data-accordion", "")
        restaurantResults.attr("data-allow-all-closed", "true")
        // ---------------------

        for (var i = 0; i <= 4; i++){
            restName = data.result.data[i].restaurant_name
            restPhone = data.result.data[i].restaurant_phone
            restAddress = data.result.data[i].address.formatted
            // console.log(restName)
            // console.log(restPhone)
            // console.log(restAddress)

            var newRestaurant = $("<div>")
            var contentDiv = $("<div>")
            var accordionTitle = $("<a>")
            newRestaurant.addClass("restaurant accordion-item")

            // This doesnt work
            newRestaurant.attr("data-accordion-item", "")
            contentDiv.attr("data-tab-content", "")
            // --------------------

            contentDiv.addClass("accordion-content")
            
            accordionTitle.addClass("accordion-title").text(restName)
            // accordionTitle.attr("href", "#")
            
            
            contentDiv.append($("<h5>").text(restPhone))
            contentDiv.append($("<h5>").text(restAddress))
            newRestaurant.append(accordionTitle)
            newRestaurant.append($(contentDiv))
            

            $(restaurantResults).append(newRestaurant)
        }

        $("#restaurants").append(restaurantResults)
        
        $(document).foundation();
        
    })
};


