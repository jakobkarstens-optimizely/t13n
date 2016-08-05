/**
 * Main route function to expose backend endpoints
 * @param app
 */

var Conversion = require('../SST/conversion');
var Tinder = require('../API/tinder');

module.exports = function(app){

	app.post('/api/sst/convert', Conversion.check),
	app.post('/api/tinder/matches', Tinder.matches)

}
