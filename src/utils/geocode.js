const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieW9oYW5yeW9vIiwiYSI6ImNrN2UxcDBwNjAzemkzZm50OTA5Zm44NnoifQ.KP9_elC4YWzqCOmSTxR56A&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to get coordinates. please check location input', undefined)
        } else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            const placeName = body.features[0].place_name
            
            const data = {
                lat: lat, 
                long: long,
                placeName: placeName
            }

            callback(undefined, data)
        }
    })
}

module.exports = geocode