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
arguments[4][38][0].apply(exports,arguments)
},{"dup":38}],49:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],50:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],51:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],52:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],53:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],54:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("settings.controller", []).controller("OfferController", OfferController);

	function OfferController(Share) {
		var vm = this;

		// set header titles
		vm.headerTitle = 'Offers';
		vm.optionalDescription = Share.headerDescription = 'overview';
		//vm.optionalDescription = 'test';
	}
})();


},{}],55:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('settings.module', ['settings.routes', 'settings.controller', 'settings.service']);
})();


},{}],56:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("offer.routes", []).config(config);

	function config($stateProvider) {
		console.log('settings config function started');

		var SETTINGS_PATH = 'app/components/settings';

		$stateProvider.state('main.settings', {
			url: '/settings',
			templateUrl: SETTINGS_PATH + '/settings.view.html',
			controller: 'SettingsController',
			controllerAs: 'vm'
		});
	}
})();


},{}],57:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("settings.service", []).factory("SettingsService", SettingsService);

	function SettingsService($firebaseRef, $firebaseArray, $firebaseObject) {
		var profile = $firebaseObject($firebaseRef.settings);

		var API = {
			getProfile: getProfile,
			updateProfile: updateProfile
		};
		return API;

		function getProfile() {
			return profile;
		}

		function updateProfile(profile) {
			return profile.$save();
		}
	}
})();


},{}],58:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.controller", []).controller("UserController", UserController);

	function UserController() {
		var vm = this;
	}
})();


},{}],59:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('user.module', ['user.controller', 'user.service']);
})();


},{}],60:[function(require,module,exports){
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


},{}],61:[function(require,module,exports){
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


},{}],62:[function(require,module,exports){
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


},{}],63:[function(require,module,exports){
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


},{}],64:[function(require,module,exports){
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


},{}],65:[function(require,module,exports){
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


},{}],66:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('directives.module', ['loading.directive', 'page-header.directive']);
})();


},{}],67:[function(require,module,exports){
"use strict";


},{}],68:[function(require,module,exports){
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


},{}],69:[function(require,module,exports){
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


},{}],70:[function(require,module,exports){
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


},{}],71:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("layout.module", ["sidebar.controller"]);
})();


},{}],72:[function(require,module,exports){
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


},{}],73:[function(require,module,exports){
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


},{}],74:[function(require,module,exports){
'use strict';

(function () {
  angular.module("nav.module", ["nav.controller"]);
})();


},{}],75:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("auth.factory", []).factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();


},{}],76:[function(require,module,exports){
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


},{}],77:[function(require,module,exports){
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


},{}],78:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("services.module", ["functions.factory", "share.service"]);
})();


},{}],79:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("share.service", []).service("Share", Share);

	function Share() {
		this.headerDescription = '';
	}
})();


},{}],80:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.factory", []).factory("User", User);

	function User($firebaseRef, $firebaseArray, $firebaseObject) {
		return $firebaseObject($firebaseRef.users);
	}
})();


},{}],81:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('shared.module', ['services.module', 'directives.module', 'layout.module']);
})();


},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5yb3V0ZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZGQtYWR2ZXJ0aXNtZW50L2FkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkZC1hZHZlcnRpc21lbnQvc2lnbi11cC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZHZlcnRpc21lbnQubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkdmVydGlzbWVudC5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hdXRoLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2F1dGguc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L292ZXJ2aWV3L292ZXJ2aWV3LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9vdmVydmlldy9zaWduLWluLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9jb21wb25lbnRzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvZGFzaGJvYXJkL21haW4uY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvbWFpbi5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvYWRkLW9mZmVyL2FkZC1vZmZlci5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL29mZmVyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb2ZmZXIubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL29mZmVyLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9vZmZlci9vZmZlci5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL292ZXJ2aWV3L292ZXJ2aWV3LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3Mucm91dGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy91c2VyL3VzZXIuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29uZmlnLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb3JlL2NvcmUuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLm1vZHVsZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2JvZHktY2xhc3Nlcy9ib2R5LWNsYXNzZXMuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9kaXJlY3RpdmVzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvZXhhbXBsZS5kZXJlY3RpdmUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2V4YW1wbGUuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9sb2FkaW5nL2xvYWRpbmcuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5kaXJlY3RpdmUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9sYXlvdXQvbGF5b3V0Lm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2xheW91dC9zaWRlYmFyL3NpZGViYXIuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL25hdmlnYXRpb24vbmF2LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9uYXZpZ2F0aW9uL25hdi5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9mdW5jdGlvbnMuZmFjdG9yeS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL2Z1bmN0aW9ucy5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvc2VydmljZXMubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvc2hhcmUuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3VzZXIuZmFjdG9yeS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NoYXJlZC5tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ215QXBwJywgW1xuXHQvL1x0VGhpcmQgUGFydHkgTW9kdWxlc1xuXHQndWkucm91dGVyJywgJ2ZpcmViYXNlJywgJ3RvYXN0cicsXG5cdC8vXHRNeSBNb2R1bGVzXG5cdCdjb21wb25lbnRzLm1vZHVsZScsICdzaGFyZWQubW9kdWxlJywgJ2NvcmUubW9kdWxlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm15QXBwXCIpLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdhcHAucm91dGVzIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblx0XHR2YXIgQkFTRV9QQVRIID0gJ2FwcC9jb21wb25lbnRzJztcblxuXHRcdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2Rhc2hib2FyZCcpO1xuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtYWluJywge1xuXHRcdFx0dXJsOiAnJyxcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEJBU0VfUEFUSCArICcvbWFpbi9tYWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHQvLyBjb250cm9sbGVyIHdpbGwgbm90IGJlIGxvYWRlZCB1bnRpbCAkcmVxdWlyZVNpZ25JbiByZXNvbHZlc1xuXHRcdFx0XHQvLyBBdXRoIHJlZmVycyB0byBvdXIgJGZpcmViYXNlQXV0aCB3cmFwcGVyIGluIHRoZSBmYWN0b3J5IGJlbG93XG5cdFx0XHRcdFwiY3VycmVudEF1dGhcIjogW1wiQXV0aFwiLCBmdW5jdGlvbiAoQXV0aCkge1xuXHRcdFx0XHRcdC8vICRyZXF1aXJlU2lnbkluIHJldHVybnMgYSBwcm9taXNlIHNvIHRoZSByZXNvbHZlIHdhaXRzIGZvciBpdCB0byBjb21wbGV0ZVxuXHRcdFx0XHRcdC8vIElmIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkLCBpdCB3aWxsIHRocm93IGEgJHN0YXRlQ2hhbmdlRXJyb3IgKHNlZSBhYm92ZSlcblx0XHRcdFx0XHRyZXR1cm4gQXV0aC4kcmVxdWlyZVNpZ25JbigpO1xuXHRcdFx0XHR9XVxuXHRcdFx0fVxuXHRcdH0pLnN0YXRlKCdtYWluLmRhc2hib2FyZCcsIHtcblx0XHRcdHVybDogJy9kYXNoYm9hcmQnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEJBU0VfUEFUSCArICcvZGFzaGJvYXJkL2Rhc2hib2FyZC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0Rhc2hib2FyZENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWRkLWFkdmVydGlzbWVudC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQWRkQWR2ZXJ0aXNtZW50Q29udHJvbGxlclwiLCBBZGRBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBZGRBZHZlcnRpc21lbnRDb250cm9sbGVyKEFkdmVydGlzbWVudFNlcnZpY2UsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICR0aW1lb3V0LCAkbG9jYXRpb24pIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRkLWFkdmVydGlzbWVudC5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2lnbi11cC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiU2lnblVwQ29udHJvbGxlclwiLCBTaWduVXBDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBTaWduVXBDb250cm9sbGVyKEF1dGgsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICR0aW1lb3V0LCAkbG9jYXRpb24pIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiB1cCBmb3IgUGlvbmVhcic7XG5cblx0XHR2bS5zaWduVXAgPSBzaWduVXA7XG5cblx0XHRmdW5jdGlvbiBzaWduVXAoY3JlZGVudGlhbHMpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdEF1dGguJGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzcykudGhlbihmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHR2YXIgbmV3VXNlciA9IFVzZXJTZXJ2aWNlLmdldFVzZXIodXNlci51aWQpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhjcmVkZW50aWFscyk7XG5cdFx0XHRcdG5ld1VzZXIuZW1haWwgPSB1c2VyLmVtYWlsO1xuXHRcdFx0XHRuZXdVc2VyLm5hbWUgPSBjcmVkZW50aWFscy5uYW1lO1xuXHRcdFx0XHRuZXdVc2VyLmNvbXBhbnkgPSBjcmVkZW50aWFscy5jb21wYW55O1xuXHRcdFx0XHRuZXdVc2VyLmFkZHJlc3MgPSBjcmVkZW50aWFscy5hZGRyZXNzO1xuXHRcdFx0XHRuZXdVc2VyLnppcGNvZGUgPSBjcmVkZW50aWFscy56aXBjb2RlO1xuXHRcdFx0XHRuZXdVc2VyLnBob25lID0gY3JlZGVudGlhbHMucGhvbmU7XG5cdFx0XHRcdG5ld1VzZXIubGFuZCA9IGNyZWRlbnRpYWxzLmxhbmQ7XG5cdFx0XHRcdG5ld1VzZXIuJHNhdmUoKS50aGVuKF90aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoJ1NpZ25lZCB1cCBzdWNjZXNzZnVsbHkhJykpLnRoZW4oJGxvY2F0aW9uLnBhdGgoJy8nKSk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogXCIsIGVycm9yKTtcblx0XHRcdFx0dm0uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbi11cC5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImFkdmVydGlzbWVudC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQWR2ZXJ0aXNtZW50Q29udHJvbGxlclwiLCBBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBZHZlcnRpc21lbnRDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0Y29uc29sZS5sb2coJ2FkZCBjb250cm9sJyk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhZHZlcnRpc21lbnQubW9kdWxlJywgWydhZHZlcnRpc21lbnQucm91dGVzJywgJ2FkdmVydGlzbWVudC5jb250cm9sbGVyJywgJ292ZXJ2aWV3LWFkdmVydGlzbWVudC5jb250cm9sbGVyJywgJ2FkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlcicsICdhZHZlcnRpc21lbnQuc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhZHZlcnRpc21lbnQucm91dGVzXCIsIFtdKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnYWR2ZXJ0aXNtZW50IGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgQURWRVJUSVNNRU5UX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvYWR2ZXJ0aXNtZW50JztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhZHZlcnRpc21lbnQnLCB7XG5cdFx0XHR1cmw6ICcvYWR2ZXJ0aXNtZW50Jyxcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFEVkVSVElTTUVOVF9QQVRIICsgJy9hZHZlcnRpc21lbnQudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZHZlcnRpc21lbnRDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdhZHZlcnRpc21lbnQub3ZlcnZpZXcnLCB7XG5cdFx0XHR1cmw6ICcvb3ZlcnZpZXcnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFEVkVSVElTTUVOVF9QQVRIICsgJy9hZHZlcnRpc21lbnQvb3ZlcnZpZXcudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ2FkdmVydGlzbWVudC5hZGQnLCB7XG5cdFx0XHR1cmw6ICcvYWRkLWFkdmVydGlzbWVudCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQURWRVJUSVNNRU5UX1BBVEggKyAnL2FkdmVydGlzbWVudC9hZGQtYWR2ZXJ0aXNtZW50LnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkQWR2ZXJ0aXNtZW50Q29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkdmVydGlzbWVudC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWR2ZXJ0aXNtZW50LnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJBZHZlcnRpc21lbnRTZXJ2aWNlXCIsIEFkdmVydGlzbWVudFNlcnZpY2UpO1xuXG5cdGZ1bmN0aW9uIEFkdmVydGlzbWVudFNlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIGFkdmVydGlzbWVudHMgPSAkZmlyZWJhc2VBcnJheSgkZmlyZWJhc2VSZWYuYWR2ZXJ0aXNtZW50cyk7XG5cblx0XHR2YXIgQVBJID0ge1xuXHRcdFx0Z2V0QWRzOiBnZXRBZHMsXG5cdFx0XHRnZXRBZDogZ2V0QWQsXG5cdFx0XHR1cGRhdGVBZDogdXBkYXRlQWQsXG5cdFx0XHRkZWxldGVBZDogZGVsZXRlQWRcblx0XHR9O1xuXHRcdHJldHVybiBBUEk7XG5cblx0XHRmdW5jdGlvbiBnZXRBZHMoKSB7XG5cdFx0XHRyZXR1cm4gYWR2ZXJ0aXNtZW50cztcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRBZCh1aWQpIHtcblx0XHRcdC8vcmV0dXJuICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYuYWR2ZXJ0aXNtZW50cy5jaGlsZCh1aWQpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVBZChhZHZlcnRpc21lbnQpIHtcblx0XHRcdHJldHVybiBhZHZlcnRpc21lbnQuJHNhdmUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBkZWxldGVBZChhZHZlcnRpc21lbnQpIHtcblx0XHRcdHJldHVybiBhZHZlcnRpc21lbnRzLiRyZW1vdmUoYWR2ZXJ0aXNtZW50KTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQuc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBdXRoQ29udHJvbGxlclwiLCBBdXRoQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQXV0aENvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGguY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhdXRoLm1vZHVsZScsIFsnYXV0aC5yb3V0ZXMnLCAnYXV0aC5jb250cm9sbGVyJywgJ3NpZ24taW4uY29udHJvbGxlcicsICdzaWduLXVwLmNvbnRyb2xsZXInLCAnYXV0aC5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2F1dGggY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBVVRIX1VSTCA9ICdhcHAvY29tcG9uZW50cy9hdXRoJztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhdXRoJywge1xuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR1cmw6ICcvYXV0aCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL2F1dGgudmlldy5odG1sJ1xuXHRcdH0pLnN0YXRlKCdhdXRoLnNpZ25pbicsIHtcblx0XHRcdHVybDogJy9zaWduLWluJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1VSTCArICcvc2lnbi1pbi9zaWduLWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnU2lnbkluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWdudXAnLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi11cCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL3NpZ24tdXAvc2lnbi11cC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1NpZ25VcENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdFx0Ly9jb25zdCBjb25maWcgPSB7XG5cdFx0Ly9cdGFwaUtleTogICAgICAgICAgICBcIkFJemFTeUNwSFVwM045aXV3TzJCRS1BYmpyMEMtbEUxbTQyNGxCSVwiLFxuXHRcdC8vXHRhdXRoRG9tYWluOiAgICAgICAgXCJ6YXB6aXRlLWI0N2Y5LmZpcmViYXNlYXBwLmNvbVwiLFxuXHRcdC8vXHRkYXRhYmFzZVVSTDogICAgICAgXCJodHRwczovL3phcHppdGUtYjQ3ZjkuZmlyZWJhc2Vpby5jb21cIixcblx0XHQvL1x0c3RvcmFnZUJ1Y2tldDogICAgIFwiemFweml0ZS1iNDdmOS5hcHBzcG90LmNvbVwiLFxuXHRcdC8vXHRtZXNzYWdpbmdTZW5kZXJJZDogXCI1NTQ1ODU1NDc4NDhcIlxuXHRcdC8vfTtcblx0XHQvL2ZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcblx0XHQvL1xuXHRcdC8vJGZpcmViYXNlUmVmUHJvdmlkZXIucmVnaXN0ZXJVcmwoe1xuXHRcdC8vXHRkZWZhdWx0OiAgICBjb25maWcuZGF0YWJhc2VVUkwsXG5cdFx0Ly9cdGNhdGVnb3JpZXM6IGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vY2F0ZWdvcmllc2AsXG5cdFx0Ly9cdHNpdGVzOiAgICAgIGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vc2l0ZXNgLFxuXHRcdC8vXHR1c2VyczogICAgICBgJHtjb25maWcuZGF0YWJhc2VVUkx9L3VzZXJzYFxuXHRcdC8vfSk7XG5cdFx0Ly9cblx0XHQvLyR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblx0XHQvLyRzdGF0ZVByb3ZpZGVyXG5cdFx0Ly9cdFx0LnN0YXRlKCdtYWluJywge1xuXHRcdC8vXHRcdFx0dXJsOiAnLycsXG5cdFx0Ly9cdFx0XHR0ZW1wbGF0ZVVybDogYCR7QkFTRV9VUkx9L21haW4vbWFpbi52aWV3Lmh0bWxgLFxuXHRcdC8vXHRcdFx0Y29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcblx0XHQvLyAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdC8vXHRcdH0pO1xuXHRcdC8vLnN0YXRlKCdhYm91dCcsIHtcblx0XHQvL1x0dXJsOiAnL2Fib3V0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJyxcblx0XHQvL1x0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCdcblx0XHQvL30pXG5cdFx0Ly8uc3RhdGUoJ2NvbnRhY3QnLCB7XG5cdFx0Ly9cdHVybDogJy9jb250YWN0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cdFx0Ly99KVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiQXV0aFwiLCBBdXRoKTtcblxuXHRmdW5jdGlvbiBBdXRoKCRmaXJlYmFzZUF1dGgpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlQXV0aCgpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwib3ZlcnZpZXctYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXJcIiwgT3ZlcnZpZXdBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXIoQWR2ZXJ0aXNtZW50U2VydmljZSwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW92ZXJ2aWV3LmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaWduLWluLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJTaWduSW5Db250cm9sbGVyXCIsIFNpZ25JbkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFNpZ25JbkNvbnRyb2xsZXIoQXV0aCwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0XHR2bS5sb2FkaW5nID0gdHJ1ZTtcblxuXHRcdHZtLnNpZ25JbiA9IHNpZ25JbjtcblxuXHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0aWYgKHVzZXIpICRsb2NhdGlvbi5wYXRoKCcvJyk7XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBzaWduSW4oY3JlZGVudGlhbHMpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdHZtLmxvYWRpbmcgPSB0cnVlO1xuXHRcdFx0QXV0aC4kc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3MpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIlNpZ25lZCBpbiBhcyBcIiArIHVzZXIuZW1haWwpO1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZCcpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJBdXRoZW50aWNhdGlvbiBmYWlsZWQ6XCIsIGVycm9yKTtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdHZtLmVycm9yID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdFx0dm0ubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbi1pbi5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2F1dGggY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBVVRIX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvYXV0aCc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXV0aCcsIHtcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dXJsOiAnL2F1dGgnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfUEFUSCArICcvYXV0aC52aWV3Lmh0bWwnXG5cdFx0fSkuc3RhdGUoJ2F1dGguc2lnbmluJywge1xuXHRcdFx0dXJsOiAnL3NpZ24taW4nLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfUEFUSCArICcvc2lnbi1pbi9zaWduLWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnU2lnbkluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWdudXAnLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi11cCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9QQVRIICsgJy9zaWduLXVwL3NpZ24tdXAudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTaWduVXBDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5yb3V0ZXMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnY29tcG9uZW50cy5tb2R1bGUnLCBbJ2F1dGgubW9kdWxlJywgJ2Rhc2hib2FyZC5tb2R1bGUnLCAnb2ZmZXIubW9kdWxlJywgJ3VzZXIubW9kdWxlJywgJ21haW4ubW9kdWxlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBvbmVudHMubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImRhc2hib2FyZC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiRGFzaGJvYXJkQ29udHJvbGxlclwiLCBEYXNoYm9hcmRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBEYXNoYm9hcmRDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cblx0XHQvLyBzZXQgaGVhZGVyIHRpdGxlc1xuXHRcdHZtLmhlYWRlclRpdGxlID0gJ0Rhc2hib2FyZCc7XG5cdFx0dm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9ICdvdmVydmlldyc7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXNoYm9hcmQuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJkYXNoYm9hcmQubW9kdWxlXCIsIFtcImRhc2hib2FyZC5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXNoYm9hcmQubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm1haW4uY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk1haW5Db250cm9sbGVyXCIsIE1haW5Db250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm1haW4ubW9kdWxlXCIsIFtcIm1haW4uY29udHJvbGxlclwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdGFuZ3VsYXIubW9kdWxlKFwiYWRkLW9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBZGRPZmZlckNvbnRyb2xsZXJcIiwgQWRkT2ZmZXJDb250cm9sbGVyKTtcblxuXHRcdGZ1bmN0aW9uIEFkZE9mZmVyQ29udHJvbGxlcihPZmZlclNlcnZpY2UsIEZ1bmN0aW9ucywgU2hhcmUsICRzY29wZSwgJHRpbWVvdXQsICRsb2NhdGlvbikge1xuXHRcdFx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdFx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdFx0XHQvLyB2aWV3bW9kZWwgdmFyaWFibGVzXG5cdFx0XHRcdHZtLm5ld09mZmVyO1xuXG5cdFx0XHRcdHZtLm9wdGlvbmFsRGVzY3JpcHRpb24gPSBTaGFyZS5oZWFkZXJEZXNjcmlwdGlvbiA9ICdhZGQnO1xuXG5cdFx0XHRcdC8vIGZ1bmN0aW9uc1xuXHRcdFx0XHR2bS5hZGRPZmZlciA9IGFkZE9mZmVyO1xuXHRcdFx0XHQkc2NvcGUuc2V0RmlsZSA9IHNldEZpbGU7XG5cblx0XHRcdFx0LyoqXHJcbiAgICAgKiBzZXQgZmlsZSB0byBwcmV2aWV3IHVwbG9hZGVkIGltZ1xyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqL1xuXHRcdFx0XHRmdW5jdGlvbiBzZXRGaWxlKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdHZtLmN1cnJlbnRGaWxlID0gZWxlbWVudC5maWxlc1swXTsgLy8gc2V0IHVwbG9hZGVkIGltZyBhcyBjdXJyZW50RmlsZVxuXHRcdFx0XHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0XHQvLyB0cmlnZ2VyZCB3aGVuIGZpbGUgaXMgcmVhZFxuXHRcdFx0XHRcdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdHZtLmltYWdlX3NvdXJjZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdFx0JHNjb3BlLiRhcHBseSgpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGVsZW1lbnQuZmlsZXNbMF0pOyAvLyB3aGVuIHRoZSBmaWxlIGlzIHJlYWQsIGl0IHRyaWdnZXJzIHRoZSBvbmxvYWQgZXZlbnQgYWJvdmUuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcclxuICAgICAqIGFkZCBhbiBvZmZlciB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEB0cmlnZ2VyIChuZy1zdWJtaXQpXHJcbiAgICAgKi9cblx0XHRcdFx0ZnVuY3Rpb24gYWRkT2ZmZXIoKSB7XG5cdFx0XHRcdFx0XHRPZmZlclNlcnZpY2UuYWRkT2ZmZXIodm0ubmV3T2ZmZXIpLnRoZW4oY29uc29sZS5sb2codm0ubmV3T2ZmZXIpKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIkFkZGVkIG5ldyBvZmZlciBcIiArIHZtLm5ld09mZmVyLm5hbWUpKS50aGVuKHZtLm5ld09mZmVyID0ge30pO1xuXHRcdFx0XHR9XG5cdFx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZC1vZmZlci5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPZmZlckNvbnRyb2xsZXJcIiwgT2ZmZXJDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBPZmZlckNvbnRyb2xsZXIoU2hhcmUpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFNoYXJlKTtcblxuXHRcdC8vIHNldCBoZWFkZXIgdGl0bGVzXG5cdFx0dm0uaGVhZGVyVGl0bGUgPSAnT2ZmZXJzJztcblx0XHR2bS5vcHRpb25hbERlc2NyaXB0aW9uID0gU2hhcmUuaGVhZGVyRGVzY3JpcHRpb24gPSAnb3ZlcnZpZXcnO1xuXHRcdC8vdm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9ICd0ZXN0Jztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnb2ZmZXIubW9kdWxlJywgWydvZmZlci5yb3V0ZXMnLCAnb2ZmZXIuY29udHJvbGxlcicsICdvdmVydmlldy1vZmZlci5jb250cm9sbGVyJywgJ2FkZC1vZmZlci5jb250cm9sbGVyJywgJ29mZmVyLnNlcnZpY2UnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvZmZlci5yb3V0ZXNcIiwgW10pLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdvZmZlciBjb25maWcgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXG5cdFx0dmFyIE9GRkVSX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvb2ZmZXInO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21haW4ub2ZmZXInLCB7XG5cdFx0XHR1cmw6ICcvb2ZmZXInLFxuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR0ZW1wbGF0ZVVybDogT0ZGRVJfUEFUSCArICcvb2ZmZXIudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPZmZlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ21haW4ub2ZmZXIub3ZlcnZpZXcnLCB7XG5cdFx0XHR1cmw6ICcvb3ZlcnZpZXcnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IE9GRkVSX1BBVEggKyAnL292ZXJ2aWV3L292ZXJ2aWV3LnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ21haW4ub2ZmZXIuYWRkJywge1xuXHRcdFx0dXJsOiAnL2FkZC1vZmZlcicsXG5cdFx0XHR0ZW1wbGF0ZVVybDogT0ZGRVJfUEFUSCArICcvYWRkLW9mZmVyL2FkZC1vZmZlci52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0FkZE9mZmVyQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLnJvdXRlcy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvZmZlci5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiT2ZmZXJTZXJ2aWNlXCIsIE9mZmVyU2VydmljZSk7XG5cblx0ZnVuY3Rpb24gT2ZmZXJTZXJ2aWNlKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHZhciBvZmZlcnMgPSAkZmlyZWJhc2VBcnJheSgkZmlyZWJhc2VSZWYub2ZmZXJzKTtcblxuXHRcdHZhciBBUEkgPSB7XG5cdFx0XHRhZGRPZmZlcjogYWRkT2ZmZXIsXG5cdFx0XHRnZXRPZmZlcnM6IGdldE9mZmVycyxcblx0XHRcdGdldE9mZmVyOiBnZXRPZmZlcixcblx0XHRcdHVwZGF0ZU9mZmVyOiB1cGRhdGVPZmZlcixcblx0XHRcdGRlbGV0ZU9mZmVyOiBkZWxldGVPZmZlclxuXHRcdH07XG5cdFx0cmV0dXJuIEFQSTtcblxuXHRcdGZ1bmN0aW9uIGFkZE9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzLiRhZGQoe1xuXHRcdFx0XHRuYW1lOiBvZmZlci5uYW1lXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRPZmZlcnMoKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldE9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi5vZmZlcnMuY2hpbGQob2ZmZXIuJGlkKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlci4kc2F2ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZU9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzLiRyZW1vdmUob2ZmZXIpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvdmVydmlldy1vZmZlci5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXJcIiwgT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE92ZXJ2aWV3T2ZmZXJDb250cm9sbGVyKE9mZmVyU2VydmljZSwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW92ZXJ2aWV3LmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2V0dGluZ3MuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk9mZmVyQ29udHJvbGxlclwiLCBPZmZlckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE9mZmVyQ29udHJvbGxlcihTaGFyZSkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cblx0XHQvLyBzZXQgaGVhZGVyIHRpdGxlc1xuXHRcdHZtLmhlYWRlclRpdGxlID0gJ09mZmVycyc7XG5cdFx0dm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9IFNoYXJlLmhlYWRlckRlc2NyaXB0aW9uID0gJ292ZXJ2aWV3Jztcblx0XHQvL3ZtLm9wdGlvbmFsRGVzY3JpcHRpb24gPSAndGVzdCc7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzLm1vZHVsZScsIFsnc2V0dGluZ3Mucm91dGVzJywgJ3NldHRpbmdzLmNvbnRyb2xsZXInLCAnc2V0dGluZ3Muc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ3NldHRpbmdzIGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgU0VUVElOR1NfUEFUSCA9ICdhcHAvY29tcG9uZW50cy9zZXR0aW5ncyc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbi5zZXR0aW5ncycsIHtcblx0XHRcdHVybDogJy9zZXR0aW5ncycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogU0VUVElOR1NfUEFUSCArICcvc2V0dGluZ3Mudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTZXR0aW5nc0NvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2V0dGluZ3Muc2VydmljZVwiLCBbXSkuZmFjdG9yeShcIlNldHRpbmdzU2VydmljZVwiLCBTZXR0aW5nc1NlcnZpY2UpO1xuXG5cdGZ1bmN0aW9uIFNldHRpbmdzU2VydmljZSgkZmlyZWJhc2VSZWYsICRmaXJlYmFzZUFycmF5LCAkZmlyZWJhc2VPYmplY3QpIHtcblx0XHR2YXIgcHJvZmlsZSA9ICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYuc2V0dGluZ3MpO1xuXG5cdFx0dmFyIEFQSSA9IHtcblx0XHRcdGdldFByb2ZpbGU6IGdldFByb2ZpbGUsXG5cdFx0XHR1cGRhdGVQcm9maWxlOiB1cGRhdGVQcm9maWxlXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gZ2V0UHJvZmlsZSgpIHtcblx0XHRcdHJldHVybiBwcm9maWxlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZVByb2ZpbGUocHJvZmlsZSkge1xuXHRcdFx0cmV0dXJuIHByb2ZpbGUuJHNhdmUoKTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInVzZXIuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlVzZXJDb250cm9sbGVyXCIsIFVzZXJDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBVc2VyQ29udHJvbGxlcigpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ3VzZXIubW9kdWxlJywgWyd1c2VyLmNvbnRyb2xsZXInLCAndXNlci5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInVzZXIuc2VydmljZVwiLCBbXSkuZmFjdG9yeShcIlVzZXJTZXJ2aWNlXCIsIFVzZXJTZXJ2aWNlKTtcblxuXHRmdW5jdGlvbiBVc2VyU2VydmljZSgkZmlyZWJhc2VSZWYsICRmaXJlYmFzZUFycmF5LCAkZmlyZWJhc2VPYmplY3QpIHtcblx0XHR2YXIgdXNlcnMgPSAkZmlyZWJhc2VBcnJheSgkZmlyZWJhc2VSZWYudXNlcnMpO1xuXG5cdFx0dmFyIEFQSSA9IHtcblx0XHRcdGdldFVzZXJzOiBnZXRVc2Vycyxcblx0XHRcdGdldFVzZXI6IGdldFVzZXIsXG5cdFx0XHR1cGRhdGVVc2VyOiB1cGRhdGVVc2VyLFxuXHRcdFx0ZGVsZXRlVXNlcjogZGVsZXRlVXNlclxuXHRcdH07XG5cdFx0cmV0dXJuIEFQSTtcblxuXHRcdGZ1bmN0aW9uIGdldFVzZXJzKCkge1xuXHRcdFx0cmV0dXJuIHVzZXJzO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFVzZXIodWlkKSB7XG5cdFx0XHRyZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi51c2Vycy5jaGlsZCh1aWQpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVVc2VyKHVzZXIpIHtcblx0XHRcdHJldHVybiB1c2VyLiRzYXZlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlVXNlcih1c2VyKSB7XG5cdFx0XHRyZXR1cm4gdXNlcnMuJHJlbW92ZSh1c2VyKTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLnNlcnZpY2UuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm15QXBwXCIpLmNvbmZpZyhjb25maWcpLnJ1bihydW4pO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkZmlyZWJhc2VSZWZQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdjb25maWcgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBGaXJlYmFzZVxuXHRcdHZhciBDT05GSUcgPSB7XG5cdFx0XHRhcGlLZXk6IFwiQUl6YVN5RHNwX29CTThsUE9uRUdWbkJ5anNvZkd3N0twZnR6ZmU4XCIsXG5cdFx0XHRhdXRoRG9tYWluOiBcInBpb25lYXItZDA3MGUuZmlyZWJhc2VhcHAuY29tXCIsXG5cdFx0XHRkYXRhYmFzZVVSTDogXCJodHRwczovL3Bpb25lYXItZDA3MGUuZmlyZWJhc2Vpby5jb21cIixcblx0XHRcdHN0b3JhZ2VCdWNrZXQ6IFwicGlvbmVhci1kMDcwZS5hcHBzcG90LmNvbVwiLFxuXHRcdFx0bWVzc2FnaW5nU2VuZGVySWQ6IFwiOTY3NDA1ODYyNTFcIlxuXHRcdH07XG5cdFx0ZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChDT05GSUcpO1xuXG5cdFx0JGZpcmViYXNlUmVmUHJvdmlkZXIucmVnaXN0ZXJVcmwoe1xuXHRcdFx0ZGVmYXVsdDogQ09ORklHLmRhdGFiYXNlVVJMLFxuXHRcdFx0dXNlcnM6IENPTkZJRy5kYXRhYmFzZVVSTCArICcvdXNlcnMnLFxuXHRcdFx0b2ZmZXJzOiBDT05GSUcuZGF0YWJhc2VVUkwgKyAnL29mZmVycydcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJ1bihBdXRoLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24sICRzdGF0ZSkge1xuXHRcdGNvbnNvbGUubG9nKCdydW4gZnVuY3Rpb24gc3RhcnRlZCcpO1xuXHRcdGNoZWNrQXV0aCgpO1xuXG5cdFx0JHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKG5leHQsIGN1cnJlbnQpIHtcblx0XHRcdGNoZWNrQXV0aCgpO1xuXHRcdH0pO1xuXG5cdFx0JHJvb3RTY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VFcnJvclwiLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMsIGVycm9yKSB7XG5cdFx0XHQvLyBXZSBjYW4gY2F0Y2ggdGhlIGVycm9yIHRocm93biB3aGVuIHRoZSAkcmVxdWlyZVNpZ25JbiBwcm9taXNlIGlzIHJlamVjdGVkXG5cdFx0XHQvLyBhbmQgcmVkaXJlY3QgdGhlIHVzZXIgYmFjayB0byB0aGUgaG9tZSBwYWdlXG5cdFx0XHRpZiAoZXJyb3IgPT09IFwiQVVUSF9SRVFVSVJFRFwiKSB7XG5cdFx0XHRcdCRzdGF0ZS5nbyhcImhvbWVcIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBjaGVja0F1dGgoKSB7XG5cdFx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0aWYgKCF1c2VyKSAkbG9jYXRpb24ucGF0aCgnL2F1dGgvc2lnbi1pbicpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh1c2VyKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiY29yZS5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQ29yZUNvbnRyb2xsZXJcIiwgQ29yZUNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIENvcmVDb250cm9sbGVyKEF1dGgsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICRyb290U2NvcGUpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0uaXNUb2dnbGVkID0gZmFsc2U7XG5cblx0XHR2bS50b2dnbGVTaWRlYmFyUGFyZW50ID0gdG9nZ2xlU2lkZWJhclBhcmVudDtcblx0XHR2bS5zaWduT3V0ID0gc2lnbk91dDtcblxuXHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0aWYgKHVzZXIpIHZtLmN1cnJlbnRVc2VyID0gVXNlclNlcnZpY2UuZ2V0VXNlcih1c2VyLnVpZCk7XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBzaWduT3V0KCkge1xuXHRcdFx0QXV0aC4kc2lnbk91dCgpLnRoZW4odGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKCdZb3UgYXJlIHNpZ25lZCBvdXQuJykpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRvZ2dsZVNpZGViYXJQYXJlbnQoKSB7XG5cdFx0XHR2bS5pc1RvZ2dsZWQgPSAhdm0uaXNUb2dnbGVkO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuLy9cbi8vaW1wb3J0IENvcmVDb250cm9sbGVyIGZyb20gJy4vY29yZS5jb250cm9sbGVyLmpzJztcbi8vXG4vL2V4cG9ydCBkZWZhdWx0IGFuZ3VsYXJcbi8vXHRcdC5tb2R1bGUoJ2NvcmVNb2R1bGUnLCBbXSlcbi8vXHRcdC5jb250cm9sbGVyKCdhdXRoLmNvbnRyb2xsZXInLCBDb3JlQ29udHJvbGxlcilcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdjb3JlLm1vZHVsZScsIFsnY29yZS5jb250cm9sbGVyJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL2ltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG4vL1xuLy9pbXBvcnQgQ29yZUNvbnRyb2xsZXIgZnJvbSAnLi9jb3JlLmNvbnRyb2xsZXIuanMnO1xuLy9cbi8vZXhwb3J0IGRlZmF1bHQgYW5ndWxhclxuLy9cdFx0Lm1vZHVsZSgnY29yZU1vZHVsZScsIFtdKVxuLy9cdFx0LmNvbnRyb2xsZXIoJ2F1dGguY29udHJvbGxlcicsIENvcmVDb250cm9sbGVyKVxuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2NvcmUubW9kdWxlJywgWydjb3JlLmNvbnRyb2xsZXInXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5tb2R1bGVzLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2JvZHktY2xhc3Nlcy5kaXJlY3RpdmUnLCBbXSkuZGlyZWN0aXZlKCdib2R5Q2xhc3NlcycsIGJvZHlDbGFzc2VzKTtcblxuXHRmdW5jdGlvbiBib2R5Q2xhc3Nlcygkcm9vdFNjb3BlKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0XHRzY29wZToge30sXG5cdFx0XHRsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG5cblx0XHRcdFx0JHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcblx0XHRcdFx0XHR2YXIgZnJvbUNsYXNzbmFtZXMgPSBhbmd1bGFyLmlzRGVmaW5lZChmcm9tU3RhdGUuZGF0YSkgJiYgYW5ndWxhci5pc0RlZmluZWQoZnJvbVN0YXRlLmRhdGEuYm9keUNsYXNzZXMpID8gZnJvbVN0YXRlLmRhdGEuYm9keUNsYXNzZXMgOiBudWxsO1xuXHRcdFx0XHRcdHZhciB0b0NsYXNzbmFtZXMgPSBhbmd1bGFyLmlzRGVmaW5lZCh0b1N0YXRlLmRhdGEpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKHRvU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcykgPyB0b1N0YXRlLmRhdGEuYm9keUNsYXNzZXMgOiBudWxsO1xuXG5cdFx0XHRcdFx0Ly8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhleSBhcmUgdGhlIHNhbWVcblx0XHRcdFx0XHRpZiAoZnJvbUNsYXNzbmFtZXMgIT0gdG9DbGFzc25hbWVzKSB7XG5cdFx0XHRcdFx0XHRpZiAoZnJvbUNsYXNzbmFtZXMpIGVsZW0ucmVtb3ZlQ2xhc3MoZnJvbUNsYXNzbmFtZXMpO1xuXHRcdFx0XHRcdFx0aWYgKHRvQ2xhc3NuYW1lcykgZWxlbS5hZGRDbGFzcyh0b0NsYXNzbmFtZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvZHktY2xhc3Nlcy5kaXJlY3RpdmUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnZGlyZWN0aXZlcy5tb2R1bGUnLCBbJ2xvYWRpbmcuZGlyZWN0aXZlJywgJ3BhZ2UtaGVhZGVyLmRpcmVjdGl2ZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXJlY3RpdmVzLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhhbXBsZS5kZXJlY3RpdmUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBFeGFtcGxlRGlyZWN0aXZlID0gZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBFeGFtcGxlRGlyZWN0aXZlKCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFeGFtcGxlRGlyZWN0aXZlKTtcblxuXHRcdHRoaXMudGVtcGxhdGUgPSAnPGRpdj57e2N0cmwubmFtZX19PC9kaXY+Jztcblx0XHR0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuXHRcdHRoaXMuc2NvcGUgPSB7fTtcblxuXHRcdHRoaXMuY29udHJvbGxlciA9IEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyO1xuXHRcdHRoaXMuY29udHJvbGxlckFzID0gJ2N0cmwnO1xuXHRcdHRoaXMuYmluZFRvQ29udHJvbGxlciA9IHRydWU7XG5cdH1cblxuXHQvLyBEaXJlY3RpdmUgY29tcGlsZSBmdW5jdGlvblxuXG5cblx0X2NyZWF0ZUNsYXNzKEV4YW1wbGVEaXJlY3RpdmUsIFt7XG5cdFx0a2V5OiAnY29tcGlsZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7fVxuXG5cdFx0Ly8gRGlyZWN0aXZlIGxpbmsgZnVuY3Rpb25cblxuXHR9LCB7XG5cdFx0a2V5OiAnbGluaycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGxpbmsoKSB7fVxuXHR9XSk7XG5cblx0cmV0dXJuIEV4YW1wbGVEaXJlY3RpdmU7XG59KCk7XG5cbi8vIERpcmVjdGl2ZSdzIGNvbnRyb2xsZXJcblxuXG5leHBvcnRzLmRlZmF1bHQgPSBFeGFtcGxlRGlyZWN0aXZlO1xuXG52YXIgRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbiBFeGFtcGxlRGlyZWN0aXZlQ29udHJvbGxlcigpIHtcblx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyKTtcblxuXHR0aGlzLm5hbWUgPSAnWWFzc2luZSc7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhhbXBsZS5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJsb2FkaW5nLmRpcmVjdGl2ZVwiLCBbXSkuZGlyZWN0aXZlKFwibG9hZGluZ1NwaW5uZXJcIiwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0ZGF0YTogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdhcHAvc2hhcmVkL2RpcmVjdGl2ZXMvbG9hZGluZy5kaXJlY3RpdmUvbG9hZGluZy50ZW1wbGF0ZS5odG1sJ1xuXHRcdH07XG5cdH0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvYWRpbmcuZGlyZWN0aXZlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwicGFnZS1oZWFkZXIuZGlyZWN0aXZlXCIsIFtdKS5kaXJlY3RpdmUoXCJwYWdlSGVhZGVyXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdHRpdGxlOiAnQCcsXG5cdFx0XHRcdG9wdGlvbmFsRGVzY3JpcHRpb246ICdAJyxcblx0XHRcdFx0dG9nZ2xlOiAnJidcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiBjb250cm9sbGVyKCRzY29wZSkge1xuXHRcdFx0XHQkc2NvcGUudG9nZ2xlVmFsdWUgPSBmYWxzZTtcblx0XHRcdFx0JHNjb3BlLnRvZ2dsZVNpZGViYXJJbnNpZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JHNjb3BlLnRvZ2dsZVZhbHVlID0gISRzY29wZS50b2dnbGVWYWx1ZTtcblx0XHRcdFx0XHQkc2NvcGUudG9nZ2xlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdhcHAvc2hhcmVkL2RpcmVjdGl2ZXMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudGVtcGxhdGUuaHRtbCdcblx0XHR9O1xuXHR9KTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlLWhlYWRlci5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibGF5b3V0Lm1vZHVsZVwiLCBbXCJzaWRlYmFyLmNvbnRyb2xsZXJcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2lkZWJhci5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiU2lkZWJhckNvbnRyb2xsZXJcIiwgU2lkZWJhckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFNpZGViYXJDb250cm9sbGVyKCRsb2NhdGlvbiwgQXV0aCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cblx0XHR2bS5zaWduT3V0ID0gc2lnbk91dDtcblxuXHRcdGZ1bmN0aW9uIHNpZ25PdXQoKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnc2lnbm91dCcpO1xuXHRcdFx0QXV0aC4kc2lnbk91dCgpLnRoZW4odGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKCdZb3UgYXJlIHNpZ25lZCBvdXQuJykpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZGViYXIuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRhbmd1bGFyLm1vZHVsZShcIm5hdi5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiTmF2Q29udHJvbGxlclwiLCBOYXZDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBOYXZDb250cm9sbGVyKCRsb2NhdGlvbiwgQXV0aCwgRnVuY3Rpb25zKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR2YXIgX2ZzID0gRnVuY3Rpb25zO1xuXHRcdHZtLnNpZ25PdXQgPSBzaWduT3V0O1xuXHRcdHZtLmlzQWN0aXZlID0gaXNBY3RpdmU7XG5cdFx0Ly8gaW5pdGlhbGl6ZSB2aWV3IGRhdGFcblx0XHRmdW5jdGlvbiBpbml0KCkge31cblxuXHRcdGluaXQoKTtcblxuXHRcdC8vdm0uYXV0aC4kb25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uKHVzZXIpIHtcblx0XHQvL1x0dm0udXNlciA9IHVzZXI7XG5cdFx0Ly99KTtcblxuXHRcdGZ1bmN0aW9uIHNpZ25PdXQoKSB7XG5cdFx0XHRBdXRoLiRzaWduT3V0KCkudGhlbihfZnMudG9hc3QoJ1lvdSBhcmUgc2lnbmVkIG91dC4nKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaXNBY3RpdmUoZGVzdGluYXRpb24pIHtcblx0XHRcdHJldHVybiBkZXN0aW5hdGlvbiA9PT0gJGxvY2F0aW9uLnBhdGgoKTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXYuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgYW5ndWxhci5tb2R1bGUoXCJuYXYubW9kdWxlXCIsIFtcIm5hdi5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXYubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImF1dGguZmFjdG9yeVwiLCBbXSkuZmFjdG9yeShcIkF1dGhcIiwgQXV0aCk7XG5cblx0ZnVuY3Rpb24gQXV0aCgkZmlyZWJhc2VBdXRoKSB7XG5cdFx0cmV0dXJuICRmaXJlYmFzZUF1dGgoKTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGguZmFjdG9yeS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJmdW5jdGlvbnMuZmFjdG9yeVwiLCBbXSkuZmFjdG9yeShcIkZ1bmN0aW9uc1wiLCBGdW5jdGlvbnMpO1xuXG4gIGZ1bmN0aW9uIEZ1bmN0aW9ucygpIHtcblxuICAgIHZhciBGVU5DVElPTlMgPSB7XG4gICAgICB0b2FzdDogdG9hc3RcbiAgICB9O1xuICAgIHJldHVybiBGVU5DVElPTlM7XG5cbiAgICAvLyB0b2FzdCBwb3B1cCB3aXRoIGN1c3RvbSBtc2dcbiAgICBmdW5jdGlvbiB0b2FzdChtc2cpIHtcbiAgICAgIHZhciB0aW1lID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAzMDAwO1xuXG4gICAgICBNYXRlcmlhbGl6ZS50b2FzdChtc2csIHRpbWUpO1xuICAgIH1cbiAgfVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZ1bmN0aW9ucy5mYWN0b3J5LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZShcImZ1bmN0aW9ucy5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiRnVuY3Rpb25zXCIsIEZ1bmN0aW9ucyk7XG5cbiAgZnVuY3Rpb24gRnVuY3Rpb25zKHRvYXN0cikge1xuXG4gICAgdmFyIEZVTkNUSU9OUyA9IHtcbiAgICAgIHRvYXN0OiB0b2FzdFxuICAgIH07XG4gICAgcmV0dXJuIEZVTkNUSU9OUztcblxuICAgIC8vIHRvYXN0IHBvcHVwIHdpdGggY3VzdG9tIG1zZ1xuICAgIC8vIGluZm86Ymx1ZSBzdWNjZXNzOmdyZWVuIGVycm9yOnJlZCB3YXJuaW5nOm9yYW5nZVxuICAgIGZ1bmN0aW9uIHRvYXN0KCkge1xuICAgICAgcmV0dXJuIHRvYXN0cjtcbiAgICB9XG4gIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mdW5jdGlvbnMuc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzZXJ2aWNlcy5tb2R1bGVcIiwgW1wiZnVuY3Rpb25zLmZhY3RvcnlcIiwgXCJzaGFyZS5zZXJ2aWNlXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2aWNlcy5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2hhcmUuc2VydmljZVwiLCBbXSkuc2VydmljZShcIlNoYXJlXCIsIFNoYXJlKTtcblxuXHRmdW5jdGlvbiBTaGFyZSgpIHtcblx0XHR0aGlzLmhlYWRlckRlc2NyaXB0aW9uID0gJyc7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFyZS5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInVzZXIuZmFjdG9yeVwiLCBbXSkuZmFjdG9yeShcIlVzZXJcIiwgVXNlcik7XG5cblx0ZnVuY3Rpb24gVXNlcigkZmlyZWJhc2VSZWYsICRmaXJlYmFzZUFycmF5LCAkZmlyZWJhc2VPYmplY3QpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi51c2Vycyk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLmZhY3RvcnkuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnc2hhcmVkLm1vZHVsZScsIFsnc2VydmljZXMubW9kdWxlJywgJ2RpcmVjdGl2ZXMubW9kdWxlJywgJ2xheW91dC5tb2R1bGUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmVkLm1vZHVsZS5qcy5tYXBcbiJdfQ==
