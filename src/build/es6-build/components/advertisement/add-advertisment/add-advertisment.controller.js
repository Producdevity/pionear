"use strict";

(function () {
	"use strict";

	angular.module("add-advertisment.controller", []).controller("AddAdvertismentController", AddAdvertismentController);

	function AddAdvertismentController(AdvertismentService, UserService, Functions, $timeout, $location) {
		var vm = this;
		this._fs = Functions;
	}
})();
//# sourceMappingURL=add-advertisment.controller.js.map
