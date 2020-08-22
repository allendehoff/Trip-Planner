

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  citySearch();
});

$(document).on("click", ".hotel-address", function () {
  var hotelZip = $(this).attr("data-zip")
  restaurantSearch(hotelZip)

  // Show map
  $("#map").css("display", "block");
  // Render Maps and catch directions, distance and time
  var origin = $("#startLoc").val();
  var destination = $(this).text()
  Geocode2Addresses(origin, destination)

})