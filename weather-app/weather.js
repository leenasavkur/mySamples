const request = require('request');

function getWeather(latitude, longitude, callback)
{
  var inputObj = {url: `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${latitude},${longitude}`,
    json: true}

  console.log('Weather URL: ', inputObj.url );
  request(inputObj, (error, response, body) => {
    if(error)
    {
      callback('Unable to connect to Forecast.io server');
    }
    else if(response.statusCode === 200)
    {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
    else
    {
      console.log('Weather Response: ', response.statusCode);
      callback('Unable to fetch weather.');
    }
  });
};


module.exports.getWeather = getWeather;
