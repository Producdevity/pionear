(() => {
	'use strict';

	angular
			.module("sidebar.controller", [])
			.controller("SidebarController", SidebarController);

	function SidebarController($location, Auth, Functions) {
		var vm = this;
this._fs = Functions;
		vm.signOut = signOut;

		function signOut() {
			console.log('signout');
			Auth.$signOut()
					.then(this._fs.toast().success('You are signed out.'))
					.then($location.path('/auth'));
		}
	}
})();
