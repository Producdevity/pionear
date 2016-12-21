'use strict';

(function () {
	'use strict';

	angular.module("tlApp").config(config).run(run);

	function config($firebaseRefProvider) {
		console.log('config function started');

		// Initialize Firebase
		var CONFIG = {
			apiKey: "AIzaSyBlfqv4McR9H9vewwL_1235xV-qkmoDyFs",
			authDomain: "ticketlogs-d5b62.firebaseapp.com",
			databaseURL: "https://ticketlogs-d5b62.firebaseio.com",
			storageBucket: "ticketlogs-d5b62.appspot.com",
			messagingSenderId: "577795172631"
		};
		firebase.initializeApp(CONFIG);

		$firebaseRefProvider.registerUrl({
			default: CONFIG.databaseURL,
			users: CONFIG.databaseURL + '/users'
		});
	}

	function run(Auth, $rootScope, $location, $state) {
		console.log('run function started');
		checkAuth();

		$rootScope.$on('$routeChangeStart', function (next, current) {
			checkAuth();
		});

		$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
			// We can catch the error thrown when the $requireSignIn promise is rejected
			// and redirect the user back to the home page
			if (error === "AUTH_REQUIRED") {
				$state.go("home");
			}
		});

		function checkAuth() {
			Auth.$onAuthStateChanged(function (user) {
				if (!user) $location.path('/auth/sign-in');
				console.log('run(): ' + user);
			});
		}
	};
})();
//# sourceMappingURL=config.js.map
