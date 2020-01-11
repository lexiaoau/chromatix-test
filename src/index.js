var http = require("http");
let fs = require("fs");

var _ = require('lodash');

var Parser = require('xml2js-parser');
var parser = new Parser({ explicitArray: false, mergeAttrs: true });

//create a server object:
http
    .createServer(async function (req, res) {
        const forecast_text_target_index = '3';

        try {
            const xml_data = fs.readFileSync(__dirname + "/../data.xml", "utf8");

            let json_xml2js_data = parser.parseStringSync(xml_data);    // convert xml data to json object

            // extract forecast data from json objct
            const forecast_area_data = _.get(json_xml2js_data, 'product.forecast.area', null);      
            if(!forecast_area_data) {
                throw new Error("Cannot find forecast data.");
            }

            // extract forecase data with index="3"
            const forecast_data_with_target_index_array = forecast_area_data.filter(elem => {
                if (!('forecast-period' in elem)) {
                    return false;
                }
                const forecast_array = elem['forecast-period'];
                // check if forecast_array exist and have more than 3 records( so it will contain index="3" data  )
                if (!forecast_array || !Array.isArray(forecast_array) || forecast_array.length < 4) {
                    return false;
                }
                return true;
            });

            let resultObj = {};
            // loop to fill forecast text to result object with location as key-index
            forecast_data_with_target_index_array.forEach(elem => {
                // get location name
                const area_name = _.get(elem, 'description', null);
                if (!area_name) {
                    // if area name is not found , print error message
                    console.error("Cannot find area name in :", elem);
                }
                else {
                    const forecast_array = elem['forecast-period'];
                    for (let ind = 0; ind < forecast_array.length; ind++) {
                        if (forecast_array[ind].index === forecast_text_target_index) {
                            const text = _.get(forecast_array[ind], 'text._', null);
                            if (text) {
                                resultObj[area_name] = String(text);
                                break;
                            }
                            else {
                                console.error("Cannot find forecast text in:", forecast_array[ind] );
                            }
                        }
                    }
                }
            });

            let results = resultObj;

            res.write(JSON.stringify(results));
            res.end();
        } catch (err) {
            const errString = String(err);
            console.error(errString);
            res.write(JSON.stringify(errString));
            res.end();
        }

    })
    .listen(8080); //the server object listens on port 8080
