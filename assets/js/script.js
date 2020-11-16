var apiKey = "3b8af5258910a4f3c339b1d0c483f2eb"
var city = "Kennett Square"
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey

fetch(apiUrl).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data)
        })
    }
})