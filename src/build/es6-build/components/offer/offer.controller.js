"use strict";

(function () {
	'use strict';

	angular.module("offer.controller", []).controller("OfferController", OfferController);

	function OfferController(Share) {
		var vm = this;
		console.log(Share);

		// set header titles
		vm.headerTitle = 'Offers';
		vm.optionalDescription = Share.headerDescription = 'overview';
		//vm.optionalDescription = 'test';
	}
})();
//# sourceMappingURL=offer.controller.js.map
