var populatePage = function(data) {
    $("#searched-location").text(data.name)
    $("#todays-date").text(moment().format("MM/DD/YYYY"))
    $("#current-temp").text(data.main.temp + " F")
    $("#current-humidity").text(data.main.humidity + "%")
    $("#current-wind-speed").text(data.wind.speed + " mph")
    $("#current-uv-index").text("Not Available")
}
