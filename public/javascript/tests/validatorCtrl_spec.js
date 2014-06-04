describe('ValidatorCtrl', function() {
	var $scope, $rootScope, $httpBackend, createController;

	var requestUrl = 'validator/validate/?number=%2B9720551291313';

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$httpBackend = $injector.get('$httpBackend');
		$scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function() {
			return $controller('ValidatorCtrl', {
				'$scope': $scope
			});
		};
	}));

	it('should be initialized with correct values', function() {
		var controller = createController();
		expect($scope.number).toBe("");
		expect($scope.isLoading).toBe(false);
		expect($scope.isValidNumber).toBe(null);
		expect($scope.hasServerError).toBe(false);
	});

	it('should not start loading when validating empty phone', function() {
		var controller = createController();
		$scope.validatePhone();
		expect($scope.isLoading).toBe(false);
	});

	it('should start loading when validating non empty phone', function() {
		var controller = createController();
		$scope.number = "+9720551291313";
		$scope.validatePhone();
		expect($scope.isLoading).toBe(true);
	});

	it('should stop loading after backend returns value', function() {
		var controller = createController();
		$scope.number = "+9720551291313";

		$httpBackend.whenGET(requestUrl)
			.respond('true');

		$scope.validatePhone();
		$httpBackend.flush();
		expect($scope.isLoading).toBe(false);
	});

	it('should update number validity after backend returns value', function(){
		var controller = createController();
		$scope.number = "+9720551291313";

		$httpBackend.whenGET(requestUrl)
			.respond('true');

		$scope.validatePhone();
		$httpBackend.flush();
		expect($scope.isValidNumber).toBe(true);
	});

	it('should mark server error flag on server error', function(){
		var controller = createController();
		$scope.number = "+9720551291313";

		$httpBackend.whenGET(requestUrl)
			.respond(500, '');

		$scope.validatePhone();
		$httpBackend.flush();
		expect($scope.hasServerError).toBe(true);
	});

	it('should mark server error flag on unexpected response format', function(){
		var controller = createController();
		$scope.number = "+9720551291313";

		$httpBackend.whenGET(requestUrl)
			.respond('Invalid response format $#$#%q$$234');

		$scope.validatePhone();
		$httpBackend.flush();
		expect($scope.hasServerError).toBe(true);
	});

	it('should stop loading on server error', function(){
		var controller = createController();
		$scope.number = "+9720551291313";

		$httpBackend.whenGET(requestUrl)
			.respond(500, '');

		$scope.validatePhone();
		$httpBackend.flush();
		expect($scope.isLoading).toBe(false);
	});

	it('should nullify number validity on server error', function(){
		var controller = createController();
		$scope.number = "+9720551291313";

		$httpBackend.whenGET(requestUrl)
			.respond(500, '');

		$scope.validatePhone();
		$httpBackend.flush();
		expect($scope.isLoading).toBe(false);
	});

	it('should unmark server error flag after successfull response from backend', function(){
		var controller = createController();
		$scope.number = "+9720551291313";


		// let first request return 500 , but second succees
		var isFirstRequest = true;
		$httpBackend.whenGET(requestUrl)
			.respond(function(method, url, data, headers){
				return isFirstRequest ? [500, ''] : [200, 'false'];
			});

		$scope.validatePhone();
		$httpBackend.flush();
		
		isFirstRequest = false;

		$scope.validatePhone();
		$httpBackend.flush();

		expect($scope.hasServerError).toBe(false);
	});

});