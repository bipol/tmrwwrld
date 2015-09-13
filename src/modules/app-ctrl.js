angular.module('app', []).controller('welcome', [ '$scope', '$http', '$interval', function($scope, $http, $interval) {
	$scope.message = "Leave a message here.";
	$scope.response = "What's going on?";

	$scope.addClick = function(text) {
		if (text != "" || "Leave a message here.") {
			$http.post('http://localhost:8000/api/store_msg', {msg: text}).then( function() {
				console.log('msg was sent');	
				$scope.message = "Thanks!";
			});
		}
	};

	$interval( function() {
		$http.get('http://localhost:8000/api/get_msg').then(function(response) {
			if (response.data.msg != null) {
				$scope.response = response.data.msg;
			}
		});
	}, 5000);
}]);
