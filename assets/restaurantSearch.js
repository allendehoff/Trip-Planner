function restaurantSearch(lat,long){
    var queryURL = "https://us-restaurant-menus.p.rapidapi.com/restaurants/geo?"
    + "page=1"
    + "&distance=5"
    + "&lon=" + "-73.992378"
    + "&lat=" + "40.68919"
            

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
		"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
		"x-rapidapi-key": "c775624d1bmsha92167b41ec9708p16ea60jsn22d51256668b"
	}
        })
        .then(function(data){
            console.log(data.result.data[0].restaurant_name)
            console.log(data.result.data[0].restaurant_phone)
            console.log(data.result.data[0].address.formatted)
        })
}

restaurantSearch()