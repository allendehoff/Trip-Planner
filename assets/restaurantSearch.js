//Function to search for local restaurants based on zipcode of the hotel selected
function restaurantSearch(zipcode){
//Global variables required for functions
    var zip = zipcode.substring(0,5)
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

//API call to retrieve restaurant data
    $.ajax(settings).done(function (data) {
//Creating and modifying section to hold results
        var restaurantResults = $("<section>").attr("id", "restaurantResults")
        restaurantResults.addClass("accordion")
        restaurantResults.attr("data-accordion", "")
        restaurantResults.attr("data-allow-all-closed", "true")
//Loop to create new div for each restaurant
        for (var i = 0; i <= 4; i++){
//Fetches data and puts it into local variables for use in for loop
            restName = data.result.data[i].restaurant_name
            restPhone = data.result.data[i].restaurant_phone
            restAddress = data.result.data[i].address.formatted
//Creates elements for restaurant info
            var newRestaurant = $("<div>")
            var contentDiv = $("<div>")
            var accordionTitle = $("<a>")
//Modifies elements to work in foundation accordion menu
            newRestaurant.addClass("restaurant accordion-item")
            newRestaurant.attr("data-accordion-item", "")
            contentDiv.attr("data-tab-content", "")
            contentDiv.addClass("accordion-content")
            accordionTitle.addClass("accordion-title").text(restName)
//Adds elements for restaurant info into the div for that restaurant
            contentDiv.append($("<h5>").text(restPhone))
            contentDiv.append($("<h5>").text(restAddress))
            newRestaurant.append(accordionTitle)
            newRestaurant.append($(contentDiv))
//Adds restaurant into section made above to hold results
            $(restaurantResults).append(newRestaurant)
        }
//Puts results section into html on the page
        $("#restaurants").append(restaurantResults)
//Allows html to render the new section as an accordion menu
        $(document).foundation();
        
    })
};


