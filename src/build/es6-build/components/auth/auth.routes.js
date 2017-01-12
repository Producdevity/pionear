'use strict';

(function () {
	'use strict';

	angular.module("auth.routes", []).config(config);

	function config($stateProvider) {
		console.log('auth config function started');

		var AUTH_PATH = 'app/components/auth';

		$stateProvider.state('auth', {
			abstract: true,
			url: '/auth',
			templateUrl: AUTH_PATH + '/auth.view.html'
		}).state('auth.signin', {
			url: '/sign-in',
			templateUrl: AUTH_PATH + '/sign-in/sign-in.view.html',
			controller: 'SignInController',
			controllerAs: 'vm'
		}).state('auth.signup', {
			url: '/sign-up',
			templateUrl: AUTH_PATH + '/sign-up/sign-up.view.html',
			controller: 'SignUpController',
			controllerAs: 'vm'
		});
	}
})();
//# sourceMappingURL=auth.routes.js.map
