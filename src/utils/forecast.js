const request = require('request')

const forecast = (long, lat, countryCode, callback)=>{
    const url='https://api.darksky.net/forecast/aadd8e049fa481e551aa4730cb073dae/'+ long +','+ lat + '/?units=si&lang='+countryCode
    request({url, json:true}, (error,response)=>{
        if (error) {
           return callback('Unable to connect to weather service',{})
        } else if (response.body.error){
            return callback('Unable to find location.',{})
        } else {
            const {summary,temperature:degrees,precipProbability:chanceOfRain}=response.body.currently

            callback(undefined, {

                summary,
                degrees,
                chanceOfRain
            })
            
        }
    })
}

module.exports = forecast

