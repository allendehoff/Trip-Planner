var locationID;

function citySearch() {
    var cityState = $("#endLoc").val();
    var queryURL = "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=1&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + cityState;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "d305cfdceamsh2dc3f79acdaa06cp1ec18fjsna1715374cdb5"
        },
        // Makes the laoding screen appear when this function is run
        "beforeSend": function () {
            $("#overlay").removeClass("hide");
        }
    }

    $.ajax(settings)
        // Grabs the trip advisor specific lacation ID for the searched city and applies it to the hotelList function
        .then(function (response) {
            console.log(response);
            locationID = response.data[0].result_object.location_id;
            hotelList(locationID);
        });
}

function hotelList(area) {
    var queryURL = "https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=3&order=asc&lang=en_US&sort=recommended&location_id=" + area;
    console.log(queryURL)

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "d305cfdceamsh2dc3f79acdaa06cp1ec18fjsna1715374cdb5"
        }
    }

    $.ajax(settings)
        // Grabs the trip advisor specific lacation ID for the hotels in the list and applies it to the specifiedHotel function
        .then(function (response) {
            console.log(response);
            // Calls the specifiedHotel function for each of teh hotels in the list
            for (var i = 0; i < response.data.length; i++) {
                locationID = response.data[i].location_id;
                specifiedHotel(locationID);
            }
        });
}

function specifiedHotel(hotel) {
    var queryURL = "https://tripadvisor1.p.rapidapi.com/hotels/get-details?location_id=" + hotel;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "d305cfdceamsh2dc3f79acdaa06cp1ec18fjsna1715374cdb5"
        },
        // Hides the loading screen once the hotel information is gathered
        "complete": function () {
            $("#overlay").addClass("hide");
        }
    }
    // Creates the hotel information and appends it to the page
    $.ajax(settings).then(function (response) {
        console.log(response);

        var zipCode = response.data[0].address_obj.postalcode;
        console.log(zipCode);

        var hotelDiv = $("<div>");
        var hotelImage = $("<img>");
        var hotelName = $("<p>");
        var hotelContact = $("<div>");
        var hotelAddress = $("<p>");
        var hotelWebsite = $("<a>")
        var hotelPriceRange = $("<p>");

        hotelDiv.addClass("hotel-info");
        hotelContact.addClass("hotel-contact");
        hotelImage.attr("src", response.data[0].photo.images.small.url);
        hotelImage.addClass("hotel-image");
        hotelName.text(response.data[0].name);
        hotelName.addClass("hotel-name");
        hotelImage.attr("alt", hotelName.text());
        hotelAddress.text(response.data[0].address);
        hotelAddress.addClass("hotel-address");
        hotelWebsite.attr("href", response.data[0].website);
        hotelWebsite.addClass("hotel-website");
        hotelWebsite.text(response.data[0].website);
        hotelPriceRange.addClass("hotel-price");
        hotelPriceRange.text(response.data[0].price);
        hotelAddress.attr("data-zip", zipCode); // Sets a data attribute on the address for the Zip Code that can be used in the restaurant search JS file

        hotelContact.append(hotelAddress, hotelWebsite);
        hotelDiv.append(hotelImage, hotelName, hotelContact, hotelPriceRange);
        $("#hotels").append(hotelDiv);

        // Grabs the phone number and gets rid of anything before the area code
        var phone = response.data[0].phone;
        var numberOnly = "";
        for (var i = phone.length - 1; numberOnly.length < 10; i--) {
            if (!isNaN(phone[i])) {
                numberOnly = phone[i] + numberOnly;
            }
        }
        var convertPhone = formatPhoneNumber(numberOnly);
        var hotelPhone = $("<p>");
        hotelPhone.text(convertPhone);
        hotelPhone.addClass("hotel-phone");
        hotelContact.append(hotelPhone);
    });
}

// Converts the phone number to a uniform format
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}

function validateDestination(){
    // Validates the Destination input to only allow a real city and state in the format of (city, state abbreviation)
    var destinationSplit = $("#endLoc").val().split(/[,]+/);
    if (destinationSplit.length > 1){
        var city = destinationSplit[0].trim();
        var state = destinationSplit[1].trim();
        console.log(city, state);
        if (state.length !== 2){
            console.log("Taco");
            $("#end-loc-warning").removeClass("hide");
            return false;
        }
    } else {
        console.log("error");
        $("#end-loc-warning").removeClass("hide");
        return false;
    }

    var queryURL = "https://geohub3.p.rapidapi.com/cities/search/" + city + "?countryCode=US&page=1&pageSize=10&regionCode=" + state;
    console.log(queryURL);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "geohub3.p.rapidapi.com",
            "x-rapidapi-key": "c775624d1bmsha92167b41ec9708p16ea60jsn22d51256668b"
        }
    }
    
    // Runs the citySearch funciton if the above if statement is true
    $.ajax(settings).done(function (response) {
        console.log(response);
        if (response.data.cities.length !== 0){
            $(".hotel-info").remove();
            $("#restaurantResults").remove();
            $("#map").empty();
            citySearch();
            $("#results").removeClass("hide");
        } else {
            console.log("ERROR");
            $("#end-loc-warning").removeClass("hide");
            return false;
        }
    });
}