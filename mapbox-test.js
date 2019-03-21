require('dotenv').config();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({  accessToken: process.env.MAPBOX_TOKEN});


async function gecoder(location) {

    try {

        const result = await geocodingClient.forwardGeocode({
            query: location,
            limit: 1,
            something: 'hjjjfjfj'
        })
        .send();
        
        console.log(result.body.features[0].geometry.coordinates);
    } catch(err){
        console.log(err.message);
    }
}
    
gecoder('alaska. us');

    //response.body.features[0].geometry.coordinates;