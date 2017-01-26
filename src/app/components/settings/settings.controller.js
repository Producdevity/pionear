(() => {
	'use strict';

	angular
			.module("settings.controller", [])
			.controller("OfferController", OfferController);

	function OfferController(Share) {
		let vm = this;

		// set header titles
		vm.headerTitle = 'Offers';
		vm.optionalDescription = Share.headerDescription = 'overview';
		//vm.optionalDescription = 'test';

	}
})();