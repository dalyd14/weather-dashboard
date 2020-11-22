var apiKey = "3b8af5258910a4f3c339b1d0c483f2eb"

var getWeatherFromLoc = function(name, lat, lon) {
    if(!checkIfLocExists(name, lat, lon) || savedLocations.length===0) {
        savedLocations.push(
            {
                cityName: name,
                lat: lat,
                lon: lon
            }
        )
        setSavedLocations()
        displaySavedLocation(savedLocations)
    }

    var apiOneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey
    displayMap(lat, lon)
    fetch(apiOneCallUrl).then(function(response2) {
        if(response2.ok) {
            response2.json().then(function(forecastData) {
                $("#forecast-container").empty()
                $("#weather-displayer").removeClass("d-none")
                populateLocation(name)
                populateCurrent(forecastData)
                domForecastElGeneration(forecastData)
            })
        } else {
            enterErrorMessage("There was an error receiving the weather for that location.")
        }
    })
}

var getLatLonFromCity = function(city) {
    var apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
    fetch(apiCurrentUrl).then(function(response1) {
        if(response1.ok) {
            response1.json().then(function(data) {
                getWeatherFromLoc(data.name, data.coord.lat, data.coord.lon)
            })
        } else {
            enterErrorMessage("Invalid city name entered.")
        }
    })
}

var getLatLonFromZip = function(zip) {
    var apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=" + apiKey
    fetch(apiCurrentUrl).then(function(response1) {
        if(response1.ok) {
            response1.json().then(function(data) {
                getWeatherFromLoc(data.name, data.coord.lat, data.coord.lon)
            })
        } else {
            enterErrorMessage("Invalid zip code entered.")
        }
    })
}

var checkIfLocExists = function(name, lat, lon) {
    var status = false
    savedLocations.forEach(function(savedLoc) {
        if (savedLoc.cityName === name) {
            if (Math.abs((savedLoc.lat-lat)/lat) < .01 && Math.abs((savedLoc.lon-lon)/lon) < .01) {
                status = true
            }
        }
    })
    return status
}

if (savedLocations.length > 0) {
    $("#weather-displayer").removeClass("d-none")
    //getWeatherFromLoc(savedLocations[0].cityName, savedLocations[0].lat, savedLocations[0].lon)
    $("#saved-locations-list").children().eq(0).find("#location-btn").trigger("click")
}