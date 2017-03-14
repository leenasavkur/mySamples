/*
Read the addresses from a file.
For each address get the Latitude and Longitude from google APi
For each valid Latitude and Longitude get the weather information from the weather app

Try to use sleep as another parameter to check the async behaviour
*/

console.log('Starting app.js');

const fs = require('fs');
const yargs = require('yargs');
const geoCode = require('./geocode');
const weather = require('./weather');

const argv = yargs.options({
                f: {
                  demand: true,
                  alias: 'file',
                  describe: 'File containing the addresses to fetch weather for',
                  string: true
                }
              })
              .help()
              .alias('help', 'h')
              .argv;

console.log('File containing the addresses is', argv.file);

//Read the file. Replace the inputs with that file.
var inputs = [{address:'26 Norris Road Bangalore', wait:10},
              {address:'Veera Desai Road Andheri Mumbai', wait:20},
              {address:'Highlands New Jersey', wait:10},
              {address:'2 Lavender Drive NJ 08820', wait:10}];

console.log('First address is ', inputs[3].address);

geoCode.getGeoCode(inputs[3].address, (errorMessage, results)=>{
    if(errorMessage)
    {
      console.log("Error : ", errorMessage);
    }
    else
    {
      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
        if(errorMessage)
        {
          console.log("Error : ", errorMessage);
        }
        else
        {
            console.log(`It is currently ${weatherResults.temperature}. But it feels like ${weatherResults.apparentTemperature}.` );
        }
      });
    }
});

console.log('Finish app.js');
