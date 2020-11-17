var apiKey = "3b8af5258910a4f3c339b1d0c483f2eb"
var city = "Philadelphia"
var apiCurrentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey

fetch(apiCurrentUrl).then(function(response1) {
    if(response1.ok) {
        response1.json().then(function(data) {
            populateLocation(data)
            var apiOneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey
            fetch(apiOneCallUrl).then(function(response2) {
                if(response2.ok) {
                    response2.json().then(function(forecastData) {
                        populateCurrent(forecastData)
                        domForecastElGeneration(forecastData)
                        console.log(forecastData)
                    })
                }
            })
        })
    }
})