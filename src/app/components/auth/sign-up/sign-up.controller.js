(() => {
	"use strict";

	angular
			.module("sign-up.controller", [])
			.controller("SignUpController", SignUpController);

	function SignUpController(Auth, UserService, Functions, $timeout, $location) {
		let vm   = this;
		this._fs = Functions;

		vm.title = 'Sign up for ticketlogs';

		vm.signUp = signUp;

		function signUp(credentials) {
			Auth.$createUserWithEmailAndPassword(credentials.email, credentials.pass)
					.then(user => {
						let newUser   = UserService.getUser(user.uid);
						newUser.email = user.email;
						newUser.name  = credentials.name;
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