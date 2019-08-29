const request = require('request');

const forecast = (latitude, longitude, callback) => {
const url = `https://api.darksky.net/forecast/0cd53e0bc4263a75e704c623ee568d8a/${latitude},${longitude}`
    request({
        url,
        json: true
    }, (error, {body}) => {

        if(error){
            callback('Request cannot be completed')
        } else if(body.error) {
            callback(body.error)
        }
        else{
            callback(undefined, 
                `The current temperature is ${body.currently.temperature},
                ${body.currently.summary} with a
                ${body.currently.precipProbability}% chance of rain
                The humidity is ${body.currently.humidity} and the wind speed is ${body.currently.windSpeed}`
                
            )
            
        }
    })
}

module.exports = forecast