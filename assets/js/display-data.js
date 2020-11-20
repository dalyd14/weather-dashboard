
var displaySavedLocation = function(savedLocations) {
    for (var i = 0; i < savedLocations.length; i++) {
        var locationButtonEl = $("<button>")
            .addClass("btn btn-light")
            .attr("type", "submit")
            .attr("data-location", savedLocations[i].cityName.toLowerCase())
            .attr("data-lat", savedLocations[i].lat)
            .attr("data-lon", savedLocations[i].lon)
            .text(savedLocations[i].cityName)
        $("#saved-locations-list").append(locationButtonEl)
    }
}

displaySavedLocation(savedLocations)

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

var domForecastElGeneration = function(data) {
    for(var i=1; i < 6; i++) {
        var dayDiv = $("<div>").addClass("day")
        var headerDiv = $("<div>").addClass("d-flex justify-content-between")
        var dayDate = $("<h5>").text(moment.unix(data.daily[i].dt).utc().format("ddd MM/DD/YY"))
        var dayDescription = $("<h5>").addClass("text-capitalize").text(data.daily[i].weather[0].description)
        headerDiv.append(dayDate, dayDescription)
        var dayRow = $("<div>").addClass("row no-gutters").html(
            `
            <div class='col-6'>
                <img class='day-img' src='https://openweathermap.org/img/wn/` + data.daily[i].weather[0].icon + `@2x.png'/>
            </div>
            <div class='col-6'>
                <p>Max Temp: ` + data.daily[i].temp.max + ` F</p>
                <p>Min Temp: ` + data.daily[i].temp.min + ` F</p>
            </div>
            `
        )
        dayDiv.append(headerDiv, dayRow)
        $("#forecast-container").append(dayDiv)
    }
}