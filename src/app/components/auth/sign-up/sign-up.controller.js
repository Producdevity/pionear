(() => {
	"use strict";

	angular
			.module("sign-up.controller", [])
			.controller("SignUpController", SignUpController);

	function SignUpController(Auth, UserService, Functions, $timeout, $location) {
		let vm   = this;
		this._fs = Functions;

		vm.title = 'Sign up for Pionear';

		vm.signUp = signUp;

		function signUp(credentials) {
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
