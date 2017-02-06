(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('myApp', [
	//	Third Party Modules
	'ui.router', 'firebase', 'toastr', 'nemLogging', 'uiGmapgoogle-maps',
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
		$urlRouterProvider.otherwise('/d/dashboard');
		$stateProvider.state('main', {
			url: '/d',
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
"use strict";

(function () {
	'use strict';

	angular.module("auth.controller", []).controller("AuthController", AuthController);

	function AuthController(Auth, UserService, Functions, $location) {
		var vm = this;
		this._fs = Functions;

		vm.signUp = signUp;
		vm.signIn = signIn;
		vm.credentialsX = {};
		vm.loading = true;

		Auth.$onAuthStateChanged(function (user) {
			if (user) $location.path('/');
		});

		function signIn(credentials) {
			var _this = this;

			console.log(credentials);
			console.log('singin');
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

		function signUp() {
			var _this2 = this;

			console.log(vm.credentialsX);
			Auth.$createUserWithEmailAndPassword(vm.credentialsX.email, vm.credentialsX.pass).then(function (user) {
				var newUser = UserService.getUser(user.uid);
				console.log(vm.credentialsX);
				newUser.email = user.email;
				newUser.name = vm.credentialsX.name;
				newUser.company = vm.credentialsX.company;
				newUser.address = vm.credentialsX.address;
				newUser.zipcode = vm.credentialsX.zipcode;
				newUser.phone = vm.credentialsX.phone;
				newUser.land = vm.credentialsX.land;
				newUser.$save().then(_this2._fs.toast().success('Signed up successfully!')).then($location.path('/'));
			}).catch(function (error) {
				_this2._fs.toast().error(error.message);
				console.error("Error: ", error);
				vm.error = error.message;
			});
		}
	}
})();


},{}],24:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('auth.module', ['auth.routes', 'auth.controller', 'auth.service']);
})();


},{}],25:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("auth.routes", []).config(config);

	function config($stateProvider) {
		console.log('auth config function started');

		var AUTH_PATH = 'app/components/auth';

		$stateProvider.state('auth', {
			url: '/auth',
			templateUrl: AUTH_PATH + '/auth.view.html',
			controller: 'AuthController',
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

	angular.module('components.module', ['auth.module', 'dashboard.module', 'offer.module', 'settings.module', 'photo.module', 'user.module', 'main.module']);
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
				vm.newPhoto;

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
						OfferService.addOffer(vm.newPhoto).then(console.log(vm.newPhoto)).then(this._fs.toast().success("Added new offer " + vm.newPhoto.name)).then(vm.newPhoto = {});
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
			controller: 'PhotoController',
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


},{}],49:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],50:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("add-photo.controller", []).controller("AddPhotoController", AddPhotoController);

	function AddPhotoController(PhotoService, Functions, Share, $scope, $log, GoogleMapApi, uiGmapGoogleMapApi) {
		var vm = this;
		this._fs = Functions;

		// viewmodel variables
		vm.newPhoto;

		vm.optionalDescription = Share.headerDescription = 'add';
		vm.map = {
			center: { latitude: 45, longitude: -73 },
			zoom: 8,
			searchbox: {
				template: 'searchbox.tpl.html',
				events: {
					places_changed: function places_changed(searchBox) {
						console.log(searchBox);
					}
				}
			},
			options: {
				scrollwheel: false
			}
		};

		//GoogleMapApi.then(function(maps) {
		//	maps.visualRefresh = true;
		//});
		//uiGmapGoogleMapApi.then(function(maps) {
		//	maps.visualRefresh = true;
		//});

		// functions
		vm.addPhoto = addPhoto;
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
		function addPhoto() {
			PhotoService.addPhoto(vm.newPhoto).then(console.log(vm.newPhoto)).then(this._fs.toast().success("Added new offer " + vm.newPhoto.name)).then(vm.newPhoto = {});
		}
	}
})();


},{}],51:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],52:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],53:[function(require,module,exports){
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


},{}],54:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],55:[function(require,module,exports){
"use strict";

(function () {
	"use strict";

	angular.module("overview-photo.controller", []).controller("OverviewPhotoController", OverviewPhotoController);

	function OverviewPhotoController(Functions) {
		var vm = this;
		this._fs = Functions;
	}
})();


},{}],56:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("photo.controller", []).controller("PhotoController", PhotoController);

	function PhotoController(Share) {
		var vm = this;
		console.log(Share);

		// set header titles
		vm.headerTitle = 'Photos';
		vm.optionalDescription = Share.headerDescription = 'overview';
	}
})();


},{}],57:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('photo.module', ['photo.routes', 'photo.controller', 'overview-photo.controller', 'add-photo.controller', 'photo.service']);
})();


},{}],58:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("photo.routes", []).config(config);

	function config($stateProvider) {
		console.log('photo config function started');

		var PHOTO_PATH = 'app/components/photo';

		$stateProvider.state('main.photo', {
			url: '/photo',
			abstract: true,
			templateUrl: PHOTO_PATH + '/photo.view.html',
			controller: 'PhotoController',
			controllerAs: 'vm'
		}).state('main.photo.overview', {
			url: '/overview',
			templateUrl: PHOTO_PATH + '/overview/overview.view.html',
			controller: 'OverviewPhotoController',
			controllerAs: 'vm'
		}).state('main.photo.add', {
			url: '/add-photo',
			templateUrl: PHOTO_PATH + '/add-photo/add-photo.view.html',
			controller: 'AddPhotoController',
			controllerAs: 'vm'
		});
	}
})();


},{}],59:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("photo.service", []).factory("PhotoService", PhotoService);

	function PhotoService($firebaseRef, $firebaseArray, $firebaseObject, $firebaseStorage) {
		var photos = $firebaseArray($firebaseRef.photos);
		var storage = firebase.storage().ref("images/photos");

		var API = {
			addPhoto: addPhoto,
			getPhotos: getPhotos,
			getStorage: getStorage,
			getPhoto: getPhoto,
			updatePhoto: updatePhoto,
			deletePhoto: deletePhoto
		};
		return API;

		function addPhoto(photo) {
			return photos.$add({
				name: photo.name
			});
		}

		function getPhotos() {
			return photos;
		}

		function getStorage() {
			return $firebaseStorage(storage);
		}

		function getPhoto(photo) {
			return $firebaseObject($firebaseRef.photos.child(photo.$id));
		}

		function updatePhoto(photo) {
			return photo.$save();
		}

		function deletePhoto(photo) {
			return photos.$remove(photo);
		}
	}
})();


},{}],60:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],61:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],62:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],63:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"dup":53}],64:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],65:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],66:[function(require,module,exports){
"use strict";

(function () {
		'use strict';

		angular.module("settings.controller", []).controller("SettingsController", SettingsController);

		function SettingsController(Share, UserService, Auth, Functions) {
				var vm = this;
				this._fs = Functions;

				vm.updateProfile = updateProfile;

				// set header titles
				vm.headerTitle = 'Account settings';
				vm.optionalDescription = Share.headerDescription = 'overview';

				function init() {
						getUser();
				}
				init();

				function getUser() {
						Auth.$onAuthStateChanged(function (user) {
								if (user) {
										vm.currentUser = UserService.getUser(user.uid);
										console.log(vm.currentUser);
								}
						});
				}

				function updateProfile() {
						UserService.updateUser(vm.currentUser).then(this._fs.toast().success("Updated profile"));
				}
		}
})();


},{}],67:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('settings.module', ['settings.routes', 'settings.controller', 'settings.service']);
})();


},{}],68:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("settings.routes", []).config(config);

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


},{}],69:[function(require,module,exports){
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


},{}],70:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.controller", []).controller("UserController", UserController);

	function UserController() {
		var vm = this;
	}
})();


},{}],71:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('user.module', ['user.controller', 'user.service']);
})();


},{}],72:[function(require,module,exports){
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


},{}],73:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module("myApp").config(config).run(run);

	function config($firebaseRefProvider, uiGmapGoogleMapApiProvider) {
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
			offers: CONFIG.databaseURL + '/offers',
			photos: CONFIG.databaseURL + '/photos'
		});

		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyBnsamIJVVYhw9qI1nS7ooFHgkhxnsGBeE',
			v: '3.20', //defaults to latest 3.X anyhow
			libraries: 'places, geometry, visualization'
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
				$state.go("auth");
			}
		});

		function checkAuth() {
			Auth.$onAuthStateChanged(function (user) {
				if (!user) $location.path('/auth');
				console.log(user);
			});
		}
	};
})();


},{}],74:[function(require,module,exports){
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


},{}],75:[function(require,module,exports){
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


},{}],76:[function(require,module,exports){
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


},{}],77:[function(require,module,exports){
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


},{}],78:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('directives.module', ['loading.directive', 'page-header.directive']);
})();


},{}],79:[function(require,module,exports){
"use strict";


},{}],80:[function(require,module,exports){
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


},{}],81:[function(require,module,exports){
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


},{}],82:[function(require,module,exports){
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


},{}],83:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("layout.module", ["sidebar.controller"]);
})();


},{}],84:[function(require,module,exports){
"use strict";

(function () {
		'use strict';

		angular.module("sidebar.controller", []).controller("SidebarController", SidebarController);

		function SidebarController($location, Auth, Functions) {
				var vm = this;
				this._fs = Functions;
				vm.signOut = signOut;

				function signOut() {
						console.log('signout');
						Auth.$signOut().then(this._fs.toast().success('You are signed out.')).then($location.path('/auth'));
				}
		}
})();


},{}],85:[function(require,module,exports){
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


},{}],86:[function(require,module,exports){
'use strict';

(function () {
  angular.module("nav.module", ["nav.controller"]);
})();


},{}],87:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("auth.factory", []).factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();


},{}],88:[function(require,module,exports){
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


},{}],89:[function(require,module,exports){
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


},{}],90:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("services.module", ["functions.factory", "share.service"]);
})();


},{}],91:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("share.service", []).service("Share", Share);

	function Share() {
		this.headerDescription = '';
	}
})();


},{}],92:[function(require,module,exports){
"use strict";

(function () {
	'use strict';

	angular.module("user.factory", []).factory("User", User);

	function User($firebaseRef, $firebaseArray, $firebaseObject) {
		return $firebaseObject($firebaseRef.users);
	}
})();


},{}],93:[function(require,module,exports){
'use strict';

(function () {
	'use strict';

	angular.module('shared.module', ['services.module', 'directives.module', 'layout.module']);
})();


},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5yb3V0ZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZGQtYWR2ZXJ0aXNtZW50L2FkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkZC1hZHZlcnRpc21lbnQvc2lnbi11cC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZHZlcnRpc21lbnQubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkdmVydGlzbWVudC5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hdXRoLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2F1dGguc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L292ZXJ2aWV3L292ZXJ2aWV3LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9vdmVydmlldy9zaWduLWluLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hdXRoL2F1dGgucm91dGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2NvbXBvbmVudHMubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvbWFpbi5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2Rhc2hib2FyZC9tYWluLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9vZmZlci9hZGQtb2ZmZXIvYWRkLW9mZmVyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb2ZmZXIuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9vZmZlci9vZmZlci5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb2ZmZXIucm91dGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL29mZmVyLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb3ZlcnZpZXcvb3ZlcnZpZXcuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9waG90by9hZGQtb2ZmZXIvYWRkLW9mZmVyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvcGhvdG8vYWRkLXBob3RvL2FkZC1waG90by5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3Bob3RvL29mZmVyLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9waG90by9vdmVydmlldy9vdmVydmlldy5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3Bob3RvL3Bob3RvLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvcGhvdG8vcGhvdG8ubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3Bob3RvL3Bob3RvLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9waG90by9waG90by5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3VzZXIvdXNlci5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3VzZXIvdXNlci5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbmZpZy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvcmUvY29yZS5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvcmUvY29yZS5tb2R1bGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9ib2R5LWNsYXNzZXMvYm9keS1jbGFzc2VzLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2V4YW1wbGUuZGVyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9leGFtcGxlLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvbG9hZGluZy9sb2FkaW5nLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvbGF5b3V0L2xheW91dC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9sYXlvdXQvc2lkZWJhci9zaWRlYmFyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9uYXZpZ2F0aW9uL25hdi5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvbmF2aWdhdGlvbi9uYXYubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvYXV0aC5mYWN0b3J5LmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvZnVuY3Rpb25zLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9mdW5jdGlvbnMuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3NoYXJlLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy91c2VyLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zaGFyZWQubW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ215QXBwJywgW1xuXHQvL1x0VGhpcmQgUGFydHkgTW9kdWxlc1xuXHQndWkucm91dGVyJywgJ2ZpcmViYXNlJywgJ3RvYXN0cicsICduZW1Mb2dnaW5nJywgJ3VpR21hcGdvb2dsZS1tYXBzJyxcblx0Ly9cdE15IE1vZHVsZXNcblx0J2NvbXBvbmVudHMubW9kdWxlJywgJ3NoYXJlZC5tb2R1bGUnLCAnY29yZS5tb2R1bGUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLm1vZHVsZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibXlBcHBcIikuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FwcC5yb3V0ZXMgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXHRcdHZhciBCQVNFX1BBVEggPSAnYXBwL2NvbXBvbmVudHMnO1xuXG5cdFx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblx0XHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvZC9kYXNoYm9hcmQnKTtcblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbicsIHtcblx0XHRcdHVybDogJy9kJyxcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEJBU0VfUEFUSCArICcvbWFpbi9tYWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nLFxuXHRcdFx0cmVzb2x2ZToge1xuXHRcdFx0XHQvLyBjb250cm9sbGVyIHdpbGwgbm90IGJlIGxvYWRlZCB1bnRpbCAkcmVxdWlyZVNpZ25JbiByZXNvbHZlc1xuXHRcdFx0XHQvLyBBdXRoIHJlZmVycyB0byBvdXIgJGZpcmViYXNlQXV0aCB3cmFwcGVyIGluIHRoZSBmYWN0b3J5IGJlbG93XG5cdFx0XHRcdFwiY3VycmVudEF1dGhcIjogW1wiQXV0aFwiLCBmdW5jdGlvbiAoQXV0aCkge1xuXHRcdFx0XHRcdC8vICRyZXF1aXJlU2lnbkluIHJldHVybnMgYSBwcm9taXNlIHNvIHRoZSByZXNvbHZlIHdhaXRzIGZvciBpdCB0byBjb21wbGV0ZVxuXHRcdFx0XHRcdC8vIElmIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkLCBpdCB3aWxsIHRocm93IGEgJHN0YXRlQ2hhbmdlRXJyb3IgKHNlZSBhYm92ZSlcblx0XHRcdFx0XHRyZXR1cm4gQXV0aC4kcmVxdWlyZVNpZ25JbigpO1xuXHRcdFx0XHR9XVxuXHRcdFx0fVxuXHRcdH0pLnN0YXRlKCdtYWluLmRhc2hib2FyZCcsIHtcblx0XHRcdHVybDogJy9kYXNoYm9hcmQnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEJBU0VfUEFUSCArICcvZGFzaGJvYXJkL2Rhc2hib2FyZC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0Rhc2hib2FyZENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWRkLWFkdmVydGlzbWVudC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQWRkQWR2ZXJ0aXNtZW50Q29udHJvbGxlclwiLCBBZGRBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBZGRBZHZlcnRpc21lbnRDb250cm9sbGVyKEFkdmVydGlzbWVudFNlcnZpY2UsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICR0aW1lb3V0LCAkbG9jYXRpb24pIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRkLWFkdmVydGlzbWVudC5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2lnbi11cC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiU2lnblVwQ29udHJvbGxlclwiLCBTaWduVXBDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBTaWduVXBDb250cm9sbGVyKEF1dGgsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICR0aW1lb3V0LCAkbG9jYXRpb24pIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiB1cCBmb3IgUGlvbmVhcic7XG5cblx0XHR2bS5zaWduVXAgPSBzaWduVXA7XG5cblx0XHRmdW5jdGlvbiBzaWduVXAoY3JlZGVudGlhbHMpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdEF1dGguJGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzcykudGhlbihmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHR2YXIgbmV3VXNlciA9IFVzZXJTZXJ2aWNlLmdldFVzZXIodXNlci51aWQpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhjcmVkZW50aWFscyk7XG5cdFx0XHRcdG5ld1VzZXIuZW1haWwgPSB1c2VyLmVtYWlsO1xuXHRcdFx0XHRuZXdVc2VyLm5hbWUgPSBjcmVkZW50aWFscy5uYW1lO1xuXHRcdFx0XHRuZXdVc2VyLmNvbXBhbnkgPSBjcmVkZW50aWFscy5jb21wYW55O1xuXHRcdFx0XHRuZXdVc2VyLmFkZHJlc3MgPSBjcmVkZW50aWFscy5hZGRyZXNzO1xuXHRcdFx0XHRuZXdVc2VyLnppcGNvZGUgPSBjcmVkZW50aWFscy56aXBjb2RlO1xuXHRcdFx0XHRuZXdVc2VyLnBob25lID0gY3JlZGVudGlhbHMucGhvbmU7XG5cdFx0XHRcdG5ld1VzZXIubGFuZCA9IGNyZWRlbnRpYWxzLmxhbmQ7XG5cdFx0XHRcdG5ld1VzZXIuJHNhdmUoKS50aGVuKF90aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoJ1NpZ25lZCB1cCBzdWNjZXNzZnVsbHkhJykpLnRoZW4oJGxvY2F0aW9uLnBhdGgoJy8nKSk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogXCIsIGVycm9yKTtcblx0XHRcdFx0dm0uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbi11cC5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImFkdmVydGlzbWVudC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQWR2ZXJ0aXNtZW50Q29udHJvbGxlclwiLCBBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBZHZlcnRpc21lbnRDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0Y29uc29sZS5sb2coJ2FkZCBjb250cm9sJyk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhZHZlcnRpc21lbnQubW9kdWxlJywgWydhZHZlcnRpc21lbnQucm91dGVzJywgJ2FkdmVydGlzbWVudC5jb250cm9sbGVyJywgJ292ZXJ2aWV3LWFkdmVydGlzbWVudC5jb250cm9sbGVyJywgJ2FkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlcicsICdhZHZlcnRpc21lbnQuc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhZHZlcnRpc21lbnQucm91dGVzXCIsIFtdKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnYWR2ZXJ0aXNtZW50IGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgQURWRVJUSVNNRU5UX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvYWR2ZXJ0aXNtZW50JztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhZHZlcnRpc21lbnQnLCB7XG5cdFx0XHR1cmw6ICcvYWR2ZXJ0aXNtZW50Jyxcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFEVkVSVElTTUVOVF9QQVRIICsgJy9hZHZlcnRpc21lbnQudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZHZlcnRpc21lbnRDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdhZHZlcnRpc21lbnQub3ZlcnZpZXcnLCB7XG5cdFx0XHR1cmw6ICcvb3ZlcnZpZXcnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFEVkVSVElTTUVOVF9QQVRIICsgJy9hZHZlcnRpc21lbnQvb3ZlcnZpZXcudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ2FkdmVydGlzbWVudC5hZGQnLCB7XG5cdFx0XHR1cmw6ICcvYWRkLWFkdmVydGlzbWVudCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQURWRVJUSVNNRU5UX1BBVEggKyAnL2FkdmVydGlzbWVudC9hZGQtYWR2ZXJ0aXNtZW50LnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkQWR2ZXJ0aXNtZW50Q29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkdmVydGlzbWVudC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWR2ZXJ0aXNtZW50LnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJBZHZlcnRpc21lbnRTZXJ2aWNlXCIsIEFkdmVydGlzbWVudFNlcnZpY2UpO1xuXG5cdGZ1bmN0aW9uIEFkdmVydGlzbWVudFNlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIGFkdmVydGlzbWVudHMgPSAkZmlyZWJhc2VBcnJheSgkZmlyZWJhc2VSZWYuYWR2ZXJ0aXNtZW50cyk7XG5cblx0XHR2YXIgQVBJID0ge1xuXHRcdFx0Z2V0QWRzOiBnZXRBZHMsXG5cdFx0XHRnZXRBZDogZ2V0QWQsXG5cdFx0XHR1cGRhdGVBZDogdXBkYXRlQWQsXG5cdFx0XHRkZWxldGVBZDogZGVsZXRlQWRcblx0XHR9O1xuXHRcdHJldHVybiBBUEk7XG5cblx0XHRmdW5jdGlvbiBnZXRBZHMoKSB7XG5cdFx0XHRyZXR1cm4gYWR2ZXJ0aXNtZW50cztcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRBZCh1aWQpIHtcblx0XHRcdC8vcmV0dXJuICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYuYWR2ZXJ0aXNtZW50cy5jaGlsZCh1aWQpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVBZChhZHZlcnRpc21lbnQpIHtcblx0XHRcdHJldHVybiBhZHZlcnRpc21lbnQuJHNhdmUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBkZWxldGVBZChhZHZlcnRpc21lbnQpIHtcblx0XHRcdHJldHVybiBhZHZlcnRpc21lbnRzLiRyZW1vdmUoYWR2ZXJ0aXNtZW50KTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQuc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBdXRoQ29udHJvbGxlclwiLCBBdXRoQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQXV0aENvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGguY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhdXRoLm1vZHVsZScsIFsnYXV0aC5yb3V0ZXMnLCAnYXV0aC5jb250cm9sbGVyJywgJ3NpZ24taW4uY29udHJvbGxlcicsICdzaWduLXVwLmNvbnRyb2xsZXInLCAnYXV0aC5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2F1dGggY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBVVRIX1VSTCA9ICdhcHAvY29tcG9uZW50cy9hdXRoJztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhdXRoJywge1xuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR1cmw6ICcvYXV0aCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL2F1dGgudmlldy5odG1sJ1xuXHRcdH0pLnN0YXRlKCdhdXRoLnNpZ25pbicsIHtcblx0XHRcdHVybDogJy9zaWduLWluJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1VSTCArICcvc2lnbi1pbi9zaWduLWluLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnU2lnbkluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWdudXAnLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi11cCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL3NpZ24tdXAvc2lnbi11cC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1NpZ25VcENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdFx0Ly9jb25zdCBjb25maWcgPSB7XG5cdFx0Ly9cdGFwaUtleTogICAgICAgICAgICBcIkFJemFTeUNwSFVwM045aXV3TzJCRS1BYmpyMEMtbEUxbTQyNGxCSVwiLFxuXHRcdC8vXHRhdXRoRG9tYWluOiAgICAgICAgXCJ6YXB6aXRlLWI0N2Y5LmZpcmViYXNlYXBwLmNvbVwiLFxuXHRcdC8vXHRkYXRhYmFzZVVSTDogICAgICAgXCJodHRwczovL3phcHppdGUtYjQ3ZjkuZmlyZWJhc2Vpby5jb21cIixcblx0XHQvL1x0c3RvcmFnZUJ1Y2tldDogICAgIFwiemFweml0ZS1iNDdmOS5hcHBzcG90LmNvbVwiLFxuXHRcdC8vXHRtZXNzYWdpbmdTZW5kZXJJZDogXCI1NTQ1ODU1NDc4NDhcIlxuXHRcdC8vfTtcblx0XHQvL2ZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcblx0XHQvL1xuXHRcdC8vJGZpcmViYXNlUmVmUHJvdmlkZXIucmVnaXN0ZXJVcmwoe1xuXHRcdC8vXHRkZWZhdWx0OiAgICBjb25maWcuZGF0YWJhc2VVUkwsXG5cdFx0Ly9cdGNhdGVnb3JpZXM6IGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vY2F0ZWdvcmllc2AsXG5cdFx0Ly9cdHNpdGVzOiAgICAgIGAke2NvbmZpZy5kYXRhYmFzZVVSTH0vc2l0ZXNgLFxuXHRcdC8vXHR1c2VyczogICAgICBgJHtjb25maWcuZGF0YWJhc2VVUkx9L3VzZXJzYFxuXHRcdC8vfSk7XG5cdFx0Ly9cblx0XHQvLyR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblx0XHQvLyRzdGF0ZVByb3ZpZGVyXG5cdFx0Ly9cdFx0LnN0YXRlKCdtYWluJywge1xuXHRcdC8vXHRcdFx0dXJsOiAnLycsXG5cdFx0Ly9cdFx0XHR0ZW1wbGF0ZVVybDogYCR7QkFTRV9VUkx9L21haW4vbWFpbi52aWV3Lmh0bWxgLFxuXHRcdC8vXHRcdFx0Y29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcblx0XHQvLyAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdC8vXHRcdH0pO1xuXHRcdC8vLnN0YXRlKCdhYm91dCcsIHtcblx0XHQvL1x0dXJsOiAnL2Fib3V0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJyxcblx0XHQvL1x0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCdcblx0XHQvL30pXG5cdFx0Ly8uc3RhdGUoJ2NvbnRhY3QnLCB7XG5cdFx0Ly9cdHVybDogJy9jb250YWN0Jyxcblx0XHQvL1x0dGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cdFx0Ly99KVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiQXV0aFwiLCBBdXRoKTtcblxuXHRmdW5jdGlvbiBBdXRoKCRmaXJlYmFzZUF1dGgpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlQXV0aCgpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwib3ZlcnZpZXctYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXJcIiwgT3ZlcnZpZXdBZHZlcnRpc21lbnRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBPdmVydmlld0FkdmVydGlzbWVudENvbnRyb2xsZXIoQWR2ZXJ0aXNtZW50U2VydmljZSwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW92ZXJ2aWV3LmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaWduLWluLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJTaWduSW5Db250cm9sbGVyXCIsIFNpZ25JbkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFNpZ25JbkNvbnRyb2xsZXIoQXV0aCwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0XHR2bS5sb2FkaW5nID0gdHJ1ZTtcblxuXHRcdHZtLnNpZ25JbiA9IHNpZ25JbjtcblxuXHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0aWYgKHVzZXIpICRsb2NhdGlvbi5wYXRoKCcvJyk7XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBzaWduSW4oY3JlZGVudGlhbHMpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdHZtLmxvYWRpbmcgPSB0cnVlO1xuXHRcdFx0QXV0aC4kc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3MpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIlNpZ25lZCBpbiBhcyBcIiArIHVzZXIuZW1haWwpO1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZCcpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJBdXRoZW50aWNhdGlvbiBmYWlsZWQ6XCIsIGVycm9yKTtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdHZtLmVycm9yID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdFx0dm0ubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbi1pbi5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImF1dGguY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIkF1dGhDb250cm9sbGVyXCIsIEF1dGhDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBdXRoQ29udHJvbGxlcihBdXRoLCBVc2VyU2VydmljZSwgRnVuY3Rpb25zLCAkbG9jYXRpb24pIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0uc2lnblVwID0gc2lnblVwO1xuXHRcdHZtLnNpZ25JbiA9IHNpZ25Jbjtcblx0XHR2bS5jcmVkZW50aWFsc1ggPSB7fTtcblx0XHR2bS5sb2FkaW5nID0gdHJ1ZTtcblxuXHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0aWYgKHVzZXIpICRsb2NhdGlvbi5wYXRoKCcvJyk7XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBzaWduSW4oY3JlZGVudGlhbHMpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRcdGNvbnNvbGUubG9nKGNyZWRlbnRpYWxzKTtcblx0XHRcdGNvbnNvbGUubG9nKCdzaW5naW4nKTtcblx0XHRcdHZtLmxvYWRpbmcgPSB0cnVlO1xuXHRcdFx0QXV0aC4kc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3MpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIlNpZ25lZCBpbiBhcyBcIiArIHVzZXIuZW1haWwpO1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZCcpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJBdXRoZW50aWNhdGlvbiBmYWlsZWQ6XCIsIGVycm9yKTtcblx0XHRcdFx0X3RoaXMuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdHZtLmVycm9yID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdFx0dm0ubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2lnblVwKCkge1xuXHRcdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRcdGNvbnNvbGUubG9nKHZtLmNyZWRlbnRpYWxzWCk7XG5cdFx0XHRBdXRoLiRjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQodm0uY3JlZGVudGlhbHNYLmVtYWlsLCB2bS5jcmVkZW50aWFsc1gucGFzcykudGhlbihmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHR2YXIgbmV3VXNlciA9IFVzZXJTZXJ2aWNlLmdldFVzZXIodXNlci51aWQpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh2bS5jcmVkZW50aWFsc1gpO1xuXHRcdFx0XHRuZXdVc2VyLmVtYWlsID0gdXNlci5lbWFpbDtcblx0XHRcdFx0bmV3VXNlci5uYW1lID0gdm0uY3JlZGVudGlhbHNYLm5hbWU7XG5cdFx0XHRcdG5ld1VzZXIuY29tcGFueSA9IHZtLmNyZWRlbnRpYWxzWC5jb21wYW55O1xuXHRcdFx0XHRuZXdVc2VyLmFkZHJlc3MgPSB2bS5jcmVkZW50aWFsc1guYWRkcmVzcztcblx0XHRcdFx0bmV3VXNlci56aXBjb2RlID0gdm0uY3JlZGVudGlhbHNYLnppcGNvZGU7XG5cdFx0XHRcdG5ld1VzZXIucGhvbmUgPSB2bS5jcmVkZW50aWFsc1gucGhvbmU7XG5cdFx0XHRcdG5ld1VzZXIubGFuZCA9IHZtLmNyZWRlbnRpYWxzWC5sYW5kO1xuXHRcdFx0XHRuZXdVc2VyLiRzYXZlKCkudGhlbihfdGhpczIuX2ZzLnRvYXN0KCkuc3VjY2VzcygnU2lnbmVkIHVwIHN1Y2Nlc3NmdWxseSEnKSkudGhlbigkbG9jYXRpb24ucGF0aCgnLycpKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRfdGhpczIuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogXCIsIGVycm9yKTtcblx0XHRcdFx0dm0uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2F1dGgubW9kdWxlJywgWydhdXRoLnJvdXRlcycsICdhdXRoLmNvbnRyb2xsZXInLCAnYXV0aC5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2F1dGggY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBVVRIX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvYXV0aCc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXV0aCcsIHtcblx0XHRcdHVybDogJy9hdXRoJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1BBVEggKyAnL2F1dGgudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBdXRoQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblxuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5yb3V0ZXMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnY29tcG9uZW50cy5tb2R1bGUnLCBbJ2F1dGgubW9kdWxlJywgJ2Rhc2hib2FyZC5tb2R1bGUnLCAnb2ZmZXIubW9kdWxlJywgJ3NldHRpbmdzLm1vZHVsZScsICdwaG90by5tb2R1bGUnLCAndXNlci5tb2R1bGUnLCAnbWFpbi5tb2R1bGUnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50cy5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiZGFzaGJvYXJkLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJEYXNoYm9hcmRDb250cm9sbGVyXCIsIERhc2hib2FyZENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIERhc2hib2FyZENvbnRyb2xsZXIoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblxuXHRcdC8vIHNldCBoZWFkZXIgdGl0bGVzXG5cdFx0dm0uaGVhZGVyVGl0bGUgPSAnRGFzaGJvYXJkJztcblx0XHR2bS5vcHRpb25hbERlc2NyaXB0aW9uID0gJ292ZXJ2aWV3Jztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhc2hib2FyZC5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImRhc2hib2FyZC5tb2R1bGVcIiwgW1wiZGFzaGJvYXJkLmNvbnRyb2xsZXJcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhc2hib2FyZC5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibWFpbi5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiTWFpbkNvbnRyb2xsZXJcIiwgTWFpbkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibWFpbi5tb2R1bGVcIiwgW1wibWFpbi5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcdFwidXNlIHN0cmljdFwiO1xuXG5cdFx0YW5ndWxhci5tb2R1bGUoXCJhZGQtb2ZmZXIuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIkFkZE9mZmVyQ29udHJvbGxlclwiLCBBZGRPZmZlckNvbnRyb2xsZXIpO1xuXG5cdFx0ZnVuY3Rpb24gQWRkT2ZmZXJDb250cm9sbGVyKE9mZmVyU2VydmljZSwgRnVuY3Rpb25zLCBTaGFyZSwgJHNjb3BlLCAkdGltZW91dCwgJGxvY2F0aW9uKSB7XG5cdFx0XHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0XHRcdC8vIHZpZXdtb2RlbCB2YXJpYWJsZXNcblx0XHRcdFx0dm0ubmV3UGhvdG87XG5cblx0XHRcdFx0dm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9IFNoYXJlLmhlYWRlckRlc2NyaXB0aW9uID0gJ2FkZCc7XG5cblx0XHRcdFx0Ly8gZnVuY3Rpb25zXG5cdFx0XHRcdHZtLmFkZE9mZmVyID0gYWRkT2ZmZXI7XG5cdFx0XHRcdCRzY29wZS5zZXRGaWxlID0gc2V0RmlsZTtcblxuXHRcdFx0XHQvKipcclxuICAgICAqIHNldCBmaWxlIHRvIHByZXZpZXcgdXBsb2FkZWQgaW1nXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICovXG5cdFx0XHRcdGZ1bmN0aW9uIHNldEZpbGUoZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0dm0uY3VycmVudEZpbGUgPSBlbGVtZW50LmZpbGVzWzBdOyAvLyBzZXQgdXBsb2FkZWQgaW1nIGFzIGN1cnJlbnRGaWxlXG5cdFx0XHRcdFx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0XHRcdC8vIHRyaWdnZXJkIHdoZW4gZmlsZSBpcyByZWFkXG5cdFx0XHRcdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0dm0uaW1hZ2Vfc291cmNlID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblx0XHRcdFx0XHRcdFx0XHQkc2NvcGUuJGFwcGx5KCk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZWxlbWVudC5maWxlc1swXSk7IC8vIHdoZW4gdGhlIGZpbGUgaXMgcmVhZCwgaXQgdHJpZ2dlcnMgdGhlIG9ubG9hZCBldmVudCBhYm92ZS5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKlxyXG4gICAgICogYWRkIGFuIG9mZmVyIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHRyaWdnZXIgKG5nLXN1Ym1pdClcclxuICAgICAqL1xuXHRcdFx0XHRmdW5jdGlvbiBhZGRPZmZlcigpIHtcblx0XHRcdFx0XHRcdE9mZmVyU2VydmljZS5hZGRPZmZlcih2bS5uZXdQaG90bykudGhlbihjb25zb2xlLmxvZyh2bS5uZXdQaG90bykpLnRoZW4odGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKFwiQWRkZWQgbmV3IG9mZmVyIFwiICsgdm0ubmV3UGhvdG8ubmFtZSkpLnRoZW4odm0ubmV3UGhvdG8gPSB7fSk7XG5cdFx0XHRcdH1cblx0XHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRkLW9mZmVyLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwib2ZmZXIuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk9mZmVyQ29udHJvbGxlclwiLCBPZmZlckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE9mZmVyQ29udHJvbGxlcihTaGFyZSkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0Y29uc29sZS5sb2coU2hhcmUpO1xuXG5cdFx0Ly8gc2V0IGhlYWRlciB0aXRsZXNcblx0XHR2bS5oZWFkZXJUaXRsZSA9ICdPZmZlcnMnO1xuXHRcdHZtLm9wdGlvbmFsRGVzY3JpcHRpb24gPSBTaGFyZS5oZWFkZXJEZXNjcmlwdGlvbiA9ICdvdmVydmlldyc7XG5cdFx0Ly92bS5vcHRpb25hbERlc2NyaXB0aW9uID0gJ3Rlc3QnO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdvZmZlci5tb2R1bGUnLCBbJ29mZmVyLnJvdXRlcycsICdvZmZlci5jb250cm9sbGVyJywgJ292ZXJ2aWV3LW9mZmVyLmNvbnRyb2xsZXInLCAnYWRkLW9mZmVyLmNvbnRyb2xsZXInLCAnb2ZmZXIuc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZmZlci5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ29mZmVyIGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgT0ZGRVJfUEFUSCA9ICdhcHAvY29tcG9uZW50cy9vZmZlcic7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbi5vZmZlcicsIHtcblx0XHRcdHVybDogJy9vZmZlcicsXG5cdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdHRlbXBsYXRlVXJsOiBPRkZFUl9QQVRIICsgJy9vZmZlci52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1Bob3RvQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnbWFpbi5vZmZlci5vdmVydmlldycsIHtcblx0XHRcdHVybDogJy9vdmVydmlldycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogT0ZGRVJfUEFUSCArICcvb3ZlcnZpZXcvb3ZlcnZpZXcudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPdmVydmlld09mZmVyQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnbWFpbi5vZmZlci5hZGQnLCB7XG5cdFx0XHR1cmw6ICcvYWRkLW9mZmVyJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBPRkZFUl9QQVRIICsgJy9hZGQtb2ZmZXIvYWRkLW9mZmVyLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkT2ZmZXJDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJPZmZlclNlcnZpY2VcIiwgT2ZmZXJTZXJ2aWNlKTtcblxuXHRmdW5jdGlvbiBPZmZlclNlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIG9mZmVycyA9ICRmaXJlYmFzZUFycmF5KCRmaXJlYmFzZVJlZi5vZmZlcnMpO1xuXG5cdFx0dmFyIEFQSSA9IHtcblx0XHRcdGFkZE9mZmVyOiBhZGRPZmZlcixcblx0XHRcdGdldE9mZmVyczogZ2V0T2ZmZXJzLFxuXHRcdFx0Z2V0T2ZmZXI6IGdldE9mZmVyLFxuXHRcdFx0dXBkYXRlT2ZmZXI6IHVwZGF0ZU9mZmVyLFxuXHRcdFx0ZGVsZXRlT2ZmZXI6IGRlbGV0ZU9mZmVyXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gYWRkT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlcnMuJGFkZCh7XG5cdFx0XHRcdG5hbWU6IG9mZmVyLm5hbWVcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldE9mZmVycygpIHtcblx0XHRcdHJldHVybiBvZmZlcnM7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0T2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLm9mZmVycy5jaGlsZChvZmZlci4kaWQpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVPZmZlcihvZmZlcikge1xuXHRcdFx0cmV0dXJuIG9mZmVyLiRzYXZlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlcnMuJHJlbW92ZShvZmZlcik7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIuc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcIm92ZXJ2aWV3LW9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPdmVydmlld09mZmVyQ29udHJvbGxlclwiLCBPdmVydmlld09mZmVyQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXIoT2ZmZXJTZXJ2aWNlLCAkbG9jYXRpb24sIEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS50aXRsZSA9ICdTaWduIGluIHRvIFBpb25lYXInO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b3ZlcnZpZXcuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcdFwidXNlIHN0cmljdFwiO1xuXG5cdFx0YW5ndWxhci5tb2R1bGUoXCJhZGQtb2ZmZXIuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIkFkZE9mZmVyQ29udHJvbGxlclwiLCBBZGRPZmZlckNvbnRyb2xsZXIpO1xuXG5cdFx0ZnVuY3Rpb24gQWRkT2ZmZXJDb250cm9sbGVyKE9mZmVyU2VydmljZSwgRnVuY3Rpb25zLCBTaGFyZSwgJHNjb3BlLCAkdGltZW91dCwgJGxvY2F0aW9uKSB7XG5cdFx0XHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0XHRcdC8vIHZpZXdtb2RlbCB2YXJpYWJsZXNcblx0XHRcdFx0dm0ubmV3T2ZmZXI7XG5cblx0XHRcdFx0dm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9IFNoYXJlLmhlYWRlckRlc2NyaXB0aW9uID0gJ2FkZCc7XG5cblx0XHRcdFx0Ly8gZnVuY3Rpb25zXG5cdFx0XHRcdHZtLmFkZE9mZmVyID0gYWRkT2ZmZXI7XG5cdFx0XHRcdCRzY29wZS5zZXRGaWxlID0gc2V0RmlsZTtcblxuXHRcdFx0XHQvKipcclxuICAgICAqIHNldCBmaWxlIHRvIHByZXZpZXcgdXBsb2FkZWQgaW1nXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICovXG5cdFx0XHRcdGZ1bmN0aW9uIHNldEZpbGUoZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0dm0uY3VycmVudEZpbGUgPSBlbGVtZW50LmZpbGVzWzBdOyAvLyBzZXQgdXBsb2FkZWQgaW1nIGFzIGN1cnJlbnRGaWxlXG5cdFx0XHRcdFx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0XHRcdC8vIHRyaWdnZXJkIHdoZW4gZmlsZSBpcyByZWFkXG5cdFx0XHRcdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0dm0uaW1hZ2Vfc291cmNlID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblx0XHRcdFx0XHRcdFx0XHQkc2NvcGUuJGFwcGx5KCk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZWxlbWVudC5maWxlc1swXSk7IC8vIHdoZW4gdGhlIGZpbGUgaXMgcmVhZCwgaXQgdHJpZ2dlcnMgdGhlIG9ubG9hZCBldmVudCBhYm92ZS5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKlxyXG4gICAgICogYWRkIGFuIG9mZmVyIHRvIHRoZSBkYXRhYmFzZVxyXG4gICAgICogQHRyaWdnZXIgKG5nLXN1Ym1pdClcclxuICAgICAqL1xuXHRcdFx0XHRmdW5jdGlvbiBhZGRPZmZlcigpIHtcblx0XHRcdFx0XHRcdE9mZmVyU2VydmljZS5hZGRPZmZlcih2bS5uZXdPZmZlcikudGhlbihjb25zb2xlLmxvZyh2bS5uZXdPZmZlcikpLnRoZW4odGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKFwiQWRkZWQgbmV3IG9mZmVyIFwiICsgdm0ubmV3T2ZmZXIubmFtZSkpLnRoZW4odm0ubmV3T2ZmZXIgPSB7fSk7XG5cdFx0XHRcdH1cblx0XHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRkLW9mZmVyLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhZGQtcGhvdG8uY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIkFkZFBob3RvQ29udHJvbGxlclwiLCBBZGRQaG90b0NvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIEFkZFBob3RvQ29udHJvbGxlcihQaG90b1NlcnZpY2UsIEZ1bmN0aW9ucywgU2hhcmUsICRzY29wZSwgJGxvZywgR29vZ2xlTWFwQXBpLCB1aUdtYXBHb29nbGVNYXBBcGkpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0Ly8gdmlld21vZGVsIHZhcmlhYmxlc1xuXHRcdHZtLm5ld1Bob3RvO1xuXG5cdFx0dm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9IFNoYXJlLmhlYWRlckRlc2NyaXB0aW9uID0gJ2FkZCc7XG5cdFx0dm0ubWFwID0ge1xuXHRcdFx0Y2VudGVyOiB7IGxhdGl0dWRlOiA0NSwgbG9uZ2l0dWRlOiAtNzMgfSxcblx0XHRcdHpvb206IDgsXG5cdFx0XHRzZWFyY2hib3g6IHtcblx0XHRcdFx0dGVtcGxhdGU6ICdzZWFyY2hib3gudHBsLmh0bWwnLFxuXHRcdFx0XHRldmVudHM6IHtcblx0XHRcdFx0XHRwbGFjZXNfY2hhbmdlZDogZnVuY3Rpb24gcGxhY2VzX2NoYW5nZWQoc2VhcmNoQm94KSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhzZWFyY2hCb3gpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0c2Nyb2xsd2hlZWw6IGZhbHNlXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vR29vZ2xlTWFwQXBpLnRoZW4oZnVuY3Rpb24obWFwcykge1xuXHRcdC8vXHRtYXBzLnZpc3VhbFJlZnJlc2ggPSB0cnVlO1xuXHRcdC8vfSk7XG5cdFx0Ly91aUdtYXBHb29nbGVNYXBBcGkudGhlbihmdW5jdGlvbihtYXBzKSB7XG5cdFx0Ly9cdG1hcHMudmlzdWFsUmVmcmVzaCA9IHRydWU7XG5cdFx0Ly99KTtcblxuXHRcdC8vIGZ1bmN0aW9uc1xuXHRcdHZtLmFkZFBob3RvID0gYWRkUGhvdG87XG5cdFx0JHNjb3BlLnNldEZpbGUgPSBzZXRGaWxlO1xuXG5cdFx0LyoqXHJcbiAgICogc2V0IGZpbGUgdG8gcHJldmlldyB1cGxvYWRlZCBpbWdcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqL1xuXHRcdGZ1bmN0aW9uIHNldEZpbGUoZWxlbWVudCkge1xuXHRcdFx0dm0uY3VycmVudEZpbGUgPSBlbGVtZW50LmZpbGVzWzBdOyAvLyBzZXQgdXBsb2FkZWQgaW1nIGFzIGN1cnJlbnRGaWxlXG5cdFx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdC8vIHRyaWdnZXJkIHdoZW4gZmlsZSBpcyByZWFkXG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZtLmltYWdlX3NvdXJjZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdCRzY29wZS4kYXBwbHkoKTtcblx0XHRcdH07XG5cdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChlbGVtZW50LmZpbGVzWzBdKTsgLy8gd2hlbiB0aGUgZmlsZSBpcyByZWFkLCBpdCB0cmlnZ2VycyB0aGUgb25sb2FkIGV2ZW50IGFib3ZlLlxuXHRcdH1cblxuXHRcdC8qKlxyXG4gICAqIGFkZCBhbiBvZmZlciB0byB0aGUgZGF0YWJhc2VcclxuICAgKiBAdHJpZ2dlciAobmctc3VibWl0KVxyXG4gICAqL1xuXHRcdGZ1bmN0aW9uIGFkZFBob3RvKCkge1xuXHRcdFx0UGhvdG9TZXJ2aWNlLmFkZFBob3RvKHZtLm5ld1Bob3RvKS50aGVuKGNvbnNvbGUubG9nKHZtLm5ld1Bob3RvKSkudGhlbih0aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoXCJBZGRlZCBuZXcgb2ZmZXIgXCIgKyB2bS5uZXdQaG90by5uYW1lKSkudGhlbih2bS5uZXdQaG90byA9IHt9KTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGQtcGhvdG8uY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwib2ZmZXIucm91dGVzXCIsIFtdKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnb2ZmZXIgY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBPRkZFUl9QQVRIID0gJ2FwcC9jb21wb25lbnRzL29mZmVyJztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtYWluLm9mZmVyJywge1xuXHRcdFx0dXJsOiAnL29mZmVyJyxcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6IE9GRkVSX1BBVEggKyAnL29mZmVyLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnT2ZmZXJDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdtYWluLm9mZmVyLm92ZXJ2aWV3Jywge1xuXHRcdFx0dXJsOiAnL292ZXJ2aWV3Jyxcblx0XHRcdHRlbXBsYXRlVXJsOiBPRkZFUl9QQVRIICsgJy9vdmVydmlldy9vdmVydmlldy52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ092ZXJ2aWV3T2ZmZXJDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdtYWluLm9mZmVyLmFkZCcsIHtcblx0XHRcdHVybDogJy9hZGQtb2ZmZXInLFxuXHRcdFx0dGVtcGxhdGVVcmw6IE9GRkVSX1BBVEggKyAnL2FkZC1vZmZlci9hZGQtb2ZmZXIudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZGRPZmZlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZmZlci5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvdmVydmlldy1waG90by5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiT3ZlcnZpZXdQaG90b0NvbnRyb2xsZXJcIiwgT3ZlcnZpZXdQaG90b0NvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE92ZXJ2aWV3UGhvdG9Db250cm9sbGVyKEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vdmVydmlldy5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInBob3RvLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJQaG90b0NvbnRyb2xsZXJcIiwgUGhvdG9Db250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBQaG90b0NvbnRyb2xsZXIoU2hhcmUpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFNoYXJlKTtcblxuXHRcdC8vIHNldCBoZWFkZXIgdGl0bGVzXG5cdFx0dm0uaGVhZGVyVGl0bGUgPSAnUGhvdG9zJztcblx0XHR2bS5vcHRpb25hbERlc2NyaXB0aW9uID0gU2hhcmUuaGVhZGVyRGVzY3JpcHRpb24gPSAnb3ZlcnZpZXcnO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGhvdG8uY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdwaG90by5tb2R1bGUnLCBbJ3Bob3RvLnJvdXRlcycsICdwaG90by5jb250cm9sbGVyJywgJ292ZXJ2aWV3LXBob3RvLmNvbnRyb2xsZXInLCAnYWRkLXBob3RvLmNvbnRyb2xsZXInLCAncGhvdG8uc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waG90by5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInBob3RvLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ3Bob3RvIGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgUEhPVE9fUEFUSCA9ICdhcHAvY29tcG9uZW50cy9waG90byc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbi5waG90bycsIHtcblx0XHRcdHVybDogJy9waG90bycsXG5cdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdHRlbXBsYXRlVXJsOiBQSE9UT19QQVRIICsgJy9waG90by52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1Bob3RvQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnbWFpbi5waG90by5vdmVydmlldycsIHtcblx0XHRcdHVybDogJy9vdmVydmlldycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogUEhPVE9fUEFUSCArICcvb3ZlcnZpZXcvb3ZlcnZpZXcudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPdmVydmlld1Bob3RvQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnbWFpbi5waG90by5hZGQnLCB7XG5cdFx0XHR1cmw6ICcvYWRkLXBob3RvJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBQSE9UT19QQVRIICsgJy9hZGQtcGhvdG8vYWRkLXBob3RvLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkUGhvdG9Db250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGhvdG8ucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInBob3RvLnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJQaG90b1NlcnZpY2VcIiwgUGhvdG9TZXJ2aWNlKTtcblxuXHRmdW5jdGlvbiBQaG90b1NlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0LCAkZmlyZWJhc2VTdG9yYWdlKSB7XG5cdFx0dmFyIHBob3RvcyA9ICRmaXJlYmFzZUFycmF5KCRmaXJlYmFzZVJlZi5waG90b3MpO1xuXHRcdHZhciBzdG9yYWdlID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZihcImltYWdlcy9waG90b3NcIik7XG5cblx0XHR2YXIgQVBJID0ge1xuXHRcdFx0YWRkUGhvdG86IGFkZFBob3RvLFxuXHRcdFx0Z2V0UGhvdG9zOiBnZXRQaG90b3MsXG5cdFx0XHRnZXRTdG9yYWdlOiBnZXRTdG9yYWdlLFxuXHRcdFx0Z2V0UGhvdG86IGdldFBob3RvLFxuXHRcdFx0dXBkYXRlUGhvdG86IHVwZGF0ZVBob3RvLFxuXHRcdFx0ZGVsZXRlUGhvdG86IGRlbGV0ZVBob3RvXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gYWRkUGhvdG8ocGhvdG8pIHtcblx0XHRcdHJldHVybiBwaG90b3MuJGFkZCh7XG5cdFx0XHRcdG5hbWU6IHBob3RvLm5hbWVcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFBob3RvcygpIHtcblx0XHRcdHJldHVybiBwaG90b3M7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0U3RvcmFnZSgpIHtcblx0XHRcdHJldHVybiAkZmlyZWJhc2VTdG9yYWdlKHN0b3JhZ2UpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFBob3RvKHBob3RvKSB7XG5cdFx0XHRyZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi5waG90b3MuY2hpbGQocGhvdG8uJGlkKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlUGhvdG8ocGhvdG8pIHtcblx0XHRcdHJldHVybiBwaG90by4kc2F2ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZVBob3RvKHBob3RvKSB7XG5cdFx0XHRyZXR1cm4gcGhvdG9zLiRyZW1vdmUocGhvdG8pO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBob3RvLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XHQndXNlIHN0cmljdCc7XG5cblx0XHRhbmd1bGFyLm1vZHVsZShcInNldHRpbmdzLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJTZXR0aW5nc0NvbnRyb2xsZXJcIiwgU2V0dGluZ3NDb250cm9sbGVyKTtcblxuXHRcdGZ1bmN0aW9uIFNldHRpbmdzQ29udHJvbGxlcihTaGFyZSwgVXNlclNlcnZpY2UsIEF1dGgsIEZ1bmN0aW9ucykge1xuXHRcdFx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdFx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdFx0XHR2bS51cGRhdGVQcm9maWxlID0gdXBkYXRlUHJvZmlsZTtcblxuXHRcdFx0XHQvLyBzZXQgaGVhZGVyIHRpdGxlc1xuXHRcdFx0XHR2bS5oZWFkZXJUaXRsZSA9ICdBY2NvdW50IHNldHRpbmdzJztcblx0XHRcdFx0dm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9IFNoYXJlLmhlYWRlckRlc2NyaXB0aW9uID0gJ292ZXJ2aWV3JztcblxuXHRcdFx0XHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdFx0XHRcdFx0Z2V0VXNlcigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGluaXQoKTtcblxuXHRcdFx0XHRmdW5jdGlvbiBnZXRVc2VyKCkge1xuXHRcdFx0XHRcdFx0QXV0aC4kb25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHVzZXIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dm0uY3VycmVudFVzZXIgPSBVc2VyU2VydmljZS5nZXRVc2VyKHVzZXIudWlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codm0uY3VycmVudFVzZXIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZnVuY3Rpb24gdXBkYXRlUHJvZmlsZSgpIHtcblx0XHRcdFx0XHRcdFVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIodm0uY3VycmVudFVzZXIpLnRoZW4odGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKFwiVXBkYXRlZCBwcm9maWxlXCIpKTtcblx0XHRcdFx0fVxuXHRcdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzLm1vZHVsZScsIFsnc2V0dGluZ3Mucm91dGVzJywgJ3NldHRpbmdzLmNvbnRyb2xsZXInLCAnc2V0dGluZ3Muc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInNldHRpbmdzLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ3NldHRpbmdzIGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgU0VUVElOR1NfUEFUSCA9ICdhcHAvY29tcG9uZW50cy9zZXR0aW5ncyc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbi5zZXR0aW5ncycsIHtcblx0XHRcdHVybDogJy9zZXR0aW5ncycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogU0VUVElOR1NfUEFUSCArICcvc2V0dGluZ3Mudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTZXR0aW5nc0NvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2V0dGluZ3Muc2VydmljZVwiLCBbXSkuZmFjdG9yeShcIlNldHRpbmdzU2VydmljZVwiLCBTZXR0aW5nc1NlcnZpY2UpO1xuXG5cdGZ1bmN0aW9uIFNldHRpbmdzU2VydmljZSgkZmlyZWJhc2VSZWYsICRmaXJlYmFzZUFycmF5LCAkZmlyZWJhc2VPYmplY3QpIHtcblx0XHR2YXIgcHJvZmlsZSA9ICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYuc2V0dGluZ3MpO1xuXG5cdFx0dmFyIEFQSSA9IHtcblx0XHRcdGdldFByb2ZpbGU6IGdldFByb2ZpbGUsXG5cdFx0XHR1cGRhdGVQcm9maWxlOiB1cGRhdGVQcm9maWxlXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gZ2V0UHJvZmlsZSgpIHtcblx0XHRcdHJldHVybiBwcm9maWxlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZVByb2ZpbGUocHJvZmlsZSkge1xuXHRcdFx0cmV0dXJuIHByb2ZpbGUuJHNhdmUoKTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5ncy5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInVzZXIuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlVzZXJDb250cm9sbGVyXCIsIFVzZXJDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBVc2VyQ29udHJvbGxlcigpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ3VzZXIubW9kdWxlJywgWyd1c2VyLmNvbnRyb2xsZXInLCAndXNlci5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInVzZXIuc2VydmljZVwiLCBbXSkuZmFjdG9yeShcIlVzZXJTZXJ2aWNlXCIsIFVzZXJTZXJ2aWNlKTtcblxuXHRmdW5jdGlvbiBVc2VyU2VydmljZSgkZmlyZWJhc2VSZWYsICRmaXJlYmFzZUFycmF5LCAkZmlyZWJhc2VPYmplY3QpIHtcblx0XHR2YXIgdXNlcnMgPSAkZmlyZWJhc2VBcnJheSgkZmlyZWJhc2VSZWYudXNlcnMpO1xuXG5cdFx0dmFyIEFQSSA9IHtcblx0XHRcdGdldFVzZXJzOiBnZXRVc2Vycyxcblx0XHRcdGdldFVzZXI6IGdldFVzZXIsXG5cdFx0XHR1cGRhdGVVc2VyOiB1cGRhdGVVc2VyLFxuXHRcdFx0ZGVsZXRlVXNlcjogZGVsZXRlVXNlclxuXHRcdH07XG5cdFx0cmV0dXJuIEFQSTtcblxuXHRcdGZ1bmN0aW9uIGdldFVzZXJzKCkge1xuXHRcdFx0cmV0dXJuIHVzZXJzO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFVzZXIodWlkKSB7XG5cdFx0XHRyZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi51c2Vycy5jaGlsZCh1aWQpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVVc2VyKHVzZXIpIHtcblx0XHRcdHJldHVybiB1c2VyLiRzYXZlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlVXNlcih1c2VyKSB7XG5cdFx0XHRyZXR1cm4gdXNlcnMuJHJlbW92ZSh1c2VyKTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLnNlcnZpY2UuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm15QXBwXCIpLmNvbmZpZyhjb25maWcpLnJ1bihydW4pO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkZmlyZWJhc2VSZWZQcm92aWRlciwgdWlHbWFwR29vZ2xlTWFwQXBpUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgRmlyZWJhc2Vcblx0XHR2YXIgQ09ORklHID0ge1xuXHRcdFx0YXBpS2V5OiBcIkFJemFTeURzcF9vQk04bFBPbkVHVm5CeWpzb2ZHdzdLcGZ0emZlOFwiLFxuXHRcdFx0YXV0aERvbWFpbjogXCJwaW9uZWFyLWQwNzBlLmZpcmViYXNlYXBwLmNvbVwiLFxuXHRcdFx0ZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9waW9uZWFyLWQwNzBlLmZpcmViYXNlaW8uY29tXCIsXG5cdFx0XHRzdG9yYWdlQnVja2V0OiBcInBpb25lYXItZDA3MGUuYXBwc3BvdC5jb21cIixcblx0XHRcdG1lc3NhZ2luZ1NlbmRlcklkOiBcIjk2NzQwNTg2MjUxXCJcblx0XHR9O1xuXHRcdGZpcmViYXNlLmluaXRpYWxpemVBcHAoQ09ORklHKTtcblxuXHRcdCRmaXJlYmFzZVJlZlByb3ZpZGVyLnJlZ2lzdGVyVXJsKHtcblx0XHRcdGRlZmF1bHQ6IENPTkZJRy5kYXRhYmFzZVVSTCxcblx0XHRcdHVzZXJzOiBDT05GSUcuZGF0YWJhc2VVUkwgKyAnL3VzZXJzJyxcblx0XHRcdG9mZmVyczogQ09ORklHLmRhdGFiYXNlVVJMICsgJy9vZmZlcnMnLFxuXHRcdFx0cGhvdG9zOiBDT05GSUcuZGF0YWJhc2VVUkwgKyAnL3Bob3Rvcydcblx0XHR9KTtcblxuXHRcdHVpR21hcEdvb2dsZU1hcEFwaVByb3ZpZGVyLmNvbmZpZ3VyZSh7XG5cdFx0XHRrZXk6ICdBSXphU3lCbnNhbUlKVlZZaHc5cUkxblM3b29GSGdraHhuc0dCZUUnLFxuXHRcdFx0djogJzMuMjAnLCAvL2RlZmF1bHRzIHRvIGxhdGVzdCAzLlggYW55aG93XG5cdFx0XHRsaWJyYXJpZXM6ICdwbGFjZXMsIGdlb21ldHJ5LCB2aXN1YWxpemF0aW9uJ1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcnVuKEF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgJHN0YXRlKSB7XG5cdFx0Y29uc29sZS5sb2coJ3J1biBmdW5jdGlvbiBzdGFydGVkJyk7XG5cdFx0Y2hlY2tBdXRoKCk7XG5cblx0XHQkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAobmV4dCwgY3VycmVudCkge1xuXHRcdFx0Y2hlY2tBdXRoKCk7XG5cdFx0fSk7XG5cblx0XHQkcm9vdFNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZUVycm9yXCIsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcywgZXJyb3IpIHtcblx0XHRcdC8vIFdlIGNhbiBjYXRjaCB0aGUgZXJyb3IgdGhyb3duIHdoZW4gdGhlICRyZXF1aXJlU2lnbkluIHByb21pc2UgaXMgcmVqZWN0ZWRcblx0XHRcdC8vIGFuZCByZWRpcmVjdCB0aGUgdXNlciBiYWNrIHRvIHRoZSBob21lIHBhZ2Vcblx0XHRcdGlmIChlcnJvciA9PT0gXCJBVVRIX1JFUVVJUkVEXCIpIHtcblx0XHRcdFx0JHN0YXRlLmdvKFwiYXV0aFwiKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIGNoZWNrQXV0aCgpIHtcblx0XHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHRpZiAoIXVzZXIpICRsb2NhdGlvbi5wYXRoKCcvYXV0aCcpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh1c2VyKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiY29yZS5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQ29yZUNvbnRyb2xsZXJcIiwgQ29yZUNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIENvcmVDb250cm9sbGVyKEF1dGgsIFVzZXJTZXJ2aWNlLCBGdW5jdGlvbnMsICRyb290U2NvcGUpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0uaXNUb2dnbGVkID0gZmFsc2U7XG5cblx0XHR2bS50b2dnbGVTaWRlYmFyUGFyZW50ID0gdG9nZ2xlU2lkZWJhclBhcmVudDtcblx0XHR2bS5zaWduT3V0ID0gc2lnbk91dDtcblxuXHRcdEF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0aWYgKHVzZXIpIHZtLmN1cnJlbnRVc2VyID0gVXNlclNlcnZpY2UuZ2V0VXNlcih1c2VyLnVpZCk7XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBzaWduT3V0KCkge1xuXHRcdFx0QXV0aC4kc2lnbk91dCgpLnRoZW4odGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKCdZb3UgYXJlIHNpZ25lZCBvdXQuJykpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRvZ2dsZVNpZGViYXJQYXJlbnQoKSB7XG5cdFx0XHR2bS5pc1RvZ2dsZWQgPSAhdm0uaXNUb2dnbGVkO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuLy9pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuLy9cbi8vaW1wb3J0IENvcmVDb250cm9sbGVyIGZyb20gJy4vY29yZS5jb250cm9sbGVyLmpzJztcbi8vXG4vL2V4cG9ydCBkZWZhdWx0IGFuZ3VsYXJcbi8vXHRcdC5tb2R1bGUoJ2NvcmVNb2R1bGUnLCBbXSlcbi8vXHRcdC5jb250cm9sbGVyKCdhdXRoLmNvbnRyb2xsZXInLCBDb3JlQ29udHJvbGxlcilcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdjb3JlLm1vZHVsZScsIFsnY29yZS5jb250cm9sbGVyJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL2ltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG4vL1xuLy9pbXBvcnQgQ29yZUNvbnRyb2xsZXIgZnJvbSAnLi9jb3JlLmNvbnRyb2xsZXIuanMnO1xuLy9cbi8vZXhwb3J0IGRlZmF1bHQgYW5ndWxhclxuLy9cdFx0Lm1vZHVsZSgnY29yZU1vZHVsZScsIFtdKVxuLy9cdFx0LmNvbnRyb2xsZXIoJ2F1dGguY29udHJvbGxlcicsIENvcmVDb250cm9sbGVyKVxuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2NvcmUubW9kdWxlJywgWydjb3JlLmNvbnRyb2xsZXInXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5tb2R1bGVzLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2JvZHktY2xhc3Nlcy5kaXJlY3RpdmUnLCBbXSkuZGlyZWN0aXZlKCdib2R5Q2xhc3NlcycsIGJvZHlDbGFzc2VzKTtcblxuXHRmdW5jdGlvbiBib2R5Q2xhc3Nlcygkcm9vdFNjb3BlKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0XHRzY29wZToge30sXG5cdFx0XHRsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG5cblx0XHRcdFx0JHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcblx0XHRcdFx0XHR2YXIgZnJvbUNsYXNzbmFtZXMgPSBhbmd1bGFyLmlzRGVmaW5lZChmcm9tU3RhdGUuZGF0YSkgJiYgYW5ndWxhci5pc0RlZmluZWQoZnJvbVN0YXRlLmRhdGEuYm9keUNsYXNzZXMpID8gZnJvbVN0YXRlLmRhdGEuYm9keUNsYXNzZXMgOiBudWxsO1xuXHRcdFx0XHRcdHZhciB0b0NsYXNzbmFtZXMgPSBhbmd1bGFyLmlzRGVmaW5lZCh0b1N0YXRlLmRhdGEpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKHRvU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcykgPyB0b1N0YXRlLmRhdGEuYm9keUNsYXNzZXMgOiBudWxsO1xuXG5cdFx0XHRcdFx0Ly8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhleSBhcmUgdGhlIHNhbWVcblx0XHRcdFx0XHRpZiAoZnJvbUNsYXNzbmFtZXMgIT0gdG9DbGFzc25hbWVzKSB7XG5cdFx0XHRcdFx0XHRpZiAoZnJvbUNsYXNzbmFtZXMpIGVsZW0ucmVtb3ZlQ2xhc3MoZnJvbUNsYXNzbmFtZXMpO1xuXHRcdFx0XHRcdFx0aWYgKHRvQ2xhc3NuYW1lcykgZWxlbS5hZGRDbGFzcyh0b0NsYXNzbmFtZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvZHktY2xhc3Nlcy5kaXJlY3RpdmUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnZGlyZWN0aXZlcy5tb2R1bGUnLCBbJ2xvYWRpbmcuZGlyZWN0aXZlJywgJ3BhZ2UtaGVhZGVyLmRpcmVjdGl2ZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXJlY3RpdmVzLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhhbXBsZS5kZXJlY3RpdmUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBFeGFtcGxlRGlyZWN0aXZlID0gZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBFeGFtcGxlRGlyZWN0aXZlKCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFeGFtcGxlRGlyZWN0aXZlKTtcblxuXHRcdHRoaXMudGVtcGxhdGUgPSAnPGRpdj57e2N0cmwubmFtZX19PC9kaXY+Jztcblx0XHR0aGlzLnJlc3RyaWN0ID0gJ0UnO1xuXHRcdHRoaXMuc2NvcGUgPSB7fTtcblxuXHRcdHRoaXMuY29udHJvbGxlciA9IEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyO1xuXHRcdHRoaXMuY29udHJvbGxlckFzID0gJ2N0cmwnO1xuXHRcdHRoaXMuYmluZFRvQ29udHJvbGxlciA9IHRydWU7XG5cdH1cblxuXHQvLyBEaXJlY3RpdmUgY29tcGlsZSBmdW5jdGlvblxuXG5cblx0X2NyZWF0ZUNsYXNzKEV4YW1wbGVEaXJlY3RpdmUsIFt7XG5cdFx0a2V5OiAnY29tcGlsZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7fVxuXG5cdFx0Ly8gRGlyZWN0aXZlIGxpbmsgZnVuY3Rpb25cblxuXHR9LCB7XG5cdFx0a2V5OiAnbGluaycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGxpbmsoKSB7fVxuXHR9XSk7XG5cblx0cmV0dXJuIEV4YW1wbGVEaXJlY3RpdmU7XG59KCk7XG5cbi8vIERpcmVjdGl2ZSdzIGNvbnRyb2xsZXJcblxuXG5leHBvcnRzLmRlZmF1bHQgPSBFeGFtcGxlRGlyZWN0aXZlO1xuXG52YXIgRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbiBFeGFtcGxlRGlyZWN0aXZlQ29udHJvbGxlcigpIHtcblx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyKTtcblxuXHR0aGlzLm5hbWUgPSAnWWFzc2luZSc7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhhbXBsZS5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJsb2FkaW5nLmRpcmVjdGl2ZVwiLCBbXSkuZGlyZWN0aXZlKFwibG9hZGluZ1NwaW5uZXJcIiwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0ZGF0YTogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdhcHAvc2hhcmVkL2RpcmVjdGl2ZXMvbG9hZGluZy5kaXJlY3RpdmUvbG9hZGluZy50ZW1wbGF0ZS5odG1sJ1xuXHRcdH07XG5cdH0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvYWRpbmcuZGlyZWN0aXZlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwicGFnZS1oZWFkZXIuZGlyZWN0aXZlXCIsIFtdKS5kaXJlY3RpdmUoXCJwYWdlSGVhZGVyXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdHRpdGxlOiAnQCcsXG5cdFx0XHRcdG9wdGlvbmFsRGVzY3JpcHRpb246ICdAJyxcblx0XHRcdFx0dG9nZ2xlOiAnJidcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiBjb250cm9sbGVyKCRzY29wZSkge1xuXHRcdFx0XHQkc2NvcGUudG9nZ2xlVmFsdWUgPSBmYWxzZTtcblx0XHRcdFx0JHNjb3BlLnRvZ2dsZVNpZGViYXJJbnNpZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JHNjb3BlLnRvZ2dsZVZhbHVlID0gISRzY29wZS50b2dnbGVWYWx1ZTtcblx0XHRcdFx0XHQkc2NvcGUudG9nZ2xlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdhcHAvc2hhcmVkL2RpcmVjdGl2ZXMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudGVtcGxhdGUuaHRtbCdcblx0XHR9O1xuXHR9KTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlLWhlYWRlci5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibGF5b3V0Lm1vZHVsZVwiLCBbXCJzaWRlYmFyLmNvbnRyb2xsZXJcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XHQndXNlIHN0cmljdCc7XG5cblx0XHRhbmd1bGFyLm1vZHVsZShcInNpZGViYXIuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlNpZGViYXJDb250cm9sbGVyXCIsIFNpZGViYXJDb250cm9sbGVyKTtcblxuXHRcdGZ1bmN0aW9uIFNpZGViYXJDb250cm9sbGVyKCRsb2NhdGlvbiwgQXV0aCwgRnVuY3Rpb25zKSB7XG5cdFx0XHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXHRcdFx0XHR2bS5zaWduT3V0ID0gc2lnbk91dDtcblxuXHRcdFx0XHRmdW5jdGlvbiBzaWduT3V0KCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ3NpZ25vdXQnKTtcblx0XHRcdFx0XHRcdEF1dGguJHNpZ25PdXQoKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcygnWW91IGFyZSBzaWduZWQgb3V0LicpKS50aGVuKCRsb2NhdGlvbi5wYXRoKCcvYXV0aCcpKTtcblx0XHRcdFx0fVxuXHRcdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaWRlYmFyLmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0YW5ndWxhci5tb2R1bGUoXCJuYXYuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk5hdkNvbnRyb2xsZXJcIiwgTmF2Q29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gTmF2Q29udHJvbGxlcigkbG9jYXRpb24sIEF1dGgsIEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dmFyIF9mcyA9IEZ1bmN0aW9ucztcblx0XHR2bS5zaWduT3V0ID0gc2lnbk91dDtcblx0XHR2bS5pc0FjdGl2ZSA9IGlzQWN0aXZlO1xuXHRcdC8vIGluaXRpYWxpemUgdmlldyBkYXRhXG5cdFx0ZnVuY3Rpb24gaW5pdCgpIHt9XG5cblx0XHRpbml0KCk7XG5cblx0XHQvL3ZtLmF1dGguJG9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKSB7XG5cdFx0Ly9cdHZtLnVzZXIgPSB1c2VyO1xuXHRcdC8vfSk7XG5cblx0XHRmdW5jdGlvbiBzaWduT3V0KCkge1xuXHRcdFx0QXV0aC4kc2lnbk91dCgpLnRoZW4oX2ZzLnRvYXN0KCdZb3UgYXJlIHNpZ25lZCBvdXQuJykpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGlzQWN0aXZlKGRlc3RpbmF0aW9uKSB7XG5cdFx0XHRyZXR1cm4gZGVzdGluYXRpb24gPT09ICRsb2NhdGlvbi5wYXRoKCk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmF2LmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGFuZ3VsYXIubW9kdWxlKFwibmF2Lm1vZHVsZVwiLCBbXCJuYXYuY29udHJvbGxlclwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmF2Lm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJBdXRoXCIsIEF1dGgpO1xuXG5cdGZ1bmN0aW9uIEF1dGgoJGZpcmViYXNlQXV0aCkge1xuXHRcdHJldHVybiAkZmlyZWJhc2VBdXRoKCk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLmZhY3RvcnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwiZnVuY3Rpb25zLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJGdW5jdGlvbnNcIiwgRnVuY3Rpb25zKTtcblxuICBmdW5jdGlvbiBGdW5jdGlvbnMoKSB7XG5cbiAgICB2YXIgRlVOQ1RJT05TID0ge1xuICAgICAgdG9hc3Q6IHRvYXN0XG4gICAgfTtcbiAgICByZXR1cm4gRlVOQ1RJT05TO1xuXG4gICAgLy8gdG9hc3QgcG9wdXAgd2l0aCBjdXN0b20gbXNnXG4gICAgZnVuY3Rpb24gdG9hc3QobXNnKSB7XG4gICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMzAwMDtcblxuICAgICAgTWF0ZXJpYWxpemUudG9hc3QobXNnLCB0aW1lKTtcbiAgICB9XG4gIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mdW5jdGlvbnMuZmFjdG9yeS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJmdW5jdGlvbnMuZmFjdG9yeVwiLCBbXSkuZmFjdG9yeShcIkZ1bmN0aW9uc1wiLCBGdW5jdGlvbnMpO1xuXG4gIGZ1bmN0aW9uIEZ1bmN0aW9ucyh0b2FzdHIpIHtcblxuICAgIHZhciBGVU5DVElPTlMgPSB7XG4gICAgICB0b2FzdDogdG9hc3RcbiAgICB9O1xuICAgIHJldHVybiBGVU5DVElPTlM7XG5cbiAgICAvLyB0b2FzdCBwb3B1cCB3aXRoIGN1c3RvbSBtc2dcbiAgICAvLyBpbmZvOmJsdWUgc3VjY2VzczpncmVlbiBlcnJvcjpyZWQgd2FybmluZzpvcmFuZ2VcbiAgICBmdW5jdGlvbiB0b2FzdCgpIHtcbiAgICAgIHJldHVybiB0b2FzdHI7XG4gICAgfVxuICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVuY3Rpb25zLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2VydmljZXMubW9kdWxlXCIsIFtcImZ1bmN0aW9ucy5mYWN0b3J5XCIsIFwic2hhcmUuc2VydmljZVwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VydmljZXMubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInNoYXJlLnNlcnZpY2VcIiwgW10pLnNlcnZpY2UoXCJTaGFyZVwiLCBTaGFyZSk7XG5cblx0ZnVuY3Rpb24gU2hhcmUoKSB7XG5cdFx0dGhpcy5oZWFkZXJEZXNjcmlwdGlvbiA9ICcnO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmUuc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJ1c2VyLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJVc2VyXCIsIFVzZXIpO1xuXG5cdGZ1bmN0aW9uIFVzZXIoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0cmV0dXJuICRmaXJlYmFzZU9iamVjdCgkZmlyZWJhc2VSZWYudXNlcnMpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci5mYWN0b3J5LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ3NoYXJlZC5tb2R1bGUnLCBbJ3NlcnZpY2VzLm1vZHVsZScsICdkaXJlY3RpdmVzLm1vZHVsZScsICdsYXlvdXQubW9kdWxlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYXJlZC5tb2R1bGUuanMubWFwXG4iXX0=
