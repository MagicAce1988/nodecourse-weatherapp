const request = require('request')

const geoCode = (adress,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/&' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoibWFnaWNhY2UxOTg4IiwiYSI6ImNqd3MzMHl6bjAzZHo0M210d2RlanJwdm4ifQ.Q6SWj8DyBMA84yVhdwQb-Q&limit=1'
    request({url,json:true},(error, response)=>{
        if (error) {
            return callback('Unable to connect to geocoding services.',{})
        } else if (response.body.features.length===0) {
            return callback('Please provide a valid location!',{})
        } else {
            const {center ,place_name:nameplace,matching_place_name:matchingPlaceName}=response.body.features[0]
            callback(undefined,{
                latitude: center[1],
                longitude: center[0],
                nameplace,
                matchingPlaceName
            })

         }
    })
}

module.exports = geoCode

