const axios = require('axios');

const handleWeather = (req, res) => {
    console.log("req.body",req.body)
}

module.exports = {
    handleWeather: handleWeather
}