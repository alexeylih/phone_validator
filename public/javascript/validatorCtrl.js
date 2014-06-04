function ValidatorCtrl($scope, $http) {

	$scope.number = "";

	$scope.isLoading = false;

	$scope.isValidNumber = null; 

	$scope.hasServerError = false; 

	$scope.validatePhone = validatePhone;

	$scope.$watch('number', function() {
		$scope.isValidNumber = null;       
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