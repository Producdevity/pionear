(() => {
	'use strict';

	angular
			.module("offer.controller", [])
			.controller("OfferController", OfferController);

	function OfferController(Share) {
		let vm = this;
		console.log(Share);

		// set header titles
		vm.headerTitle = 'Offers';
		vm.optionalDescription = Share.headerDescription = 'overview';
		//vm.optionalDescription = 'test';

	}
})();