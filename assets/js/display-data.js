var populateLocation = function(data) {
    $("[id=searched-location]").text(data.name)
}
var populateCurrent = function(forecastData) {
    $("#todays-date").text(moment().format("MM/DD/YYYY"))
    $("#current-temp").text(forecastData.current.temp + " F")
    $("#current-humidity").text(forecastData.current.humidity + "%")
    $("#current-wind-speed").text(forecastData.current.wind_speed + " mph")
    $("#current-uv-index").text(forecastData.current.uvi)
}
// var populateForecast = function(forecastData) {
//     $("#todays-date").text(moment().format("MM/DD/YYYY"))
//     $("#current-temp").text(forecastData.current.temp + " F")
//     $("#current-humidity").text(forecastData.current.humidity + "%")
//     $("#current-wind-speed").text(forecastData.current.wind_speed + " mph")
//     $("#current-uv-index").text(forecastData.current.uvi)
// }
var domForecastElGeneration = function(data) {
    for(var i=1; i < 6; i++) {
        var dayDiv = $("<div>").addClass("day")
        var dayDate = $("<h5>").text(moment.unix(data.daily[i].dt).utc().format("MM/DD/YYYY"))
        var dayTemp = $("<p>").text("Temperature: " + data.daily[i].temp.day + " F")
        dayDiv.append(dayDate, dayTemp)
        $("#forecast-container").append(dayDiv)
    }
}