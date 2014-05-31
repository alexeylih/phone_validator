function PhoneCtrl($scope, $http) {

	// bound values	
	$scope.number = "";

	//Handle loading state 

	var isLoading = false;

	function toggleLoadingState(){
		isLoading = !isLoading;
	}

	$scope.isLoading = function(){
		return isLoading;
	}	

	// Handle validation message

	var isValidNumber = null; //unknown;

	$scope.$watch('number', function() {
		isValidNumber = null;       
    });

	$scope.isValidNumber = function(){
		return isValidNumber;
	}	

	$scope.isEmptyNumber = function(){
		return $scope.number.length == 0;
	}

	$scope.validatePhone = function(number) {
		if ($scope.isEmptyNumber()){
			return;
		}
		
		toggleLoadingState();
		$http({
			url: 'validator/validate/', 
			method: "GET",
			params: {number: number}
		}).
		success(function(data) {
			toggleLoadingState();
			parseAndUpdateResult(data);
		}).
		error(function(err){
			parseAndUpdateResult(null);
		});

		function parseAndUpdateResult(data){
			if (data === 'true' || data === 'false'){
				isValidNumber = data;
			}
			else {
				isValidNumber = 'error';	
			}
		}
	}
}