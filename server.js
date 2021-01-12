const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');
const dotenv = require('dotenv')

const viewsPath = path.join(__dirname, '/views');
const partialPath = path.join(__dirname, '/views/inc');
hbs.registerPartials(partialPath);

dotenv.config({path: './.env'});
const weatherApiKey = process.env.WEATHER_API_KEY

app.set('view engine', 'hbs');

app.set('views', viewsPath);

const publicDirectory = path.join(__dirname, '/public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", async (req, res) => {

    const cityInput = req.body.city
    const countryInput = req.body.countryCode

    try {
    const myApi = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput},${countryInput}&units=metric&appid=${weatherApiKey}`);
    // console.log(myApi.data);

    
        res.render("index", {
            forecast: `The temperature is currently ${myApi.data.main.temp}°c`,
            descript: `with ${myApi.data.weather[0].description}.`,
            imageIcon: myApi.data.weather[0].icon
        });
    }
    catch (error) {
        res.render("error");
    }
});

app.get("/forecast", (req, res) => {
    res.render("forecast");
});

app.post("/forecast", async (req, res) => {

    const city = req.body.city;
    const country = req.body.countryLetter

    const myApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weatherApiKey}&units=metric`);
    const lat = myApi.data.coord.lat
    const lon = myApi.data.coord.lon
    
    const latLonApi = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${weatherApiKey}&units=metric`);
    // console.log(latLonApi.data)

    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    const daily = latLonApi.data.daily;
    const days = daily.map((a) => {
      let date = new Date(a.dt * 1000),
        day = weekdays[date.getUTCDay()];
      return {
        day: day,
        temp: a.temp.day,
        description: a.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png`,
      }
    });
    res.render("forecastResult", {
        city: city,
        country: country,
        weatherObject: days,
      });
       

});

app.get("*", (req, res) => {
    res.send("<h1>Sorry that page does not exist</h1>");
});
app.listen(5000, () => {
    console.log("Server is running on Port 5000");
})