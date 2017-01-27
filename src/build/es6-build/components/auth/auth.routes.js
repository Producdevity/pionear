'use strict';

(function () {
	'use strict';

	angular.module("auth.routes", []).config(config);

	function config($stateProvider) {
		console.log('auth config function started');

		var AUTH_PATH = 'app/components/auth';

		$stateProvider.state('auth', {
			url: '/auth',
			templateUrl: AUTH_PATH + '/auth.view.html',
			controller: 'AuthController',
			controllerAs: 'vm'
		});
	}
})();
//# sourceMappingURL=auth.routes.js.map
