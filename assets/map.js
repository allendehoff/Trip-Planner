
function renderMapWithPoints(oriLat, oriLon, desLat, desLon, dist, time) {

  // Scroll down to Driving Information Header
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#drivingDirections").offset().top
  }, 2000);

  // End loading screen animation
  $("#overlay").addClass("hide");

  // Modify the zoom accordingly to screen size
  if (window.screen.width >= 860) {
    mapZoom = 3
    layerTextSize = 12
  } else {
    mapZoom = 1.8
    layerTextSize = 10
  }

  // Working with maps
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWNvc3RhLWFuZHJlcy1yIiwiYSI6ImNrZTRmY3dyZDBzaXoyem13dnJpZjNhY3IifQ.1gcRNFlm2B7q49zyCsWHew';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: mapZoom
    // scrollZoom: false
  });

  var bbox = [[oriLon, oriLat], [desLon, desLat]];
  var newCameraTransform = map.cameraForBounds(bbox, {
    padding: { top: 40, bottom: 50, left: 40, right: 40 }
  });

  // Origin and detination coordinates
  map.on('load', function () {

    // Add an image to use as a custom marker
    map.loadImage(
      'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);

        // Add a GeoJSON source with 2 points
        map.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                // feature for ORIGIN
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [oriLon, oriLat]
                },
                'properties': {
                  'title': 'Start'
                }
              },
              {
                // feature for DESTINATION
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [desLon, desLat]
                },
                'properties': {
                  'title': 'Destination\n' + time + "\n" + dist
                }
              }
            ]
          }
        });

        // Add a symbol layer
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'points',
          'layout': {
            'icon-image': 'custom-marker',
            'icon-anchor': 'bottom',
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 0.25],
            'text-anchor': 'top',
            'text-size': layerTextSize
          }
        });
        map.flyTo({
          center: [newCameraTransform.center.lng, newCameraTransform.center.lat],
          zoom: newCameraTransform.zoom
        });
      }
    );
  });
}