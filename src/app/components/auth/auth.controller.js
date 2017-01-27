(() => {
	'use strict';

	angular
			.module("auth.controller", [])
			.controller("AuthController", AuthController);

	function AuthController(Auth, UserService, Functions, $location) {
		let vm = this;
		this._fs = Functions;
		console.log('authcontroller');
		vm.signUp = signUp;
		vm.signIn = signIn;

		vm.loading = true;

		Auth.$onAuthStateChanged(user => {
			//if(user) $location.path('/');
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

		function signUp(credentials) {
			console.log(credentials);
			Auth.$createUserWithEmailAndPassword(credentials.email, credentials.pass)
					.then(user => {
						let newUser   = UserService.getUser(user.uid);
						console.log(credentials);
						newUser.email = user.email;
						newUser.name  = credentials.name;
						newUser.company  = credentials.company;
						newUser.address  = credentials.address;
						newUser.zipcode  = credentials.zipcode;
						newUser.phone  = credentials.phone;
						newUser.land  = credentials.land;
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