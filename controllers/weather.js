const axios = require('axios');

const handleWeather = (req, res) => {
    let {zip, state, city, country} = req.body;
    //if there's a zip, use zip lookup
    if (zip === "" || zip === undefined || zip === null){

    }
    //if there's a city, state, use city state lookup
}

module.exports = {
    handleWeather: handleWeather
}