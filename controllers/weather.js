const axios = require('axios');

const handleWeather = (req, res) => {
    let {zip, country} = req.body;
    //if there's a zip, use zip lookup
    if (zip === "" || zip === undefined || zip === null){
        axios.post('/user', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response.json());
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    //if there's a city, state, use city state lookup
}

module.exports = {
    handleWeather: handleWeather
}