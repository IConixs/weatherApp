const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const { error } = require("console");
const { mainModule } = require("process");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static('public/'))

const PORT = 7899;

const apiKey = "f3faffb71a9512ce3fcbf94eef460a50";

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", (req, res) => {
  const city = req.body.city.toUpperCase();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  https
    .get(url, (response) => {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        let desc = weatherData.list[0].weather[0].description;
        let temp = Math.ceil(weatherData.list[0].main.temp);
        let humidity = Math.ceil(weatherData.list[0].main.humidity);
        let iconCode = weatherData.list[0].weather[0].icon;
        let time = weatherData.list[0].dt_txt;

        let desc2 = weatherData.list[1].weather[0].description;
        let temp2 = Math.ceil(weatherData.list[1].main.temp);
        let humidity2 = Math.ceil(weatherData.list[1].main.humidity);
        let time2 = weatherData.list[1].dt_txt;

        let desc3 = weatherData.list[2].weather[0].description;
        let temp3 = Math.ceil(weatherData.list[2].main.temp);
        let humidity3 = Math.ceil(weatherData.list[2].main.humidity);
        let time3 = weatherData.list[2].dt_txt;
        res.render("front", {
          city: city,
          temp: temp,
          desc: desc,
          humidity: humidity,
          time,
          iconCode: iconCode,
          desc2,
          temp2,
          humidity2,
          time2,
          desc3,
          temp3,
          humidity3,
          time3,
        });
      });
    })
    .on("error", (er) => {
      console.error(er);
    });
});

app.listen(PORT, () => console.log(`App is running on ${PORT} port`));
