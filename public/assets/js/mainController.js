(function() {

	var app = angular.module('t13n');
	app.controller('mainController', ['$scope', '$http', '$timeout', '$window', function($scope, $http, $timeout, $window) {
		
		$scope.name = "Hello";

		$scope.message = function() {
			$http.post("/api/sst/message")
		    .then(function(response) {
		        console.log(response.data);
		    });
		}

		$scope.convert = function() {
			$http.post("/api/sst/convert")
		    .then(function(response) {
		        console.log(response.data);
		    });
		}
	
	}]);

})();

