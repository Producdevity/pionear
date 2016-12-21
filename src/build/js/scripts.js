(() => {
	'use strict';

	angular
			.module('tlApp', [
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
			.module("tlApp")
			.config(config);

	function config($urlRouterProvider, $stateProvider) {
		console.log('app.routes function started');
		const BASE_URL = 'app/components',
		      AUTH_URL = `${BASE_URL}/auth`;

		$urlRouterProvider.otherwise('/');
		$stateProvider
				.state('main', {
					url:          '/',
					abstract:    true,
					templateUrl:  `${BASE_URL}/main/main.view.html`,
					controller:   'MainController',
					controllerAs: 'vm',
					data:         {
						bodyClasses: 'sidebar-mini'
					}
				})
				.state('main.dashboard', {
					url:         '/dashboard',
					templateUrl:  `${BASE_URL}/main/main.view.html`,
				})
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
		//const _fs = Functions;
		//
		//vm.loading = true;
		//
		//vm.signIn = signIn;
		//
		//Auth.$onAuthStateChanged(user => {
		//	console.log('authcont(): $onAuthStateChanged');
		//	if(user) $location.path('/dashboard');
		//	$timeout(() => { vm.loading = false; }, 1000);
		//});
		//
		//
		//function signIn(credentials) {
		//	vm.loading = true;
		//	Auth.$signInWithEmailAndPassword(credentials.email, credentials.pass)
		//			.then(user => {
		//				_fs.toast(`Signed in as ${user.email}`);
		//				$location.path('/dashboard');
		//			})
		//			.catch(error => {
		//				console.error("Authentication failed:", error);
		//				_fs.toast(error.message, 5000);
		//				vm.error = error.message;
		//				vm.loading = false;
		//			});
		//}

	}
})();
//import * as angular from 'angular';
//
//import AuthController from './auth.controller.js';
//import AuthService from './auth.service.js';
//
//export default angular
//		.module('authModule', [])
//		.controller('auth.controller', AuthController)
//		.service('auth.service', AuthService);

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

	function SignInController(Auth, $location, $timeout, Functions) {
		let vm   = this;
		this._fs = Functions;

		vm.title = 'Sign in to ticketlogs';
		vm.loading = true;

		vm.signIn = signIn;

		Auth.$onAuthStateChanged(user => {
			console.log('signin(): $onAuthStateChanged');
			//if(user) $location.path('/dashboard');
			$timeout(() => {
				vm.loading = false;
			}, 1000);
		});

		function signIn(credentials) {
			vm.loading = true;
			this._fs.toast().error('Error');
			Auth.$signInWithEmailAndPassword(credentials.email = '', credentials.pass = '')
					.then(user => {
						this._fs.toast().success(`Signed in as ${user.email}`);
						//$location.path('/dashboard');
					})
					.catch(error => {
						console.error("Authentication failed:", error);
						this._fs.toast().error(error.message);
						//_fs.toast(error.message, 5000);
						vm.error   = error.message;
						vm.loading = false;
					});
		}

		//const _fs = Functions;
		//
		//vm.loading = true;
		//
		//vm.signIn = signIn;
		//
		//Auth.$onAuthStateChanged(user => {
		//	console.log('authcont(): $onAuthStateChanged');
		//	if(user) $location.path('/dashboard');
		//	$timeout(() => { vm.loading = false; }, 1000);
		//});
		//
		//
		//function signIn(credentials) {
		//	vm.loading = true;
		//	Auth.$signInWithEmailAndPassword(credentials.email, credentials.pass)
		//			.then(user => {
		//				_fs.toast(`Signed in as ${user.email}`);
		//				$location.path('/dashboard');
		//			})
		//			.catch(error => {
		//				console.error("Authentication failed:", error);
		//				_fs.toast(error.message, 5000);
		//				vm.error = error.message;
		//				vm.loading = false;
		//			});
		//}

	}
})();
(() => {
	"use strict";

	angular
			.module("sign-up.controller", [])
			.controller("SignUpController", SignUpController);

	function SignUpController(Auth, Functions, $timeout, $location) {
		let vm   = this;
		this._fs = Functions;

		vm.title = 'Sign up for ticketlogs';

		vm.signUp = signUp;

		function signUp(credentials) {
			console.log(credentials);
			Auth.$createUserWithEmailAndPassword(credentials.email, credentials.pass)
					.then(user => {
						this._fs.toast().success('Signed in successfully!');
						console.log("User " + user.uid + " created successfully!");
						console.log(user);
						$timeout(() => {$location.path('/dashboard');}, 1000);
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

//class MainController {
//	constructor(){
//		this.controllerName = 'Main Controller';
//		this.test = 'maincontrollertest';
//	}
//}
//
//angular
//		.module("main.controller", [])
//		.controller("MainController", MainController);
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
			.module("tlApp")
			.config(config)
			.run(run)

	function config($firebaseRefProvider) {
		console.log('config function started');

		// Initialize Firebase
		const CONFIG = {
			apiKey:            "AIzaSyBlfqv4McR9H9vewwL_1235xV-qkmoDyFs",
			authDomain:        "ticketlogs-d5b62.firebaseapp.com",
			databaseURL:       "https://ticketlogs-d5b62.firebaseio.com",
			storageBucket:     "ticketlogs-d5b62.appspot.com",
			messagingSenderId: "577795172631"
		};
		firebase.initializeApp(CONFIG);

		$firebaseRefProvider.registerUrl({
			default: CONFIG.databaseURL,
			users:   `${CONFIG.databaseURL}/users`
		});

	}

	function run(Auth, $rootScope, $location) {
		console.log('run function started');
		checkAuth();

		$rootScope.$on('$routeChangeStart', (next, current) => {
			checkAuth();
		});

		function checkAuth() {
			Auth.$onAuthStateChanged(user => {
				//if(!user) $location.path('/auth/signin');
				console.log('run(): ' + user);
				$rootScope.user = user;
			});
		}

	};

})();
(() => {
	'use strict';

	angular
			.module("core.controller", [])
			.controller("CoreController", CoreController);

	function CoreController($rootScope) {
		let vm = this;

		vm.currentUser = 'Yassine Gherbi';

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
						data: '='
					},
					templateUrl: 'app/shared/directives/page-header.directive/page-header.template.html'
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
		vm.signOut   = signOut;
		vm.isActive = isActive;
		// initialize view data
		function init() {

		}

		init();

		//vm.auth.$onAuthStateChanged(function(user) {
		//	vm.user = user;
		//});

		function signOut() {
			Auth.$signOut()
					.then(_fs.toast('You are signed out.'));

		}

		function isActive(destination) {
			return destination === $location.path();
		}
	}
})();

(function () {
	angular
			.module("nav.controller", [])
			.controller("NavController", NavController);

	function NavController($location, Auth, Functions) {
		var vm      = this;
		const _fs = Functions;
		vm.signOut   = signOut;
		vm.isActive = isActive;
		// initialize view data
		function init() {

		}

		init();

		//vm.auth.$onAuthStateChanged(function(user) {
		//	vm.user = user;
		//});

		function signOut() {
			Auth.$signOut()
					.then(_fs.toast('You are signed out.'));

		}

		function isActive(destination) {
			return destination === $location.path();
		}
	}
})();

'use strict';

(function() {
  angular
      .module("nav.module", [
        "nav.controller"
      ]);

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
