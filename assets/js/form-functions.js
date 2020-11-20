$("#weather-city-form").on("submit", function(event) {
    event.preventDefault()
    console.log("something submitted", $(event)[0].originalEvent.submitter.id)
    if ($(event)[0].originalEvent.submitter.id === "searchCityName") {
        console.log("got inside the if statement")
        var searchTerm = $("#citySearchInput").val().trim()
        var status = checkCityInput(searchTerm)
        if (status === "cityName") {
            console.log("gonna call the lat lon thing")
            getLatLonFromCity(searchTerm)
            $("#citySearchInput").val("")
        } else if (status === "zipCode") {
            getLatLonFromZip(searchTerm)
            $("#citySearchInput").val("")
        } else {
            alert("please enter in a valid location")
        }
    } else if ($(event)[0].originalEvent.submitter.id === "location-btn") {
        var btnIndex = $($(event.originalEvent.submitter).closest(".btn-group")).index()
        $("#citySearchInput").val("")
        getWeatherFromLoc(savedLocations[btnIndex].cityName, savedLocations[btnIndex].lat, savedLocations[btnIndex].lon)
    } else if ($(event)[0].originalEvent.submitter.id === "remove-loc-btn") {
        var btnIndex = $($(event.originalEvent.submitter).closest(".btn-group")).index()
        $("#citySearchInput").val("")
        savedLocations.splice(btnIndex, 1)
        setSavedLocations()
        displaySavedLocation(savedLocations)
    }
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