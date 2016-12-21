(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('tlApp', [
	//	Third Party Modules
	'ui.router', 'firebase', 'toastr',
	//	My Modules
	'components.module', 'shared.module', 'core.module']);
})();


},{}],2:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("tlApp").config(config);

	function config($urlRouterProvider, $stateProvider) {
		console.log('app.routes function started');
		var BASE_URL = 'app/components',
		    AUTH_URL = BASE_URL + '/auth';

		$urlRouterProvider.otherwise('/');
		$stateProvider.state('main', {
			url: '/',
			templateUrl: BASE_URL + '/main/main.view.html',
			controller: 'MainController',
			controllerAs: 'vm',
			data: {
				bodyClasses: 'sidebar-mini'
			},
			resolve: {
				// controller will not be loaded until $requireSignIn resolves
				// Auth refers to our $firebaseAuth wrapper in the factory below
				"currentAuth": ["Auth", function (Auth) {
					// $requireSignIn returns a promise so the resolve waits for it to complete
					// If the promise is rejected, it will throw a $stateChangeError (see above)
					return Auth.$requireSignIn();
				}]
			}
		});
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


},{}],3:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("auth.controller", []).controller("AuthController", AuthController);

	function AuthController() {
		var vm = this;
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


},{}],4:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('auth.module', ['auth.routes', 'auth.controller', 'sign-in.controller', 'sign-up.controller', 'auth.service']);
})();


},{}],5:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("auth.routes", []).config(config);

	function config($stateProvider) {
		console.log('auth config function started');

		var AUTH_URL = 'app/components/auth';

		$stateProvider.state('auth', {
			abstract: true,
			url: '/auth',
			templateUrl: AUTH_URL + '/auth.view.html'
		}).state('auth.signin', {
			url: '/sign-in',
			templateUrl: AUTH_URL + '/sign-in/sign-in.view.html',
			controller: 'SignInController',
			controllerAs: 'vm'
		}).state('auth.signup', {
			url: '/sign-up',
			templateUrl: AUTH_URL + '/sign-up/sign-up.view.html',
			controller: 'SignUpController',
			controllerAs: 'vm'
		});
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


},{}],6:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("auth.service", []).factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();


},{}],7:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("sign-in.controller", []).controller("SignInController", SignInController);

	function SignInController(Auth, $location, Functions) {
		var vm = this;
		this._fs = Functions;

		vm.title = 'Sign in to ticketlogs';
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


},{}],8:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("sign-up.controller", []).controller("SignUpController", SignUpController);

	function SignUpController(Auth, UserService, Functions, $timeout, $location) {
		var vm = this;
		this._fs = Functions;

		vm.title = 'Sign up for ticketlogs';

		vm.signUp = signUp;

		function signUp(credentials) {
			var _this = this;

			Auth.$createUserWithEmailAndPassword(credentials.email, credentials.pass).then(function (user) {
				var newUser = UserService.getUser(user.uid);
				newUser.email = user.email;
				newUser.name = credentials.name;
				newUser.$save().then(_this._fs.toast().success('Signed up successfully!')).then($location.path('/'));
			}).catch(function (error) {
				_this._fs.toast().error(error.message);
				console.error("Error: ", error);
				vm.error = error.message;
			});
		}
	}
})();


},{}],9:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('components.module', ['auth.module', 'user.module', 'main.module']);
})();


},{}],10:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("main.controller", []).controller("MainController", MainController);

	function MainController() {
		var vm = this;
	}
})();


},{}],11:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("main.module", ["main.controller"]);
})();


},{}],12:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.controller", []).controller("UserController", UserController);

	function UserController() {
		var vm = this;
	}
})();


},{}],13:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('user.module', ['user.controller', 'user.service']);
})();


},{}],14:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.service", []).factory("UserService", UserService);

	function UserService($firebaseRef, $firebaseArray, $firebaseObject) {
		var users = $firebaseArray($firebaseRef.users);

		var API = {
			getUsers: getUsers,
			getUser: getUser,
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


},{}],15:[function(require,module,exports){
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


},{}],16:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("core.controller", []).controller("CoreController", CoreController);

	function CoreController(Auth, UserService, Functions, $rootScope) {
		var vm = this;
		this._fs = Functions;

		vm.signOut = signOut;

		Auth.$onAuthStateChanged(function (user) {
			if (user) vm.currentUser = UserService.getUser(user.uid);
		});

		function signOut() {
			Auth.$signOut().then(this._fs.toast().success('You are signed out.'));
		}
	}
})();


},{}],17:[function(require,module,exports){
'use strict';

//import * as angular from 'angular';
//
//import CoreController from './core.controller.js';
//
//export default angular
//		.module('coreModule', [])
//		.controller('auth.controller', CoreController)

(function () {
	'use strict';

	angular.module('core.module', ['core.controller']);
})();


},{}],18:[function(require,module,exports){
'use strict';

//import * as angular from 'angular';
//
//import CoreController from './core.controller.js';
//
//export default angular
//		.module('coreModule', [])
//		.controller('auth.controller', CoreController)

(function () {
	'use strict';

	angular.module('core.module', ['core.controller']);
})();


},{}],19:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('body-classes.directive', []).directive('bodyClasses', bodyClasses);

	function bodyClasses($rootScope) {
		return {
			restrict: 'A',
			scope: {},
			link: function link(scope, elem, attr, ctrl) {

				$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
					var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClasses) ? fromState.data.bodyClasses : null;
					var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClasses) ? toState.data.bodyClasses : null;

					// don't do anything if they are the same
					if (fromClassnames != toClassnames) {
						if (fromClassnames) elem.removeClass(fromClassnames);
						if (toClassnames) elem.addClass(toClassnames);
					}
				});
			}
		};
	}
})();


},{}],20:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('directives.module', ['loading.directive', 'body-classes.directive', 'page-header.directive']);
})();


},{}],21:[function(require,module,exports){
"use strict";


},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExampleDirective = function () {
	function ExampleDirective() {
		_classCallCheck(this, ExampleDirective);

		this.template = '<div>{{ctrl.name}}</div>';
		this.restrict = 'E';
		this.scope = {};

		this.controller = ExampleDirectiveController;
		this.controllerAs = 'ctrl';
		this.bindToController = true;
	}

	// Directive compile function


	_createClass(ExampleDirective, [{
		key: 'compile',
		value: function compile() {}

		// Directive link function

	}, {
		key: 'link',
		value: function link() {}
	}]);

	return ExampleDirective;
}();

// Directive's controller


exports.default = ExampleDirective;

var ExampleDirectiveController = function ExampleDirectiveController() {
	_classCallCheck(this, ExampleDirectiveController);

	this.name = 'Yassine';
};


},{}],23:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("loading.directive", []).directive("loadingSpinner", function () {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'app/shared/directives/loading.directive/loading.template.html'
		};
	});
})();


},{}],24:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("page-header.directive", []).directive("pageHeader", function () {
		return {
			restrict: 'E',
			scope: {
				data: '=',
				title: '@'
			},
			templateUrl: 'app/shared/directives/page-header/page-header.template.html'
		};
	});
})();


},{}],25:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("layout.module", ["sidebar.controller"]);
})();


},{}],26:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("sidebar.controller", []).controller("SidebarController", SidebarController);

	function SidebarController($location, Auth) {
		var vm = this;
	}
})();


},{}],27:[function(require,module,exports){
"use strict";

(function () {
	angular.module("nav.controller", []).controller("NavController", NavController);

	function NavController($location, Auth, Functions) {
		var vm = this;
		var _fs = Functions;
		vm.signOut = signOut;
		vm.isActive = isActive;
		// initialize view data
		function init() {}

		init();

		//vm.auth.$onAuthStateChanged(function(user) {
		//	vm.user = user;
		//});

		function signOut() {
			Auth.$signOut().then(_fs.toast('You are signed out.'));
		}

		function isActive(destination) {
			return destination === $location.path();
		}
	}
})();


},{}],28:[function(require,module,exports){
'use strict';

(function () {
  angular.module("nav.module", ["nav.controller"]);
})();


},{}],29:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("auth.factory", []).factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();


},{}],30:[function(require,module,exports){
"use strict";

(function () {
  'use strict';

  angular.module("functions.factory", []).factory("Functions", Functions);

  function Functions() {

    var FUNCTIONS = {
      toast: toast
    };
    return FUNCTIONS;

    // toast popup with custom msg
    function toast(msg) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

      Materialize.toast(msg, time);
    }
  }
})();


},{}],31:[function(require,module,exports){
"use strict";

(function () {
  'use strict';

  angular.module("functions.factory", []).factory("Functions", Functions);

  function Functions(toastr) {

    var FUNCTIONS = {
      toast: toast
    };
    return FUNCTIONS;

    // toast popup with custom msg
    // info:blue success:green error:red warning:orange
    function toast() {
      return toastr;
    }
  }
})();


},{}],32:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("services.module", ["functions.factory"]);
})();


},{}],33:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.factory", []).factory("User", User);

	function User($firebaseRef, $firebaseArray, $firebaseObject) {
		return $firebaseObject($firebaseRef.users);
	}
})();


},{}],34:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('shared.module', ['services.module', 'directives.module', 'layout.module']);
})();


},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5yb3V0ZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hdXRoL2F1dGgucm91dGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2F1dGgvYXV0aC5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2F1dGgvc2lnbi1pbi9zaWduLWluLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9zaWduLXVwL3NpZ24tdXAuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9jb21wb25lbnRzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9tYWluL21haW4uY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9tYWluL21haW4ubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3VzZXIvdXNlci5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3VzZXIvdXNlci5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbmZpZy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvcmUvY29yZS5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvcmUvY29yZS5tb2R1bGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9ib2R5LWNsYXNzZXMvYm9keS1jbGFzc2VzLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2V4YW1wbGUuZGVyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9leGFtcGxlLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvbG9hZGluZy9sb2FkaW5nLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvbGF5b3V0L2xheW91dC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9sYXlvdXQvc2lkZWJhci9zaWRlYmFyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9uYXZpZ2F0aW9uL25hdi5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvbmF2aWdhdGlvbi9uYXYubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvYXV0aC5mYWN0b3J5LmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvZnVuY3Rpb25zLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9mdW5jdGlvbnMuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3VzZXIuZmFjdG9yeS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NoYXJlZC5tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCd0bEFwcCcsIFtcblx0Ly9cdFRoaXJkIFBhcnR5IE1vZHVsZXNcblx0J3VpLnJvdXRlcicsICdmaXJlYmFzZScsICd0b2FzdHInLFxuXHQvL1x0TXkgTW9kdWxlc1xuXHQnY29tcG9uZW50cy5tb2R1bGUnLCAnc2hhcmVkLm1vZHVsZScsICdjb3JlLm1vZHVsZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ0bEFwcFwiKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHVybFJvdXRlclByb3ZpZGVyLCAkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdhcHAucm91dGVzIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblx0XHR2YXIgQkFTRV9VUkwgPSAnYXBwL2NvbXBvbmVudHMnLFxuXHRcdCAgICBBVVRIX1VSTCA9IEJBU0VfVVJMICsgJy9hdXRoJztcblxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbicsIHtcblx0XHRcdHVybDogJy8nLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEJBU0VfVVJMICsgJy9tYWluL21haW4udmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bScsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdGJvZHlDbGFzc2VzOiAnc2lkZWJhci1taW5pJ1xuXHRcdFx0fSxcblx0XHRcdHJlc29sdmU6IHtcblx0XHRcdFx0Ly8gY29udHJvbGxlciB3aWxsIG5vdCBiZSBsb2FkZWQgdW50aWwgJHJlcXVpcmVTaWduSW4gcmVzb2x2ZXNcblx0XHRcdFx0Ly8gQXV0aCByZWZlcnMgdG8gb3VyICRmaXJlYmFzZUF1dGggd3JhcHBlciBpbiB0aGUgZmFjdG9yeSBiZWxvd1xuXHRcdFx0XHRcImN1cnJlbnRBdXRoXCI6IFtcIkF1dGhcIiwgZnVuY3Rpb24gKEF1dGgpIHtcblx0XHRcdFx0XHQvLyAkcmVxdWlyZVNpZ25JbiByZXR1cm5zIGEgcHJvbWlzZSBzbyB0aGUgcmVzb2x2ZSB3YWl0cyBmb3IgaXQgdG8gY29tcGxldGVcblx0XHRcdFx0XHQvLyBJZiB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCwgaXQgd2lsbCB0aHJvdyBhICRzdGF0ZUNoYW5nZUVycm9yIChzZWUgYWJvdmUpXG5cdFx0XHRcdFx0cmV0dXJuIEF1dGguJHJlcXVpcmVTaWduSW4oKTtcblx0XHRcdFx0fV1cblx0XHRcdH1cblx0XHR9KTtcblx0XHQvLy5zdGF0ZSgnbWFpbi5kYXNoYm9hcmQnLCB7XG5cdFx0Ly9cdHVybDogICAgICAgICAnL2Rhc2hib2FyZCcsXG5cdFx0Ly9cdGNvbnRyb2xsZXI6ICAgJ01haW5Db250cm9sbGVyJyxcblx0XHQvL1x0Y29udHJvbGxlckFzOiAndm0nLFxuXHRcdC8vXHR0ZW1wbGF0ZVVybDogIGAke0JBU0VfVVJMfS9tYWluL21haW4udmlldy5odG1sYCxcblx0XHQvL30pXG5cdFx0Ly8uc3RhdGUoJ2F1dGguc2lnbmluJywge1xuXHRcdC8vXHR1cmw6ICAgICAgICAgICcvc2lnbmluJyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICBgJHtBVVRIX1VSTH0vc2lnbi1pbi9zaWduLWluLnZpZXcuaHRtbGAsXG5cdFx0Ly9cdGNvbnRyb2xsZXI6ICAgJ0F1dGhDb250cm9sbGVyJyxcblx0XHQvL1x0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0Ly99KVxuXHRcdC8vLnN0YXRlKCdhdXRoLnNpZ251cCcsIHtcblx0XHQvL1x0dXJsOiAgICAgICAgICAnL3NpZ251cCcsXG5cdFx0Ly9cdHRlbXBsYXRlVXJsOiAgYCR7QVVUSF9VUkx9L3NpZ24tdXAvc2lnbnVwLnZpZXcuaHRtbGAsXG5cdFx0Ly9cdGNvbnRyb2xsZXI6ICAgJ0F1dGhDb250cm9sbGVyJyxcblx0XHQvL1x0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0Ly99KVxuXHRcdC8vLnN0YXRlKCdjb250YWN0Jywge1xuXHRcdC8vXHR1cmw6ICcvY29udGFjdCcsXG5cdFx0Ly9cdHRlbXBsYXRlVXJsOiAnY29udGFjdC5odG1sJ1xuXHRcdC8vfSlcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQXV0aENvbnRyb2xsZXJcIiwgQXV0aENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIEF1dGhDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0Ly9jb25zdCBfZnMgPSBGdW5jdGlvbnM7XG5cdFx0Ly9cblx0XHQvL3ZtLmxvYWRpbmcgPSB0cnVlO1xuXHRcdC8vXG5cdFx0Ly92bS5zaWduSW4gPSBzaWduSW47XG5cdFx0Ly9cblx0XHQvL0F1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZCh1c2VyID0+IHtcblx0XHQvL1x0Y29uc29sZS5sb2coJ2F1dGhjb250KCk6ICRvbkF1dGhTdGF0ZUNoYW5nZWQnKTtcblx0XHQvL1x0aWYodXNlcikgJGxvY2F0aW9uLnBhdGgoJy9kYXNoYm9hcmQnKTtcblx0XHQvL1x0JHRpbWVvdXQoKCkgPT4geyB2bS5sb2FkaW5nID0gZmFsc2U7IH0sIDEwMDApO1xuXHRcdC8vfSk7XG5cdFx0Ly9cblx0XHQvL1xuXHRcdC8vZnVuY3Rpb24gc2lnbkluKGNyZWRlbnRpYWxzKSB7XG5cdFx0Ly9cdHZtLmxvYWRpbmcgPSB0cnVlO1xuXHRcdC8vXHRBdXRoLiRzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzcylcblx0XHQvL1x0XHRcdC50aGVuKHVzZXIgPT4ge1xuXHRcdC8vXHRcdFx0XHRfZnMudG9hc3QoYFNpZ25lZCBpbiBhcyAke3VzZXIuZW1haWx9YCk7XG5cdFx0Ly9cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvZGFzaGJvYXJkJyk7XG5cdFx0Ly9cdFx0XHR9KVxuXHRcdC8vXHRcdFx0LmNhdGNoKGVycm9yID0+IHtcblx0XHQvL1x0XHRcdFx0Y29uc29sZS5lcnJvcihcIkF1dGhlbnRpY2F0aW9uIGZhaWxlZDpcIiwgZXJyb3IpO1xuXHRcdC8vXHRcdFx0XHRfZnMudG9hc3QoZXJyb3IubWVzc2FnZSwgNTAwMCk7XG5cdFx0Ly9cdFx0XHRcdHZtLmVycm9yID0gZXJyb3IubWVzc2FnZTtcblx0XHQvL1x0XHRcdFx0dm0ubG9hZGluZyA9IGZhbHNlO1xuXHRcdC8vXHRcdFx0fSk7XG5cdFx0Ly99XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXV0aC5tb2R1bGUnLCBbJ2F1dGgucm91dGVzJywgJ2F1dGguY29udHJvbGxlcicsICdzaWduLWluLmNvbnRyb2xsZXInLCAnc2lnbi11cC5jb250cm9sbGVyJywgJ2F1dGguc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLm1vZHVsZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5yb3V0ZXNcIiwgW10pLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdhdXRoIGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgQVVUSF9VUkwgPSAnYXBwL2NvbXBvbmVudHMvYXV0aCc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXV0aCcsIHtcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dXJsOiAnL2F1dGgnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfVVJMICsgJy9hdXRoLnZpZXcuaHRtbCdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWduaW4nLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi1pbicsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL3NpZ24taW4vc2lnbi1pbi52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1NpZ25JbkNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ2F1dGguc2lnbnVwJywge1xuXHRcdFx0dXJsOiAnL3NpZ24tdXAnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfVVJMICsgJy9zaWduLXVwL3NpZ24tdXAudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTaWduVXBDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHRcdC8vY29uc3QgY29uZmlnID0ge1xuXHRcdC8vXHRhcGlLZXk6ICAgICAgICAgICAgXCJBSXphU3lDcEhVcDNOOWl1d08yQkUtQWJqcjBDLWxFMW00MjRsQklcIixcblx0XHQvL1x0YXV0aERvbWFpbjogICAgICAgIFwiemFweml0ZS1iNDdmOS5maXJlYmFzZWFwcC5jb21cIixcblx0XHQvL1x0ZGF0YWJhc2VVUkw6ICAgICAgIFwiaHR0cHM6Ly96YXB6aXRlLWI0N2Y5LmZpcmViYXNlaW8uY29tXCIsXG5cdFx0Ly9cdHN0b3JhZ2VCdWNrZXQ6ICAgICBcInphcHppdGUtYjQ3ZjkuYXBwc3BvdC5jb21cIixcblx0XHQvL1x0bWVzc2FnaW5nU2VuZGVySWQ6IFwiNTU0NTg1NTQ3ODQ4XCJcblx0XHQvL307XG5cdFx0Ly9maXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG5cdFx0Ly9cblx0XHQvLyRmaXJlYmFzZVJlZlByb3ZpZGVyLnJlZ2lzdGVyVXJsKHtcblx0XHQvL1x0ZGVmYXVsdDogICAgY29uZmlnLmRhdGFiYXNlVVJMLFxuXHRcdC8vXHRjYXRlZ29yaWVzOiBgJHtjb25maWcuZGF0YWJhc2VVUkx9L2NhdGVnb3JpZXNgLFxuXHRcdC8vXHRzaXRlczogICAgICBgJHtjb25maWcuZGF0YWJhc2VVUkx9L3NpdGVzYCxcblx0XHQvL1x0dXNlcnM6ICAgICAgYCR7Y29uZmlnLmRhdGFiYXNlVVJMfS91c2Vyc2Bcblx0XHQvL30pO1xuXHRcdC8vXG5cdFx0Ly8kdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cdFx0Ly8kc3RhdGVQcm92aWRlclxuXHRcdC8vXHRcdC5zdGF0ZSgnbWFpbicsIHtcblx0XHQvL1x0XHRcdHVybDogJy8nLFxuXHRcdC8vXHRcdFx0dGVtcGxhdGVVcmw6IGAke0JBU0VfVVJMfS9tYWluL21haW4udmlldy5odG1sYCxcblx0XHQvL1x0XHRcdGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG5cdFx0Ly8gICAgICBjb250cm9sbGVyQXM6ICd2bSdcblx0XHQvL1x0XHR9KTtcblx0XHQvLy5zdGF0ZSgnYWJvdXQnLCB7XG5cdFx0Ly9cdHVybDogJy9hYm91dCcsXG5cdFx0Ly9cdHRlbXBsYXRlVXJsOiAnYWJvdXQuaHRtbCcsXG5cdFx0Ly9cdGNvbnRyb2xsZXI6ICdhYm91dEN0cmwnXG5cdFx0Ly99KVxuXHRcdC8vLnN0YXRlKCdjb250YWN0Jywge1xuXHRcdC8vXHR1cmw6ICcvY29udGFjdCcsXG5cdFx0Ly9cdHRlbXBsYXRlVXJsOiAnY29udGFjdC5odG1sJ1xuXHRcdC8vfSlcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImF1dGguc2VydmljZVwiLCBbXSkuZmFjdG9yeShcIkF1dGhcIiwgQXV0aCk7XG5cblx0ZnVuY3Rpb24gQXV0aCgkZmlyZWJhc2VBdXRoKSB7XG5cdFx0cmV0dXJuICRmaXJlYmFzZUF1dGgoKTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGguc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcInNpZ24taW4uY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlNpZ25JbkNvbnRyb2xsZXJcIiwgU2lnbkluQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gU2lnbkluQ29udHJvbGxlcihBdXRoLCAkbG9jYXRpb24sIEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS50aXRsZSA9ICdTaWduIGluIHRvIHRpY2tldGxvZ3MnO1xuXHRcdHZtLmxvYWRpbmcgPSB0cnVlO1xuXG5cdFx0dm0uc2lnbkluID0gc2lnbkluO1xuXG5cdFx0QXV0aC4kb25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRpZiAodXNlcikgJGxvY2F0aW9uLnBhdGgoJy8nKTtcblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIHNpZ25JbihjcmVkZW50aWFscykge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdFx0dm0ubG9hZGluZyA9IHRydWU7XG5cdFx0XHRBdXRoLiRzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzcykudGhlbihmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHRfdGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKFwiU2lnbmVkIGluIGFzIFwiICsgdXNlci5lbWFpbCk7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvZGFzaGJvYXJkJyk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkF1dGhlbnRpY2F0aW9uIGZhaWxlZDpcIiwgZXJyb3IpO1xuXHRcdFx0XHRfdGhpcy5fZnMudG9hc3QoKS5lcnJvcihlcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0dm0uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0XHR2bS5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaWduLWluLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaWduLXVwLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJTaWduVXBDb250cm9sbGVyXCIsIFNpZ25VcENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFNpZ25VcENvbnRyb2xsZXIoQXV0aCwgVXNlclNlcnZpY2UsIEZ1bmN0aW9ucywgJHRpbWVvdXQsICRsb2NhdGlvbikge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS50aXRsZSA9ICdTaWduIHVwIGZvciB0aWNrZXRsb2dzJztcblxuXHRcdHZtLnNpZ25VcCA9IHNpZ25VcDtcblxuXHRcdGZ1bmN0aW9uIHNpZ25VcChjcmVkZW50aWFscykge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdFx0QXV0aC4kY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGNyZWRlbnRpYWxzLmVtYWlsLCBjcmVkZW50aWFscy5wYXNzKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRcdHZhciBuZXdVc2VyID0gVXNlclNlcnZpY2UuZ2V0VXNlcih1c2VyLnVpZCk7XG5cdFx0XHRcdG5ld1VzZXIuZW1haWwgPSB1c2VyLmVtYWlsO1xuXHRcdFx0XHRuZXdVc2VyLm5hbWUgPSBjcmVkZW50aWFscy5uYW1lO1xuXHRcdFx0XHRuZXdVc2VyLiRzYXZlKCkudGhlbihfdGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKCdTaWduZWQgdXAgc3VjY2Vzc2Z1bGx5IScpKS50aGVuKCRsb2NhdGlvbi5wYXRoKCcvJykpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdF90aGlzLl9mcy50b2FzdCgpLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiLCBlcnJvcik7XG5cdFx0XHRcdHZtLmVycm9yID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ24tdXAuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdjb21wb25lbnRzLm1vZHVsZScsIFsnYXV0aC5tb2R1bGUnLCAndXNlci5tb2R1bGUnLCAnbWFpbi5tb2R1bGUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50cy5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibWFpbi5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiTWFpbkNvbnRyb2xsZXJcIiwgTWFpbkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibWFpbi5tb2R1bGVcIiwgW1wibWFpbi5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ1c2VyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJVc2VyQ29udHJvbGxlclwiLCBVc2VyQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gVXNlckNvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCd1c2VyLm1vZHVsZScsIFsndXNlci5jb250cm9sbGVyJywgJ3VzZXIuc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ1c2VyLnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJVc2VyU2VydmljZVwiLCBVc2VyU2VydmljZSk7XG5cblx0ZnVuY3Rpb24gVXNlclNlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIHVzZXJzID0gJGZpcmViYXNlQXJyYXkoJGZpcmViYXNlUmVmLnVzZXJzKTtcblxuXHRcdHZhciBBUEkgPSB7XG5cdFx0XHRnZXRVc2VyczogZ2V0VXNlcnMsXG5cdFx0XHRnZXRVc2VyOiBnZXRVc2VyLFxuXHRcdFx0dXBkYXRlVXNlcjogdXBkYXRlVXNlcixcblx0XHRcdGRlbGV0ZVVzZXI6IGRlbGV0ZVVzZXJcblx0XHR9O1xuXHRcdHJldHVybiBBUEk7XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VycygpIHtcblx0XHRcdHJldHVybiB1c2Vycztcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VyKHVpZCkge1xuXHRcdFx0cmV0dXJuICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYudXNlcnMuY2hpbGQodWlkKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VyKSB7XG5cdFx0XHRyZXR1cm4gdXNlci4kc2F2ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZVVzZXIodXNlcikge1xuXHRcdFx0cmV0dXJuIHVzZXJzLiRyZW1vdmUodXNlcik7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci5zZXJ2aWNlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ0bEFwcFwiKS5jb25maWcoY29uZmlnKS5ydW4ocnVuKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJGZpcmViYXNlUmVmUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgRmlyZWJhc2Vcblx0XHR2YXIgQ09ORklHID0ge1xuXHRcdFx0YXBpS2V5OiBcIkFJemFTeUJsZnF2NE1jUjlIOXZld3dMXzEyMzV4Vi1xa21vRHlGc1wiLFxuXHRcdFx0YXV0aERvbWFpbjogXCJ0aWNrZXRsb2dzLWQ1YjYyLmZpcmViYXNlYXBwLmNvbVwiLFxuXHRcdFx0ZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly90aWNrZXRsb2dzLWQ1YjYyLmZpcmViYXNlaW8uY29tXCIsXG5cdFx0XHRzdG9yYWdlQnVja2V0OiBcInRpY2tldGxvZ3MtZDViNjIuYXBwc3BvdC5jb21cIixcblx0XHRcdG1lc3NhZ2luZ1NlbmRlcklkOiBcIjU3Nzc5NTE3MjYzMVwiXG5cdFx0fTtcblx0XHRmaXJlYmFzZS5pbml0aWFsaXplQXBwKENPTkZJRyk7XG5cblx0XHQkZmlyZWJhc2VSZWZQcm92aWRlci5yZWdpc3RlclVybCh7XG5cdFx0XHRkZWZhdWx0OiBDT05GSUcuZGF0YWJhc2VVUkwsXG5cdFx0XHR1c2VyczogQ09ORklHLmRhdGFiYXNlVVJMICsgJy91c2Vycydcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJ1bihBdXRoLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRzdGF0ZSkge1xuXHRcdGNvbnNvbGUubG9nKCdydW4gZnVuY3Rpb24gc3RhcnRlZCcpO1xuXHRcdGNoZWNrQXV0aCgpO1xuXG5cdFx0JHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKG5leHQsIGN1cnJlbnQpIHtcblx0XHRcdGNoZWNrQXV0aCgpO1xuXHRcdH0pO1xuXG5cdFx0JHJvb3RTY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMsIGVycm9yKSB7XG5cdFx0XHQvLyBXZSBjYW4gY2F0Y2ggdGhlIGVycm9yIHRocm93biB3aGVuIHRoZSAkcmVxdWlyZVNpZ25JbiBwcm9taXNlIGlzIHJlamVjdGVkXG5cdFx0XHQvLyBhbmQgcmVkaXJlY3QgdGhlIHVzZXIgYmFjayB0byB0aGUgaG9tZSBwYWdlXG5cdFx0XHRpZiAoZXJyb3IgPT09IFwiQVVUSF9SRVFVSVJFRFwiKSB7XG5cdFx0XHRcdCRzdGF0ZS5nbyhcImhvbWVcIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBjaGVja0F1dGgoKSB7XG5cdFx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0aWYgKCF1c2VyKSAkbG9jYXRpb24ucGF0aCgnL2F1dGgvc2lnbi1pbicpO1xuXHRcdFx0XHRjb25zb2xlLmxvZygncnVuKCk6ICcgKyB1c2VyKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiY29yZS5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQ29yZUNvbnRyb2xsZXJcIiwgQ29yZUNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIENvcmVDb250cm9sbGVyKEF1dGgsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICRyb290U2NvcGUpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0uc2lnbk91dCA9IHNpZ25PdXQ7XG5cblx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdGlmICh1c2VyKSB2bS5jdXJyZW50VXNlciA9IFVzZXJTZXJ2aWNlLmdldFVzZXIodXNlci51aWQpO1xuXHRcdH0pO1xuXG5cdFx0ZnVuY3Rpb24gc2lnbk91dCgpIHtcblx0XHRcdEF1dGguJHNpZ25PdXQoKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcygnWW91IGFyZSBzaWduZWQgb3V0LicpKTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbi8vXG4vL2ltcG9ydCBDb3JlQ29udHJvbGxlciBmcm9tICcuL2NvcmUuY29udHJvbGxlci5qcyc7XG4vL1xuLy9leHBvcnQgZGVmYXVsdCBhbmd1bGFyXG4vL1x0XHQubW9kdWxlKCdjb3JlTW9kdWxlJywgW10pXG4vL1x0XHQuY29udHJvbGxlcignYXV0aC5jb250cm9sbGVyJywgQ29yZUNvbnRyb2xsZXIpXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnY29yZS5tb2R1bGUnLCBbJ2NvcmUuY29udHJvbGxlciddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLm1vZHVsZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuLy9cbi8vaW1wb3J0IENvcmVDb250cm9sbGVyIGZyb20gJy4vY29yZS5jb250cm9sbGVyLmpzJztcbi8vXG4vL2V4cG9ydCBkZWZhdWx0IGFuZ3VsYXJcbi8vXHRcdC5tb2R1bGUoJ2NvcmVNb2R1bGUnLCBbXSlcbi8vXHRcdC5jb250cm9sbGVyKCdhdXRoLmNvbnRyb2xsZXInLCBDb3JlQ29udHJvbGxlcilcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdjb3JlLm1vZHVsZScsIFsnY29yZS5jb250cm9sbGVyJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUubW9kdWxlcy5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdib2R5LWNsYXNzZXMuZGlyZWN0aXZlJywgW10pLmRpcmVjdGl2ZSgnYm9keUNsYXNzZXMnLCBib2R5Q2xhc3Nlcyk7XG5cblx0ZnVuY3Rpb24gYm9keUNsYXNzZXMoJHJvb3RTY29wZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdFx0c2NvcGU6IHt9LFxuXHRcdFx0bGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuXG5cdFx0XHRcdCRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XG5cdFx0XHRcdFx0dmFyIGZyb21DbGFzc25hbWVzID0gYW5ndWxhci5pc0RlZmluZWQoZnJvbVN0YXRlLmRhdGEpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKGZyb21TdGF0ZS5kYXRhLmJvZHlDbGFzc2VzKSA/IGZyb21TdGF0ZS5kYXRhLmJvZHlDbGFzc2VzIDogbnVsbDtcblx0XHRcdFx0XHR2YXIgdG9DbGFzc25hbWVzID0gYW5ndWxhci5pc0RlZmluZWQodG9TdGF0ZS5kYXRhKSAmJiBhbmd1bGFyLmlzRGVmaW5lZCh0b1N0YXRlLmRhdGEuYm9keUNsYXNzZXMpID8gdG9TdGF0ZS5kYXRhLmJvZHlDbGFzc2VzIDogbnVsbDtcblxuXHRcdFx0XHRcdC8vIGRvbid0IGRvIGFueXRoaW5nIGlmIHRoZXkgYXJlIHRoZSBzYW1lXG5cdFx0XHRcdFx0aWYgKGZyb21DbGFzc25hbWVzICE9IHRvQ2xhc3NuYW1lcykge1xuXHRcdFx0XHRcdFx0aWYgKGZyb21DbGFzc25hbWVzKSBlbGVtLnJlbW92ZUNsYXNzKGZyb21DbGFzc25hbWVzKTtcblx0XHRcdFx0XHRcdGlmICh0b0NsYXNzbmFtZXMpIGVsZW0uYWRkQ2xhc3ModG9DbGFzc25hbWVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib2R5LWNsYXNzZXMuZGlyZWN0aXZlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2RpcmVjdGl2ZXMubW9kdWxlJywgWydsb2FkaW5nLmRpcmVjdGl2ZScsICdib2R5LWNsYXNzZXMuZGlyZWN0aXZlJywgJ3BhZ2UtaGVhZGVyLmRpcmVjdGl2ZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXJlY3RpdmVzLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhhbXBsZS5kZXJlY3RpdmUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBFeGFtcGxlRGlyZWN0aXZlID0gZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBFeGFtcGxlRGlyZWN0aXZlKCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFeGFtcGxlRGlyZWN0aXZlKTtcblxuXHRcdHRoaXMudGVtcGxhdGUgPSAnPGRpdj57e2N0cmwubmFtZX19PC9kaXY+Jztcblx0XHR0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuXHRcdHRoaXMuc2NvcGUgPSB7fTtcblxuXHRcdHRoaXMuY29udHJvbGxlciA9IEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyO1xuXHRcdHRoaXMuY29udHJvbGxlckFzID0gJ2N0cmwnO1xuXHRcdHRoaXMuYmluZFRvQ29udHJvbGxlciA9IHRydWU7XG5cdH1cblxuXHQvLyBEaXJlY3RpdmUgY29tcGlsZSBmdW5jdGlvblxuXG5cblx0X2NyZWF0ZUNsYXNzKEV4YW1wbGVEaXJlY3RpdmUsIFt7XG5cdFx0a2V5OiAnY29tcGlsZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7fVxuXG5cdFx0Ly8gRGlyZWN0aXZlIGxpbmsgZnVuY3Rpb25cblxuXHR9LCB7XG5cdFx0a2V5OiAnbGluaycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGxpbmsoKSB7fVxuXHR9XSk7XG5cblx0cmV0dXJuIEV4YW1wbGVEaXJlY3RpdmU7XG59KCk7XG5cbi8vIERpcmVjdGl2ZSdzIGNvbnRyb2xsZXJcblxuXG5leHBvcnRzLmRlZmF1bHQgPSBFeGFtcGxlRGlyZWN0aXZlO1xuXG52YXIgRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbiBFeGFtcGxlRGlyZWN0aXZlQ29udHJvbGxlcigpIHtcblx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyKTtcblxuXHR0aGlzLm5hbWUgPSAnWWFzc2luZSc7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhhbXBsZS5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJsb2FkaW5nLmRpcmVjdGl2ZVwiLCBbXSkuZGlyZWN0aXZlKFwibG9hZGluZ1NwaW5uZXJcIiwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0ZGF0YTogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdhcHAvc2hhcmVkL2RpcmVjdGl2ZXMvbG9hZGluZy5kaXJlY3RpdmUvbG9hZGluZy50ZW1wbGF0ZS5odG1sJ1xuXHRcdH07XG5cdH0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvYWRpbmcuZGlyZWN0aXZlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwicGFnZS1oZWFkZXIuZGlyZWN0aXZlXCIsIFtdKS5kaXJlY3RpdmUoXCJwYWdlSGVhZGVyXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdGRhdGE6ICc9Jyxcblx0XHRcdFx0dGl0bGU6ICdAJ1xuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlVXJsOiAnYXBwL3NoYXJlZC9kaXJlY3RpdmVzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnRlbXBsYXRlLmh0bWwnXG5cdFx0fTtcblx0fSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZS1oZWFkZXIuZGlyZWN0aXZlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImxheW91dC5tb2R1bGVcIiwgW1wic2lkZWJhci5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInNpZGViYXIuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlNpZGViYXJDb250cm9sbGVyXCIsIFNpZGViYXJDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBTaWRlYmFyQ29udHJvbGxlcigkbG9jYXRpb24sIEF1dGgpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lkZWJhci5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdGFuZ3VsYXIubW9kdWxlKFwibmF2LmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJOYXZDb250cm9sbGVyXCIsIE5hdkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE5hdkNvbnRyb2xsZXIoJGxvY2F0aW9uLCBBdXRoLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHZhciBfZnMgPSBGdW5jdGlvbnM7XG5cdFx0dm0uc2lnbk91dCA9IHNpZ25PdXQ7XG5cdFx0dm0uaXNBY3RpdmUgPSBpc0FjdGl2ZTtcblx0XHQvLyBpbml0aWFsaXplIHZpZXcgZGF0YVxuXHRcdGZ1bmN0aW9uIGluaXQoKSB7fVxuXG5cdFx0aW5pdCgpO1xuXG5cdFx0Ly92bS5hdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24odXNlcikge1xuXHRcdC8vXHR2bS51c2VyID0gdXNlcjtcblx0XHQvL30pO1xuXG5cdFx0ZnVuY3Rpb24gc2lnbk91dCgpIHtcblx0XHRcdEF1dGguJHNpZ25PdXQoKS50aGVuKF9mcy50b2FzdCgnWW91IGFyZSBzaWduZWQgb3V0LicpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBpc0FjdGl2ZShkZXN0aW5hdGlvbikge1xuXHRcdFx0cmV0dXJuIGRlc3RpbmF0aW9uID09PSAkbG9jYXRpb24ucGF0aCgpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdi5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICBhbmd1bGFyLm1vZHVsZShcIm5hdi5tb2R1bGVcIiwgW1wibmF2LmNvbnRyb2xsZXJcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdi5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiQXV0aFwiLCBBdXRoKTtcblxuXHRmdW5jdGlvbiBBdXRoKCRmaXJlYmFzZUF1dGgpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlQXV0aCgpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5mYWN0b3J5LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZShcImZ1bmN0aW9ucy5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiRnVuY3Rpb25zXCIsIEZ1bmN0aW9ucyk7XG5cbiAgZnVuY3Rpb24gRnVuY3Rpb25zKCkge1xuXG4gICAgdmFyIEZVTkNUSU9OUyA9IHtcbiAgICAgIHRvYXN0OiB0b2FzdFxuICAgIH07XG4gICAgcmV0dXJuIEZVTkNUSU9OUztcblxuICAgIC8vIHRvYXN0IHBvcHVwIHdpdGggY3VzdG9tIG1zZ1xuICAgIGZ1bmN0aW9uIHRvYXN0KG1zZykge1xuICAgICAgdmFyIHRpbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDMwMDA7XG5cbiAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1zZywgdGltZSk7XG4gICAgfVxuICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVuY3Rpb25zLmZhY3RvcnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwiZnVuY3Rpb25zLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJGdW5jdGlvbnNcIiwgRnVuY3Rpb25zKTtcblxuICBmdW5jdGlvbiBGdW5jdGlvbnModG9hc3RyKSB7XG5cbiAgICB2YXIgRlVOQ1RJT05TID0ge1xuICAgICAgdG9hc3Q6IHRvYXN0XG4gICAgfTtcbiAgICByZXR1cm4gRlVOQ1RJT05TO1xuXG4gICAgLy8gdG9hc3QgcG9wdXAgd2l0aCBjdXN0b20gbXNnXG4gICAgLy8gaW5mbzpibHVlIHN1Y2Nlc3M6Z3JlZW4gZXJyb3I6cmVkIHdhcm5pbmc6b3JhbmdlXG4gICAgZnVuY3Rpb24gdG9hc3QoKSB7XG4gICAgICByZXR1cm4gdG9hc3RyO1xuICAgIH1cbiAgfVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZ1bmN0aW9ucy5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInNlcnZpY2VzLm1vZHVsZVwiLCBbXCJmdW5jdGlvbnMuZmFjdG9yeVwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VydmljZXMubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInVzZXIuZmFjdG9yeVwiLCBbXSkuZmFjdG9yeShcIlVzZXJcIiwgVXNlcik7XG5cblx0ZnVuY3Rpb24gVXNlcigkZmlyZWJhc2VSZWYsICRmaXJlYmFzZUFycmF5LCAkZmlyZWJhc2VPYmplY3QpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi51c2Vycyk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLmZhY3RvcnkuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnc2hhcmVkLm1vZHVsZScsIFsnc2VydmljZXMubW9kdWxlJywgJ2RpcmVjdGl2ZXMubW9kdWxlJywgJ2xheW91dC5tb2R1bGUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmVkLm1vZHVsZS5qcy5tYXBcbiJdfQ==
