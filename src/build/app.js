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

	function config($urlRouterProvider, $locationProvider, $stateProvider) {
		console.log('app.routes function started');
		var BASE_PATH = 'app/components';

		$locationProvider.html5Mode(false);
		$urlRouterProvider.otherwise('/dashboard');
		$stateProvider.state('main', {
			url: '',
			abstract: true,
			templateUrl: BASE_PATH + '/main/main.view.html',
			controller: 'MainController',
			controllerAs: 'vm',
			resolve: {
				// controller will not be loaded until $requireSignIn resolves
				// Auth refers to our $firebaseAuth wrapper in the factory below
				"currentAuth": ["Auth", function (Auth) {
					// $requireSignIn returns a promise so the resolve waits for it to complete
					// If the promise is rejected, it will throw a $stateChangeError (see above)
					return Auth.$requireSignIn();
				}]
			}
		}).state('main.dashboard', {
			url: '/dashboard',
			templateUrl: BASE_PATH + '/dashboard/dashboard.view.html',
			controller: 'DashboardController',
			controllerAs: 'vm'
		});
	}
})();


},{}],3:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("add-advertisment.controller", []).controller("AddAdvertismentController", AddAdvertismentController);

	function AddAdvertismentController(AdvertismentService, UserService, Functions, $timeout, $location) {
		var vm = this;
		this._fs = Functions;
	}
})();


},{}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("advertisment.controller", []).controller("AdvertismentController", AdvertismentController);

	function AdvertismentController() {
		var vm = this;
		console.log('add control');
	}
})();


},{}],6:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('advertisment.module', ['advertisment.routes', 'advertisment.controller', 'overview-advertisment.controller', 'add-advertisment.controller', 'advertisment.service']);
})();


},{}],7:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("advertisment.routes", []).config(config);

	function config($stateProvider) {
		console.log('advertisment config function started');

		var ADVERTISMENT_PATH = 'app/components/advertisment';

		$stateProvider.state('advertisment', {
			url: '/advertisment',
			abstract: true,
			templateUrl: ADVERTISMENT_PATH + '/advertisment.view.html',
			controller: 'AdvertismentController',
			controllerAs: 'vm'
		}).state('advertisment.overview', {
			url: '/overview',
			templateUrl: ADVERTISMENT_PATH + '/advertisment/overview.view.html',
			controller: 'OverviewAdvertismentController',
			controllerAs: 'vm'
		}).state('advertisment.add', {
			url: '/add-advertisment',
			templateUrl: ADVERTISMENT_PATH + '/advertisment/add-advertisment.view.html',
			controller: 'AddAdvertismentController',
			controllerAs: 'vm'
		});
	}
})();


},{}],8:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("advertisment.service", []).factory("AdvertismentService", AdvertismentService);

	function AdvertismentService($firebaseRef, $firebaseArray, $firebaseObject) {
		var advertisments = $firebaseArray($firebaseRef.advertisments);

		var API = {
			getAds: getAds,
			getAd: getAd,
			updateAd: updateAd,
			deleteAd: deleteAd
		};
		return API;

		function getAds() {
			return advertisments;
		}

		function getAd(uid) {
			//return $firebaseObject($firebaseRef.advertisments.child(uid));
		}

		function updateAd(advertisment) {
			return advertisment.$save();
		}

		function deleteAd(advertisment) {
			return advertisments.$remove(advertisment);
		}
	}
})();


},{}],9:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("auth.controller", []).controller("AuthController", AuthController);

	function AuthController() {
		var vm = this;
	}
})();


},{}],10:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('auth.module', ['auth.routes', 'auth.controller', 'sign-in.controller', 'sign-up.controller', 'auth.service']);
})();


},{}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("auth.service", []).factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();


},{}],13:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("overview-advertisment.controller", []).controller("OverviewAdvertismentController", OverviewAdvertismentController);

	function OverviewAdvertismentController(AdvertismentService, $location, Functions) {
		var vm = this;
		this._fs = Functions;

		vm.title = 'Sign in to Pionear';
	}
})();


},{}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],16:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],17:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],21:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],22:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],23:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],24:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10}],25:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("auth.routes", []).config(config);

	function config($stateProvider) {
		console.log('auth config function started');

		var AUTH_PATH = 'app/components/auth';

		$stateProvider.state('auth', {
			abstract: true,
			url: '/auth',
			templateUrl: AUTH_PATH + '/auth.view.html'
		}).state('auth.signin', {
			url: '/sign-in',
			templateUrl: AUTH_PATH + '/sign-in/sign-in.view.html',
			controller: 'SignInController',
			controllerAs: 'vm'
		}).state('auth.signup', {
			url: '/sign-up',
			templateUrl: AUTH_PATH + '/sign-up/sign-up.view.html',
			controller: 'SignUpController',
			controllerAs: 'vm'
		});
	}
})();


},{}],26:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"dup":12}],27:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],28:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],29:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('components.module', ['auth.module', 'dashboard.module', 'offer.module', 'user.module', 'main.module']);
})();


},{}],30:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("dashboard.controller", []).controller("DashboardController", DashboardController);

	function DashboardController() {
		var vm = this;
	}
})();


},{}],31:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("dashboard.module", ["dashboard.controller"]);
})();


},{}],32:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("main.controller", []).controller("MainController", MainController);

	function MainController() {
		var vm = this;
	}
})();


},{}],33:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("main.module", ["main.controller"]);
})();


},{}],34:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],35:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],36:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],37:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],38:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("add-offer.controller", []).controller("AddOfferController", AddOfferController);

	function AddOfferController(OfferService, Functions, $scope, $timeout, $location) {
		var vm = this;
		this._fs = Functions;

		// viewmodel variables
		vm.newOffer;

		// functions
		vm.addOffer = addOffer;
		$scope.setFile = setFile;

		/**
   * set file to preview uploaded img
   * @param element
   */
		function setFile(element) {
			vm.currentFile = element.files[0]; // set uploaded img as currentFile
			var reader = new FileReader();
			// triggerd when file is read
			reader.onload = function (event) {
				vm.image_source = event.target.result;
				$scope.$apply();
			};
			reader.readAsDataURL(element.files[0]); // when the file is read, it triggers the onload event above.
		}

		/**
   * add an offer to the database
   * @trigger (ng-submit)
   */
		function addOffer() {
			OfferService.addOffer(vm.newOffer).then(console.log(vm.newOffer)).then(this._fs.toast().success("Added new offer " + vm.newOffer.name)).then(vm.newOffer = {});
		}
	}
})();


},{}],39:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],42:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],43:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("offer.controller", []).controller("OfferController", OfferController);

	function OfferController() {
		var vm = this;
		console.log('offer control');
	}
})();


},{}],44:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('offer.module', ['offer.routes', 'offer.controller', 'overview-offer.controller', 'add-offer.controller', 'offer.service']);
})();


},{}],45:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("offer.routes", []).config(config);

	function config($stateProvider) {
		console.log('offer config function started');

		var OFFER_PATH = 'app/components/offer';

		$stateProvider.state('main.offer', {
			url: '/offer',
			abstract: true,
			templateUrl: OFFER_PATH + '/offer.view.html',
			controller: 'OfferController',
			controllerAs: 'vm'
		}).state('main.offer.overview', {
			url: '/overview',
			templateUrl: OFFER_PATH + '/overview/overview.view.html',
			controller: 'OverviewOfferController',
			controllerAs: 'vm'
		}).state('main.offer.add', {
			url: '/add-offer',
			templateUrl: OFFER_PATH + '/add-offer/add-offer.view.html',
			controller: 'AddOfferController',
			controllerAs: 'vm'
		});
	}
})();


},{}],46:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("offer.service", []).factory("OfferService", OfferService);

	function OfferService($firebaseRef, $firebaseArray, $firebaseObject) {
		var offers = $firebaseArray($firebaseRef.offers);

		var API = {
			addOffer: addOffer,
			getOffers: getOffers,
			getOffer: getOffer,
			updateOffer: updateOffer,
			deleteOffer: deleteOffer
		};
		return API;

		function addOffer(offer) {
			return offers.$add({
				name: offer.name
			});
		}

		function getOffers() {
			return offers;
		}

		function getOffer(offer) {
			return $firebaseObject($firebaseRef.offers.child(offer.$id));
		}

		function updateOffer(offer) {
			return offer.$save();
		}

		function deleteOffer(offer) {
			return offers.$remove(offer);
		}
	}
})();


},{}],47:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("overview-offer.controller", []).controller("OverviewOfferController", OverviewOfferController);

	function OverviewOfferController(OfferService, $location, Functions) {
		var vm = this;
		this._fs = Functions;

		vm.title = 'Sign in to Pionear';
	}
})();


},{}],48:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.controller", []).controller("UserController", UserController);

	function UserController() {
		var vm = this;
	}
})();


},{}],49:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('user.module', ['user.controller', 'user.service']);
})();


},{}],50:[function(require,module,exports){
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


},{}],51:[function(require,module,exports){
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
			users: CONFIG.databaseURL + '/users',
			offers: CONFIG.databaseURL + '/offers'
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


},{}],52:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("core.controller", []).controller("CoreController", CoreController);

	function CoreController(Auth, UserService, Functions, $rootScope) {
		var vm = this;
		this._fs = Functions;

		vm.isToggled = false;

		vm.toggleSidebarParent = toggleSidebarParent;
		vm.signOut = signOut;

		Auth.$onAuthStateChanged(function (user) {
			if (user) vm.currentUser = UserService.getUser(user.uid);
		});

		function signOut() {
			Auth.$signOut().then(this._fs.toast().success('You are signed out.'));
		}

		function toggleSidebarParent() {
			vm.isToggled = !vm.isToggled;
		}
	}
})();


},{}],53:[function(require,module,exports){
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


},{}],54:[function(require,module,exports){
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


},{}],55:[function(require,module,exports){
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


},{}],56:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('directives.module', ['loading.directive', 'page-header.directive']);
})();


},{}],57:[function(require,module,exports){
"use strict";


},{}],58:[function(require,module,exports){
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


},{}],59:[function(require,module,exports){
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


},{}],60:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("page-header.directive", []).directive("pageHeader", function () {
		return {
			restrict: 'E',
			scope: {
				data: '=',
				title: '@',
				toggle: '&'
			},
			controller: function controller($scope) {
				$scope.toggleValue = false;
				$scope.toggleSidebarInside = function () {
					$scope.toggleValue = !$scope.toggleValue;
					$scope.toggle();
				};
			},
			templateUrl: 'app/shared/directives/page-header/page-header.template.html'
		};
	});
})();


},{}],61:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("layout.module", ["sidebar.controller"]);
})();


},{}],62:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("sidebar.controller", []).controller("SidebarController", SidebarController);

	function SidebarController($location, Auth) {
		var vm = this;

		vm.signOut = signOut;

		function signOut() {
			console.log('signout');
			Auth.$signOut().then(this._fs.toast().success('You are signed out.'));
		}
	}
})();


},{}],63:[function(require,module,exports){
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


},{}],64:[function(require,module,exports){
'use strict';

(function () {
  angular.module("nav.module", ["nav.controller"]);
})();


},{}],65:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("auth.factory", []).factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();


},{}],66:[function(require,module,exports){
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


},{}],67:[function(require,module,exports){
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


},{}],68:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("services.module", ["functions.factory"]);
})();


},{}],69:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.factory", []).factory("User", User);

	function User($firebaseRef, $firebaseArray, $firebaseObject) {
		return $firebaseObject($firebaseRef.users);
	}
})();


},{}],70:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('shared.module', ['services.module', 'directives.module', 'layout.module']);
})();


},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5yb3V0ZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZGQtYWR2ZXJ0aXNtZW50L2FkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkZC1hZHZlcnRpc21lbnQvc2lnbi11cC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZHZlcnRpc21lbnQubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkdmVydGlzbWVudC5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hdXRoLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2F1dGguc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L292ZXJ2aWV3L292ZXJ2aWV3LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9vdmVydmlldy9zaWduLWluLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9jb21wb25lbnRzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvZGFzaGJvYXJkL21haW4uY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvbWFpbi5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvYWRkLW9mZmVyL2FkZC1vZmZlci5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL29mZmVyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb2ZmZXIubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL29mZmVyLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9vZmZlci9vZmZlci5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL292ZXJ2aWV3L292ZXJ2aWV3LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy91c2VyL3VzZXIuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29uZmlnLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb3JlL2NvcmUuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLm1vZHVsZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2JvZHktY2xhc3Nlcy9ib2R5LWNsYXNzZXMuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9kaXJlY3RpdmVzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvZXhhbXBsZS5kZXJlY3RpdmUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2V4YW1wbGUuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9sb2FkaW5nL2xvYWRpbmcuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5kaXJlY3RpdmUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9sYXlvdXQvbGF5b3V0Lm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2xheW91dC9zaWRlYmFyL3NpZGViYXIuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL25hdmlnYXRpb24vbmF2LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9uYXZpZ2F0aW9uL25hdi5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9mdW5jdGlvbnMuZmFjdG9yeS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL2Z1bmN0aW9ucy5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvdXNlci5mYWN0b3J5LmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2hhcmVkLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAnLCBbXG5cdC8vXHRUaGlyZCBQYXJ0eSBNb2R1bGVzXG5cdCd1aS5yb3V0ZXInLCAnZmlyZWJhc2UnLCAndG9hc3RyJyxcblx0Ly9cdE15IE1vZHVsZXNcblx0J2NvbXBvbmVudHMubW9kdWxlJywgJ3NoYXJlZC5tb2R1bGUnLCAnY29yZS5tb2R1bGUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLm1vZHVsZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibXlBcHBcIikuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FwcC5yb3V0ZXMgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXHRcdHZhciBCQVNFX1BBVEggPSAnYXBwL2NvbXBvbmVudHMnO1xuXG5cdFx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblx0XHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvZGFzaGJvYXJkJyk7XG5cdFx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21haW4nLCB7XG5cdFx0XHR1cmw6ICcnLFxuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQkFTRV9QQVRIICsgJy9tYWluL21haW4udmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bScsXG5cdFx0XHRyZXNvbHZlOiB7XG5cdFx0XHRcdC8vIGNvbnRyb2xsZXIgd2lsbCBub3QgYmUgbG9hZGVkIHVudGlsICRyZXF1aXJlU2lnbkluIHJlc29sdmVzXG5cdFx0XHRcdC8vIEF1dGggcmVmZXJzIHRvIG91ciAkZmlyZWJhc2VBdXRoIHdyYXBwZXIgaW4gdGhlIGZhY3RvcnkgYmVsb3dcblx0XHRcdFx0XCJjdXJyZW50QXV0aFwiOiBbXCJBdXRoXCIsIGZ1bmN0aW9uIChBdXRoKSB7XG5cdFx0XHRcdFx0Ly8gJHJlcXVpcmVTaWduSW4gcmV0dXJucyBhIHByb21pc2Ugc28gdGhlIHJlc29sdmUgd2FpdHMgZm9yIGl0IHRvIGNvbXBsZXRlXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQsIGl0IHdpbGwgdGhyb3cgYSAkc3RhdGVDaGFuZ2VFcnJvciAoc2VlIGFib3ZlKVxuXHRcdFx0XHRcdHJldHVybiBBdXRoLiRyZXF1aXJlU2lnbkluKCk7XG5cdFx0XHRcdH1dXG5cdFx0XHR9XG5cdFx0fSkuc3RhdGUoJ21haW4uZGFzaGJvYXJkJywge1xuXHRcdFx0dXJsOiAnL2Rhc2hib2FyZCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQkFTRV9QQVRIICsgJy9kYXNoYm9hcmQvZGFzaGJvYXJkLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnRGFzaGJvYXJkQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhZGQtYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBZGRBZHZlcnRpc21lbnRDb250cm9sbGVyXCIsIEFkZEFkdmVydGlzbWVudENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIEFkZEFkdmVydGlzbWVudENvbnRyb2xsZXIoQWR2ZXJ0aXNtZW50U2VydmljZSwgVXNlclNlcnZpY2UsIEZ1bmN0aW9ucywgJHRpbWVvdXQsICRsb2NhdGlvbikge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGQtYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaWduLXVwLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJTaWduVXBDb250cm9sbGVyXCIsIFNpZ25VcENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFNpZ25VcENvbnRyb2xsZXIoQXV0aCwgVXNlclNlcnZpY2UsIEZ1bmN0aW9ucywgJHRpbWVvdXQsICRsb2NhdGlvbikge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS50aXRsZSA9ICdTaWduIHVwIGZvciBQaW9uZWFyJztcblxuXHRcdHZtLnNpZ25VcCA9IHNpZ25VcDtcblxuXHRcdGZ1bmN0aW9uIHNpZ25VcChjcmVkZW50aWFscykge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdFx0QXV0aC4kY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGNyZWRlbnRpYWxzLmVtYWlsLCBjcmVkZW50aWFscy5wYXNzKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRcdHZhciBuZXdVc2VyID0gVXNlclNlcnZpY2UuZ2V0VXNlcih1c2VyLnVpZCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGNyZWRlbnRpYWxzKTtcblx0XHRcdFx0bmV3VXNlci5lbWFpbCA9IHVzZXIuZW1haWw7XG5cdFx0XHRcdG5ld1VzZXIubmFtZSA9IGNyZWRlbnRpYWxzLm5hbWU7XG5cdFx0XHRcdG5ld1VzZXIuY29tcGFueSA9IGNyZWRlbnRpYWxzLmNvbXBhbnk7XG5cdFx0XHRcdG5ld1VzZXIuYWRkcmVzcyA9IGNyZWRlbnRpYWxzLmFkZHJlc3M7XG5cdFx0XHRcdG5ld1VzZXIuemlwY29kZSA9IGNyZWRlbnRpYWxzLnppcGNvZGU7XG5cdFx0XHRcdG5ld1VzZXIucGhvbmUgPSBjcmVkZW50aWFscy5waG9uZTtcblx0XHRcdFx0bmV3VXNlci5sYW5kID0gY3JlZGVudGlhbHMubGFuZDtcblx0XHRcdFx0bmV3VXNlci4kc2F2ZSgpLnRoZW4oX3RoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcygnU2lnbmVkIHVwIHN1Y2Nlc3NmdWxseSEnKSkudGhlbigkbG9jYXRpb24ucGF0aCgnLycpKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRfdGhpcy5fZnMudG9hc3QoKS5lcnJvcihlcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yOiBcIiwgZXJyb3IpO1xuXHRcdFx0XHR2bS5lcnJvciA9IGVycm9yLm1lc3NhZ2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaWduLXVwLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBZHZlcnRpc21lbnRDb250cm9sbGVyXCIsIEFkdmVydGlzbWVudENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIEFkdmVydGlzbWVudENvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHRjb25zb2xlLmxvZygnYWRkIGNvbnRyb2wnKTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkdmVydGlzbWVudC5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FkdmVydGlzbWVudC5tb2R1bGUnLCBbJ2FkdmVydGlzbWVudC5yb3V0ZXMnLCAnYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXInLCAnb3ZlcnZpZXctYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXInLCAnYWRkLWFkdmVydGlzbWVudC5jb250cm9sbGVyJywgJ2FkdmVydGlzbWVudC5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkdmVydGlzbWVudC5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImFkdmVydGlzbWVudC5yb3V0ZXNcIiwgW10pLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdhZHZlcnRpc21lbnQgY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBRFZFUlRJU01FTlRfUEFUSCA9ICdhcHAvY29tcG9uZW50cy9hZHZlcnRpc21lbnQnO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2FkdmVydGlzbWVudCcsIHtcblx0XHRcdHVybDogJy9hZHZlcnRpc21lbnQnLFxuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQURWRVJUSVNNRU5UX1BBVEggKyAnL2FkdmVydGlzbWVudC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0FkdmVydGlzbWVudENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ2FkdmVydGlzbWVudC5vdmVydmlldycsIHtcblx0XHRcdHVybDogJy9vdmVydmlldycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQURWRVJUSVNNRU5UX1BBVEggKyAnL2FkdmVydGlzbWVudC9vdmVydmlldy52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ092ZXJ2aWV3QWR2ZXJ0aXNtZW50Q29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnYWR2ZXJ0aXNtZW50LmFkZCcsIHtcblx0XHRcdHVybDogJy9hZGQtYWR2ZXJ0aXNtZW50Jyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBRFZFUlRJU01FTlRfUEFUSCArICcvYWR2ZXJ0aXNtZW50L2FkZC1hZHZlcnRpc21lbnQudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZGRBZHZlcnRpc21lbnRDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWR2ZXJ0aXNtZW50LnJvdXRlcy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhZHZlcnRpc21lbnQuc2VydmljZVwiLCBbXSkuZmFjdG9yeShcIkFkdmVydGlzbWVudFNlcnZpY2VcIiwgQWR2ZXJ0aXNtZW50U2VydmljZSk7XG5cblx0ZnVuY3Rpb24gQWR2ZXJ0aXNtZW50U2VydmljZSgkZmlyZWJhc2VSZWYsICRmaXJlYmFzZUFycmF5LCAkZmlyZWJhc2VPYmplY3QpIHtcblx0XHR2YXIgYWR2ZXJ0aXNtZW50cyA9ICRmaXJlYmFzZUFycmF5KCRmaXJlYmFzZVJlZi5hZHZlcnRpc21lbnRzKTtcblxuXHRcdHZhciBBUEkgPSB7XG5cdFx0XHRnZXRBZHM6IGdldEFkcyxcblx0XHRcdGdldEFkOiBnZXRBZCxcblx0XHRcdHVwZGF0ZUFkOiB1cGRhdGVBZCxcblx0XHRcdGRlbGV0ZUFkOiBkZWxldGVBZFxuXHRcdH07XG5cdFx0cmV0dXJuIEFQSTtcblxuXHRcdGZ1bmN0aW9uIGdldEFkcygpIHtcblx0XHRcdHJldHVybiBhZHZlcnRpc21lbnRzO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldEFkKHVpZCkge1xuXHRcdFx0Ly9yZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi5hZHZlcnRpc21lbnRzLmNoaWxkKHVpZCkpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZUFkKGFkdmVydGlzbWVudCkge1xuXHRcdFx0cmV0dXJuIGFkdmVydGlzbWVudC4kc2F2ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZUFkKGFkdmVydGlzbWVudCkge1xuXHRcdFx0cmV0dXJuIGFkdmVydGlzbWVudHMuJHJlbW92ZShhZHZlcnRpc21lbnQpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkdmVydGlzbWVudC5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImF1dGguY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIkF1dGhDb250cm9sbGVyXCIsIEF1dGhDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBdXRoQ29udHJvbGxlcigpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2F1dGgubW9kdWxlJywgWydhdXRoLnJvdXRlcycsICdhdXRoLmNvbnRyb2xsZXInLCAnc2lnbi1pbi5jb250cm9sbGVyJywgJ3NpZ24tdXAuY29udHJvbGxlcicsICdhdXRoLnNlcnZpY2UnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImF1dGgucm91dGVzXCIsIFtdKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnYXV0aCBjb25maWcgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXG5cdFx0dmFyIEFVVEhfVVJMID0gJ2FwcC9jb21wb25lbnRzL2F1dGgnO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2F1dGgnLCB7XG5cdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdHVybDogJy9hdXRoJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1VSTCArICcvYXV0aC52aWV3Lmh0bWwnXG5cdFx0fSkuc3RhdGUoJ2F1dGguc2lnbmluJywge1xuXHRcdFx0dXJsOiAnL3NpZ24taW4nLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfVVJMICsgJy9zaWduLWluL3NpZ24taW4udmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTaWduSW5Db250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdhdXRoLnNpZ251cCcsIHtcblx0XHRcdHVybDogJy9zaWduLXVwJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1VSTCArICcvc2lnbi11cC9zaWduLXVwLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnU2lnblVwQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0XHQvL2NvbnN0IGNvbmZpZyA9IHtcblx0XHQvL1x0YXBpS2V5OiAgICAgICAgICAgIFwiQUl6YVN5Q3BIVXAzTjlpdXdPMkJFLUFianIwQy1sRTFtNDI0bEJJXCIsXG5cdFx0Ly9cdGF1dGhEb21haW46ICAgICAgICBcInphcHppdGUtYjQ3ZjkuZmlyZWJhc2VhcHAuY29tXCIsXG5cdFx0Ly9cdGRhdGFiYXNlVVJMOiAgICAgICBcImh0dHBzOi8vemFweml0ZS1iNDdmOS5maXJlYmFzZWlvLmNvbVwiLFxuXHRcdC8vXHRzdG9yYWdlQnVja2V0OiAgICAgXCJ6YXB6aXRlLWI0N2Y5LmFwcHNwb3QuY29tXCIsXG5cdFx0Ly9cdG1lc3NhZ2luZ1NlbmRlcklkOiBcIjU1NDU4NTU0Nzg0OFwiXG5cdFx0Ly99O1xuXHRcdC8vZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuXHRcdC8vXG5cdFx0Ly8kZmlyZWJhc2VSZWZQcm92aWRlci5yZWdpc3RlclVybCh7XG5cdFx0Ly9cdGRlZmF1bHQ6ICAgIGNvbmZpZy5kYXRhYmFzZVVSTCxcblx0XHQvL1x0Y2F0ZWdvcmllczogYCR7Y29uZmlnLmRhdGFiYXNlVVJMfS9jYXRlZ29yaWVzYCxcblx0XHQvL1x0c2l0ZXM6ICAgICAgYCR7Y29uZmlnLmRhdGFiYXNlVVJMfS9zaXRlc2AsXG5cdFx0Ly9cdHVzZXJzOiAgICAgIGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vdXNlcnNgXG5cdFx0Ly99KTtcblx0XHQvL1xuXHRcdC8vJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXHRcdC8vJHN0YXRlUHJvdmlkZXJcblx0XHQvL1x0XHQuc3RhdGUoJ21haW4nLCB7XG5cdFx0Ly9cdFx0XHR1cmw6ICcvJyxcblx0XHQvL1x0XHRcdHRlbXBsYXRlVXJsOiBgJHtCQVNFX1VSTH0vbWFpbi9tYWluLnZpZXcuaHRtbGAsXG5cdFx0Ly9cdFx0XHRjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuXHRcdC8vICAgICAgY29udHJvbGxlckFzOiAndm0nXG5cdFx0Ly9cdFx0fSk7XG5cdFx0Ly8uc3RhdGUoJ2Fib3V0Jywge1xuXHRcdC8vXHR1cmw6ICcvYWJvdXQnLFxuXHRcdC8vXHR0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuXHRcdC8vXHRjb250cm9sbGVyOiAnYWJvdXRDdHJsJ1xuXHRcdC8vfSlcblx0XHQvLy5zdGF0ZSgnY29udGFjdCcsIHtcblx0XHQvL1x0dXJsOiAnL2NvbnRhY3QnLFxuXHRcdC8vXHR0ZW1wbGF0ZVVybDogJ2NvbnRhY3QuaHRtbCdcblx0XHQvL30pXG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLnJvdXRlcy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJBdXRoXCIsIEF1dGgpO1xuXG5cdGZ1bmN0aW9uIEF1dGgoJGZpcmViYXNlQXV0aCkge1xuXHRcdHJldHVybiAkZmlyZWJhc2VBdXRoKCk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvdmVydmlldy1hZHZlcnRpc21lbnQuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk92ZXJ2aWV3QWR2ZXJ0aXNtZW50Q29udHJvbGxlclwiLCBPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE92ZXJ2aWV3QWR2ZXJ0aXNtZW50Q29udHJvbGxlcihBZHZlcnRpc21lbnRTZXJ2aWNlLCAkbG9jYXRpb24sIEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS50aXRsZSA9ICdTaWduIGluIHRvIFBpb25lYXInO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b3ZlcnZpZXcuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcInNpZ24taW4uY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlNpZ25JbkNvbnRyb2xsZXJcIiwgU2lnbkluQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gU2lnbkluQ29udHJvbGxlcihBdXRoLCAkbG9jYXRpb24sIEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS50aXRsZSA9ICdTaWduIGluIHRvIFBpb25lYXInO1xuXHRcdHZtLmxvYWRpbmcgPSB0cnVlO1xuXG5cdFx0dm0uc2lnbkluID0gc2lnbkluO1xuXG5cdFx0QXV0aC4kb25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRpZiAodXNlcikgJGxvY2F0aW9uLnBhdGgoJy8nKTtcblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIHNpZ25JbihjcmVkZW50aWFscykge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdFx0dm0ubG9hZGluZyA9IHRydWU7XG5cdFx0XHRBdXRoLiRzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzcykudGhlbihmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHRfdGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKFwiU2lnbmVkIGluIGFzIFwiICsgdXNlci5lbWFpbCk7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvZGFzaGJvYXJkJyk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkF1dGhlbnRpY2F0aW9uIGZhaWxlZDpcIiwgZXJyb3IpO1xuXHRcdFx0XHRfdGhpcy5fZnMudG9hc3QoKS5lcnJvcihlcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0dm0uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0XHR2bS5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaWduLWluLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImF1dGgucm91dGVzXCIsIFtdKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnYXV0aCBjb25maWcgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXG5cdFx0dmFyIEFVVEhfUEFUSCA9ICdhcHAvY29tcG9uZW50cy9hdXRoJztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhdXRoJywge1xuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR1cmw6ICcvYXV0aCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9QQVRIICsgJy9hdXRoLnZpZXcuaHRtbCdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWduaW4nLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi1pbicsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9QQVRIICsgJy9zaWduLWluL3NpZ24taW4udmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTaWduSW5Db250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdhdXRoLnNpZ251cCcsIHtcblx0XHRcdHVybDogJy9zaWduLXVwJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1BBVEggKyAnL3NpZ24tdXAvc2lnbi11cC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1NpZ25VcENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLnJvdXRlcy5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdjb21wb25lbnRzLm1vZHVsZScsIFsnYXV0aC5tb2R1bGUnLCAnZGFzaGJvYXJkLm1vZHVsZScsICdvZmZlci5tb2R1bGUnLCAndXNlci5tb2R1bGUnLCAnbWFpbi5tb2R1bGUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50cy5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiZGFzaGJvYXJkLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJEYXNoYm9hcmRDb250cm9sbGVyXCIsIERhc2hib2FyZENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIERhc2hib2FyZENvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhc2hib2FyZC5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImRhc2hib2FyZC5tb2R1bGVcIiwgW1wiZGFzaGJvYXJkLmNvbnRyb2xsZXJcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhc2hib2FyZC5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibWFpbi5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiTWFpbkNvbnRyb2xsZXJcIiwgTWFpbkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibWFpbi5tb2R1bGVcIiwgW1wibWFpbi5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcImFkZC1vZmZlci5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQWRkT2ZmZXJDb250cm9sbGVyXCIsIEFkZE9mZmVyQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQWRkT2ZmZXJDb250cm9sbGVyKE9mZmVyU2VydmljZSwgRnVuY3Rpb25zLCAkc2NvcGUsICR0aW1lb3V0LCAkbG9jYXRpb24pIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0Ly8gdmlld21vZGVsIHZhcmlhYmxlc1xuXHRcdHZtLm5ld09mZmVyO1xuXG5cdFx0Ly8gZnVuY3Rpb25zXG5cdFx0dm0uYWRkT2ZmZXIgPSBhZGRPZmZlcjtcblx0XHQkc2NvcGUuc2V0RmlsZSA9IHNldEZpbGU7XG5cblx0XHQvKipcclxuICAgKiBzZXQgZmlsZSB0byBwcmV2aWV3IHVwbG9hZGVkIGltZ1xyXG4gICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICovXG5cdFx0ZnVuY3Rpb24gc2V0RmlsZShlbGVtZW50KSB7XG5cdFx0XHR2bS5jdXJyZW50RmlsZSA9IGVsZW1lbnQuZmlsZXNbMF07IC8vIHNldCB1cGxvYWRlZCBpbWcgYXMgY3VycmVudEZpbGVcblx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0Ly8gdHJpZ2dlcmQgd2hlbiBmaWxlIGlzIHJlYWRcblx0XHRcdHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0dm0uaW1hZ2Vfc291cmNlID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblx0XHRcdFx0JHNjb3BlLiRhcHBseSgpO1xuXHRcdFx0fTtcblx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGVsZW1lbnQuZmlsZXNbMF0pOyAvLyB3aGVuIHRoZSBmaWxlIGlzIHJlYWQsIGl0IHRyaWdnZXJzIHRoZSBvbmxvYWQgZXZlbnQgYWJvdmUuXG5cdFx0fVxuXG5cdFx0LyoqXHJcbiAgICogYWRkIGFuIG9mZmVyIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAqIEB0cmlnZ2VyIChuZy1zdWJtaXQpXHJcbiAgICovXG5cdFx0ZnVuY3Rpb24gYWRkT2ZmZXIoKSB7XG5cdFx0XHRPZmZlclNlcnZpY2UuYWRkT2ZmZXIodm0ubmV3T2ZmZXIpLnRoZW4oY29uc29sZS5sb2codm0ubmV3T2ZmZXIpKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIkFkZGVkIG5ldyBvZmZlciBcIiArIHZtLm5ld09mZmVyLm5hbWUpKS50aGVuKHZtLm5ld09mZmVyID0ge30pO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZC1vZmZlci5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPZmZlckNvbnRyb2xsZXJcIiwgT2ZmZXJDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBPZmZlckNvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHRjb25zb2xlLmxvZygnb2ZmZXIgY29udHJvbCcpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdvZmZlci5tb2R1bGUnLCBbJ29mZmVyLnJvdXRlcycsICdvZmZlci5jb250cm9sbGVyJywgJ292ZXJ2aWV3LW9mZmVyLmNvbnRyb2xsZXInLCAnYWRkLW9mZmVyLmNvbnRyb2xsZXInLCAnb2ZmZXIuc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZmZlci5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ29mZmVyIGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgT0ZGRVJfUEFUSCA9ICdhcHAvY29tcG9uZW50cy9vZmZlcic7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbi5vZmZlcicsIHtcblx0XHRcdHVybDogJy9vZmZlcicsXG5cdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdHRlbXBsYXRlVXJsOiBPRkZFUl9QQVRIICsgJy9vZmZlci52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ09mZmVyQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnbWFpbi5vZmZlci5vdmVydmlldycsIHtcblx0XHRcdHVybDogJy9vdmVydmlldycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogT0ZGRVJfUEFUSCArICcvb3ZlcnZpZXcvb3ZlcnZpZXcudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPdmVydmlld09mZmVyQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnbWFpbi5vZmZlci5hZGQnLCB7XG5cdFx0XHR1cmw6ICcvYWRkLW9mZmVyJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBPRkZFUl9QQVRIICsgJy9hZGQtb2ZmZXIvYWRkLW9mZmVyLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkT2ZmZXJDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJPZmZlclNlcnZpY2VcIiwgT2ZmZXJTZXJ2aWNlKTtcblxuXHRmdW5jdGlvbiBPZmZlclNlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIG9mZmVycyA9ICRmaXJlYmFzZUFycmF5KCRmaXJlYmFzZVJlZi5vZmZlcnMpO1xuXG5cdFx0dmFyIEFQSSA9IHtcblx0XHRcdGFkZE9mZmVyOiBhZGRPZmZlcixcblx0XHRcdGdldE9mZmVyczogZ2V0T2ZmZXJzLFxuXHRcdFx0Z2V0T2ZmZXI6IGdldE9mZmVyLFxuXHRcdFx0dXBkYXRlT2ZmZXI6IHVwZGF0ZU9mZmVyLFxuXHRcdFx0ZGVsZXRlT2ZmZXI6IGRlbGV0ZU9mZmVyXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gYWRkT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlcnMuJGFkZCh7XG5cdFx0XHRcdG5hbWU6IG9mZmVyLm5hbWVcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldE9mZmVycygpIHtcblx0XHRcdHJldHVybiBvZmZlcnM7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0T2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLm9mZmVycy5jaGlsZChvZmZlci4kaWQpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVPZmZlcihvZmZlcikge1xuXHRcdFx0cmV0dXJuIG9mZmVyLiRzYXZlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlcnMuJHJlbW92ZShvZmZlcik7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIuc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcIm92ZXJ2aWV3LW9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPdmVydmlld09mZmVyQ29udHJvbGxlclwiLCBPdmVydmlld09mZmVyQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXIoT2ZmZXJTZXJ2aWNlLCAkbG9jYXRpb24sIEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS50aXRsZSA9ICdTaWduIGluIHRvIFBpb25lYXInO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b3ZlcnZpZXcuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ1c2VyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJVc2VyQ29udHJvbGxlclwiLCBVc2VyQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gVXNlckNvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCd1c2VyLm1vZHVsZScsIFsndXNlci5jb250cm9sbGVyJywgJ3VzZXIuc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ1c2VyLnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJVc2VyU2VydmljZVwiLCBVc2VyU2VydmljZSk7XG5cblx0ZnVuY3Rpb24gVXNlclNlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIHVzZXJzID0gJGZpcmViYXNlQXJyYXkoJGZpcmViYXNlUmVmLnVzZXJzKTtcblxuXHRcdHZhciBBUEkgPSB7XG5cdFx0XHRnZXRVc2VyczogZ2V0VXNlcnMsXG5cdFx0XHRnZXRVc2VyOiBnZXRVc2VyLFxuXHRcdFx0dXBkYXRlVXNlcjogdXBkYXRlVXNlcixcblx0XHRcdGRlbGV0ZVVzZXI6IGRlbGV0ZVVzZXJcblx0XHR9O1xuXHRcdHJldHVybiBBUEk7XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VycygpIHtcblx0XHRcdHJldHVybiB1c2Vycztcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRVc2VyKHVpZCkge1xuXHRcdFx0cmV0dXJuICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYudXNlcnMuY2hpbGQodWlkKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VyKSB7XG5cdFx0XHRyZXR1cm4gdXNlci4kc2F2ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZVVzZXIodXNlcikge1xuXHRcdFx0cmV0dXJuIHVzZXJzLiRyZW1vdmUodXNlcik7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci5zZXJ2aWNlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJteUFwcFwiKS5jb25maWcoY29uZmlnKS5ydW4ocnVuKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJGZpcmViYXNlUmVmUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgRmlyZWJhc2Vcblx0XHR2YXIgQ09ORklHID0ge1xuXHRcdFx0YXBpS2V5OiBcIkFJemFTeURzcF9vQk04bFBPbkVHVm5CeWpzb2ZHdzdLcGZ0emZlOFwiLFxuXHRcdFx0YXV0aERvbWFpbjogXCJwaW9uZWFyLWQwNzBlLmZpcmViYXNlYXBwLmNvbVwiLFxuXHRcdFx0ZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9waW9uZWFyLWQwNzBlLmZpcmViYXNlaW8uY29tXCIsXG5cdFx0XHRzdG9yYWdlQnVja2V0OiBcInBpb25lYXItZDA3MGUuYXBwc3BvdC5jb21cIixcblx0XHRcdG1lc3NhZ2luZ1NlbmRlcklkOiBcIjk2NzQwNTg2MjUxXCJcblx0XHR9O1xuXHRcdGZpcmViYXNlLmluaXRpYWxpemVBcHAoQ09ORklHKTtcblxuXHRcdCRmaXJlYmFzZVJlZlByb3ZpZGVyLnJlZ2lzdGVyVXJsKHtcblx0XHRcdGRlZmF1bHQ6IENPTkZJRy5kYXRhYmFzZVVSTCxcblx0XHRcdHVzZXJzOiBDT05GSUcuZGF0YWJhc2VVUkwgKyAnL3VzZXJzJyxcblx0XHRcdG9mZmVyczogQ09ORklHLmRhdGFiYXNlVVJMICsgJy9vZmZlcnMnXG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBydW4oQXV0aCwgJHJvb3RTY29wZSwgJGxvY2F0aW9uLCAkc3RhdGUpIHtcblx0XHRjb25zb2xlLmxvZygncnVuIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblx0XHRjaGVja0F1dGgoKTtcblxuXHRcdCRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChuZXh0LCBjdXJyZW50KSB7XG5cdFx0XHRjaGVja0F1dGgoKTtcblx0XHR9KTtcblxuXHRcdCRyb290U2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBlcnJvcikge1xuXHRcdFx0Ly8gV2UgY2FuIGNhdGNoIHRoZSBlcnJvciB0aHJvd24gd2hlbiB0aGUgJHJlcXVpcmVTaWduSW4gcHJvbWlzZSBpcyByZWplY3RlZFxuXHRcdFx0Ly8gYW5kIHJlZGlyZWN0IHRoZSB1c2VyIGJhY2sgdG8gdGhlIGhvbWUgcGFnZVxuXHRcdFx0aWYgKGVycm9yID09PSBcIkFVVEhfUkVRVUlSRURcIikge1xuXHRcdFx0XHQkc3RhdGUuZ28oXCJob21lXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZnVuY3Rpb24gY2hlY2tBdXRoKCkge1xuXHRcdFx0QXV0aC4kb25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRcdGlmICghdXNlcikgJGxvY2F0aW9uLnBhdGgoJy9hdXRoL3NpZ24taW4nKTtcblx0XHRcdFx0Y29uc29sZS5sb2codXNlcik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImNvcmUuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIkNvcmVDb250cm9sbGVyXCIsIENvcmVDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBDb3JlQ29udHJvbGxlcihBdXRoLCBVc2VyU2VydmljZSwgRnVuY3Rpb25zLCAkcm9vdFNjb3BlKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdHZtLmlzVG9nZ2xlZCA9IGZhbHNlO1xuXG5cdFx0dm0udG9nZ2xlU2lkZWJhclBhcmVudCA9IHRvZ2dsZVNpZGViYXJQYXJlbnQ7XG5cdFx0dm0uc2lnbk91dCA9IHNpZ25PdXQ7XG5cblx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdGlmICh1c2VyKSB2bS5jdXJyZW50VXNlciA9IFVzZXJTZXJ2aWNlLmdldFVzZXIodXNlci51aWQpO1xuXHRcdH0pO1xuXG5cdFx0ZnVuY3Rpb24gc2lnbk91dCgpIHtcblx0XHRcdEF1dGguJHNpZ25PdXQoKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcygnWW91IGFyZSBzaWduZWQgb3V0LicpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0b2dnbGVTaWRlYmFyUGFyZW50KCkge1xuXHRcdFx0dm0uaXNUb2dnbGVkID0gIXZtLmlzVG9nZ2xlZDtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbi8vXG4vL2ltcG9ydCBDb3JlQ29udHJvbGxlciBmcm9tICcuL2NvcmUuY29udHJvbGxlci5qcyc7XG4vL1xuLy9leHBvcnQgZGVmYXVsdCBhbmd1bGFyXG4vL1x0XHQubW9kdWxlKCdjb3JlTW9kdWxlJywgW10pXG4vL1x0XHQuY29udHJvbGxlcignYXV0aC5jb250cm9sbGVyJywgQ29yZUNvbnRyb2xsZXIpXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnY29yZS5tb2R1bGUnLCBbJ2NvcmUuY29udHJvbGxlciddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLm1vZHVsZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuLy9cbi8vaW1wb3J0IENvcmVDb250cm9sbGVyIGZyb20gJy4vY29yZS5jb250cm9sbGVyLmpzJztcbi8vXG4vL2V4cG9ydCBkZWZhdWx0IGFuZ3VsYXJcbi8vXHRcdC5tb2R1bGUoJ2NvcmVNb2R1bGUnLCBbXSlcbi8vXHRcdC5jb250cm9sbGVyKCdhdXRoLmNvbnRyb2xsZXInLCBDb3JlQ29udHJvbGxlcilcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdjb3JlLm1vZHVsZScsIFsnY29yZS5jb250cm9sbGVyJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUubW9kdWxlcy5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdib2R5LWNsYXNzZXMuZGlyZWN0aXZlJywgW10pLmRpcmVjdGl2ZSgnYm9keUNsYXNzZXMnLCBib2R5Q2xhc3Nlcyk7XG5cblx0ZnVuY3Rpb24gYm9keUNsYXNzZXMoJHJvb3RTY29wZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdFx0c2NvcGU6IHt9LFxuXHRcdFx0bGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuXG5cdFx0XHRcdCRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XG5cdFx0XHRcdFx0dmFyIGZyb21DbGFzc25hbWVzID0gYW5ndWxhci5pc0RlZmluZWQoZnJvbVN0YXRlLmRhdGEpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKGZyb21TdGF0ZS5kYXRhLmJvZHlDbGFzc2VzKSA/IGZyb21TdGF0ZS5kYXRhLmJvZHlDbGFzc2VzIDogbnVsbDtcblx0XHRcdFx0XHR2YXIgdG9DbGFzc25hbWVzID0gYW5ndWxhci5pc0RlZmluZWQodG9TdGF0ZS5kYXRhKSAmJiBhbmd1bGFyLmlzRGVmaW5lZCh0b1N0YXRlLmRhdGEuYm9keUNsYXNzZXMpID8gdG9TdGF0ZS5kYXRhLmJvZHlDbGFzc2VzIDogbnVsbDtcblxuXHRcdFx0XHRcdC8vIGRvbid0IGRvIGFueXRoaW5nIGlmIHRoZXkgYXJlIHRoZSBzYW1lXG5cdFx0XHRcdFx0aWYgKGZyb21DbGFzc25hbWVzICE9IHRvQ2xhc3NuYW1lcykge1xuXHRcdFx0XHRcdFx0aWYgKGZyb21DbGFzc25hbWVzKSBlbGVtLnJlbW92ZUNsYXNzKGZyb21DbGFzc25hbWVzKTtcblx0XHRcdFx0XHRcdGlmICh0b0NsYXNzbmFtZXMpIGVsZW0uYWRkQ2xhc3ModG9DbGFzc25hbWVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib2R5LWNsYXNzZXMuZGlyZWN0aXZlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2RpcmVjdGl2ZXMubW9kdWxlJywgWydsb2FkaW5nLmRpcmVjdGl2ZScsICdwYWdlLWhlYWRlci5kaXJlY3RpdmUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlyZWN0aXZlcy5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4YW1wbGUuZGVyZWN0aXZlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRXhhbXBsZURpcmVjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gRXhhbXBsZURpcmVjdGl2ZSgpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXhhbXBsZURpcmVjdGl2ZSk7XG5cblx0XHR0aGlzLnRlbXBsYXRlID0gJzxkaXY+e3tjdHJsLm5hbWV9fTwvZGl2Pic7XG5cdFx0dGhpcy5yZXN0cmljdCA9ICdFJztcblx0XHR0aGlzLnNjb3BlID0ge307XG5cblx0XHR0aGlzLmNvbnRyb2xsZXIgPSBFeGFtcGxlRGlyZWN0aXZlQ29udHJvbGxlcjtcblx0XHR0aGlzLmNvbnRyb2xsZXJBcyA9ICdjdHJsJztcblx0XHR0aGlzLmJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xuXHR9XG5cblx0Ly8gRGlyZWN0aXZlIGNvbXBpbGUgZnVuY3Rpb25cblxuXG5cdF9jcmVhdGVDbGFzcyhFeGFtcGxlRGlyZWN0aXZlLCBbe1xuXHRcdGtleTogJ2NvbXBpbGUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21waWxlKCkge31cblxuXHRcdC8vIERpcmVjdGl2ZSBsaW5rIGZ1bmN0aW9uXG5cblx0fSwge1xuXHRcdGtleTogJ2xpbmsnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBsaW5rKCkge31cblx0fV0pO1xuXG5cdHJldHVybiBFeGFtcGxlRGlyZWN0aXZlO1xufSgpO1xuXG4vLyBEaXJlY3RpdmUncyBjb250cm9sbGVyXG5cblxuZXhwb3J0cy5kZWZhdWx0ID0gRXhhbXBsZURpcmVjdGl2ZTtcblxudmFyIEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyID0gZnVuY3Rpb24gRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXIoKSB7XG5cdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFeGFtcGxlRGlyZWN0aXZlQ29udHJvbGxlcik7XG5cblx0dGhpcy5uYW1lID0gJ1lhc3NpbmUnO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4YW1wbGUuZGlyZWN0aXZlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibG9hZGluZy5kaXJlY3RpdmVcIiwgW10pLmRpcmVjdGl2ZShcImxvYWRpbmdTcGlubmVyXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdGRhdGE6ICc9J1xuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlVXJsOiAnYXBwL3NoYXJlZC9kaXJlY3RpdmVzL2xvYWRpbmcuZGlyZWN0aXZlL2xvYWRpbmcudGVtcGxhdGUuaHRtbCdcblx0XHR9O1xuXHR9KTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2FkaW5nLmRpcmVjdGl2ZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcInBhZ2UtaGVhZGVyLmRpcmVjdGl2ZVwiLCBbXSkuZGlyZWN0aXZlKFwicGFnZUhlYWRlclwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRkYXRhOiAnPScsXG5cdFx0XHRcdHRpdGxlOiAnQCcsXG5cdFx0XHRcdHRvZ2dsZTogJyYnXG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlcjogZnVuY3Rpb24gY29udHJvbGxlcigkc2NvcGUpIHtcblx0XHRcdFx0JHNjb3BlLnRvZ2dsZVZhbHVlID0gZmFsc2U7XG5cdFx0XHRcdCRzY29wZS50b2dnbGVTaWRlYmFySW5zaWRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRzY29wZS50b2dnbGVWYWx1ZSA9ICEkc2NvcGUudG9nZ2xlVmFsdWU7XG5cdFx0XHRcdFx0JHNjb3BlLnRvZ2dsZSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlVXJsOiAnYXBwL3NoYXJlZC9kaXJlY3RpdmVzL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnRlbXBsYXRlLmh0bWwnXG5cdFx0fTtcblx0fSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZS1oZWFkZXIuZGlyZWN0aXZlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImxheW91dC5tb2R1bGVcIiwgW1wic2lkZWJhci5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInNpZGViYXIuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlNpZGViYXJDb250cm9sbGVyXCIsIFNpZGViYXJDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBTaWRlYmFyQ29udHJvbGxlcigkbG9jYXRpb24sIEF1dGgpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXG5cdFx0dm0uc2lnbk91dCA9IHNpZ25PdXQ7XG5cblx0XHRmdW5jdGlvbiBzaWduT3V0KCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ3NpZ25vdXQnKTtcblx0XHRcdEF1dGguJHNpZ25PdXQoKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcygnWW91IGFyZSBzaWduZWQgb3V0LicpKTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaWRlYmFyLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0YW5ndWxhci5tb2R1bGUoXCJuYXYuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk5hdkNvbnRyb2xsZXJcIiwgTmF2Q29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gTmF2Q29udHJvbGxlcigkbG9jYXRpb24sIEF1dGgsIEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dmFyIF9mcyA9IEZ1bmN0aW9ucztcblx0XHR2bS5zaWduT3V0ID0gc2lnbk91dDtcblx0XHR2bS5pc0FjdGl2ZSA9IGlzQWN0aXZlO1xuXHRcdC8vIGluaXRpYWxpemUgdmlldyBkYXRhXG5cdFx0ZnVuY3Rpb24gaW5pdCgpIHt9XG5cblx0XHRpbml0KCk7XG5cblx0XHQvL3ZtLmF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKSB7XG5cdFx0Ly9cdHZtLnVzZXIgPSB1c2VyO1xuXHRcdC8vfSk7XG5cblx0XHRmdW5jdGlvbiBzaWduT3V0KCkge1xuXHRcdFx0QXV0aC4kc2lnbk91dCgpLnRoZW4oX2ZzLnRvYXN0KCdZb3UgYXJlIHNpZ25lZCBvdXQuJykpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGlzQWN0aXZlKGRlc3RpbmF0aW9uKSB7XG5cdFx0XHRyZXR1cm4gZGVzdGluYXRpb24gPT09ICRsb2NhdGlvbi5wYXRoKCk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmF2LmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGFuZ3VsYXIubW9kdWxlKFwibmF2Lm1vZHVsZVwiLCBbXCJuYXYuY29udHJvbGxlclwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmF2Lm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJBdXRoXCIsIEF1dGgpO1xuXG5cdGZ1bmN0aW9uIEF1dGgoJGZpcmViYXNlQXV0aCkge1xuXHRcdHJldHVybiAkZmlyZWJhc2VBdXRoKCk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLmZhY3RvcnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwiZnVuY3Rpb25zLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJGdW5jdGlvbnNcIiwgRnVuY3Rpb25zKTtcblxuICBmdW5jdGlvbiBGdW5jdGlvbnMoKSB7XG5cbiAgICB2YXIgRlVOQ1RJT05TID0ge1xuICAgICAgdG9hc3Q6IHRvYXN0XG4gICAgfTtcbiAgICByZXR1cm4gRlVOQ1RJT05TO1xuXG4gICAgLy8gdG9hc3QgcG9wdXAgd2l0aCBjdXN0b20gbXNnXG4gICAgZnVuY3Rpb24gdG9hc3QobXNnKSB7XG4gICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMzAwMDtcblxuICAgICAgTWF0ZXJpYWxpemUudG9hc3QobXNnLCB0aW1lKTtcbiAgICB9XG4gIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mdW5jdGlvbnMuZmFjdG9yeS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJmdW5jdGlvbnMuZmFjdG9yeVwiLCBbXSkuZmFjdG9yeShcIkZ1bmN0aW9uc1wiLCBGdW5jdGlvbnMpO1xuXG4gIGZ1bmN0aW9uIEZ1bmN0aW9ucyh0b2FzdHIpIHtcblxuICAgIHZhciBGVU5DVElPTlMgPSB7XG4gICAgICB0b2FzdDogdG9hc3RcbiAgICB9O1xuICAgIHJldHVybiBGVU5DVElPTlM7XG5cbiAgICAvLyB0b2FzdCBwb3B1cCB3aXRoIGN1c3RvbSBtc2dcbiAgICAvLyBpbmZvOmJsdWUgc3VjY2VzczpncmVlbiBlcnJvcjpyZWQgd2FybmluZzpvcmFuZ2VcbiAgICBmdW5jdGlvbiB0b2FzdCgpIHtcbiAgICAgIHJldHVybiB0b2FzdHI7XG4gICAgfVxuICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVuY3Rpb25zLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2VydmljZXMubW9kdWxlXCIsIFtcImZ1bmN0aW9ucy5mYWN0b3J5XCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2aWNlcy5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwidXNlci5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiVXNlclwiLCBVc2VyKTtcblxuXHRmdW5jdGlvbiBVc2VyKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLnVzZXJzKTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuZmFjdG9yeS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdzaGFyZWQubW9kdWxlJywgWydzZXJ2aWNlcy5tb2R1bGUnLCAnZGlyZWN0aXZlcy5tb2R1bGUnLCAnbGF5b3V0Lm1vZHVsZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFyZWQubW9kdWxlLmpzLm1hcFxuIl19
