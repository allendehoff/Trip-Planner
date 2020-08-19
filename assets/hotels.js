var destination = $("#endLoc");

$("#searchButton").on("click", function(){
    var cityState = destination.val();
    var queryURL = "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + cityState;

var citySearch = {
	"async": true,
	"crossDomain": true,
	"url": queryURL,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		"x-rapidapi-key": "7ab34ca805msh00c099c8c3cb117p1922e6jsn1fc9f9f2a686"
	}
}

$.ajax(citySearch).done(function (response) {
    console.log(response);

    var locationID = response.data[0].result_object.location_id;
    var sortList = "price";

    var queryURL = "https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=30&order=asc&lang=en_US&sort=" + sortList + "&location_id=" + locationID + "&adults=1&checkin=2020-08-20&rooms=1&nights=2"
    var hotelList = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "7ab34ca805msh00c099c8c3cb117p1922e6jsn1fc9f9f2a686"
        }
    }
    
    $.ajax(hotelList).done(function (response) {
        console.log(response);

        var locationID = response.data[0].location_id;

        var queryURL = "https://tripadvisor1.p.rapidapi.com/hotels/get-details?adults=1&nights=2&currency=USD&lang=en_US&child_rm_ages=7%252C10&checkin=2020-08-20&location_id=" + locationID;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": queryURL,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "7ab34ca805msh00c099c8c3cb117p1922e6jsn1fc9f9f2a686"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });
});
})


