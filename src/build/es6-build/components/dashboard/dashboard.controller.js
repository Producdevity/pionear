"use strict";

(function () {
	'use strict';

	angular.module("dashboard.controller", []).controller("DashboardController", DashboardController);

	function DashboardController() {
		var vm = this;

		// set header titles
		vm.headerTitle = 'Dashboard';
		vm.optionalDescription = 'overview';
	}
})();
//# sourceMappingURL=dashboard.controller.js.map
