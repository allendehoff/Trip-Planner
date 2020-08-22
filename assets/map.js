
function renderMapWithPoints(oriLat, oriLon, desLat, desLon, dist, time) {
  // Working with maps
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWNvc3RhLWFuZHJlcy1yIiwiYSI6ImNrZTRmY3dyZDBzaXoyem13dnJpZjNhY3IifQ.1gcRNFlm2B7q49zyCsWHew';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 3
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
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 1.25],
            'text-anchor': 'top'
          }
        });
      }
    );
  });
}