const request = require('request');

function getGeoCode(address, callback)
{
  var encodedAddress = encodeURIComponent(address);

  var addressObj = {url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }

  request(addressObj, (error, response, body) => {
    if(error)
    {
      callback('Unable to connect to google servers.');
    }
    else if(response.statusCode === 200)
    {
      callback(undefined,
         {address: body.results[0].formatted_address,
         latitude: body.results[0].geometry.location.lat,
         longitude: body.results[0].geometry.location.lng});
    }
    else
    {
      callback('Unable to get the address');
    }
  });
};

module.exports.getGeoCode = getGeoCode;
