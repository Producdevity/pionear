"use strict";

(function () {
	"use strict";

	angular.module("add-offer.controller", []).controller("AddOfferController", AddOfferController);

	function AddOfferController(OfferService, Functions, $timeout, $location) {
		var vm = this;
		this._fs = Functions;

		vm.newOffer;
		vm.addOffer = addOffer;

		function addOffer() {
			OfferService.addOffer(vm.newOffer).then(console.log(vm.newOffer))
			//.then(this._fs.toast().success(`Added new offer ${vm.newOffer.name}`))
			.then(vm.newOffer = {});
		}
	}
})();
//# sourceMappingURL=add-offer.controller.js.map
