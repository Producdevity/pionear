(() => {
	"use strict";

	angular
			.module("add-offer.controller", [])
			.controller("AddOfferController", AddOfferController);

	function AddOfferController(OfferService, UserService, Functions, $timeout, $location) {
		let vm   = this;
		this._fs = Functions;


	}
})();
