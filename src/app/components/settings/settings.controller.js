(() => {
	'use strict';

	angular
			.module("settings.controller", [])
			.controller("SettingsController", SettingsController);

	function SettingsController(Share, UserService, Auth, Functions) {
		let vm = this;
		this._fs = Functions;

		vm.updateProfile = updateProfile;

		// set header titles
		vm.headerTitle         = 'Account settings';
		vm.optionalDescription = Share.headerDescription = 'overview';

		function init() {
		 getUser();
		}
		init();

		function getUser() {
			Auth.$onAuthStateChanged(user => {
				if(user) {
					vm.currentUser = UserService.getUser(user.uid);
					console.log(vm.currentUser);
				}
			});
		}

		function updateProfile() {
				UserService.updateUser(vm.currentUser)
						.then(this._fs.toast().success(`Updated profile`));
		}

	}
})();