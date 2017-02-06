"use strict";

(function () {
	'use strict';

	angular.module("auth.controller", []).controller("AuthController", AuthController);

	function AuthController(Auth, UserService, Functions, $location) {
		var vm = this;
		this._fs = Functions;

		vm.signUp = signUp;
		vm.signIn = signIn;
		vm.credentialsX = {};
		vm.loading = true;

		Auth.$onAuthStateChanged(function (user) {
			if (user) $location.path('/');
		});

		function signIn(credentials) {
			var _this = this;

			console.log(credentials);
			console.log('singin');
			vm.loading = true;
			Auth.$signInWithEmailAndPassword(credentials.email, credentials.pass).then(function (user) {
				_this._fs.toast().success("Signed in as " + user.email);
				$location.path('/dashboard');
			}).catch(function (error) {
				console.error("Authentication failed:", error);
				_this._fs.toast().error(error.message);
				vm.error = error.message;
				vm.loading = false;
			});
		}

		function signUp() {
			var _this2 = this;

			console.log(vm.credentialsX);
			Auth.$createUserWithEmailAndPassword(vm.credentialsX.email, vm.credentialsX.pass).then(function (user) {
				var newUser = UserService.getUser(user.uid);
				console.log(vm.credentialsX);
				newUser.email = user.email;
				newUser.name = vm.credentialsX.name;
				newUser.company = vm.credentialsX.company;
				newUser.address = vm.credentialsX.address;
				newUser.zipcode = vm.credentialsX.zipcode;
				newUser.phone = vm.credentialsX.phone;
				newUser.land = vm.credentialsX.land;
				newUser.$save().then(_this2._fs.toast().success('Signed up successfully!')).then($location.path('/'));
			}).catch(function (error) {
				_this2._fs.toast().error(error.message);
				console.error("Error: ", error);
				vm.error = error.message;
			});
		}
	}
})();
//# sourceMappingURL=auth.controller.js.map
