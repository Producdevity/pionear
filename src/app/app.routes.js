(() => {
	'use strict';

	angular
			.module("myApp")
			.config(config);

	function config($urlRouterProvider, $locationProvider, $stateProvider) {
		console.log('app.routes function started');
		const BASE_PATH = 'app/components';

		$locationProvider.html5Mode(false);
		$urlRouterProvider.otherwise('/dashboard');
		$stateProvider
				.state('main', {
					url:          '',
					abstract:     true,
					templateUrl:  `${BASE_PATH}/main/main.view.html`,
					controller:   'MainController',
					controllerAs: 'vm',
					resolve:      {
						// controller will not be loaded until $requireSignIn resolves
						// Auth refers to our $firebaseAuth wrapper in the factory below
						"currentAuth": ["Auth", function(Auth) {
							// $requireSignIn returns a promise so the resolve waits for it to complete
							// If the promise is rejected, it will throw a $stateChangeError (see above)
							return Auth.$requireSignIn();
						}]
					}
				})
				.state('main.dashboard', {
					url:          '/dashboard',
					templateUrl:  `${BASE_PATH}/dashboard/dashboard.view.html`,
					controller:   'DashboardController',
					controllerAs: 'vm',
				});
	}

})();