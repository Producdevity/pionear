"use strict";

(function () {
	'use strict';

	angular.module("core.controller", []).controller("CoreController", CoreController);

	function CoreController(Auth, UserService, Functions, $rootScope) {
		var vm = this;
		this._fs = Functions;

		vm.signOut = signOut;

		Auth.$onAuthStateChanged(function (user) {
			if (user) vm.currentUser = UserService.getUser(user.uid);
		});

		function signOut() {
			Auth.$signOut().then(this._fs.toast().success('You are signed out.'));
		}
	}
})();
//# sourceMappingURL=core.controller.js.map
