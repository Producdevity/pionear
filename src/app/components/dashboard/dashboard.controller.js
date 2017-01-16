(() => {
	'use strict';

	angular
			.module("dashboard.controller", [])
			.controller("DashboardController", DashboardController);

	function DashboardController() {
		let vm = this;

		// set header titles
		vm.headerTitle = 'Dashboard';
		vm.optionalDescription = 'overview';

	}
})();
