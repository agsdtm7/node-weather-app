const request = require('postman-request')

// Geocoding
// Address -> Latitude / Longitude -> Weather

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWdzZHRtNyIsImEiOiJja2V2aHFlangyZnh2MnNwbmE3eDVyd2p4In0.RK3aUnAwgvnbqA7Pm10deQ'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0 || response.body.features.length === undefined) {
            callback('Unable to find location, please check and correct your url or try another search.', undefined)
        } else {
            const { center, place_name } = response.body.features[0] // refer to object destructuring
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode