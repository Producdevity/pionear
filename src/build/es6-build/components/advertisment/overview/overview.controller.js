"use strict";

(function () {
	"use strict";

	angular.module("overview-advertisment.controller", []).controller("OverviewAdvertismentController", OverviewAdvertismentController);

	function OverviewAdvertismentController(AdvertismentService, $location, Functions) {
		var vm = this;
		this._fs = Functions;

		vm.title = 'Sign in to Pionear';
	}
})();
//# sourceMappingURL=overview.controller.js.map
