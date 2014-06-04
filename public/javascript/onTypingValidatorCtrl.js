function OnTypingValidatorCtrl($scope, $http, $timeout) {

	$scope.number = "";

	$scope.isLoading = false;

	$scope.isValidNumber = null; 

	$scope.hasServerError = false; 

	var startValidateTimeout = null;

	$scope.$watch('number', function() {
		$scope.isValidNumber = null;

		//cancel pervious start validation timeout on number change
		// and start the new one again
		if (startValidateTimeout !== null) {
			$timeout.cancel(startValidateTimeout);
		}

		startValidateTimeout = $timeout(function(){
        	validatePhone($scope.number);    
        }, 3000);
    });

	function validatePhone() {
		if ($scope.number.length == 0){
			return;
		}
		
		toggleLoadingState();

		$http({
			url: 'validator/validate/', 
			method: "GET",
			params: {number: $scope.number}
		}).
		success(function(data) {
			$scope.hasServerError = false;
			toggleLoadingState();
			parseAndUpdateResult(data);
		}).
		error(function(error){
			toggleLoadingState();
			onServerError(error);	
		});

		function parseAndUpdateResult(data){
			if (data === 'true' || data === 'false'){
				$scope.isValidNumber = JSON.parse(data);
			}
			else {
				onServerError("Invalid response format " + data);	
			}
		}

		function toggleLoadingState(){
			$scope.isLoading = !$scope.isLoading;
		}

		function onServerError(error){
			$scope.isValidNumber = null;
			$scope.hasServerError = true;
			// TODO: hadnle errors goes here, send to server for example 
		}
	}
}