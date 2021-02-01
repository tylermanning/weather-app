const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const lat = encodeURIComponent(latitude)
    const long = encodeURIComponent(longitude)
    const url = `http://api.weatherstack.com/current?access_key=c54f0a7de7e254bb0da26c2e27d36492&query=${lat},${long}`
    
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather service!', undefined)
        } else if (body.error) {
            callback("Invalid latitude or longitude given!", undefined)
        } else {
            callback(undefined, 
            {
                temperature: body.current.temperature,
                rain: body.current.precip,
            })
        }

    })
}

module.exports = forecast