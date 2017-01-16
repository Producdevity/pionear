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

		// set header titles
		vm.headerTitle = 'Dashboard';
		vm.optionalDescription = 'overview';
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

		function AddOfferController(OfferService, Functions, Share, $scope, $timeout, $location) {
				var vm = this;
				this._fs = Functions;

				// viewmodel variables
				vm.newOffer;

				vm.optionalDescription = Share.headerDescription = 'add';

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

	function OfferController(Share) {
		var vm = this;
		console.log(Share);

		// set header titles
		vm.headerTitle = 'Offers';
		vm.optionalDescription = Share.headerDescription = 'overview';
		//vm.optionalDescription = 'test';
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
				title: '@',
				optionalDescription: '@',
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

	angular.module("services.module", ["functions.factory", "share.service"]);
})();


},{}],69:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("share.service", []).service("Share", Share);

	function Share() {
		this.headerDescription = '';
	}
})();


},{}],70:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.factory", []).factory("User", User);

	function User($firebaseRef, $firebaseArray, $firebaseObject) {
		return $firebaseObject($firebaseRef.users);
	}
})();


},{}],71:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('shared.module', ['services.module', 'directives.module', 'layout.module']);
})();


},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5yb3V0ZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZGQtYWR2ZXJ0aXNtZW50L2FkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkZC1hZHZlcnRpc21lbnQvc2lnbi11cC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZHZlcnRpc21lbnQubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkdmVydGlzbWVudC5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hdXRoLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2F1dGguc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L292ZXJ2aWV3L292ZXJ2aWV3LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9vdmVydmlldy9zaWduLWluLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9jb21wb25lbnRzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvZGFzaGJvYXJkL21haW4uY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvbWFpbi5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvYWRkLW9mZmVyL2FkZC1vZmZlci5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL29mZmVyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb2ZmZXIubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL29mZmVyLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9vZmZlci9vZmZlci5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL292ZXJ2aWV3L292ZXJ2aWV3LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy91c2VyL3VzZXIuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29uZmlnLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb3JlL2NvcmUuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLm1vZHVsZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2JvZHktY2xhc3Nlcy9ib2R5LWNsYXNzZXMuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9kaXJlY3RpdmVzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvZXhhbXBsZS5kZXJlY3RpdmUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2V4YW1wbGUuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9sb2FkaW5nL2xvYWRpbmcuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5kaXJlY3RpdmUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9sYXlvdXQvbGF5b3V0Lm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2xheW91dC9zaWRlYmFyL3NpZGViYXIuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL25hdmlnYXRpb24vbmF2LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9uYXZpZ2F0aW9uL25hdi5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9mdW5jdGlvbnMuZmFjdG9yeS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL2Z1bmN0aW9ucy5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvc2hhcmUuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3VzZXIuZmFjdG9yeS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NoYXJlZC5tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ215QXBwJywgW1xuXHQvL1x0VGhpcmQgUGFydHkgTW9kdWxlc1xuXHQndWkucm91dGVyJywgJ2ZpcmViYXNlJywgJ3RvYXN0cicsXG5cdC8vXHRNeSBNb2R1bGVzXG5cdCdjb21wb25lbnRzLm1vZHVsZScsICdzaGFyZWQubW9kdWxlJywgJ2NvcmUubW9kdWxlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm15QXBwXCIpLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdhcHAucm91dGVzIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblx0XHR2YXIgQkFTRV9QQVRIID0gJ2FwcC9jb21wb25lbnRzJztcblxuXHRcdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2Rhc2hib2FyZCcpO1xuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtYWluJywge1xuXHRcdFx0dXJsOiAnJyxcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEJBU0VfUEFUSCArICcvbWFpbi9tYWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHQvLyBjb250cm9sbGVyIHdpbGwgbm90IGJlIGxvYWRlZCB1bnRpbCAkcmVxdWlyZVNpZ25JbiByZXNvbHZlc1xuXHRcdFx0XHQvLyBBdXRoIHJlZmVycyB0byBvdXIgJGZpcmViYXNlQXV0aCB3cmFwcGVyIGluIHRoZSBmYWN0b3J5IGJlbG93XG5cdFx0XHRcdFwiY3VycmVudEF1dGhcIjogW1wiQXV0aFwiLCBmdW5jdGlvbiAoQXV0aCkge1xuXHRcdFx0XHRcdC8vICRyZXF1aXJlU2lnbkluIHJldHVybnMgYSBwcm9taXNlIHNvIHRoZSByZXNvbHZlIHdhaXRzIGZvciBpdCB0byBjb21wbGV0ZVxuXHRcdFx0XHRcdC8vIElmIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkLCBpdCB3aWxsIHRocm93IGEgJHN0YXRlQ2hhbmdlRXJyb3IgKHNlZSBhYm92ZSlcblx0XHRcdFx0XHRyZXR1cm4gQXV0aC4kcmVxdWlyZVNpZ25JbigpO1xuXHRcdFx0XHR9XVxuXHRcdFx0fVxuXHRcdH0pLnN0YXRlKCdtYWluLmRhc2hib2FyZCcsIHtcblx0XHRcdHVybDogJy9kYXNoYm9hcmQnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEJBU0VfUEFUSCArICcvZGFzaGJvYXJkL2Rhc2hib2FyZC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0Rhc2hib2FyZENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWRkLWFkdmVydGlzbWVudC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQWRkQWR2ZXJ0aXNtZW50Q29udHJvbGxlclwiLCBBZGRBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBZGRBZHZlcnRpc21lbnRDb250cm9sbGVyKEFkdmVydGlzbWVudFNlcnZpY2UsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICR0aW1lb3V0LCAkbG9jYXRpb24pIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRkLWFkdmVydGlzbWVudC5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2lnbi11cC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiU2lnblVwQ29udHJvbGxlclwiLCBTaWduVXBDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBTaWduVXBDb250cm9sbGVyKEF1dGgsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICR0aW1lb3V0LCAkbG9jYXRpb24pIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiB1cCBmb3IgUGlvbmVhcic7XG5cblx0XHR2bS5zaWduVXAgPSBzaWduVXA7XG5cblx0XHRmdW5jdGlvbiBzaWduVXAoY3JlZGVudGlhbHMpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdEF1dGguJGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzcykudGhlbihmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHR2YXIgbmV3VXNlciA9IFVzZXJTZXJ2aWNlLmdldFVzZXIodXNlci51aWQpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhjcmVkZW50aWFscyk7XG5cdFx0XHRcdG5ld1VzZXIuZW1haWwgPSB1c2VyLmVtYWlsO1xuXHRcdFx0XHRuZXdVc2VyLm5hbWUgPSBjcmVkZW50aWFscy5uYW1lO1xuXHRcdFx0XHRuZXdVc2VyLmNvbXBhbnkgPSBjcmVkZW50aWFscy5jb21wYW55O1xuXHRcdFx0XHRuZXdVc2VyLmFkZHJlc3MgPSBjcmVkZW50aWFscy5hZGRyZXNzO1xuXHRcdFx0XHRuZXdVc2VyLnppcGNvZGUgPSBjcmVkZW50aWFscy56aXBjb2RlO1xuXHRcdFx0XHRuZXdVc2VyLnBob25lID0gY3JlZGVudGlhbHMucGhvbmU7XG5cdFx0XHRcdG5ld1VzZXIubGFuZCA9IGNyZWRlbnRpYWxzLmxhbmQ7XG5cdFx0XHRcdG5ld1VzZXIuJHNhdmUoKS50aGVuKF90aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoJ1NpZ25lZCB1cCBzdWNjZXNzZnVsbHkhJykpLnRoZW4oJGxvY2F0aW9uLnBhdGgoJy8nKSk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogXCIsIGVycm9yKTtcblx0XHRcdFx0dm0uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbi11cC5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImFkdmVydGlzbWVudC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQWR2ZXJ0aXNtZW50Q29udHJvbGxlclwiLCBBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBZHZlcnRpc21lbnRDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0Y29uc29sZS5sb2coJ2FkZCBjb250cm9sJyk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhZHZlcnRpc21lbnQubW9kdWxlJywgWydhZHZlcnRpc21lbnQucm91dGVzJywgJ2FkdmVydGlzbWVudC5jb250cm9sbGVyJywgJ292ZXJ2aWV3LWFkdmVydGlzbWVudC5jb250cm9sbGVyJywgJ2FkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlcicsICdhZHZlcnRpc21lbnQuc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhZHZlcnRpc21lbnQucm91dGVzXCIsIFtdKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnYWR2ZXJ0aXNtZW50IGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgQURWRVJUSVNNRU5UX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvYWR2ZXJ0aXNtZW50JztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhZHZlcnRpc21lbnQnLCB7XG5cdFx0XHR1cmw6ICcvYWR2ZXJ0aXNtZW50Jyxcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFEVkVSVElTTUVOVF9QQVRIICsgJy9hZHZlcnRpc21lbnQudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZHZlcnRpc21lbnRDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdhZHZlcnRpc21lbnQub3ZlcnZpZXcnLCB7XG5cdFx0XHR1cmw6ICcvb3ZlcnZpZXcnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFEVkVSVElTTUVOVF9QQVRIICsgJy9hZHZlcnRpc21lbnQvb3ZlcnZpZXcudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ2FkdmVydGlzbWVudC5hZGQnLCB7XG5cdFx0XHR1cmw6ICcvYWRkLWFkdmVydGlzbWVudCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQURWRVJUSVNNRU5UX1BBVEggKyAnL2FkdmVydGlzbWVudC9hZGQtYWR2ZXJ0aXNtZW50LnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkQWR2ZXJ0aXNtZW50Q29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkdmVydGlzbWVudC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWR2ZXJ0aXNtZW50LnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJBZHZlcnRpc21lbnRTZXJ2aWNlXCIsIEFkdmVydGlzbWVudFNlcnZpY2UpO1xuXG5cdGZ1bmN0aW9uIEFkdmVydGlzbWVudFNlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIGFkdmVydGlzbWVudHMgPSAkZmlyZWJhc2VBcnJheSgkZmlyZWJhc2VSZWYuYWR2ZXJ0aXNtZW50cyk7XG5cblx0XHR2YXIgQVBJID0ge1xuXHRcdFx0Z2V0QWRzOiBnZXRBZHMsXG5cdFx0XHRnZXRBZDogZ2V0QWQsXG5cdFx0XHR1cGRhdGVBZDogdXBkYXRlQWQsXG5cdFx0XHRkZWxldGVBZDogZGVsZXRlQWRcblx0XHR9O1xuXHRcdHJldHVybiBBUEk7XG5cblx0XHRmdW5jdGlvbiBnZXRBZHMoKSB7XG5cdFx0XHRyZXR1cm4gYWR2ZXJ0aXNtZW50cztcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRBZCh1aWQpIHtcblx0XHRcdC8vcmV0dXJuICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYuYWR2ZXJ0aXNtZW50cy5jaGlsZCh1aWQpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVBZChhZHZlcnRpc21lbnQpIHtcblx0XHRcdHJldHVybiBhZHZlcnRpc21lbnQuJHNhdmUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBkZWxldGVBZChhZHZlcnRpc21lbnQpIHtcblx0XHRcdHJldHVybiBhZHZlcnRpc21lbnRzLiRyZW1vdmUoYWR2ZXJ0aXNtZW50KTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQuc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBdXRoQ29udHJvbGxlclwiLCBBdXRoQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQXV0aENvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGguY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhdXRoLm1vZHVsZScsIFsnYXV0aC5yb3V0ZXMnLCAnYXV0aC5jb250cm9sbGVyJywgJ3NpZ24taW4uY29udHJvbGxlcicsICdzaWduLXVwLmNvbnRyb2xsZXInLCAnYXV0aC5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2F1dGggY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBVVRIX1VSTCA9ICdhcHAvY29tcG9uZW50cy9hdXRoJztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhdXRoJywge1xuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR1cmw6ICcvYXV0aCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL2F1dGgudmlldy5odG1sJ1xuXHRcdH0pLnN0YXRlKCdhdXRoLnNpZ25pbicsIHtcblx0XHRcdHVybDogJy9zaWduLWluJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1VSTCArICcvc2lnbi1pbi9zaWduLWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnU2lnbkluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWdudXAnLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi11cCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL3NpZ24tdXAvc2lnbi11cC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1NpZ25VcENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdFx0Ly9jb25zdCBjb25maWcgPSB7XG5cdFx0Ly9cdGFwaUtleTogICAgICAgICAgICBcIkFJemFTeUNwSFVwM045aXV3TzJCRS1BYmpyMEMtbEUxbTQyNGxCSVwiLFxuXHRcdC8vXHRhdXRoRG9tYWluOiAgICAgICAgXCJ6YXB6aXRlLWI0N2Y5LmZpcmViYXNlYXBwLmNvbVwiLFxuXHRcdC8vXHRkYXRhYmFzZVVSTDogICAgICAgXCJodHRwczovL3phcHppdGUtYjQ3ZjkuZmlyZWJhc2Vpby5jb21cIixcblx0XHQvL1x0c3RvcmFnZUJ1Y2tldDogICAgIFwiemFweml0ZS1iNDdmOS5hcHBzcG90LmNvbVwiLFxuXHRcdC8vXHRtZXNzYWdpbmdTZW5kZXJJZDogXCI1NTQ1ODU1NDc4NDhcIlxuXHRcdC8vfTtcblx0XHQvL2ZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcblx0XHQvL1xuXHRcdC8vJGZpcmViYXNlUmVmUHJvdmlkZXIucmVnaXN0ZXJVcmwoe1xuXHRcdC8vXHRkZWZhdWx0OiAgICBjb25maWcuZGF0YWJhc2VVUkwsXG5cdFx0Ly9cdGNhdGVnb3JpZXM6IGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vY2F0ZWdvcmllc2AsXG5cdFx0Ly9cdHNpdGVzOiAgICAgIGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vc2l0ZXNgLFxuXHRcdC8vXHR1c2VyczogICAgICBgJHtjb25maWcuZGF0YWJhc2VVUkx9L3VzZXJzYFxuXHRcdC8vfSk7XG5cdFx0Ly9cblx0XHQvLyR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblx0XHQvLyRzdGF0ZVByb3ZpZGVyXG5cdFx0Ly9cdFx0LnN0YXRlKCdtYWluJywge1xuXHRcdC8vXHRcdFx0dXJsOiAnLycsXG5cdFx0Ly9cdFx0XHR0ZW1wbGF0ZVVybDogYCR7QkFTRV9VUkx9L21haW4vbWFpbi52aWV3Lmh0bWxgLFxuXHRcdC8vXHRcdFx0Y29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcblx0XHQvLyAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdC8vXHRcdH0pO1xuXHRcdC8vLnN0YXRlKCdhYm91dCcsIHtcblx0XHQvL1x0dXJsOiAnL2Fib3V0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJyxcblx0XHQvL1x0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCdcblx0XHQvL30pXG5cdFx0Ly8uc3RhdGUoJ2NvbnRhY3QnLCB7XG5cdFx0Ly9cdHVybDogJy9jb250YWN0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cdFx0Ly99KVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiQXV0aFwiLCBBdXRoKTtcblxuXHRmdW5jdGlvbiBBdXRoKCRmaXJlYmFzZUF1dGgpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlQXV0aCgpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwib3ZlcnZpZXctYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXJcIiwgT3ZlcnZpZXdBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXIoQWR2ZXJ0aXNtZW50U2VydmljZSwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW92ZXJ2aWV3LmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaWduLWluLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJTaWduSW5Db250cm9sbGVyXCIsIFNpZ25JbkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFNpZ25JbkNvbnRyb2xsZXIoQXV0aCwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0XHR2bS5sb2FkaW5nID0gdHJ1ZTtcblxuXHRcdHZtLnNpZ25JbiA9IHNpZ25JbjtcblxuXHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0aWYgKHVzZXIpICRsb2NhdGlvbi5wYXRoKCcvJyk7XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBzaWduSW4oY3JlZGVudGlhbHMpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdHZtLmxvYWRpbmcgPSB0cnVlO1xuXHRcdFx0QXV0aC4kc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3MpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIlNpZ25lZCBpbiBhcyBcIiArIHVzZXIuZW1haWwpO1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZCcpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJBdXRoZW50aWNhdGlvbiBmYWlsZWQ6XCIsIGVycm9yKTtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdHZtLmVycm9yID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdFx0dm0ubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbi1pbi5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2F1dGggY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBVVRIX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvYXV0aCc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXV0aCcsIHtcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dXJsOiAnL2F1dGgnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfUEFUSCArICcvYXV0aC52aWV3Lmh0bWwnXG5cdFx0fSkuc3RhdGUoJ2F1dGguc2lnbmluJywge1xuXHRcdFx0dXJsOiAnL3NpZ24taW4nLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfUEFUSCArICcvc2lnbi1pbi9zaWduLWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnU2lnbkluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWdudXAnLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi11cCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9QQVRIICsgJy9zaWduLXVwL3NpZ24tdXAudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTaWduVXBDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5yb3V0ZXMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnY29tcG9uZW50cy5tb2R1bGUnLCBbJ2F1dGgubW9kdWxlJywgJ2Rhc2hib2FyZC5tb2R1bGUnLCAnb2ZmZXIubW9kdWxlJywgJ3VzZXIubW9kdWxlJywgJ21haW4ubW9kdWxlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBvbmVudHMubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImRhc2hib2FyZC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiRGFzaGJvYXJkQ29udHJvbGxlclwiLCBEYXNoYm9hcmRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBEYXNoYm9hcmRDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cblx0XHQvLyBzZXQgaGVhZGVyIHRpdGxlc1xuXHRcdHZtLmhlYWRlclRpdGxlID0gJ0Rhc2hib2FyZCc7XG5cdFx0dm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9ICdvdmVydmlldyc7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXNoYm9hcmQuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJkYXNoYm9hcmQubW9kdWxlXCIsIFtcImRhc2hib2FyZC5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXNoYm9hcmQubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm1haW4uY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk1haW5Db250cm9sbGVyXCIsIE1haW5Db250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm1haW4ubW9kdWxlXCIsIFtcIm1haW4uY29udHJvbGxlclwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdGFuZ3VsYXIubW9kdWxlKFwiYWRkLW9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBZGRPZmZlckNvbnRyb2xsZXJcIiwgQWRkT2ZmZXJDb250cm9sbGVyKTtcblxuXHRcdGZ1bmN0aW9uIEFkZE9mZmVyQ29udHJvbGxlcihPZmZlclNlcnZpY2UsIEZ1bmN0aW9ucywgU2hhcmUsICRzY29wZSwgJHRpbWVvdXQsICRsb2NhdGlvbikge1xuXHRcdFx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdFx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdFx0XHQvLyB2aWV3bW9kZWwgdmFyaWFibGVzXG5cdFx0XHRcdHZtLm5ld09mZmVyO1xuXG5cdFx0XHRcdHZtLm9wdGlvbmFsRGVzY3JpcHRpb24gPSBTaGFyZS5oZWFkZXJEZXNjcmlwdGlvbiA9ICdhZGQnO1xuXG5cdFx0XHRcdC8vIGZ1bmN0aW9uc1xuXHRcdFx0XHR2bS5hZGRPZmZlciA9IGFkZE9mZmVyO1xuXHRcdFx0XHQkc2NvcGUuc2V0RmlsZSA9IHNldEZpbGU7XG5cblx0XHRcdFx0LyoqXHJcbiAgICAgKiBzZXQgZmlsZSB0byBwcmV2aWV3IHVwbG9hZGVkIGltZ1xyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqL1xuXHRcdFx0XHRmdW5jdGlvbiBzZXRGaWxlKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdHZtLmN1cnJlbnRGaWxlID0gZWxlbWVudC5maWxlc1swXTsgLy8gc2V0IHVwbG9hZGVkIGltZyBhcyBjdXJyZW50RmlsZVxuXHRcdFx0XHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0XHQvLyB0cmlnZ2VyZCB3aGVuIGZpbGUgaXMgcmVhZFxuXHRcdFx0XHRcdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdHZtLmltYWdlX3NvdXJjZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdFx0JHNjb3BlLiRhcHBseSgpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGVsZW1lbnQuZmlsZXNbMF0pOyAvLyB3aGVuIHRoZSBmaWxlIGlzIHJlYWQsIGl0IHRyaWdnZXJzIHRoZSBvbmxvYWQgZXZlbnQgYWJvdmUuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcclxuICAgICAqIGFkZCBhbiBvZmZlciB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEB0cmlnZ2VyIChuZy1zdWJtaXQpXHJcbiAgICAgKi9cblx0XHRcdFx0ZnVuY3Rpb24gYWRkT2ZmZXIoKSB7XG5cdFx0XHRcdFx0XHRPZmZlclNlcnZpY2UuYWRkT2ZmZXIodm0ubmV3T2ZmZXIpLnRoZW4oY29uc29sZS5sb2codm0ubmV3T2ZmZXIpKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIkFkZGVkIG5ldyBvZmZlciBcIiArIHZtLm5ld09mZmVyLm5hbWUpKS50aGVuKHZtLm5ld09mZmVyID0ge30pO1xuXHRcdFx0XHR9XG5cdFx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZC1vZmZlci5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPZmZlckNvbnRyb2xsZXJcIiwgT2ZmZXJDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBPZmZlckNvbnRyb2xsZXIoU2hhcmUpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFNoYXJlKTtcblxuXHRcdC8vIHNldCBoZWFkZXIgdGl0bGVzXG5cdFx0dm0uaGVhZGVyVGl0bGUgPSAnT2ZmZXJzJztcblx0XHR2bS5vcHRpb25hbERlc2NyaXB0aW9uID0gU2hhcmUuaGVhZGVyRGVzY3JpcHRpb24gPSAnb3ZlcnZpZXcnO1xuXHRcdC8vdm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9ICd0ZXN0Jztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnb2ZmZXIubW9kdWxlJywgWydvZmZlci5yb3V0ZXMnLCAnb2ZmZXIuY29udHJvbGxlcicsICdvdmVydmlldy1vZmZlci5jb250cm9sbGVyJywgJ2FkZC1vZmZlci5jb250cm9sbGVyJywgJ29mZmVyLnNlcnZpY2UnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvZmZlci5yb3V0ZXNcIiwgW10pLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdvZmZlciBjb25maWcgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXG5cdFx0dmFyIE9GRkVSX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvb2ZmZXInO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21haW4ub2ZmZXInLCB7XG5cdFx0XHR1cmw6ICcvb2ZmZXInLFxuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR0ZW1wbGF0ZVVybDogT0ZGRVJfUEFUSCArICcvb2ZmZXIudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPZmZlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ21haW4ub2ZmZXIub3ZlcnZpZXcnLCB7XG5cdFx0XHR1cmw6ICcvb3ZlcnZpZXcnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IE9GRkVSX1BBVEggKyAnL292ZXJ2aWV3L292ZXJ2aWV3LnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ21haW4ub2ZmZXIuYWRkJywge1xuXHRcdFx0dXJsOiAnL2FkZC1vZmZlcicsXG5cdFx0XHR0ZW1wbGF0ZVVybDogT0ZGRVJfUEFUSCArICcvYWRkLW9mZmVyL2FkZC1vZmZlci52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0FkZE9mZmVyQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLnJvdXRlcy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvZmZlci5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiT2ZmZXJTZXJ2aWNlXCIsIE9mZmVyU2VydmljZSk7XG5cblx0ZnVuY3Rpb24gT2ZmZXJTZXJ2aWNlKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHZhciBvZmZlcnMgPSAkZmlyZWJhc2VBcnJheSgkZmlyZWJhc2VSZWYub2ZmZXJzKTtcblxuXHRcdHZhciBBUEkgPSB7XG5cdFx0XHRhZGRPZmZlcjogYWRkT2ZmZXIsXG5cdFx0XHRnZXRPZmZlcnM6IGdldE9mZmVycyxcblx0XHRcdGdldE9mZmVyOiBnZXRPZmZlcixcblx0XHRcdHVwZGF0ZU9mZmVyOiB1cGRhdGVPZmZlcixcblx0XHRcdGRlbGV0ZU9mZmVyOiBkZWxldGVPZmZlclxuXHRcdH07XG5cdFx0cmV0dXJuIEFQSTtcblxuXHRcdGZ1bmN0aW9uIGFkZE9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzLiRhZGQoe1xuXHRcdFx0XHRuYW1lOiBvZmZlci5uYW1lXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRPZmZlcnMoKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldE9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi5vZmZlcnMuY2hpbGQob2ZmZXIuJGlkKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlci4kc2F2ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZU9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzLiRyZW1vdmUob2ZmZXIpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvdmVydmlldy1vZmZlci5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXJcIiwgT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE92ZXJ2aWV3T2ZmZXJDb250cm9sbGVyKE9mZmVyU2VydmljZSwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW92ZXJ2aWV3LmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwidXNlci5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiVXNlckNvbnRyb2xsZXJcIiwgVXNlckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFVzZXJDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgndXNlci5tb2R1bGUnLCBbJ3VzZXIuY29udHJvbGxlcicsICd1c2VyLnNlcnZpY2UnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwidXNlci5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiVXNlclNlcnZpY2VcIiwgVXNlclNlcnZpY2UpO1xuXG5cdGZ1bmN0aW9uIFVzZXJTZXJ2aWNlKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHZhciB1c2VycyA9ICRmaXJlYmFzZUFycmF5KCRmaXJlYmFzZVJlZi51c2Vycyk7XG5cblx0XHR2YXIgQVBJID0ge1xuXHRcdFx0Z2V0VXNlcnM6IGdldFVzZXJzLFxuXHRcdFx0Z2V0VXNlcjogZ2V0VXNlcixcblx0XHRcdHVwZGF0ZVVzZXI6IHVwZGF0ZVVzZXIsXG5cdFx0XHRkZWxldGVVc2VyOiBkZWxldGVVc2VyXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gZ2V0VXNlcnMoKSB7XG5cdFx0XHRyZXR1cm4gdXNlcnM7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0VXNlcih1aWQpIHtcblx0XHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLnVzZXJzLmNoaWxkKHVpZCkpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZVVzZXIodXNlcikge1xuXHRcdFx0cmV0dXJuIHVzZXIuJHNhdmUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBkZWxldGVVc2VyKHVzZXIpIHtcblx0XHRcdHJldHVybiB1c2Vycy4kcmVtb3ZlKHVzZXIpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuc2VydmljZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibXlBcHBcIikuY29uZmlnKGNvbmZpZykucnVuKHJ1bik7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRmaXJlYmFzZVJlZlByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2NvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHQvLyBJbml0aWFsaXplIEZpcmViYXNlXG5cdFx0dmFyIENPTkZJRyA9IHtcblx0XHRcdGFwaUtleTogXCJBSXphU3lEc3Bfb0JNOGxQT25FR1ZuQnlqc29mR3c3S3BmdHpmZThcIixcblx0XHRcdGF1dGhEb21haW46IFwicGlvbmVhci1kMDcwZS5maXJlYmFzZWFwcC5jb21cIixcblx0XHRcdGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vcGlvbmVhci1kMDcwZS5maXJlYmFzZWlvLmNvbVwiLFxuXHRcdFx0c3RvcmFnZUJ1Y2tldDogXCJwaW9uZWFyLWQwNzBlLmFwcHNwb3QuY29tXCIsXG5cdFx0XHRtZXNzYWdpbmdTZW5kZXJJZDogXCI5Njc0MDU4NjI1MVwiXG5cdFx0fTtcblx0XHRmaXJlYmFzZS5pbml0aWFsaXplQXBwKENPTkZJRyk7XG5cblx0XHQkZmlyZWJhc2VSZWZQcm92aWRlci5yZWdpc3RlclVybCh7XG5cdFx0XHRkZWZhdWx0OiBDT05GSUcuZGF0YWJhc2VVUkwsXG5cdFx0XHR1c2VyczogQ09ORklHLmRhdGFiYXNlVVJMICsgJy91c2VycycsXG5cdFx0XHRvZmZlcnM6IENPTkZJRy5kYXRhYmFzZVVSTCArICcvb2ZmZXJzJ1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcnVuKEF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgJHN0YXRlKSB7XG5cdFx0Y29uc29sZS5sb2coJ3J1biBmdW5jdGlvbiBzdGFydGVkJyk7XG5cdFx0Y2hlY2tBdXRoKCk7XG5cblx0XHQkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAobmV4dCwgY3VycmVudCkge1xuXHRcdFx0Y2hlY2tBdXRoKCk7XG5cdFx0fSk7XG5cblx0XHQkcm9vdFNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZUVycm9yXCIsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcywgZXJyb3IpIHtcblx0XHRcdC8vIFdlIGNhbiBjYXRjaCB0aGUgZXJyb3IgdGhyb3duIHdoZW4gdGhlICRyZXF1aXJlU2lnbkluIHByb21pc2UgaXMgcmVqZWN0ZWRcblx0XHRcdC8vIGFuZCByZWRpcmVjdCB0aGUgdXNlciBiYWNrIHRvIHRoZSBob21lIHBhZ2Vcblx0XHRcdGlmIChlcnJvciA9PT0gXCJBVVRIX1JFUVVJUkVEXCIpIHtcblx0XHRcdFx0JHN0YXRlLmdvKFwiaG9tZVwiKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIGNoZWNrQXV0aCgpIHtcblx0XHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHRpZiAoIXVzZXIpICRsb2NhdGlvbi5wYXRoKCcvYXV0aC9zaWduLWluJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHVzZXIpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJjb3JlLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJDb3JlQ29udHJvbGxlclwiLCBDb3JlQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQ29yZUNvbnRyb2xsZXIoQXV0aCwgVXNlclNlcnZpY2UsIEZ1bmN0aW9ucywgJHJvb3RTY29wZSkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS5pc1RvZ2dsZWQgPSBmYWxzZTtcblxuXHRcdHZtLnRvZ2dsZVNpZGViYXJQYXJlbnQgPSB0b2dnbGVTaWRlYmFyUGFyZW50O1xuXHRcdHZtLnNpZ25PdXQgPSBzaWduT3V0O1xuXG5cdFx0QXV0aC4kb25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRpZiAodXNlcikgdm0uY3VycmVudFVzZXIgPSBVc2VyU2VydmljZS5nZXRVc2VyKHVzZXIudWlkKTtcblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIHNpZ25PdXQoKSB7XG5cdFx0XHRBdXRoLiRzaWduT3V0KCkudGhlbih0aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoJ1lvdSBhcmUgc2lnbmVkIG91dC4nKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG9nZ2xlU2lkZWJhclBhcmVudCgpIHtcblx0XHRcdHZtLmlzVG9nZ2xlZCA9ICF2bS5pc1RvZ2dsZWQ7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL2ltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG4vL1xuLy9pbXBvcnQgQ29yZUNvbnRyb2xsZXIgZnJvbSAnLi9jb3JlLmNvbnRyb2xsZXIuanMnO1xuLy9cbi8vZXhwb3J0IGRlZmF1bHQgYW5ndWxhclxuLy9cdFx0Lm1vZHVsZSgnY29yZU1vZHVsZScsIFtdKVxuLy9cdFx0LmNvbnRyb2xsZXIoJ2F1dGguY29udHJvbGxlcicsIENvcmVDb250cm9sbGVyKVxuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2NvcmUubW9kdWxlJywgWydjb3JlLmNvbnRyb2xsZXInXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbi8vXG4vL2ltcG9ydCBDb3JlQ29udHJvbGxlciBmcm9tICcuL2NvcmUuY29udHJvbGxlci5qcyc7XG4vL1xuLy9leHBvcnQgZGVmYXVsdCBhbmd1bGFyXG4vL1x0XHQubW9kdWxlKCdjb3JlTW9kdWxlJywgW10pXG4vL1x0XHQuY29udHJvbGxlcignYXV0aC5jb250cm9sbGVyJywgQ29yZUNvbnRyb2xsZXIpXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnY29yZS5tb2R1bGUnLCBbJ2NvcmUuY29udHJvbGxlciddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLm1vZHVsZXMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnYm9keS1jbGFzc2VzLmRpcmVjdGl2ZScsIFtdKS5kaXJlY3RpdmUoJ2JvZHlDbGFzc2VzJywgYm9keUNsYXNzZXMpO1xuXG5cdGZ1bmN0aW9uIGJvZHlDbGFzc2VzKCRyb290U2NvcGUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRcdHNjb3BlOiB7fSxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHIsIGN0cmwpIHtcblxuXHRcdFx0XHQkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuXHRcdFx0XHRcdHZhciBmcm9tQ2xhc3NuYW1lcyA9IGFuZ3VsYXIuaXNEZWZpbmVkKGZyb21TdGF0ZS5kYXRhKSAmJiBhbmd1bGFyLmlzRGVmaW5lZChmcm9tU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcykgPyBmcm9tU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcyA6IG51bGw7XG5cdFx0XHRcdFx0dmFyIHRvQ2xhc3NuYW1lcyA9IGFuZ3VsYXIuaXNEZWZpbmVkKHRvU3RhdGUuZGF0YSkgJiYgYW5ndWxhci5pc0RlZmluZWQodG9TdGF0ZS5kYXRhLmJvZHlDbGFzc2VzKSA/IHRvU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcyA6IG51bGw7XG5cblx0XHRcdFx0XHQvLyBkb24ndCBkbyBhbnl0aGluZyBpZiB0aGV5IGFyZSB0aGUgc2FtZVxuXHRcdFx0XHRcdGlmIChmcm9tQ2xhc3NuYW1lcyAhPSB0b0NsYXNzbmFtZXMpIHtcblx0XHRcdFx0XHRcdGlmIChmcm9tQ2xhc3NuYW1lcykgZWxlbS5yZW1vdmVDbGFzcyhmcm9tQ2xhc3NuYW1lcyk7XG5cdFx0XHRcdFx0XHRpZiAodG9DbGFzc25hbWVzKSBlbGVtLmFkZENsYXNzKHRvQ2xhc3NuYW1lcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9keS1jbGFzc2VzLmRpcmVjdGl2ZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzLm1vZHVsZScsIFsnbG9hZGluZy5kaXJlY3RpdmUnLCAncGFnZS1oZWFkZXIuZGlyZWN0aXZlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpcmVjdGl2ZXMubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGFtcGxlLmRlcmVjdGl2ZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEV4YW1wbGVEaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIEV4YW1wbGVEaXJlY3RpdmUoKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4YW1wbGVEaXJlY3RpdmUpO1xuXG5cdFx0dGhpcy50ZW1wbGF0ZSA9ICc8ZGl2Pnt7Y3RybC5uYW1lfX08L2Rpdj4nO1xuXHRcdHRoaXMucmVzdHJpY3QgPSAnRSc7XG5cdFx0dGhpcy5zY29wZSA9IHt9O1xuXG5cdFx0dGhpcy5jb250cm9sbGVyID0gRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXI7XG5cdFx0dGhpcy5jb250cm9sbGVyQXMgPSAnY3RybCc7XG5cdFx0dGhpcy5iaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcblx0fVxuXG5cdC8vIERpcmVjdGl2ZSBjb21waWxlIGZ1bmN0aW9uXG5cblxuXHRfY3JlYXRlQ2xhc3MoRXhhbXBsZURpcmVjdGl2ZSwgW3tcblx0XHRrZXk6ICdjb21waWxlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcGlsZSgpIHt9XG5cblx0XHQvLyBEaXJlY3RpdmUgbGluayBmdW5jdGlvblxuXG5cdH0sIHtcblx0XHRrZXk6ICdsaW5rJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gbGluaygpIHt9XG5cdH1dKTtcblxuXHRyZXR1cm4gRXhhbXBsZURpcmVjdGl2ZTtcbn0oKTtcblxuLy8gRGlyZWN0aXZlJ3MgY29udHJvbGxlclxuXG5cbmV4cG9ydHMuZGVmYXVsdCA9IEV4YW1wbGVEaXJlY3RpdmU7XG5cbnZhciBFeGFtcGxlRGlyZWN0aXZlQ29udHJvbGxlciA9IGZ1bmN0aW9uIEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyKCkge1xuXHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXIpO1xuXG5cdHRoaXMubmFtZSA9ICdZYXNzaW5lJztcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGFtcGxlLmRpcmVjdGl2ZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcImxvYWRpbmcuZGlyZWN0aXZlXCIsIFtdKS5kaXJlY3RpdmUoXCJsb2FkaW5nU3Bpbm5lclwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRkYXRhOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9sb2FkaW5nLmRpcmVjdGl2ZS9sb2FkaW5nLnRlbXBsYXRlLmh0bWwnXG5cdFx0fTtcblx0fSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9hZGluZy5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJwYWdlLWhlYWRlci5kaXJlY3RpdmVcIiwgW10pLmRpcmVjdGl2ZShcInBhZ2VIZWFkZXJcIiwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0dGl0bGU6ICdAJyxcblx0XHRcdFx0b3B0aW9uYWxEZXNjcmlwdGlvbjogJ0AnLFxuXHRcdFx0XHR0b2dnbGU6ICcmJ1xuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uIGNvbnRyb2xsZXIoJHNjb3BlKSB7XG5cdFx0XHRcdCRzY29wZS50b2dnbGVWYWx1ZSA9IGZhbHNlO1xuXHRcdFx0XHQkc2NvcGUudG9nZ2xlU2lkZWJhckluc2lkZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUudG9nZ2xlVmFsdWUgPSAhJHNjb3BlLnRvZ2dsZVZhbHVlO1xuXHRcdFx0XHRcdCRzY29wZS50b2dnbGUoKTtcblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50ZW1wbGF0ZS5odG1sJ1xuXHRcdH07XG5cdH0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2UtaGVhZGVyLmRpcmVjdGl2ZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJsYXlvdXQubW9kdWxlXCIsIFtcInNpZGViYXIuY29udHJvbGxlclwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0Lm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaWRlYmFyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJTaWRlYmFyQ29udHJvbGxlclwiLCBTaWRlYmFyQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gU2lkZWJhckNvbnRyb2xsZXIoJGxvY2F0aW9uLCBBdXRoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblxuXHRcdHZtLnNpZ25PdXQgPSBzaWduT3V0O1xuXG5cdFx0ZnVuY3Rpb24gc2lnbk91dCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdzaWdub3V0Jyk7XG5cdFx0XHRBdXRoLiRzaWduT3V0KCkudGhlbih0aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoJ1lvdSBhcmUgc2lnbmVkIG91dC4nKSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lkZWJhci5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdGFuZ3VsYXIubW9kdWxlKFwibmF2LmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJOYXZDb250cm9sbGVyXCIsIE5hdkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE5hdkNvbnRyb2xsZXIoJGxvY2F0aW9uLCBBdXRoLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHZhciBfZnMgPSBGdW5jdGlvbnM7XG5cdFx0dm0uc2lnbk91dCA9IHNpZ25PdXQ7XG5cdFx0dm0uaXNBY3RpdmUgPSBpc0FjdGl2ZTtcblx0XHQvLyBpbml0aWFsaXplIHZpZXcgZGF0YVxuXHRcdGZ1bmN0aW9uIGluaXQoKSB7fVxuXG5cdFx0aW5pdCgpO1xuXG5cdFx0Ly92bS5hdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24odXNlcikge1xuXHRcdC8vXHR2bS51c2VyID0gdXNlcjtcblx0XHQvL30pO1xuXG5cdFx0ZnVuY3Rpb24gc2lnbk91dCgpIHtcblx0XHRcdEF1dGguJHNpZ25PdXQoKS50aGVuKF9mcy50b2FzdCgnWW91IGFyZSBzaWduZWQgb3V0LicpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBpc0FjdGl2ZShkZXN0aW5hdGlvbikge1xuXHRcdFx0cmV0dXJuIGRlc3RpbmF0aW9uID09PSAkbG9jYXRpb24ucGF0aCgpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdi5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICBhbmd1bGFyLm1vZHVsZShcIm5hdi5tb2R1bGVcIiwgW1wibmF2LmNvbnRyb2xsZXJcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdi5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiQXV0aFwiLCBBdXRoKTtcblxuXHRmdW5jdGlvbiBBdXRoKCRmaXJlYmFzZUF1dGgpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlQXV0aCgpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5mYWN0b3J5LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZShcImZ1bmN0aW9ucy5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiRnVuY3Rpb25zXCIsIEZ1bmN0aW9ucyk7XG5cbiAgZnVuY3Rpb24gRnVuY3Rpb25zKCkge1xuXG4gICAgdmFyIEZVTkNUSU9OUyA9IHtcbiAgICAgIHRvYXN0OiB0b2FzdFxuICAgIH07XG4gICAgcmV0dXJuIEZVTkNUSU9OUztcblxuICAgIC8vIHRvYXN0IHBvcHVwIHdpdGggY3VzdG9tIG1zZ1xuICAgIGZ1bmN0aW9uIHRvYXN0KG1zZykge1xuICAgICAgdmFyIHRpbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDMwMDA7XG5cbiAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1zZywgdGltZSk7XG4gICAgfVxuICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVuY3Rpb25zLmZhY3RvcnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwiZnVuY3Rpb25zLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJGdW5jdGlvbnNcIiwgRnVuY3Rpb25zKTtcblxuICBmdW5jdGlvbiBGdW5jdGlvbnModG9hc3RyKSB7XG5cbiAgICB2YXIgRlVOQ1RJT05TID0ge1xuICAgICAgdG9hc3Q6IHRvYXN0XG4gICAgfTtcbiAgICByZXR1cm4gRlVOQ1RJT05TO1xuXG4gICAgLy8gdG9hc3QgcG9wdXAgd2l0aCBjdXN0b20gbXNnXG4gICAgLy8gaW5mbzpibHVlIHN1Y2Nlc3M6Z3JlZW4gZXJyb3I6cmVkIHdhcm5pbmc6b3JhbmdlXG4gICAgZnVuY3Rpb24gdG9hc3QoKSB7XG4gICAgICByZXR1cm4gdG9hc3RyO1xuICAgIH1cbiAgfVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZ1bmN0aW9ucy5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInNlcnZpY2VzLm1vZHVsZVwiLCBbXCJmdW5jdGlvbnMuZmFjdG9yeVwiLCBcInNoYXJlLnNlcnZpY2VcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZpY2VzLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaGFyZS5zZXJ2aWNlXCIsIFtdKS5zZXJ2aWNlKFwiU2hhcmVcIiwgU2hhcmUpO1xuXG5cdGZ1bmN0aW9uIFNoYXJlKCkge1xuXHRcdHRoaXMuaGVhZGVyRGVzY3JpcHRpb24gPSAnJztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYXJlLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwidXNlci5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiVXNlclwiLCBVc2VyKTtcblxuXHRmdW5jdGlvbiBVc2VyKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLnVzZXJzKTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuZmFjdG9yeS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdzaGFyZWQubW9kdWxlJywgWydzZXJ2aWNlcy5tb2R1bGUnLCAnZGlyZWN0aXZlcy5tb2R1bGUnLCAnbGF5b3V0Lm1vZHVsZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFyZWQubW9kdWxlLmpzLm1hcFxuIl19
