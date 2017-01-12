'use strict';

(function () {
	'use strict';

	angular.module("advertisment.routes", []).config(config);

	function config($stateProvider) {
		console.log('advertisment config function started');

		var ADVERTISMENT_PATH = 'app/components/advertisment';

		$stateProvider.state('advertisment', {
			url: '/advertisment',
			abstract: true,
			templateUrl: ADVERTISMENT_PATH + '/advertisment.view.html',
			controller: 'AdvertismentController',
			controllerAs: 'vm'
		}).state('advertisment.overview', {
			url: '/overview',
			templateUrl: ADVERTISMENT_PATH + '/advertisment/overview.view.html',
			controller: 'OverviewAdvertismentController',
			controllerAs: 'vm'
		}).state('advertisment.add', {
			url: '/add-advertisment',
			templateUrl: ADVERTISMENT_PATH + '/advertisment/add-advertisment.view.html',
			controller: 'AddAdvertismentController',
			controllerAs: 'vm'
		});
	}
})();
//# sourceMappingURL=advertisment.routes.js.map
