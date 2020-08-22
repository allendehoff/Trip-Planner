
function getdirections(oLat, oLon, dLat, dLon) {
    // // Parameters
    var travelMode = "drive"
    var inMeterInt = 0;
    var  inMilesStr = "";
    var inSecondsInt = 0; 
    var inHHmmStr = ""

    // 
    const API_KEY = "f9a82c0c802a4fd881d8491a298c38d8"

    // Object for request
    var settings = {
        "url": "https://api.geoapify.com/v1/routing?" +
            "waypoints=" + oLat + "," + oLon + "|"
            + dLat + "," + dLon +
            "&mode=" + travelMode +
            "&apiKey=" + API_KEY,
        "method": "GET"
    }

    // Requesting driving info
    $.ajax(settings)
        .done(function (response) {
            console.log("Driving");

            // Get distance
            inMeterInt = response.features[0].properties.distance; // in meters
            inMilesStr = (inMeterInt / 1609).toFixed(1) + " mi";  // in miles
            // Get time
            inSecondsInt = response.features[0].properties.time;  // in seconds
            inHHmmStr = convertSecondsToHms(inSecondsInt);  // in Hours  minutes    
            // Get Route Directions
            var directions = response.features[0].properties.legs[0].steps;
            console.table(directions);
            // Directions
            // steps = {}
            // for (step of directions) {
            //     steps = {};
            // }

            renderMapWithPoints(oLat, oLon, dLat, dLon, inMilesStr, inHHmmStr);
            // return driving;
        })
        // When request returns error
        .fail(function (xhr, status, error) {
            if (status !== "OK") {
                console.log("Error - HERE:");
                console.log(xhr.responseText);
            }
        });

    function convertSecondsToHms(seconds) {

        // Convert seconds from string to number
        seconds = Number(seconds)

        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds % 3600 / 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hrs ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";

        return hDisplay + mDisplay;
    }
}