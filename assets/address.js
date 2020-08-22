
function Geocode(address) {

  // Place holders for location
  var location = address;
  // Here we construct our URL
  var queryURL = "https://us1.locationiq.com/v1/search.php?key=d4e32239d0c9cb&q=" + location + "&format=json"
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log("Geocode:");
      console.log(response);
      console.log("Latitud: " + response[0].lat);
      console.log("Longitud: " + response[0].lon);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function revGeocode(lat, lon) {

  // Place holders for longitude and latitude  
  var latitude = lat;
  var longitude = lon;
  // Here we construct our URL
  var queryURL = "https://us1.locationiq.com/v1/reverse.php?key=d4e32239d0c9cb&lat=" + latitude + "&lon=" + longitude + "&format=json"
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log("revGeocode:");
      console.log(response);
      console.log(response.display_name);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Get two address coordinates
function Geocode2Addresses(address1, address2) {

  // Place holders for location
  var location = address1;
  // Here we construct our URL
  var queryURL = "https://us1.locationiq.com/v1/search.php?key=d4e32239d0c9cb&q=" + location + "&format=json"
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log("Geocode1Address:");
      var lat1 = response[0].lat;
      var lon1 = response[0].lon;
      console.log("Latitud 1: " + lat1);
      console.log("Longitud 1: " + lon1);

      // Place holders for location
      var location = address2;
      // Here we construct our URL
      var queryURL = "https://us1.locationiq.com/v1/search.php?key=d4e32239d0c9cb&q=" + location + "&format=json"
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {

          var lat2 = response[0].lat;
          var lon2 = response[0].lon;
          console.log("Latitud 2: " + lat2);
          console.log("Longitud 2: " + lon2);

          getdirections(lat1, lon1, lat2, lon2);

        })
        .catch(function (error) {
          console.log("Address 2 Error: " + error);
        });
    })
    .catch(function (error) {
      console.log("Address 1 Error: " + error);
    });
}