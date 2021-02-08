# Node.js Weather App
Node.js weather app using the openweathermap API

## Project Brief
To create a frontend using handlebars and style with css, and a backend using node.js.

## Part One
Create a form to input a city and country code:
- use axios in the backend to call the openweathermap api and fetch current weather data for the inputted city
- display this data on the frontend
- include icon provided by weathermap api also to be displayed on the frontend

## Part Two
As before, but this time display a 7 day forecast for the inputted city
- use axios to call the same openweathermap api and fetch the city's longitude and latitude
- make another api call to a different openweathermap api and insert the longitude & latitude values
- display this data and icons on the frontend

## Dependencies
- express version 4.17.1
- axios version 0.21.0
- hbs (handlebars) version 4.1.1
- nodemon version 2.0.6
- dotenv version 8.2.0
