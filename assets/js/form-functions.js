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


var receiveSavedLocations = function() {
    savedLocations = JSON.parse(localStorage.getItem("weatherDashboardSavedCitys"))
}

var setSavedLocations = function() {
    localStorage.setItem("weatherDashboardSavedCitys", JSON.stringify(savedLocations))
}