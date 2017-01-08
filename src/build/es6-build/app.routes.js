'use strict';

(function () {
	'use strict';

	angular.module("myApp").config(config);

	function config($urlRouterProvider, $stateProvider) {
		console.log('app.routes function started');
		var BASE_URL = 'app/components',
		    AUTH_URL = BASE_URL + '/auth';

		$urlRouterProvider.otherwise('/');
		$stateProvider.state('main', {
			url: '/',
			templateUrl: BASE_URL + '/main/main.view.html',
			controller: 'MainController',
			controllerAs: 'vm',
			data: {
				bodyClasses: 'sidebar-mini'
			},
			resolve: {
				// controller will not be loaded until $requireSignIn resolves
				// Auth refers to our $firebaseAuth wrapper in the factory below
				"currentAuth": ["Auth", function (Auth) {
					// $requireSignIn returns a promise so the resolve waits for it to complete
					// If the promise is rejected, it will throw a $stateChangeError (see above)
					return Auth.$requireSignIn();
				}]
			}
		});
		//.state('main.dashboard', {
		//	url:         '/dashboard',
		//	controller:   'MainController',
		//	controllerAs: 'vm',
		//	templateUrl:  `${BASE_URL}/main/main.view.html`,
		//})
		//.state('auth.signin', {
		//	url:          '/signin',
		//	templateUrl:  `${AUTH_URL}/sign-in/sign-in.view.html`,
		//	controller:   'AuthController',
		//	controllerAs: 'vm'
		//})
		//.state('auth.signup', {
		//	url:          '/signup',
		//	templateUrl:  `${AUTH_URL}/sign-up/signup.view.html`,
		//	controller:   'AuthController',
		//	controllerAs: 'vm'
		//})
		//.state('contact', {
		//	url: '/contact',
		//	templateUrl: 'contact.html'
		//})
	}
})();
//# sourceMappingURL=app.routes.js.map
