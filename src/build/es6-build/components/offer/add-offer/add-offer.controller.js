"use strict";

(function () {
	"use strict";

	angular.module("add-offer.controller", []).controller("AddOfferController", AddOfferController);

	function AddOfferController(OfferService, UserService, Functions, $timeout, $location) {
		var vm = this;
		this._fs = Functions;
	}
})();
//# sourceMappingURL=add-offer.controller.js.map
