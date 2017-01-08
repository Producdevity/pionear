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

	function config($urlRouterProvider, $stateProvider) {
		console.log('app.routes function started');
		const BASE_URL = 'app/components',
		      AUTH_URL = `${BASE_URL}/auth`;

		$urlRouterProvider.otherwise('/');
		$stateProvider
				.state('main', {
					url:          '/',
					templateUrl:  `${BASE_URL}/main/main.view.html`,
					controller:   'MainController',
					controllerAs: 'vm',
					data:         {
						bodyClasses: 'sidebar-mini'
					},
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
		//.state('main.dashboard', {
		//	url:         '/dashboard',
		//	controller:   'MainController',
		//	controllerAs: 'vm',
		//	templateUrl:  `${BASE_URL}/main/main.view.html`,
		//})
		//.state('auth.signin', {
		//	url:          '/signin',
		//	templateUrl:  `${AUTH_URL}/sign-in/sign-in.view.html`,
		//	controller:   'AuthController',
		//	controllerAs: 'vm'
		//})
		//.state('auth.signup', {
		//	url:          '/signup',
		//	templateUrl:  `${AUTH_URL}/sign-up/signup.view.html`,
		//	controller:   'AuthController',
		//	controllerAs: 'vm'
		//})
		//.state('contact', {
		//	url: '/contact',
		//	templateUrl: 'contact.html'
		//})
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

				const AUTH_URL = 'app/components/auth';

				$stateProvider
						.state('auth', {
							abstract:    true,
							url:         '/auth',
							templateUrl: `${AUTH_URL}/auth.view.html`,
						})
						.state('auth.signin', {
							url:          '/sign-in',
							templateUrl:  `${AUTH_URL}/sign-in/sign-in.view.html`,
							controller:   'SignInController',
							controllerAs: 'vm'
						})
						.state('auth.signup', {
							url:          '/sign-up',
							templateUrl:  `${AUTH_URL}/sign-up/sign-up.view.html`,
							controller:   'SignUpController',
							controllerAs: 'vm'
						})
				//const config = {
				//	apiKey:            "AIzaSyCpHUp3N9iuwO2BE-Abjr0C-lE1m424lBI",
				//	authDomain:        "zapzite-b47f9.firebaseapp.com",
				//	databaseURL:       "https://zapzite-b47f9.firebaseio.com",
				//	storageBucket:     "zapzite-b47f9.appspot.com",
				//	messagingSenderId: "554585547848"
				//};
				//firebase.initializeApp(config);
				//
				//$firebaseRefProvider.registerUrl({
				//	default:    config.databaseURL,
				//	categories: `${config.databaseURL}/categories`,
				//	sites:      `${config.databaseURL}/sites`,
				//	users:      `${config.databaseURL}/users`
				//});
				//
				//$urlRouterProvider.otherwise('/');
				//$stateProvider
				//		.state('main', {
				//			url: '/',
				//			templateUrl: `${BASE_URL}/main/main.view.html`,
				//			controller: 'MainController',
				//      controllerAs: 'vm'
				//		});
						//.state('about', {
						//	url: '/about',
						//	templateUrl: 'about.html',
						//	controller: 'aboutCtrl'
						//})
						//.state('contact', {
						//	url: '/contact',
						//	templateUrl: 'contact.html'
						//})
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
				'user.module',
				'main.module'
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
			users:   `${CONFIG.databaseURL}/users`
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
				console.log('run(): ' + user);
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
		let vm = this;
		this._fs = Functions;

		vm.signOut = signOut;

		Auth.$onAuthStateChanged(user => {
			if(user) vm.currentUser = UserService.getUser(user.uid);
		});

		function signOut() {
			Auth.$signOut()
					.then(this._fs.toast().success('You are signed out.'));
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
			.module('body-classes.directive', [])
			.directive('bodyClasses', bodyClasses);

	function bodyClasses($rootScope) {
		return {
			restrict: 'A',
			scope:    {},
			link:     function(scope, elem, attr, ctrl) {

				$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
					let fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClasses) ? fromState.data.bodyClasses : null;
					let toClassnames   = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClasses) ? toState.data.bodyClasses : null;

					// don't do anything if they are the same
					if(fromClassnames != toClassnames) {
						if(fromClassnames) elem.removeClass(fromClassnames);
						if(toClassnames) elem.addClass(toClassnames);
					}
				});

			}
		}
	}
})();
(() => {
	'use strict';

	angular
			.module('directives.module', [
				'loading.directive',
				'body-classes.directive',
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
						title: '@'
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
