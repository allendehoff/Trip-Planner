var locationID;
$("#searchButton").on("click", function(event){
    event.preventDefault();
    citySearch();
});

function citySearch(){
    var cityState = $("#endLoc").val();
    var queryURL = "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + cityState;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "ba8561a5fbmsh0a91153f24488d4p174a0bjsn8e31bf9244c2"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        locationID = response.data[0].result_object.location_id;
        hotelList(locationID);
    });
}

function hotelList(area){
    var queryURL = "https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=5&order=asc&lang=en_US&sort=recommended&location_id=" + area + "&adults=1&checkin=2020-09-20&rooms=1&nights=2"
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "ba8561a5fbmsh0a91153f24488d4p174a0bjsn8e31bf9244c2"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        for (var i = 0; i < response.data.length; i++){
            locationID = response.data[i].location_id;
            specifiedHotel(locationID);
        }
    });
}

function specifiedHotel(hotel){
    var queryURL = "https://tripadvisor1.p.rapidapi.com/hotels/get-details?adults=1&nights=2&currency=USD&lang=en_US&child_rm_ages=7%252C10&checkin=2020-08-20&location_id=" + hotel;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "ba8561a5fbmsh0a91153f24488d4p174a0bjsn8e31bf9244c2"
        }
    }
    
    $.ajax(settings).done(function (response) {
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
        hotelAddress.attr("data-zip", zipCode);
        
        hotelContact.append(hotelAddress, hotelWebsite);
        hotelDiv.append(hotelImage, hotelName, hotelContact, hotelPriceRange);
        $("#hotels").append(hotelDiv);  
        
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

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }