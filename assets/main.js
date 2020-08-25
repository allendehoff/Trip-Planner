

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  $(".warning").addClass("hide");
  $("#restaurants").addClass("hide");
  $("#drivingDirections").addClass("hide");
  

  console.log($("#endLoc").val().trim());
  if ($("#endLoc").val().trim() !== "") {

    validateDestination();
  }
  else {
    toggleWarning();
    $("#end-loc-warning").removeClass("hide");
  }
});

$(document).on("click", ".hotel-address", function () {
  $(".warning").addClass("hide");
  $("#start-loc-warning").text('Please enter a valid address for directions');
  var hotelZip = $(this).attr("data-zip")
  $("#restaurantResults").remove()

  restaurantSearch(hotelZip)
  $("#restaurants").removeClass("hide");

  if ($("#startLoc").val().trim() !== "") {
    // Show map
    $("#map").css("display", "block");
    // Render Maps and catch directions, distance and time
    var origin = $("#startLoc").val();
    var destination = $(this).text()
    Geocode2Addresses(origin, destination)
    $("#drivingDirections").removeClass("hide");
  } else {
    toggleWarning();
    $("#start-loc-warning").removeClass("hide");
  }
})


$("#userLocBtn").on("click", function () {
  event.preventDefault();
  getCurrentLoc();
})

$("#prevent").on("click", function(){
  event.preventDefault()
})


function toggleWarning() {
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#search").offset().top
  }, 500);

  console.log("ERROR");
}