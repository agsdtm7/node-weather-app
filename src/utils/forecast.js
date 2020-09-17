const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url1 = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url1, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback(response.body.error.info, undefined)
        } else {
            const { weather_descriptions, temperature, precip, wind_speed } = response.body.current
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' Fahrenheit. ' + precip + ' chance of rain. Wind: ' + wind_speed)
        }
    })
}

module.exports = forecast