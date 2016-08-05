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

var messageDict = {
	"message1": "Hey",
	"message2": "Down for coffee?",
	"message3": "YOOOO!",
	"message4": "I hear you're good at algebra.....Will you replace my eX without asking Y?",
	"message5": "NUMBER?" 
}

module.exports = {
	begin: function(req, res) {

		//TODO: Get users from tinder, call it tinderUsers
		client.authorize(
		  FACEBOOK_TOKEN,
		  FACEBOOK_ID,
		  function() {
		    client.getHistory(function(error, data){
		      	var tinderUsers = data.matches;
				// for(var match in tinderUsers) {
				// if (match.messages == []) {
					var userID = tinderUsers[0]._id//Get message userID
					var variation = optimizely.activate(EXPERIMENT_ID, userID);
					var message = messageDict[variation];

					client.sendMessage(userID, message, function(error1, data1) {
						console.log(data1)
						return res.status(200).send({message1: message})
					})
				// }
					//Call Optimizely SST if conversation count = 0
				// }
		    });
		});
	}
}