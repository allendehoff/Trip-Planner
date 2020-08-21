function restaurantSearch(zipcode){
    var zip = zipcode
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
        var restaurantResults = $("<div>").attr("id", "restaurantResults")
        for (var i = 0; i <= 4; i++){
            restName = data.result.data[i].restaurant_name
            restPhone = data.result.data[i].restaurant_phone
            restAddress = data.result.data[i].address.formatted
            console.log(restName)
            console.log(restPhone)
            console.log(restAddress)

            var newRestaurant = $("<div>").addClass("restaurant")
            newRestaurant.append($("<h4>").text(restName))
            newRestaurant.append($("<h5>").text(restPhone))
            newRestaurant.append($("<h5>").text(restAddress))

            $(restaurantResults).append(newRestaurant)
        }
        $("#restaurants").append(restaurantResults)

    })
};

restaurantSearch(23112)

