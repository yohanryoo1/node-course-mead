const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/14260cefbe9406603646519428d73e57/${lat},${long}?units=si`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('invalid coordinates. please check input.', undefined)
        } else {
            const dailySummary = body.daily.data[1].summary
            const temperature = body.currently.temperature
            const precipChance = body.currently.precipProbability

            const data = `Summary: ${dailySummary} It is currently ${temperature} degrees C. There is ${precipChance}% chance of rain.`

            callback(undefined, data)
        }
    })
}

module.exports = forecast