const express = require("express");
const app = express();
const cors = require('cors');

// Set port, api key, and url

const weather = require('./controllers/weather');

app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send('success')
})

app.post('/dashboard',  (req,res)=>{
    weatherData = weather.handleWeather(req,res);
    //If successful
    res.status(200).json(weatherData)
    //If failure...
})

app.listen(3002, ()=>{
    console.log("App is running")
})