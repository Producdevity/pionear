(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('myApp', [
	//	Third Party Modules
	'ui.router', 'firebase', 'toastr',
	//	My Modules
	'components.module', 'shared.module', 'core.module']);
})();


},{}],2:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("myApp").config(config);

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


},{}],8:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("sign-up.controller", []).controller("SignUpController", SignUpController);

	function SignUpController(Auth, UserService, Functions, $timeout, $location) {
		var vm = this;
		this._fs = Functions;

		vm.title = 'Sign up for Pionear';

		vm.signUp = signUp;

		function signUp(credentials) {
			var _this = this;

			Auth.$createUserWithEmailAndPassword(credentials.email, credentials.pass).then(function (user) {
				var newUser = UserService.getUser(user.uid);
				console.log(credentials);
				newUser.email = user.email;
				newUser.name = credentials.name;
				newUser.company = credentials.company;
				newUser.address = credentials.address;
				newUser.zipcode = credentials.zipcode;
				newUser.phone = credentials.phone;
				newUser.land = credentials.land;
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

	angular.module("myApp").config(config).run(run);

	function config($firebaseRefProvider) {
		console.log('config function started');

		// Initialize Firebase
		var CONFIG = {
			apiKey: "AIzaSyDsp_oBM8lPOnEGVnByjsofGw7Kpftzfe8",
			authDomain: "pionear-d070e.firebaseapp.com",
			databaseURL: "https://pionear-d070e.firebaseio.com",
			storageBucket: "pionear-d070e.appspot.com",
			messagingSenderId: "96740586251"
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
				console.log(user);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5yb3V0ZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hdXRoL2F1dGgucm91dGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2F1dGgvYXV0aC5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2F1dGgvc2lnbi1pbi9zaWduLWluLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9zaWduLXVwL3NpZ24tdXAuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9jb21wb25lbnRzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9tYWluL21haW4uY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9tYWluL21haW4ubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3VzZXIvdXNlci5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3VzZXIvdXNlci5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbmZpZy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvcmUvY29yZS5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvcmUvY29yZS5tb2R1bGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9ib2R5LWNsYXNzZXMvYm9keS1jbGFzc2VzLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2V4YW1wbGUuZGVyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9leGFtcGxlLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvbG9hZGluZy9sb2FkaW5nLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvbGF5b3V0L2xheW91dC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9sYXlvdXQvc2lkZWJhci9zaWRlYmFyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9uYXZpZ2F0aW9uL25hdi5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvbmF2aWdhdGlvbi9uYXYubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvYXV0aC5mYWN0b3J5LmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvZnVuY3Rpb25zLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9mdW5jdGlvbnMuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3VzZXIuZmFjdG9yeS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NoYXJlZC5tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ215QXBwJywgW1xuXHQvL1x0VGhpcmQgUGFydHkgTW9kdWxlc1xuXHQndWkucm91dGVyJywgJ2ZpcmViYXNlJywgJ3RvYXN0cicsXG5cdC8vXHRNeSBNb2R1bGVzXG5cdCdjb21wb25lbnRzLm1vZHVsZScsICdzaGFyZWQubW9kdWxlJywgJ2NvcmUubW9kdWxlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm15QXBwXCIpLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkdXJsUm91dGVyUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FwcC5yb3V0ZXMgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXHRcdHZhciBCQVNFX1VSTCA9ICdhcHAvY29tcG9uZW50cycsXG5cdFx0ICAgIEFVVEhfVVJMID0gQkFTRV9VUkwgKyAnL2F1dGgnO1xuXG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtYWluJywge1xuXHRcdFx0dXJsOiAnLycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQkFTRV9VUkwgKyAnL21haW4vbWFpbi52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJyxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0Ym9keUNsYXNzZXM6ICdzaWRlYmFyLW1pbmknXG5cdFx0XHR9LFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHQvLyBjb250cm9sbGVyIHdpbGwgbm90IGJlIGxvYWRlZCB1bnRpbCAkcmVxdWlyZVNpZ25JbiByZXNvbHZlc1xuXHRcdFx0XHQvLyBBdXRoIHJlZmVycyB0byBvdXIgJGZpcmViYXNlQXV0aCB3cmFwcGVyIGluIHRoZSBmYWN0b3J5IGJlbG93XG5cdFx0XHRcdFwiY3VycmVudEF1dGhcIjogW1wiQXV0aFwiLCBmdW5jdGlvbiAoQXV0aCkge1xuXHRcdFx0XHRcdC8vICRyZXF1aXJlU2lnbkluIHJldHVybnMgYSBwcm9taXNlIHNvIHRoZSByZXNvbHZlIHdhaXRzIGZvciBpdCB0byBjb21wbGV0ZVxuXHRcdFx0XHRcdC8vIElmIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkLCBpdCB3aWxsIHRocm93IGEgJHN0YXRlQ2hhbmdlRXJyb3IgKHNlZSBhYm92ZSlcblx0XHRcdFx0XHRyZXR1cm4gQXV0aC4kcmVxdWlyZVNpZ25JbigpO1xuXHRcdFx0XHR9XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vLnN0YXRlKCdtYWluLmRhc2hib2FyZCcsIHtcblx0XHQvL1x0dXJsOiAgICAgICAgICcvZGFzaGJvYXJkJyxcblx0XHQvL1x0Y29udHJvbGxlcjogICAnTWFpbkNvbnRyb2xsZXInLFxuXHRcdC8vXHRjb250cm9sbGVyQXM6ICd2bScsXG5cdFx0Ly9cdHRlbXBsYXRlVXJsOiAgYCR7QkFTRV9VUkx9L21haW4vbWFpbi52aWV3Lmh0bWxgLFxuXHRcdC8vfSlcblx0XHQvLy5zdGF0ZSgnYXV0aC5zaWduaW4nLCB7XG5cdFx0Ly9cdHVybDogICAgICAgICAgJy9zaWduaW4nLFxuXHRcdC8vXHR0ZW1wbGF0ZVVybDogIGAke0FVVEhfVVJMfS9zaWduLWluL3NpZ24taW4udmlldy5odG1sYCxcblx0XHQvL1x0Y29udHJvbGxlcjogICAnQXV0aENvbnRyb2xsZXInLFxuXHRcdC8vXHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHQvL30pXG5cdFx0Ly8uc3RhdGUoJ2F1dGguc2lnbnVwJywge1xuXHRcdC8vXHR1cmw6ICAgICAgICAgICcvc2lnbnVwJyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICBgJHtBVVRIX1VSTH0vc2lnbi11cC9zaWdudXAudmlldy5odG1sYCxcblx0XHQvL1x0Y29udHJvbGxlcjogICAnQXV0aENvbnRyb2xsZXInLFxuXHRcdC8vXHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHQvL30pXG5cdFx0Ly8uc3RhdGUoJ2NvbnRhY3QnLCB7XG5cdFx0Ly9cdHVybDogJy9jb250YWN0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cdFx0Ly99KVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLnJvdXRlcy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBdXRoQ29udHJvbGxlclwiLCBBdXRoQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQXV0aENvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGguY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhdXRoLm1vZHVsZScsIFsnYXV0aC5yb3V0ZXMnLCAnYXV0aC5jb250cm9sbGVyJywgJ3NpZ24taW4uY29udHJvbGxlcicsICdzaWduLXVwLmNvbnRyb2xsZXInLCAnYXV0aC5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2F1dGggY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBVVRIX1VSTCA9ICdhcHAvY29tcG9uZW50cy9hdXRoJztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhdXRoJywge1xuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR1cmw6ICcvYXV0aCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL2F1dGgudmlldy5odG1sJ1xuXHRcdH0pLnN0YXRlKCdhdXRoLnNpZ25pbicsIHtcblx0XHRcdHVybDogJy9zaWduLWluJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1VSTCArICcvc2lnbi1pbi9zaWduLWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnU2lnbkluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWdudXAnLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi11cCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL3NpZ24tdXAvc2lnbi11cC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1NpZ25VcENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdFx0Ly9jb25zdCBjb25maWcgPSB7XG5cdFx0Ly9cdGFwaUtleTogICAgICAgICAgICBcIkFJemFTeUNwSFVwM045aXV3TzJCRS1BYmpyMEMtbEUxbTQyNGxCSVwiLFxuXHRcdC8vXHRhdXRoRG9tYWluOiAgICAgICAgXCJ6YXB6aXRlLWI0N2Y5LmZpcmViYXNlYXBwLmNvbVwiLFxuXHRcdC8vXHRkYXRhYmFzZVVSTDogICAgICAgXCJodHRwczovL3phcHppdGUtYjQ3ZjkuZmlyZWJhc2Vpby5jb21cIixcblx0XHQvL1x0c3RvcmFnZUJ1Y2tldDogICAgIFwiemFweml0ZS1iNDdmOS5hcHBzcG90LmNvbVwiLFxuXHRcdC8vXHRtZXNzYWdpbmdTZW5kZXJJZDogXCI1NTQ1ODU1NDc4NDhcIlxuXHRcdC8vfTtcblx0XHQvL2ZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcblx0XHQvL1xuXHRcdC8vJGZpcmViYXNlUmVmUHJvdmlkZXIucmVnaXN0ZXJVcmwoe1xuXHRcdC8vXHRkZWZhdWx0OiAgICBjb25maWcuZGF0YWJhc2VVUkwsXG5cdFx0Ly9cdGNhdGVnb3JpZXM6IGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vY2F0ZWdvcmllc2AsXG5cdFx0Ly9cdHNpdGVzOiAgICAgIGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vc2l0ZXNgLFxuXHRcdC8vXHR1c2VyczogICAgICBgJHtjb25maWcuZGF0YWJhc2VVUkx9L3VzZXJzYFxuXHRcdC8vfSk7XG5cdFx0Ly9cblx0XHQvLyR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblx0XHQvLyRzdGF0ZVByb3ZpZGVyXG5cdFx0Ly9cdFx0LnN0YXRlKCdtYWluJywge1xuXHRcdC8vXHRcdFx0dXJsOiAnLycsXG5cdFx0Ly9cdFx0XHR0ZW1wbGF0ZVVybDogYCR7QkFTRV9VUkx9L21haW4vbWFpbi52aWV3Lmh0bWxgLFxuXHRcdC8vXHRcdFx0Y29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcblx0XHQvLyAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdC8vXHRcdH0pO1xuXHRcdC8vLnN0YXRlKCdhYm91dCcsIHtcblx0XHQvL1x0dXJsOiAnL2Fib3V0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJyxcblx0XHQvL1x0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCdcblx0XHQvL30pXG5cdFx0Ly8uc3RhdGUoJ2NvbnRhY3QnLCB7XG5cdFx0Ly9cdHVybDogJy9jb250YWN0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cdFx0Ly99KVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiQXV0aFwiLCBBdXRoKTtcblxuXHRmdW5jdGlvbiBBdXRoKCRmaXJlYmFzZUF1dGgpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlQXV0aCgpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2lnbi1pbi5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiU2lnbkluQ29udHJvbGxlclwiLCBTaWduSW5Db250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBTaWduSW5Db250cm9sbGVyKEF1dGgsICRsb2NhdGlvbiwgRnVuY3Rpb25zKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdHZtLnRpdGxlID0gJ1NpZ24gaW4gdG8gUGlvbmVhcic7XG5cdFx0dm0ubG9hZGluZyA9IHRydWU7XG5cblx0XHR2bS5zaWduSW4gPSBzaWduSW47XG5cblx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdGlmICh1c2VyKSAkbG9jYXRpb24ucGF0aCgnLycpO1xuXHRcdH0pO1xuXG5cdFx0ZnVuY3Rpb24gc2lnbkluKGNyZWRlbnRpYWxzKSB7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0XHR2bS5sb2FkaW5nID0gdHJ1ZTtcblx0XHRcdEF1dGguJHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGNyZWRlbnRpYWxzLmVtYWlsLCBjcmVkZW50aWFscy5wYXNzKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRcdF90aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoXCJTaWduZWQgaW4gYXMgXCIgKyB1c2VyLmVtYWlsKTtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9kYXNoYm9hcmQnKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiQXV0aGVudGljYXRpb24gZmFpbGVkOlwiLCBlcnJvcik7XG5cdFx0XHRcdF90aGlzLl9mcy50b2FzdCgpLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHR2bS5lcnJvciA9IGVycm9yLm1lc3NhZ2U7XG5cdFx0XHRcdHZtLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ24taW4uY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcInNpZ24tdXAuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlNpZ25VcENvbnRyb2xsZXJcIiwgU2lnblVwQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gU2lnblVwQ29udHJvbGxlcihBdXRoLCBVc2VyU2VydmljZSwgRnVuY3Rpb25zLCAkdGltZW91dCwgJGxvY2F0aW9uKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdHZtLnRpdGxlID0gJ1NpZ24gdXAgZm9yIFBpb25lYXInO1xuXG5cdFx0dm0uc2lnblVwID0gc2lnblVwO1xuXG5cdFx0ZnVuY3Rpb24gc2lnblVwKGNyZWRlbnRpYWxzKSB7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0XHRBdXRoLiRjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3MpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0dmFyIG5ld1VzZXIgPSBVc2VyU2VydmljZS5nZXRVc2VyKHVzZXIudWlkKTtcblx0XHRcdFx0Y29uc29sZS5sb2coY3JlZGVudGlhbHMpO1xuXHRcdFx0XHRuZXdVc2VyLmVtYWlsID0gdXNlci5lbWFpbDtcblx0XHRcdFx0bmV3VXNlci5uYW1lID0gY3JlZGVudGlhbHMubmFtZTtcblx0XHRcdFx0bmV3VXNlci5jb21wYW55ID0gY3JlZGVudGlhbHMuY29tcGFueTtcblx0XHRcdFx0bmV3VXNlci5hZGRyZXNzID0gY3JlZGVudGlhbHMuYWRkcmVzcztcblx0XHRcdFx0bmV3VXNlci56aXBjb2RlID0gY3JlZGVudGlhbHMuemlwY29kZTtcblx0XHRcdFx0bmV3VXNlci5waG9uZSA9IGNyZWRlbnRpYWxzLnBob25lO1xuXHRcdFx0XHRuZXdVc2VyLmxhbmQgPSBjcmVkZW50aWFscy5sYW5kO1xuXHRcdFx0XHRuZXdVc2VyLiRzYXZlKCkudGhlbihfdGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKCdTaWduZWQgdXAgc3VjY2Vzc2Z1bGx5IScpKS50aGVuKCRsb2NhdGlvbi5wYXRoKCcvJykpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdF90aGlzLl9mcy50b2FzdCgpLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiLCBlcnJvcik7XG5cdFx0XHRcdHZtLmVycm9yID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ24tdXAuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdjb21wb25lbnRzLm1vZHVsZScsIFsnYXV0aC5tb2R1bGUnLCAndXNlci5tb2R1bGUnLCAnbWFpbi5tb2R1bGUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50cy5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibWFpbi5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiTWFpbkNvbnRyb2xsZXJcIiwgTWFpbkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibWFpbi5tb2R1bGVcIiwgW1wibWFpbi5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ1c2VyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJVc2VyQ29udHJvbGxlclwiLCBVc2VyQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gVXNlckNvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCd1c2VyLm1vZHVsZScsIFsndXNlci5jb250cm9sbGVyJywgJ3VzZXIuc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ1c2VyLnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJVc2VyU2VydmljZVwiLCBVc2VyU2VydmljZSk7XG5cblx0ZnVuY3Rpb24gVXNlclNlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIHVzZXJzID0gJGZpcmViYXNlQXJyYXkoJGZpcmViYXNlUmVmLnVzZXJzKTtcblxuXHRcdHZhciBBUEkgPSB7XG5cdFx0XHRnZXRVc2VyczogZ2V0VXNlcnMsXG5cdFx0XHRnZXRVc2VyOiBnZXRVc2VyLFxuXHRcdFx0dXBkYXRlVXNlcjogdXBkYXRlVXNlcixcblx0XHRcdGRlbGV0ZVVzZXI6IGRlbGV0ZVVzZXJcblx0XHR9O1xuXHRcdHJldHVybiBBUEk7XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VycygpIHtcblx0XHRcdHJldHVybiB1c2Vycztcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VyKHVpZCkge1xuXHRcdFx0cmV0dXJuICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYudXNlcnMuY2hpbGQodWlkKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VyKSB7XG5cdFx0XHRyZXR1cm4gdXNlci4kc2F2ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZVVzZXIodXNlcikge1xuXHRcdFx0cmV0dXJuIHVzZXJzLiRyZW1vdmUodXNlcik7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci5zZXJ2aWNlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJteUFwcFwiKS5jb25maWcoY29uZmlnKS5ydW4ocnVuKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJGZpcmViYXNlUmVmUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgRmlyZWJhc2Vcblx0XHR2YXIgQ09ORklHID0ge1xuXHRcdFx0YXBpS2V5OiBcIkFJemFTeURzcF9vQk04bFBPbkVHVm5CeWpzb2ZHdzdLcGZ0emZlOFwiLFxuXHRcdFx0YXV0aERvbWFpbjogXCJwaW9uZWFyLWQwNzBlLmZpcmViYXNlYXBwLmNvbVwiLFxuXHRcdFx0ZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9waW9uZWFyLWQwNzBlLmZpcmViYXNlaW8uY29tXCIsXG5cdFx0XHRzdG9yYWdlQnVja2V0OiBcInBpb25lYXItZDA3MGUuYXBwc3BvdC5jb21cIixcblx0XHRcdG1lc3NhZ2luZ1NlbmRlcklkOiBcIjk2NzQwNTg2MjUxXCJcblx0XHR9O1xuXHRcdGZpcmViYXNlLmluaXRpYWxpemVBcHAoQ09ORklHKTtcblxuXHRcdCRmaXJlYmFzZVJlZlByb3ZpZGVyLnJlZ2lzdGVyVXJsKHtcblx0XHRcdGRlZmF1bHQ6IENPTkZJRy5kYXRhYmFzZVVSTCxcblx0XHRcdHVzZXJzOiBDT05GSUcuZGF0YWJhc2VVUkwgKyAnL3VzZXJzJ1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcnVuKEF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgJHN0YXRlKSB7XG5cdFx0Y29uc29sZS5sb2coJ3J1biBmdW5jdGlvbiBzdGFydGVkJyk7XG5cdFx0Y2hlY2tBdXRoKCk7XG5cblx0XHQkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAobmV4dCwgY3VycmVudCkge1xuXHRcdFx0Y2hlY2tBdXRoKCk7XG5cdFx0fSk7XG5cblx0XHQkcm9vdFNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZUVycm9yXCIsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcywgZXJyb3IpIHtcblx0XHRcdC8vIFdlIGNhbiBjYXRjaCB0aGUgZXJyb3IgdGhyb3duIHdoZW4gdGhlICRyZXF1aXJlU2lnbkluIHByb21pc2UgaXMgcmVqZWN0ZWRcblx0XHRcdC8vIGFuZCByZWRpcmVjdCB0aGUgdXNlciBiYWNrIHRvIHRoZSBob21lIHBhZ2Vcblx0XHRcdGlmIChlcnJvciA9PT0gXCJBVVRIX1JFUVVJUkVEXCIpIHtcblx0XHRcdFx0JHN0YXRlLmdvKFwiaG9tZVwiKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIGNoZWNrQXV0aCgpIHtcblx0XHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHRpZiAoIXVzZXIpICRsb2NhdGlvbi5wYXRoKCcvYXV0aC9zaWduLWluJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHVzZXIpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJjb3JlLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJDb3JlQ29udHJvbGxlclwiLCBDb3JlQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQ29yZUNvbnRyb2xsZXIoQXV0aCwgVXNlclNlcnZpY2UsIEZ1bmN0aW9ucywgJHJvb3RTY29wZSkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS5zaWduT3V0ID0gc2lnbk91dDtcblxuXHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0aWYgKHVzZXIpIHZtLmN1cnJlbnRVc2VyID0gVXNlclNlcnZpY2UuZ2V0VXNlcih1c2VyLnVpZCk7XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBzaWduT3V0KCkge1xuXHRcdFx0QXV0aC4kc2lnbk91dCgpLnRoZW4odGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKCdZb3UgYXJlIHNpZ25lZCBvdXQuJykpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuLy9cbi8vaW1wb3J0IENvcmVDb250cm9sbGVyIGZyb20gJy4vY29yZS5jb250cm9sbGVyLmpzJztcbi8vXG4vL2V4cG9ydCBkZWZhdWx0IGFuZ3VsYXJcbi8vXHRcdC5tb2R1bGUoJ2NvcmVNb2R1bGUnLCBbXSlcbi8vXHRcdC5jb250cm9sbGVyKCdhdXRoLmNvbnRyb2xsZXInLCBDb3JlQ29udHJvbGxlcilcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdjb3JlLm1vZHVsZScsIFsnY29yZS5jb250cm9sbGVyJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL2ltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG4vL1xuLy9pbXBvcnQgQ29yZUNvbnRyb2xsZXIgZnJvbSAnLi9jb3JlLmNvbnRyb2xsZXIuanMnO1xuLy9cbi8vZXhwb3J0IGRlZmF1bHQgYW5ndWxhclxuLy9cdFx0Lm1vZHVsZSgnY29yZU1vZHVsZScsIFtdKVxuLy9cdFx0LmNvbnRyb2xsZXIoJ2F1dGguY29udHJvbGxlcicsIENvcmVDb250cm9sbGVyKVxuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2NvcmUubW9kdWxlJywgWydjb3JlLmNvbnRyb2xsZXInXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5tb2R1bGVzLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2JvZHktY2xhc3Nlcy5kaXJlY3RpdmUnLCBbXSkuZGlyZWN0aXZlKCdib2R5Q2xhc3NlcycsIGJvZHlDbGFzc2VzKTtcblxuXHRmdW5jdGlvbiBib2R5Q2xhc3Nlcygkcm9vdFNjb3BlKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0XHRzY29wZToge30sXG5cdFx0XHRsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG5cblx0XHRcdFx0JHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcblx0XHRcdFx0XHR2YXIgZnJvbUNsYXNzbmFtZXMgPSBhbmd1bGFyLmlzRGVmaW5lZChmcm9tU3RhdGUuZGF0YSkgJiYgYW5ndWxhci5pc0RlZmluZWQoZnJvbVN0YXRlLmRhdGEuYm9keUNsYXNzZXMpID8gZnJvbVN0YXRlLmRhdGEuYm9keUNsYXNzZXMgOiBudWxsO1xuXHRcdFx0XHRcdHZhciB0b0NsYXNzbmFtZXMgPSBhbmd1bGFyLmlzRGVmaW5lZCh0b1N0YXRlLmRhdGEpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKHRvU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcykgPyB0b1N0YXRlLmRhdGEuYm9keUNsYXNzZXMgOiBudWxsO1xuXG5cdFx0XHRcdFx0Ly8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhleSBhcmUgdGhlIHNhbWVcblx0XHRcdFx0XHRpZiAoZnJvbUNsYXNzbmFtZXMgIT0gdG9DbGFzc25hbWVzKSB7XG5cdFx0XHRcdFx0XHRpZiAoZnJvbUNsYXNzbmFtZXMpIGVsZW0ucmVtb3ZlQ2xhc3MoZnJvbUNsYXNzbmFtZXMpO1xuXHRcdFx0XHRcdFx0aWYgKHRvQ2xhc3NuYW1lcykgZWxlbS5hZGRDbGFzcyh0b0NsYXNzbmFtZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvZHktY2xhc3Nlcy5kaXJlY3RpdmUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnZGlyZWN0aXZlcy5tb2R1bGUnLCBbJ2xvYWRpbmcuZGlyZWN0aXZlJywgJ2JvZHktY2xhc3Nlcy5kaXJlY3RpdmUnLCAncGFnZS1oZWFkZXIuZGlyZWN0aXZlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpcmVjdGl2ZXMubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGFtcGxlLmRlcmVjdGl2ZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEV4YW1wbGVEaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIEV4YW1wbGVEaXJlY3RpdmUoKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4YW1wbGVEaXJlY3RpdmUpO1xuXG5cdFx0dGhpcy50ZW1wbGF0ZSA9ICc8ZGl2Pnt7Y3RybC5uYW1lfX08L2Rpdj4nO1xuXHRcdHRoaXMucmVzdHJpY3QgPSAnRSc7XG5cdFx0dGhpcy5zY29wZSA9IHt9O1xuXG5cdFx0dGhpcy5jb250cm9sbGVyID0gRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXI7XG5cdFx0dGhpcy5jb250cm9sbGVyQXMgPSAnY3RybCc7XG5cdFx0dGhpcy5iaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcblx0fVxuXG5cdC8vIERpcmVjdGl2ZSBjb21waWxlIGZ1bmN0aW9uXG5cblxuXHRfY3JlYXRlQ2xhc3MoRXhhbXBsZURpcmVjdGl2ZSwgW3tcblx0XHRrZXk6ICdjb21waWxlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcGlsZSgpIHt9XG5cblx0XHQvLyBEaXJlY3RpdmUgbGluayBmdW5jdGlvblxuXG5cdH0sIHtcblx0XHRrZXk6ICdsaW5rJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gbGluaygpIHt9XG5cdH1dKTtcblxuXHRyZXR1cm4gRXhhbXBsZURpcmVjdGl2ZTtcbn0oKTtcblxuLy8gRGlyZWN0aXZlJ3MgY29udHJvbGxlclxuXG5cbmV4cG9ydHMuZGVmYXVsdCA9IEV4YW1wbGVEaXJlY3RpdmU7XG5cbnZhciBFeGFtcGxlRGlyZWN0aXZlQ29udHJvbGxlciA9IGZ1bmN0aW9uIEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyKCkge1xuXHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXIpO1xuXG5cdHRoaXMubmFtZSA9ICdZYXNzaW5lJztcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGFtcGxlLmRpcmVjdGl2ZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcImxvYWRpbmcuZGlyZWN0aXZlXCIsIFtdKS5kaXJlY3RpdmUoXCJsb2FkaW5nU3Bpbm5lclwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRkYXRhOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9sb2FkaW5nLmRpcmVjdGl2ZS9sb2FkaW5nLnRlbXBsYXRlLmh0bWwnXG5cdFx0fTtcblx0fSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9hZGluZy5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJwYWdlLWhlYWRlci5kaXJlY3RpdmVcIiwgW10pLmRpcmVjdGl2ZShcInBhZ2VIZWFkZXJcIiwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0ZGF0YTogJz0nLFxuXHRcdFx0XHR0aXRsZTogJ0AnXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdhcHAvc2hhcmVkL2RpcmVjdGl2ZXMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudGVtcGxhdGUuaHRtbCdcblx0XHR9O1xuXHR9KTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlLWhlYWRlci5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibGF5b3V0Lm1vZHVsZVwiLCBbXCJzaWRlYmFyLmNvbnRyb2xsZXJcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2lkZWJhci5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiU2lkZWJhckNvbnRyb2xsZXJcIiwgU2lkZWJhckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFNpZGViYXJDb250cm9sbGVyKCRsb2NhdGlvbiwgQXV0aCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaWRlYmFyLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0YW5ndWxhci5tb2R1bGUoXCJuYXYuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk5hdkNvbnRyb2xsZXJcIiwgTmF2Q29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gTmF2Q29udHJvbGxlcigkbG9jYXRpb24sIEF1dGgsIEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dmFyIF9mcyA9IEZ1bmN0aW9ucztcblx0XHR2bS5zaWduT3V0ID0gc2lnbk91dDtcblx0XHR2bS5pc0FjdGl2ZSA9IGlzQWN0aXZlO1xuXHRcdC8vIGluaXRpYWxpemUgdmlldyBkYXRhXG5cdFx0ZnVuY3Rpb24gaW5pdCgpIHt9XG5cblx0XHRpbml0KCk7XG5cblx0XHQvL3ZtLmF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKSB7XG5cdFx0Ly9cdHZtLnVzZXIgPSB1c2VyO1xuXHRcdC8vfSk7XG5cblx0XHRmdW5jdGlvbiBzaWduT3V0KCkge1xuXHRcdFx0QXV0aC4kc2lnbk91dCgpLnRoZW4oX2ZzLnRvYXN0KCdZb3UgYXJlIHNpZ25lZCBvdXQuJykpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGlzQWN0aXZlKGRlc3RpbmF0aW9uKSB7XG5cdFx0XHRyZXR1cm4gZGVzdGluYXRpb24gPT09ICRsb2NhdGlvbi5wYXRoKCk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmF2LmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGFuZ3VsYXIubW9kdWxlKFwibmF2Lm1vZHVsZVwiLCBbXCJuYXYuY29udHJvbGxlclwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmF2Lm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJBdXRoXCIsIEF1dGgpO1xuXG5cdGZ1bmN0aW9uIEF1dGgoJGZpcmViYXNlQXV0aCkge1xuXHRcdHJldHVybiAkZmlyZWJhc2VBdXRoKCk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLmZhY3RvcnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwiZnVuY3Rpb25zLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJGdW5jdGlvbnNcIiwgRnVuY3Rpb25zKTtcblxuICBmdW5jdGlvbiBGdW5jdGlvbnMoKSB7XG5cbiAgICB2YXIgRlVOQ1RJT05TID0ge1xuICAgICAgdG9hc3Q6IHRvYXN0XG4gICAgfTtcbiAgICByZXR1cm4gRlVOQ1RJT05TO1xuXG4gICAgLy8gdG9hc3QgcG9wdXAgd2l0aCBjdXN0b20gbXNnXG4gICAgZnVuY3Rpb24gdG9hc3QobXNnKSB7XG4gICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMzAwMDtcblxuICAgICAgTWF0ZXJpYWxpemUudG9hc3QobXNnLCB0aW1lKTtcbiAgICB9XG4gIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mdW5jdGlvbnMuZmFjdG9yeS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJmdW5jdGlvbnMuZmFjdG9yeVwiLCBbXSkuZmFjdG9yeShcIkZ1bmN0aW9uc1wiLCBGdW5jdGlvbnMpO1xuXG4gIGZ1bmN0aW9uIEZ1bmN0aW9ucyh0b2FzdHIpIHtcblxuICAgIHZhciBGVU5DVElPTlMgPSB7XG4gICAgICB0b2FzdDogdG9hc3RcbiAgICB9O1xuICAgIHJldHVybiBGVU5DVElPTlM7XG5cbiAgICAvLyB0b2FzdCBwb3B1cCB3aXRoIGN1c3RvbSBtc2dcbiAgICAvLyBpbmZvOmJsdWUgc3VjY2VzczpncmVlbiBlcnJvcjpyZWQgd2FybmluZzpvcmFuZ2VcbiAgICBmdW5jdGlvbiB0b2FzdCgpIHtcbiAgICAgIHJldHVybiB0b2FzdHI7XG4gICAgfVxuICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVuY3Rpb25zLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2VydmljZXMubW9kdWxlXCIsIFtcImZ1bmN0aW9ucy5mYWN0b3J5XCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2aWNlcy5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwidXNlci5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiVXNlclwiLCBVc2VyKTtcblxuXHRmdW5jdGlvbiBVc2VyKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLnVzZXJzKTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuZmFjdG9yeS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdzaGFyZWQubW9kdWxlJywgWydzZXJ2aWNlcy5tb2R1bGUnLCAnZGlyZWN0aXZlcy5tb2R1bGUnLCAnbGF5b3V0Lm1vZHVsZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFyZWQubW9kdWxlLmpzLm1hcFxuIl19
