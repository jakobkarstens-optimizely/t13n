/**
 * Main route function to expose backend endpoints
 * @param app
 */

var Conversion = require('../SST/conversion');

module.exports = function(app){

	app.post('/api/sst/convert', Conversion.check)

}
