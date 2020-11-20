var apiKey = "3b8af5258910a4f3c339b1d0c483f2eb"

var getWeatherFromLoc = function(name, lat, lon) {
    console.log("Im now in the get weather from coord")
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
    fetch(apiOneCallUrl).then(function(response2) {
        if(response2.ok) {
            response2.json().then(function(forecastData) {
                $("#forecast-container").empty()
                $("#weather-displayer").removeClass("d-none")
                populateLocation(name)
                populateCurrent(forecastData)
                domForecastElGeneration(forecastData)
                console.log(forecastData)
            })
        } else {
            console.log("there was an error in the onecall fetch")
        }
    })
}

var getLatLonFromCity = function(city) {
    console.log("im at the lat lon thing")
    var apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
    fetch(apiCurrentUrl).then(function(response1) {
        if(response1.ok) {
            response1.json().then(function(data) {
                console.log(data)
                getWeatherFromLoc(data.name, data.coord.lat, data.coord.lon)
            })
        } else {
            console.log("there was an error in the latlon from city fetch")
        }
    })
}

var getLatLonFromZip = function(zip) {
    var apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=" + apiKey
    fetch(apiCurrentUrl).then(function(response1) {
        if(response1.ok) {
            response1.json().then(function(data) {
                console.log(data)
                getWeatherFromLoc(data.name, data.coord.lat, data.coord.lon)
            })
        }
    })
}

var checkIfLocExists = function(name, lat, lon) {
    var status = false
    savedLocations.forEach(function(savedLoc) {
        if (savedLoc.cityName === name &&
            savedLoc.lat === lat &&
            savedLoc.lon === lon) {
                status = true
        }
    })
    return status
}

if (savedLocations.length > 0) {
    $("#weather-displayer").removeClass("d-none")
    getWeatherFromLoc(savedLocations[0].cityName, savedLocations[0].lat, savedLocations[0].lon)
}