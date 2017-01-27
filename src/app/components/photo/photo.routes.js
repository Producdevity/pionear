(() => {
	'use strict';

	angular
			.module("photo.routes", [])
			.config(config)

	function config($stateProvider) {
		console.log('photo config function started');

		const PHOTO_PATH = 'app/components/photo';

		$stateProvider
				.state('main.photo', {
					url:          '/photo',
					abstract:     true,
					templateUrl:  `${PHOTO_PATH}/photo.view.html`,
					controller:   'PhotoController',
					controllerAs: 'vm'
				})
				.state('main.photo.overview', {
					url:          '/overview',
					templateUrl:  `${PHOTO_PATH}/overview/overview.view.html`,
					controller:   'OverviewPhotoController',
					controllerAs: 'vm'
				})
				.state('main.photo.add', {
					url:          '/add-photo',
					templateUrl:  `${PHOTO_PATH}/add-photo/add-photo.view.html`,
					controller:   'AddPhotoController',
					controllerAs: 'vm'
				});
	}

})();