var Tinder = require('../API/tinder');
var EXPERIMENT_ID = "firstmessage"
var optimizely = require('optimizely-server-sdk');
var datafile = {
   "experiments":[
      {
         "status":"Running",
         "percentageIncluded":10000,
         "key":"firstmessage",
         "trafficAllocation":[
            {
               "entityId":"6820620274",
               "endOfRange":2000
            },
            {
               "entityId":"6820620275",
               "endOfRange":4000
            },
            {
               "entityId":"6820620276",
               "endOfRange":6000
            },
            {
               "entityId":"6820620277",
               "endOfRange":8000
            },
            {
               "entityId":"6820620278",
               "endOfRange":10000
            }
         ],
         "audienceIds":[

         ],
         "variations":[
            {
               "id":"6820620274",
               "key":"message1"
            },
            {
               "id":"6820620275",
               "key":"message3"
            },
            {
               "id":"6820620276",
               "key":"message2"
            },
            {
               "id":"6820620277",
               "key":"message4"
            },
            {
               "id":"6820620278",
               "key":"message5"
            }
         ],
         "forcedVariations":{

         },
         "id":"6815661222"
      }
   ],
   "version":"1",
   "audiences":[

   ],
   "dimensions":[

   ],
   "groups":[

   ],
   "projectId":"6783479455",
   "accountId":"6078461113",
   "events":[
      {
         "experimentIds":[
            "6815661222"
         ],
         "id":"6820010235",
         "key":"message_response"
      },
      {
         "experimentIds":[

         ],
         "id":"6777058824",
         "key":"Total Revenue"
      }
   ],
   "revision":"6"
};
var optimizely = optimizely.createInstance({ datafile: datafile });
var request = require('superagent')
var tinder = require('tinderjs');
var client = new tinder.TinderClient();
var SECRETS = require('../../secrets.js');

var FACEBOOK_TOKEN = SECRETS.FACEBOOK.TOKEN
var FACEBOOK_ID = SECRETS.FACEBOOK.ID

module.exports = {
	check: function(req, res) {

		client.authorize(
		  FACEBOOK_TOKEN,
		  FACEBOOK_ID,
		  function() {
		    client.getHistory(function(error, data){
		      var tinderUsers = data.matches;
				for(var i = 0; i < tinderUsers.length; i++) {
               var match = tinderUsers[i]
					var userID = match._id
               var messages = match.messages;
               var mes = messages[messages.length - 1]
               if (match.person._id === mes.from) {
                  var variation = optimizely.track("message_response", userID);
               }
				}
				return res.status(200).send({message: "Conversions Logged"});
		    });
		});

		//TODO: Get message updates from tinder, call it tinderMessages
		// var tinderMessages = 

		// for(var message in tinderMessages) {
		// 	var userID //Get message userID
		// 	//Call Optimizely SST
		// 	//Somehow mark TinderUpdates
		// }
		// return res.status(200).send({message: "Conversions Logged"});
	}
}