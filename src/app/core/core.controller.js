(() => {
	'use strict';

	angular
			.module("core.controller", [])
			.controller("CoreController", CoreController);

	function CoreController(Auth, UserService, Functions, $rootScope) {
		let vm   = this;
		this._fs = Functions;

		vm.isToggled = false;

		vm.toggleSidebarParent = toggleSidebarParent;
		vm.signOut             = signOut;

		Auth.$onAuthStateChanged(user => {
			if(user) vm.currentUser = UserService.getUser(user.uid);
		});

		function signOut() {
			Auth.$signOut()
					.then(this._fs.toast().success('You are signed out.'));
		}

		function toggleSidebarParent() {
			vm.isToggled = !vm.isToggled;
		}

	}
})();