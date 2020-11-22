# weather-dashboard

## Website Link
[Weather Dashboard](https://dalyd14.github.io/weather-dashboard/)

## Approach
- I took a mobile-first approach.
- I also wanted to include a map for the locations that are entered. This was because the OpenWeather API doesn't give great support for what state your results are in. Therefore, if a user enters "Greenville" they will know what particular Greenville it is displaying the weather for.
- This also supports searching via zipcode
- There are error indicators that will be displayed when certain things go awry
- there is functionality available to delete some of the saved locations
- By default, the app will load the first location in the saved locations array

## Screenshot
![Screenshot of weather dashboard](./assets/img/weather-dashboard.png)

## Purpose
AS A traveler\
I WANT to see the weather outlook for multiple cities\
SO THAT I can plan a trip accordingly

## Acceptance Criteria
*GIVEN a weather dashboard with form inputs*
  - WHEN I search for a city\
    THEN I am presented with current and future conditions for that city and that city is added to the search history
  - WHEN I view current weather conditions for that city\
    THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
  - WHEN I view the UV index\
    THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
  - WHEN I view future weather conditions for that city\
    THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  - WHEN I click on a city in the search history\
    THEN I am again presented with current and future conditions for that city