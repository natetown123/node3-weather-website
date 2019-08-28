const request = require('request')

const geocode = (address, callback) => {
    if(!address){
        return console.log("No address Given to Geocode")
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmF0ZXRvd24xMjMiLCJhIjoiY2p6a3I5aXI5MDNmbDNiczdzaW1lNW14MiJ9.zgq6gx3I8DxTj07sf4G4fQ&limit=1`
    request( {
        url,
        json: true
    }, 
    (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode