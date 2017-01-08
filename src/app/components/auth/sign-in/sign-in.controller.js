(() => {
	"use strict";

	angular
			.module("sign-in.controller", [])
			.controller("SignInController", SignInController);

	function SignInController(Auth, $location, Functions) {
		let vm   = this;
		this._fs = Functions;

		vm.title = 'Sign in to Pionear';
		vm.loading = true;

		vm.signIn = signIn;

		Auth.$onAuthStateChanged(user => {
			if(user) $location.path('/');
		});

		function signIn(credentials) {
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

	}
})();