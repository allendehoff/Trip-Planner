function getCurrentLoc() {

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    revGeocode(latitude, longitude)
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}