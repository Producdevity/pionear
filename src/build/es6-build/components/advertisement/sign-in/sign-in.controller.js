"use strict";

(function () {
	"use strict";

	angular.module("sign-in.controller", []).controller("SignInController", SignInController);

	function SignInController(Auth, $location, Functions) {
		var vm = this;
		this._fs = Functions;

		vm.title = 'Sign in to Pionear';
		vm.loading = true;

		vm.signIn = signIn;

		Auth.$onAuthStateChanged(function (user) {
			if (user) $location.path('/');
		});

		function signIn(credentials) {
			var _this = this;

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
	}
})();
//# sourceMappingURL=sign-in.controller.js.map
