(() => {
	'use strict';

	angular
			.module('myApp', [
				//	Third Party Modules
				'ui.router',
				'firebase',
				'toastr',
				//	My Modules
				'components.module',
				'shared.module',
				'core.module'
			]);

})();

(() => {
	'use strict';

	angular
			.module("myApp")
			.config(config);

	function config($urlRouterProvider, $locationProvider, $stateProvider) {
		console.log('app.routes function started');
		const BASE_PATH = 'app/components';

		$locationProvider.html5Mode(false);
		$urlRouterProvider.otherwise('/dashboard');
		$stateProvider
				.state('main', {
					url:          '',
					abstract:     true,
					templateUrl:  `${BASE_PATH}/main/main.view.html`,
					controller:   'MainController',
					controllerAs: 'vm',
					resolve:      {
						// controller will not be loaded until $requireSignIn resolves
						// Auth refers to our $firebaseAuth wrapper in the factory below
						"currentAuth": ["Auth", function(Auth) {
							// $requireSignIn returns a promise so the resolve waits for it to complete
							// If the promise is rejected, it will throw a $stateChangeError (see above)
							return Auth.$requireSignIn();
						}]
					}
				})
				.state('main.dashboard', {
					url:          '/dashboard',
					templateUrl:  `${BASE_PATH}/dashboard/dashboard.view.html`,
					controller:   'DashboardController',
					controllerAs: 'vm',
				});
	}

})();
(() => {
	'use strict';

	angular
			.module("auth.controller", [])
			.controller("AuthController", AuthController);

	function AuthController() {
		let vm = this;

	}
})();
(() => {
	'use strict';

	angular
			.module('auth.module', [
				'auth.routes',
				'auth.controller',
				'sign-in.controller',
				'sign-up.controller',
				'auth.service'
			]);

})();

(() => {
	'use strict';

	angular
			.module("auth.routes", [])
			.config(config)

			function config($stateProvider) {
				console.log('auth config function started');

				const AUTH_PATH = 'app/components/auth';

				$stateProvider
						.state('auth', {
							abstract:    true,
							url:         '/auth',
							templateUrl: `${AUTH_PATH}/auth.view.html`,
						})
						.state('auth.signin', {
							url:          '/sign-in',
							templateUrl:  `${AUTH_PATH}/sign-in/sign-in.view.html`,
							controller:   'SignInController',
							controllerAs: 'vm'
						})
						.state('auth.signup', {
							url:          '/sign-up',
							templateUrl:  `${AUTH_PATH}/sign-up/sign-up.view.html`,
							controller:   'SignUpController',
							controllerAs: 'vm'
						});
			}

})();
(() => {
	'use strict';

	angular
			.module("auth.service", [])
			.factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();

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

(() => {
	'use strict';

	angular
			.module('components.module', [
				'auth.module',
				'dashboard.module',
				'offer.module',
				'user.module',
				'main.module'
			]);
})();

(() => {
	'use strict';

	angular
			.module("dashboard.controller", [])
			.controller("DashboardController", DashboardController);

	function DashboardController() {
		let vm = this;


	}
})();

(() => {
	'use strict';

	angular
			.module("dashboard.module", [
				"dashboard.controller"
			]);

})();

(() => {
	'use strict';

	angular
			.module("main.controller", [])
			.controller("MainController", MainController);

	function MainController() {
		let vm = this;


	}
})();

(() => {
	'use strict';

	angular
			.module("main.module", [
				"main.controller"
			]);

})();

(() => {
	"use strict";

	angular
			.module("add-offer.controller", [])
			.controller("AddOfferController", AddOfferController);

	function AddOfferController(OfferService, UserService, Functions, $timeout, $location) {
		let vm   = this;
		this._fs = Functions;


	}
})();

(() => {
	'use strict';

	angular
			.module("offer.controller", [])
			.controller("OfferController", OfferController);

	function OfferController() {
		let vm = this;
		console.log('offer control');
	}
})();
(() => {
	'use strict';

	angular
			.module('offer.module', [
				'offer.routes',
				'offer.controller',
				'overview-offer.controller',
				'add-offer.controller',
				'offer.service'
			]);

})();

(() => {
	'use strict';

	angular
			.module("offer.routes", [])
			.config(config)

	function config($stateProvider) {
		console.log('offer config function started');

		const OFFER_PATH = 'app/components/offer';

		$stateProvider
				.state('main.offer', {
					url:          '/offer',
					abstract:     true,
					templateUrl:  `${OFFER_PATH}/offer.view.html`,
					controller:   'OfferController',
					controllerAs: 'vm'
				})
				.state('main.offer.overview', {
					url:          '/overview',
					templateUrl:  `${OFFER_PATH}/overview/overview.view.html`,
					controller:   'OverviewOfferController',
					controllerAs: 'vm'
				})
				.state('offer.add', {
					url:          '/add-offer',
					templateUrl:  `${OFFER_PATH}/add-offer/add-offer.view.html`,
					controller:   'AddOfferController',
					controllerAs: 'vm'
				});
	}

})();
(() => {
	'use strict';

	angular
			.module("offer.service", [])
			.factory("OfferService", OfferService);

	function OfferService($firebaseRef, $firebaseArray, $firebaseObject) {
		const offers = $firebaseArray($firebaseRef.offers);

		const API = {
			getOffers:   getOffers,
			getOffer:    getOffer,
			updateOffer: updateOffer,
			deleteOffer: deleteOffer
		};
		return API;

		function getOffers() {
			return offers;
		}

		function getOffer(id) {
			return $firebaseObject($firebaseRef.offers.child(id));
		}

		function updateOffer(offer) {
			return offer.$save();
		}

		function deleteOffer(offer) {
			return offers.$remove(offer);
		}
	}
})();

(() => {
	"use strict";

	angular
			.module("overview-offer.controller", [])
			.controller("OverviewOfferController", OverviewOfferController);

	function OverviewOfferController(OfferService, $location, Functions) {
		let vm   = this;
		this._fs = Functions;

		vm.title = 'Sign in to Pionear';

	}
})();
(() => {
	'use strict';

	angular
			.module("user.controller", [])
			.controller("UserController", UserController);

	function UserController() {
		let vm = this;

	}
})();
(() => {
	'use strict';

	angular
			.module('user.module', [
				'user.controller',
				'user.service'
			]);

})();

(() => {
	'use strict';

	angular
			.module("user.service", [])
			.factory("UserService", UserService);

	function UserService($firebaseRef, $firebaseArray, $firebaseObject) {
		const users = $firebaseArray($firebaseRef.users);

		const API = {
			getUsers:   getUsers,
			getUser:    getUser,
			updateUser: updateUser,
			deleteUser: deleteUser
		};
		return API;

		function getUsers() {
			return users;
		}

		function getUser(uid) {
			return $firebaseObject($firebaseRef.users.child(uid));
		}

		function updateUser(user) {
			return user.$save();
		}

		function deleteUser(user) {
			return users.$remove(user);
		}


	}
})();
(() => {
	'use strict';

	angular
			.module("myApp")
			.config(config)
			.run(run)

	function config($firebaseRefProvider) {
		console.log('config function started');

		// Initialize Firebase
		const CONFIG = {
			apiKey:            "AIzaSyDsp_oBM8lPOnEGVnByjsofGw7Kpftzfe8",
			authDomain:        "pionear-d070e.firebaseapp.com",
			databaseURL:       "https://pionear-d070e.firebaseio.com",
			storageBucket:     "pionear-d070e.appspot.com",
			messagingSenderId: "96740586251"
		};
		firebase.initializeApp(CONFIG);

		$firebaseRefProvider.registerUrl({
			default: CONFIG.databaseURL,
			users:   `${CONFIG.databaseURL}/users`,
			offers:  `${CONFIG.databaseURL}/offers`
		});

	}

	function run(Auth, $rootScope, $location, $state) {
		console.log('run function started');
		checkAuth();

		$rootScope.$on('$routeChangeStart', (next, current) => {
			checkAuth();
		});

		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
			// We can catch the error thrown when the $requireSignIn promise is rejected
			// and redirect the user back to the home page
			if(error === "AUTH_REQUIRED") {
				$state.go("home");
			}
		});

		function checkAuth() {
			Auth.$onAuthStateChanged(user => {
				if(!user) $location.path('/auth/sign-in');
				console.log(user);
			});
		}

	};

})();
(() => {
	'use strict';

	angular
			.module("core.controller", [])
			.controller("CoreController", CoreController);

	function CoreController(Auth, UserService, Functions, $rootScope) {
		let vm   = this;
		this._fs = Functions;

		vm.isToggled = false;

		vm.toggleSidebarParent = toggleSidebarParent;
		vm.signOut             = signOut;

		Auth.$onAuthStateChanged(user => {
			if(user) vm.currentUser = UserService.getUser(user.uid);
		});

		function signOut() {
			Auth.$signOut()
					.then(this._fs.toast().success('You are signed out.'));
		}

		function toggleSidebarParent() {
			vm.isToggled = !vm.isToggled;
		}

	}
})();
//import * as angular from 'angular';
//
//import CoreController from './core.controller.js';
//
//export default angular
//		.module('coreModule', [])
//		.controller('auth.controller', CoreController)

(() => {
	'use strict';

	angular
			.module('core.module', [
				'core.controller'
			]);
})();

(() => {
	'use strict';

	angular
			.module('directives.module', [
				'loading.directive',
				'page-header.directive'
			]);

})();

(() => {
	"use strict";

	angular
			.module("loading.directive", [])
			.directive("loadingSpinner", function() {
				return {
					restrict:    'E',
					scope:       {
						data: '='
					},
					templateUrl: 'app/shared/directives/loading.directive/loading.template.html'
				}
			})

})();
(() => {
	"use strict";

	angular
			.module("page-header.directive", [])
			.directive("pageHeader", function() {
				return {
					restrict:    'E',
					scope:       {
						data: '=',
						title: '@',
						toggle: '&'
					},
					controller: function($scope) {
						$scope.toggleValue = false;
						$scope.toggleSidebarInside = function() {
							$scope.toggleValue = !$scope.toggleValue;
							$scope.toggle();
						};
					},
					templateUrl: 'app/shared/directives/page-header/page-header.template.html'
				}
			})

})();
(() => {
	'use strict';

	angular
			.module("layout.module", [
				"sidebar.controller"
			]);

})();

(() => {
	'use strict';

	angular
			.module("sidebar.controller", [])
			.controller("SidebarController", SidebarController);

	function SidebarController($location, Auth) {
		var vm      = this;

	}
})();

(() => {
  'use strict';

  angular
      .module("functions.factory", [])
      .factory("Functions", Functions);

  function Functions(toastr) {

    const FUNCTIONS = {
      toast: toast
    };
    return FUNCTIONS;

    // toast popup with custom msg
    // info:blue success:green error:red warning:orange
    function toast(){
    	return toastr;
    }

  }
})();
(() => {
	'use strict';

	angular
			.module("services.module", [
				"functions.factory"
			]);

})();

(() => {
	'use strict';

	angular
			.module('shared.module', [
				'services.module',
				'directives.module',
				'layout.module'
			]);

})();
