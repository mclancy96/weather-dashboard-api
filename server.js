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

app.post('/dashboard', (req,res)=>{
    console.log(req.body)
    weather.handleWeather(req,res)
})

app.listen(3002, ()=>{
    console.log("App is running")
})