function getCurrentLoc() {

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    revGeocode(latitude, longitude);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
    $(".warning").text('Unable to retrieve your location')
    $("#overlay").addClass("hide");
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
    $("#start-loc-warning").text('Geolocation is not supported by your browser');
  } else {
    $(".warning").addClass("hide");
    $("#start-loc-warning").text('Please enter a valid address');
    status.textContent = 'Locating…';
    $("#overlay").removeClass("hide");
    navigator.geolocation.getCurrentPosition(success, error);
  }

}