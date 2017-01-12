(() => {
	'use strict';

	angular
			.module("offer.controller", [])
			.controller("OfferController", OfferController);

	function OfferController() {
		let vm = this;
		console.log('offer control');
	}
})();