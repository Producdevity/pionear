(() => {
	'use strict';

	angular
			.module("offer.routes", [])
			.config(config)

	function config($stateProvider) {
		console.log('settings config function started');

		const SETTINGS_PATH = 'app/components/settings';

		$stateProvider
				.state('main.settings', {
					url:          '/settings',
					templateUrl:  `${SETTINGS_PATH}/settings.view.html`,
					controller:   'SettingsController',
					controllerAs: 'vm'
				});
	}

})();