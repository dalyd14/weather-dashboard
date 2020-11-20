
var displaySavedLocation = function(savedLocations) {
    $("#saved-locations-list").empty()
    for (var i = 0; i < savedLocations.length; i++) {
        var buttonGroupEl = $("<div>")
            .addClass("btn-group mb-1")
            .attr("role", "group")
        var locationButtonEl = $("<button>")
            .addClass("btn btn-light location-name-btn")
            .attr("id", "location-btn")
            .attr("type", "submit")
        var locationBtnDiv = $("<div>")
            .append($("<h4>").text(savedLocations[i].cityName))
        locationButtonEl.append(locationBtnDiv)   
        var delLocationBtnEl = $("<button>")
            .addClass("btn btn-light remove-location-btn")
            .attr("id", "remove-loc-btn")
            .attr("type", "submit")
        var delLocationDiv = $("<div>")
            .html("&times")
        delLocationBtnEl.append(delLocationDiv)       
        buttonGroupEl.append(locationButtonEl, delLocationBtnEl)
        
        $("#saved-locations-list").append(buttonGroupEl)
    }
}

displaySavedLocation(savedLocations)

var populateLocation = function(name) {
    $("[id=searched-location]").text(name)
}

var populateCurrent = function(forecastData) {
    $("#todays-date").text(moment().format("MM/DD/YYYY"))
    $("#current-temp").text(forecastData.current.temp + " °F")
    $("#current-humidity").text(forecastData.current.humidity + "%")
    $("#current-wind-speed").text(forecastData.current.wind_speed + " mph")
    $("#current-uv-index").text(forecastData.current.uvi)
}

var domForecastElGeneration = function(data) {
    for(var i=1; i < 6; i++) {
        var dayDiv = $("<div>").addClass("day p-2 mb-1")
        dayDiv.html(
            `
            <div class='row no-gutters'>
                <div class='col-6'>
                    <h5>` + moment.unix(data.daily[i].dt).utc().format("ddd MM/DD/YY") + `</h5>
                </div>
                <div class='col-6 text-capitalize'>
                    <h5>` + data.daily[i].weather[0].description + `</h5>
                </div>
            </div>
            <div class='row no-gutters'>
                <div class='col-6'>
                    <img class='day-img' src='https://openweathermap.org/img/wn/` + data.daily[i].weather[0].icon + `@2x.png'/>
                </div>
                <div class='col-6 d-flex flex-column justify-content-center'>
                    <p>Max Temp: ` + data.daily[i].temp.max + ` °F</p>
                    <p>Min Temp: ` + data.daily[i].temp.min + ` °F</p>
                </div>
            </div>
            `
        )
        $("#forecast-container").append(dayDiv)
    }
}