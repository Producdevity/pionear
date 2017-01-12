(() => {
	"use strict";

	angular
			.module("overview-offer.controller", [])
			.controller("OverviewOfferController", OverviewOfferController);

	function OverviewOfferController(OfferService, $location, Functions) {
		let vm   = this;
		this._fs = Functions;

		vm.title = 'Sign in to Pionear';

	}
})();