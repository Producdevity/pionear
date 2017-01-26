'use strict';

(function () {
	'use strict';

	angular.module("offer.routes", []).config(config);

	function config($stateProvider) {
		console.log('offer config function started');

		var OFFER_PATH = 'app/components/offer';

		$stateProvider.state('main.offer', {
			url: '/offer',
			abstract: true,
			templateUrl: OFFER_PATH + '/offer.view.html',
			controller: 'OfferController',
			controllerAs: 'vm'
		}).state('main.offer.overview', {
			url: '/overview',
			templateUrl: OFFER_PATH + '/overview/overview.view.html',
			controller: 'OverviewOfferController',
			controllerAs: 'vm'
		}).state('main.offer.add', {
			url: '/add-offer',
			templateUrl: OFFER_PATH + '/add-offer/add-offer.view.html',
			controller: 'AddOfferController',
			controllerAs: 'vm'
		});
	}
})();
//# sourceMappingURL=offer.routes.js.map
