var request = require('superagent')
var tinder = require('tinderjs');
var client = new tinder.TinderClient();
var SECRETS = require('../../secrets.js');

var FACEBOOK_TOKEN = SECRETS.FACEBOOK.TOKEN
var FACEBOOK_ID = SECRETS.FACEBOOK.ID

module.exports = {
	matches: function(req, res) {
		client.authorize(
		  FACEBOOK_TOKEN,
		  FACEBOOK_ID,
		  function() {
		    client.getMatches(function(error, data){
		      return res.status(200).send({resp: data});
		    });
		});
	}
}
