var savedLocations = [
    {
        cityName: "Philadelphia",
        lat: "39.95",
        lon: "-75.16"
    }
]

$("#weather-city-form").on("submit", function(event) {
    event.preventDefault()
    console.log("Hello There!")
})

var checkCityInput = function(city) {
    var numbers = "1234567890"
    var letters = "abcdefghijklmnopqrstuvwxyz"

    var isLetter = true;
    var isNumber = false;

    var message = "passed"

    for (var i = 0; i < city.length; i++) {
        if (letters.includes(city[i])) {
            if (i === 0) {
                isLetter = true
                isNumber = false                
            } else if (isLetter && !isNumber) {

            } else {
                message = "invalid number included in city name"
                break;
            }
        } else if (numbers.includes(city[i])) {
            if (i === 0) {
                isLetter = false
                isNumber = true
            } else if (!isLetter && isNumber) {

            } else {
                message = "invalid letter included in zip code"
                break;
            }
        }
    }

    if (message==="passed" && isLetter) {
        callApiCity(city)
    } else if (message==="passed" && isNumber) {
        callApiZip(city)
    }
}

var receiveSavedLocations = function() {
    savedLocations = JSON.parse(localStorage.getItem("weatherDashboardSavedCitys"))
}

var setSavedLocations = function() {
    localStorage.setItem("weatherDashboardSavedCitys", JSON.stringify(savedLocations))
}