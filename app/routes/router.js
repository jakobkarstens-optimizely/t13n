/**
 * Main route function to expose backend endpoints
 * @param app
 */

var Conversion = require('../SST/conversion');
var Tinder = require('../API/tinder');
var Message = require('../SST/message');

module.exports = function(app){

	app.post('/api/sst/convert', Conversion.check),
	app.post('/api/sst/message', Message.begin)
	// app.post('/api/tinder/matches', Tinder.matches)

}
