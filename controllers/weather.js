const axios = require('axios');

// =====================================SetVariables============================
// This formats the data passed into it to match the desired format for the app
toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
};

noSeconds = (str) =>{
    if(str.lastIndexOf(':') === 5){
        return `${str.slice(0,5)}${str.slice(-2)}`
    } else {
        return `${str.slice(0,4)}${str.slice(-2)}`
    }
}
setVariables = (data) => {
    const setMoonPhase = (data) => {
        let moonPhase = '';
        if (data < .01) {
            moonPhase = 'New Moon';
        } else if (data < .24 && data > .01) {
            moonPhase = 'Waxing Crescent'
        } else if (data < .26 && data > .24){
            moonPhase = 'First Quarter'
        } else if (data < .49 && data > .26) {
            moonPhase = 'Waxing Gibbous'
        } else if (data < .51 && data > .49) {
            moonPhase = 'Full Moon'
        } else if (data < .74 && data > .51){
            moonPhase = 'Waning Gibbous'
        } else if (data < .76 && data > .74) {
            moonPhase = 'Last Quarter'
        } else if (data < .99 && data > .76) {
            moonPhase = 'Waning Crescent'
        } else if (data > .99) {
            moonPhase = 'New Moon'
        }
        return moonPhase;
    }
    const setWindDirection = (data) => {
        let windDir = '';
        if(data <= 15 && data >= 0){
            windDir = 'N'
        } else if(data <= 35 && data > 15){
            windDir = 'NNE'
        } else if(data <= 55 && data > 35){
            windDir = 'NE'
        } else if(data <= 75 && data > 55){
            windDir = 'ENE'
        } else if(data <= 105 && data > 75){
            windDir = 'E'
        } else if(data <= 125 && data > 105){
            windDir = 'ESE'
        } else if(data <= 145 && data > 125){
            windDir = 'SE'
        } else if(data <= 165 && data > 145){
            windDir = 'SSE'
        } else if(data <= 195 && data > 165){
            windDir = 'S'
        } else if(data <= 215 && data > 195){
            windDir = 'SSW'
        } else if(data <= 235 && data > 215){
            windDir = 'SW'
        } else if(data <= 255 && data > 235){
            windDir = 'WSW'
        } else if(data <= 285 && data > 255){
            windDir = 'W'
        } else if(data <= 305 && data > 285){
            windDir = 'WNW'
        } else if(data <= 325 && data > 305){
            windDir = 'NW'
        } else if(data <= 345 && data > 325){
            windDir = 'NNW'
        } else if(data <= 360 && data > 345){
            windDir = 'N'
        } 
        return windDir;
    }
    let minutes = []
    if(data.data.minutely){
        data.data.minutely.forEach((min) => {
            let dtVal = Object.values(min)[0];
            minutes.push({
                minute: noSeconds((new Date(dtVal*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone})),
                precip: +(Object.values(min)[1]*0.0393701).toFixed(3)
            });   
        });
    } 
    let hours = [];
    if(data.data.hourly){
        data.data.hourly.forEach((hr) => {
            let dtVal = Object.values(hr)[0];
            hours.push({
                hour: noSeconds((new Date(dtVal*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone})),
                temp: Math.round(Object.values(hr)[1]),
                feels_like: Math.round(Object.values(hr)[2]),
                pressure: Object.values(hr)[3],
                humidity: Object.values(hr)[4],
                dew_point: Math.round(Object.values(hr)[5]),
                uvi: Object.values(hr)[6],
                clouds: Object.values(hr)[7],
                visibility: Object.values(hr)[8],
                wind_speed: Math.round(Object.values(hr)[9]),
                wind_deg: setWindDirection(Object.values(hr)[10]),
                wind_gust: Math.round(Object.values(hr)[11]),
                summary: [
                    {
                        id: Object.values(hr)[12][0].id,
                        main: Object.values(hr)[12][0].main,
                        description: toTitleCase(Object.values(hr)[12][0].description),
                        icon: Object.values(hr)[12][0].icon
                    }
                ],
                pop: Object.values(hr)[13].toFixed(2)
            });   
        });
    }
    
    const getMoonLink = (phase) => {
        return 'img/'+ phase.toLowerCase().replace(' ','_')+".png"
    }
    let days = [];
    let week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    data.data.daily.forEach((day) => {
        let dtVal = Object.values(day)[0];
        days.push({
            date: (new Date(dtVal*1000)).toLocaleDateString('en-US',{timeZone: data.data.timezone}),
            dow: week[(new Date(dtVal*1000)).getDay()],
            sunrise: noSeconds((new Date(Object.values(day)[1]*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone})),
            sunset: noSeconds((new Date(Object.values(day)[2]*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone})),
            moonrise: noSeconds((new Date(Object.values(day)[3]*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone})),
            moonset: noSeconds((new Date(Object.values(day)[4]*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone})),
            moon_phase: Object.values(day)[5],
            moon_phase_name: setMoonPhase(Object.values(day)[5]),
            moon_phase_url: getMoonLink(setMoonPhase(Object.values(day)[5])),
            temp: {
                day: Math.round(Object.values(day)[6].day),
                min: Math.round(Object.values(day)[6].min),
                max: Math.round(Object.values(day)[6].max),
                night: Math.round(Object.values(day)[6].night),
                eve: Math.round(Object.values(day)[6].eve),
                morn: Math.round(Object.values(day)[6].morn)
            },
            feels_like: {
                day: Math.round(Object.values(day)[7].day),
                night: Math.round(Object.values(day)[7].night),
                eve: Math.round(Object.values(day)[7].eve),
                morn: Math.round(Object.values(day)[7].morn)
            },
            pressure: Object.values(day)[8],
            humidity: Object.values(day)[9],
            dew_point: Math.round(Object.values(day)[10]),
            wind_speed: Math.round(Object.values(day)[11]),
            wind_deg: setWindDirection(Object.values(day)[12]),
            wind_gust: Math.round(Object.values(day)[13]),
            summary: {
                id: Object.values(day)[14][0].id,
                main: Object.values(day)[14][0].main,
                description: toTitleCase(Object.values(day)[14][0].description),
                icon: Object.values(day)[14][0].icon
            },
            clouds: Object.values(day)[15],
            pop: Object.values(day)[16].toFixed(2),
            rain: Object.values(day)[17],
            uvi: Object.values(day)[18]
        });
            
    })
    let alerts = null;
    if(data.data.alerts){
        alerts = [];
        data.data.alerts.forEach((alt) => {
            alerts.push({
                sender_name: Object.values(alt)[0],
                event: Object.values(alt)[1],
                start: (new Date(Object.values(alt)[2]*1000)).toLocaleString('en-US',{timeZone: data.data.timezone}),
                end: (new Date(Object.values(alt)[3]*1000)).toLocaleString('en-US',{timeZone: data.data.timezone}),
                description: Object.values(alt)[4]
            });   
        });
    }
    let setData = {
        loc: {
            lat: data.data.lat,
            lon: data.data.lon,
            timezone: data.data.timezone,
            timezone_offset: data.data.timezone_offset,
        },
        current: {
            clouds: data.data.current.clouds,
            currentDow: week[(new Date(data.data.current.dt*1000)).getDay()],
            dew_point: Math.round(data.data.current.dew_point),
            currentTime: noSeconds((new Date(data.data.current.dt*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone})),
            currentDate: (new Date(data.data.current.dt*1000)).toLocaleDateString('en-US',{timeZone: data.data.timezone}),
            feels_like: Math.round(data.data.current.feels_like),
            humidity: data.data.current.humidity,
            pressure: data.data.current.pressure,
            sunrise: (new Date(data.data.current.sunrise*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone}),
            sunset: (new Date(data.data.current.sunset*1000)).toLocaleTimeString('en-US',{timeZone: data.data.timezone}),
            temp: Math.round(data.data.current.temp),
            uvi: data.data.current.uvi,
            visibility: data.data.current.visibility,
            wind_deg: setWindDirection(data.data.current.wind_deg),
            wind_gust: data.data.current.wind_gust,
            wind_speed: Math.round(data.data.current.wind_speed),
            summary: {
                desc: toTitleCase(data.data.current.weather[0].description),
                icon: data.data.current.weather[0].icon,
                id: data.data.current.weather[0].id,
                main: data.data.current.weather[0].main
            }
        },
        minute: minutes,
        hour: hours,
        daily: days,
        alerts: alerts
    }
    return setData;
}  

const handleWeather = async (req, res) => {
    let {zip, country} = req.body;
    let latVal = '';
    let lonVal = '';
    let cityVal = '';
    let locationInfo = {};
    const regex = /[0-9]{5}/;
    const matchStatus = regex.test(zip);
    let validZip = true;
    if (matchStatus === true){
        await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${process.env.APIKEY}`)
            .then((resp) => {
                locationInfo = resp.data;
                latVal = resp.data.lat;
                lonVal = resp.data.lon;
                cityVal = resp.data.name;
                console.log(`Location found: ${cityVal} (${latVal}, ${lonVal}) at ${new Date()}`)
            })
            .catch((error) => {
                validZip = false;
                res.status(404).json('Invalid ZIP Code or country')
            });
        if(validZip === true){
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latVal}&lon=${lonVal}&appid=${process.env.APIKEY}&units=imperial`)
            .then(resp => {
                let setResp = setVariables(resp); 
                res.status(200).json({
                    weatherData: setResp,
                    locationInfo: locationInfo, 
                    route: 'home'
                });
                console.log("Data Sent")
            })
            .catch((error) => {
                res.status(400).json('Error getting weather')
                console.log(error)
            });
        }
    } else {
        res.status(406).json('ZIP Code field is not filled out correctly');
    }
}

module.exports = {
    handleWeather: handleWeather
}