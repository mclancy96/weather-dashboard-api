const express = require("express");
const app = express();
const cors = require('cors');

const weather = require('./controllers/weather');

app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send('success')
})

app.post('/dashboard', (req,res)=>{weather.handleWeather(req,res);})

app.listen(process.env.PORT, ()=>{
    console.log("App is running")
})