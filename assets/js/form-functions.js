$("#weather-city-form").on("submit", function(event) {
    event.preventDefault()
    var searchTerm = $("#citySearchInput").val().trim()
    var status = checkCityInput(searchTerm)
    if (status === "cityName") {
        getLatLonFromCity(searchTerm)
        $("#citySearchInput").val("")
    } else if (status === "zipCode") {
        getLatLonFromZip(searchTerm)
        $("#citySearchInput").val("")
    } else {
        alert("please enter in a valid location")
    }
})

$("#saved-locations-list").on("click", "#location-btn", function(){
    var btnIndex = $(this).closest(".btn-group").index()
    $("#citySearchInput").val("")
    getWeatherFromLoc(savedLocations[btnIndex].cityName, savedLocations[btnIndex].lat, savedLocations[btnIndex].lon)
})

$("#saved-locations-list").on("click", "#remove-loc-btn", function(){
    var btnIndex = $(this).closest(".btn-group").index()
    $("#citySearchInput").val("")
    savedLocations.splice(btnIndex, 1)
    setSavedLocations()
    displaySavedLocation(savedLocations)
})

var checkCityInput = function(city) {
    var numbers = "1234567890"
    var letters = "abcdefghijklmnopqrstuvwxyz "

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
        return "cityName"
    } else if (message==="passed" && isNumber) {
        return "zipCode"
    } else {
        return "error"
    }
}

var receiveSavedLocations = function() {
    savedLocations = JSON.parse(localStorage.getItem("weatherDashboardSavedCitys")) || []
}

var setSavedLocations = function() {
    localStorage.setItem("weatherDashboardSavedCitys", JSON.stringify(savedLocations))
}

receiveSavedLocations()