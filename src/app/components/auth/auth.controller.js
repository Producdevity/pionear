(() => {
	'use strict';

	angular
			.module("auth.controller", [])
			.controller("AuthController", AuthController);

	function AuthController(Auth, UserService, Functions, $location) {
		let vm   = this;
		this._fs = Functions;

		vm.signUp       = signUp;
		vm.signIn       = signIn;
		vm.credentialsX = {};
		vm.loading      = true;

		Auth.$onAuthStateChanged(user => {
			if(user) $location.path('/');
		});

		function signIn(credentials) {
			console.log(credentials);
			console.log('singin');
			vm.loading = true;
			Auth.$signInWithEmailAndPassword(credentials.email, credentials.pass)
					.then(user => {
						this._fs.toast().success(`Signed in as ${user.email}`);
						$location.path('/dashboard');
					})
					.catch(error => {
						console.error("Authentication failed:", error);
						this._fs.toast().error(error.message);
						vm.error   = error.message;
						vm.loading = false;
					});
		}

		function signUp() {
			console.log(vm.credentialsX);
			Auth.$createUserWithEmailAndPassword(vm.credentialsX.email, vm.credentialsX.pass)
					.then(user => {
						let newUser = UserService.getUser(user.uid);
						console.log(vm.credentialsX);
						newUser.email   = user.email;
						newUser.name    = vm.credentialsX.name;
						newUser.company = vm.credentialsX.company;
						newUser.address = vm.credentialsX.address;
						newUser.zipcode = vm.credentialsX.zipcode;
						newUser.phone   = vm.credentialsX.phone;
						newUser.land    = vm.credentialsX.land;
						newUser.$save()
								.then(this._fs.toast().success('Signed up successfully!'))
								.then($location.path('/'));
					})
					.catch(error => {
						this._fs.toast().error(error.message);
						console.error("Error: ", error);
						vm.error = error.message;
					});
		}
	}
})();