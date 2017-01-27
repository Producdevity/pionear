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
		console.log('authcontroller');
		vm.signUp = signUp;
		vm.signIn = signIn;

		vm.loading = true;

		Auth.$onAuthStateChanged(function (user) {
			//if(user) $location.path('/');
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

		function signUp(credentials) {
			var _this2 = this;

			console.log(credentials);
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

		GoogleMapApi.then(function (maps) {
			maps.visualRefresh = true;
		});
		uiGmapGoogleMapApi.then(function (maps) {
			maps.visualRefresh = true;
		});

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

	function PhotoService($firebaseRef, $firebaseArray, $firebaseObject) {
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
			offers: CONFIG.databaseURL + '/offers'
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
		//$rootScope._ = window._;

		$rootScope.$on('$routeChangeStart', function (next, current) {
			checkAuth();
		});

		$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
			// We can catch the error thrown when the $requireSignIn promise is rejected
			// and redirect the user back to the home page
			if (error === "AUTH_REQUIRED") {
				//$state.go("home");
			}
		});

		function checkAuth() {
			Auth.$onAuthStateChanged(function (user) {
				//if(!user) $location.path('/auth');
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

	function SidebarController($location, Auth) {
		var vm = this;

		vm.signOut = signOut;

		function signOut() {
			console.log('signout');
			Auth.$signOut().then(this._fs.toast().success('You are signed out.'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2FwcC5yb3V0ZXMuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZGQtYWR2ZXJ0aXNtZW50L2FkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkZC1hZHZlcnRpc21lbnQvc2lnbi11cC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hZHZlcnRpc21lbnQubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYWR2ZXJ0aXNtZW50LnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2FkdmVydGlzbWVudC5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2FkdmVydGlzZW1lbnQvYXV0aC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9hdXRoLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L2F1dGguc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hZHZlcnRpc2VtZW50L292ZXJ2aWV3L292ZXJ2aWV3LmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudC9vdmVydmlldy9zaWduLWluLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvYXV0aC9hdXRoLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9hdXRoL2F1dGgucm91dGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2NvbXBvbmVudHMubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9kYXNoYm9hcmQvbWFpbi5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL2Rhc2hib2FyZC9tYWluLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9vZmZlci9hZGQtb2ZmZXIvYWRkLW9mZmVyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb2ZmZXIuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9vZmZlci9vZmZlci5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb2ZmZXIucm91dGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL29mZmVyL29mZmVyLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvb2ZmZXIvb3ZlcnZpZXcvb3ZlcnZpZXcuY29udHJvbGxlci5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9waG90by9hZGQtb2ZmZXIvYWRkLW9mZmVyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvcGhvdG8vYWRkLXBob3RvL2FkZC1waG90by5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3Bob3RvL29mZmVyLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9waG90by9vdmVydmlldy9vdmVydmlldy5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3Bob3RvL3Bob3RvLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvcGhvdG8vcGhvdG8ubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3Bob3RvL3Bob3RvLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9waG90by9waG90by5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLnJvdXRlcy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5zZXJ2aWNlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3VzZXIvdXNlci5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9jb21wb25lbnRzL3VzZXIvdXNlci5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbXBvbmVudHMvdXNlci91c2VyLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvbmZpZy5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvY29yZS9jb3JlLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvcmUvY29yZS5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL2NvcmUvY29yZS5tb2R1bGVzLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9ib2R5LWNsYXNzZXMvYm9keS1jbGFzc2VzLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9kaXJlY3RpdmVzL2V4YW1wbGUuZGVyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvZGlyZWN0aXZlcy9leGFtcGxlLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvbG9hZGluZy9sb2FkaW5nLmRpcmVjdGl2ZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL2RpcmVjdGl2ZXMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvbGF5b3V0L2xheW91dC5tb2R1bGUuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9sYXlvdXQvc2lkZWJhci9zaWRlYmFyLmNvbnRyb2xsZXIuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9uYXZpZ2F0aW9uL25hdi5jb250cm9sbGVyLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvbmF2aWdhdGlvbi9uYXYubW9kdWxlLmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvYXV0aC5mYWN0b3J5LmpzIiwic3JjL2J1aWxkL2VzNi1idWlsZC9zaGFyZWQvc2VydmljZXMvZnVuY3Rpb25zLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy9mdW5jdGlvbnMuc2VydmljZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3NlcnZpY2VzLm1vZHVsZS5qcyIsInNyYy9idWlsZC9lczYtYnVpbGQvc2hhcmVkL3NlcnZpY2VzL3NoYXJlLnNlcnZpY2UuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zZXJ2aWNlcy91c2VyLmZhY3RvcnkuanMiLCJzcmMvYnVpbGQvZXM2LWJ1aWxkL3NoYXJlZC9zaGFyZWQubW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcCcsIFtcblx0Ly9cdFRoaXJkIFBhcnR5IE1vZHVsZXNcblx0J3VpLnJvdXRlcicsICdmaXJlYmFzZScsICd0b2FzdHInLCAnbmVtTG9nZ2luZycsICd1aUdtYXBnb29nbGUtbWFwcycsXG5cdC8vXHRNeSBNb2R1bGVzXG5cdCdjb21wb25lbnRzLm1vZHVsZScsICdzaGFyZWQubW9kdWxlJywgJ2NvcmUubW9kdWxlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm15QXBwXCIpLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdhcHAucm91dGVzIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblx0XHR2YXIgQkFTRV9QQVRIID0gJ2FwcC9jb21wb25lbnRzJztcblxuXHRcdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XG5cdFx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2QvZGFzaGJvYXJkJyk7XG5cdFx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21haW4nLCB7XG5cdFx0XHR1cmw6ICcvZCcsXG5cdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdHRlbXBsYXRlVXJsOiBCQVNFX1BBVEggKyAnL21haW4vbWFpbi52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJyxcblx0XHRcdHJlc29sdmU6IHtcblx0XHRcdFx0Ly8gY29udHJvbGxlciB3aWxsIG5vdCBiZSBsb2FkZWQgdW50aWwgJHJlcXVpcmVTaWduSW4gcmVzb2x2ZXNcblx0XHRcdFx0Ly8gQXV0aCByZWZlcnMgdG8gb3VyICRmaXJlYmFzZUF1dGggd3JhcHBlciBpbiB0aGUgZmFjdG9yeSBiZWxvd1xuXHRcdFx0XHRcImN1cnJlbnRBdXRoXCI6IFtcIkF1dGhcIiwgZnVuY3Rpb24gKEF1dGgpIHtcblx0XHRcdFx0XHQvLyAkcmVxdWlyZVNpZ25JbiByZXR1cm5zIGEgcHJvbWlzZSBzbyB0aGUgcmVzb2x2ZSB3YWl0cyBmb3IgaXQgdG8gY29tcGxldGVcblx0XHRcdFx0XHQvLyBJZiB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCwgaXQgd2lsbCB0aHJvdyBhICRzdGF0ZUNoYW5nZUVycm9yIChzZWUgYWJvdmUpXG5cdFx0XHRcdFx0cmV0dXJuIEF1dGguJHJlcXVpcmVTaWduSW4oKTtcblx0XHRcdFx0fV1cblx0XHRcdH1cblx0XHR9KS5zdGF0ZSgnbWFpbi5kYXNoYm9hcmQnLCB7XG5cdFx0XHR1cmw6ICcvZGFzaGJvYXJkJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBCQVNFX1BBVEggKyAnL2Rhc2hib2FyZC9kYXNoYm9hcmQudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdEYXNoYm9hcmRDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLnJvdXRlcy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcImFkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIkFkZEFkdmVydGlzbWVudENvbnRyb2xsZXJcIiwgQWRkQWR2ZXJ0aXNtZW50Q29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQWRkQWR2ZXJ0aXNtZW50Q29udHJvbGxlcihBZHZlcnRpc21lbnRTZXJ2aWNlLCBVc2VyU2VydmljZSwgRnVuY3Rpb25zLCAkdGltZW91dCwgJGxvY2F0aW9uKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZC1hZHZlcnRpc21lbnQuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcInNpZ24tdXAuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlNpZ25VcENvbnRyb2xsZXJcIiwgU2lnblVwQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gU2lnblVwQ29udHJvbGxlcihBdXRoLCBVc2VyU2VydmljZSwgRnVuY3Rpb25zLCAkdGltZW91dCwgJGxvY2F0aW9uKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdHZtLnRpdGxlID0gJ1NpZ24gdXAgZm9yIFBpb25lYXInO1xuXG5cdFx0dm0uc2lnblVwID0gc2lnblVwO1xuXG5cdFx0ZnVuY3Rpb24gc2lnblVwKGNyZWRlbnRpYWxzKSB7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0XHRBdXRoLiRjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3MpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0dmFyIG5ld1VzZXIgPSBVc2VyU2VydmljZS5nZXRVc2VyKHVzZXIudWlkKTtcblx0XHRcdFx0Y29uc29sZS5sb2coY3JlZGVudGlhbHMpO1xuXHRcdFx0XHRuZXdVc2VyLmVtYWlsID0gdXNlci5lbWFpbDtcblx0XHRcdFx0bmV3VXNlci5uYW1lID0gY3JlZGVudGlhbHMubmFtZTtcblx0XHRcdFx0bmV3VXNlci5jb21wYW55ID0gY3JlZGVudGlhbHMuY29tcGFueTtcblx0XHRcdFx0bmV3VXNlci5hZGRyZXNzID0gY3JlZGVudGlhbHMuYWRkcmVzcztcblx0XHRcdFx0bmV3VXNlci56aXBjb2RlID0gY3JlZGVudGlhbHMuemlwY29kZTtcblx0XHRcdFx0bmV3VXNlci5waG9uZSA9IGNyZWRlbnRpYWxzLnBob25lO1xuXHRcdFx0XHRuZXdVc2VyLmxhbmQgPSBjcmVkZW50aWFscy5sYW5kO1xuXHRcdFx0XHRuZXdVc2VyLiRzYXZlKCkudGhlbihfdGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKCdTaWduZWQgdXAgc3VjY2Vzc2Z1bGx5IScpKS50aGVuKCRsb2NhdGlvbi5wYXRoKCcvJykpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdF90aGlzLl9mcy50b2FzdCgpLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiLCBlcnJvcik7XG5cdFx0XHRcdHZtLmVycm9yID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ24tdXAuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhZHZlcnRpc21lbnQuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIkFkdmVydGlzbWVudENvbnRyb2xsZXJcIiwgQWR2ZXJ0aXNtZW50Q29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQWR2ZXJ0aXNtZW50Q29udHJvbGxlcigpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKCdhZGQgY29udHJvbCcpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnYWR2ZXJ0aXNtZW50Lm1vZHVsZScsIFsnYWR2ZXJ0aXNtZW50LnJvdXRlcycsICdhZHZlcnRpc21lbnQuY29udHJvbGxlcicsICdvdmVydmlldy1hZHZlcnRpc21lbnQuY29udHJvbGxlcicsICdhZGQtYWR2ZXJ0aXNtZW50LmNvbnRyb2xsZXInLCAnYWR2ZXJ0aXNtZW50LnNlcnZpY2UnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWR2ZXJ0aXNtZW50Lm1vZHVsZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWR2ZXJ0aXNtZW50LnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FkdmVydGlzbWVudCBjb25maWcgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXG5cdFx0dmFyIEFEVkVSVElTTUVOVF9QQVRIID0gJ2FwcC9jb21wb25lbnRzL2FkdmVydGlzbWVudCc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnYWR2ZXJ0aXNtZW50Jywge1xuXHRcdFx0dXJsOiAnL2FkdmVydGlzbWVudCcsXG5cdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdHRlbXBsYXRlVXJsOiBBRFZFUlRJU01FTlRfUEFUSCArICcvYWR2ZXJ0aXNtZW50LnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWR2ZXJ0aXNtZW50Q29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnYWR2ZXJ0aXNtZW50Lm92ZXJ2aWV3Jywge1xuXHRcdFx0dXJsOiAnL292ZXJ2aWV3Jyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBRFZFUlRJU01FTlRfUEFUSCArICcvYWR2ZXJ0aXNtZW50L292ZXJ2aWV3LnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnT3ZlcnZpZXdBZHZlcnRpc21lbnRDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdhZHZlcnRpc21lbnQuYWRkJywge1xuXHRcdFx0dXJsOiAnL2FkZC1hZHZlcnRpc21lbnQnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFEVkVSVElTTUVOVF9QQVRIICsgJy9hZHZlcnRpc21lbnQvYWRkLWFkdmVydGlzbWVudC52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0FkZEFkdmVydGlzbWVudENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZHZlcnRpc21lbnQucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImFkdmVydGlzbWVudC5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiQWR2ZXJ0aXNtZW50U2VydmljZVwiLCBBZHZlcnRpc21lbnRTZXJ2aWNlKTtcblxuXHRmdW5jdGlvbiBBZHZlcnRpc21lbnRTZXJ2aWNlKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHZhciBhZHZlcnRpc21lbnRzID0gJGZpcmViYXNlQXJyYXkoJGZpcmViYXNlUmVmLmFkdmVydGlzbWVudHMpO1xuXG5cdFx0dmFyIEFQSSA9IHtcblx0XHRcdGdldEFkczogZ2V0QWRzLFxuXHRcdFx0Z2V0QWQ6IGdldEFkLFxuXHRcdFx0dXBkYXRlQWQ6IHVwZGF0ZUFkLFxuXHRcdFx0ZGVsZXRlQWQ6IGRlbGV0ZUFkXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gZ2V0QWRzKCkge1xuXHRcdFx0cmV0dXJuIGFkdmVydGlzbWVudHM7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0QWQodWlkKSB7XG5cdFx0XHQvL3JldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLmFkdmVydGlzbWVudHMuY2hpbGQodWlkKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlQWQoYWR2ZXJ0aXNtZW50KSB7XG5cdFx0XHRyZXR1cm4gYWR2ZXJ0aXNtZW50LiRzYXZlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlQWQoYWR2ZXJ0aXNtZW50KSB7XG5cdFx0XHRyZXR1cm4gYWR2ZXJ0aXNtZW50cy4kcmVtb3ZlKGFkdmVydGlzbWVudCk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWR2ZXJ0aXNtZW50LnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiQXV0aENvbnRyb2xsZXJcIiwgQXV0aENvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIEF1dGhDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXV0aC5tb2R1bGUnLCBbJ2F1dGgucm91dGVzJywgJ2F1dGguY29udHJvbGxlcicsICdzaWduLWluLmNvbnRyb2xsZXInLCAnc2lnbi11cC5jb250cm9sbGVyJywgJ2F1dGguc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLm1vZHVsZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5yb3V0ZXNcIiwgW10pLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdhdXRoIGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgQVVUSF9VUkwgPSAnYXBwL2NvbXBvbmVudHMvYXV0aCc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXV0aCcsIHtcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dXJsOiAnL2F1dGgnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfVVJMICsgJy9hdXRoLnZpZXcuaHRtbCdcblx0XHR9KS5zdGF0ZSgnYXV0aC5zaWduaW4nLCB7XG5cdFx0XHR1cmw6ICcvc2lnbi1pbicsXG5cdFx0XHR0ZW1wbGF0ZVVybDogQVVUSF9VUkwgKyAnL3NpZ24taW4vc2lnbi1pbi52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1NpZ25JbkNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ2F1dGguc2lnbnVwJywge1xuXHRcdFx0dXJsOiAnL3NpZ24tdXAnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IEFVVEhfVVJMICsgJy9zaWduLXVwL3NpZ24tdXAudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTaWduVXBDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHRcdC8vY29uc3QgY29uZmlnID0ge1xuXHRcdC8vXHRhcGlLZXk6ICAgICAgICAgICAgXCJBSXphU3lDcEhVcDNOOWl1d08yQkUtQWJqcjBDLWxFMW00MjRsQklcIixcblx0XHQvL1x0YXV0aERvbWFpbjogICAgICAgIFwiemFweml0ZS1iNDdmOS5maXJlYmFzZWFwcC5jb21cIixcblx0XHQvL1x0ZGF0YWJhc2VVUkw6ICAgICAgIFwiaHR0cHM6Ly96YXB6aXRlLWI0N2Y5LmZpcmViYXNlaW8uY29tXCIsXG5cdFx0Ly9cdHN0b3JhZ2VCdWNrZXQ6ICAgICBcInphcHppdGUtYjQ3ZjkuYXBwc3BvdC5jb21cIixcblx0XHQvL1x0bWVzc2FnaW5nU2VuZGVySWQ6IFwiNTU0NTg1NTQ3ODQ4XCJcblx0XHQvL307XG5cdFx0Ly9maXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG5cdFx0Ly9cblx0XHQvLyRmaXJlYmFzZVJlZlByb3ZpZGVyLnJlZ2lzdGVyVXJsKHtcblx0XHQvL1x0ZGVmYXVsdDogICAgY29uZmlnLmRhdGFiYXNlVVJMLFxuXHRcdC8vXHRjYXRlZ29yaWVzOiBgJHtjb25maWcuZGF0YWJhc2VVUkx9L2NhdGVnb3JpZXNgLFxuXHRcdC8vXHRzaXRlczogICAgICBgJHtjb25maWcuZGF0YWJhc2VVUkx9L3NpdGVzYCxcblx0XHQvL1x0dXNlcnM6ICAgICAgYCR7Y29uZmlnLmRhdGFiYXNlVVJMfS91c2Vyc2Bcblx0XHQvL30pO1xuXHRcdC8vXG5cdFx0Ly8kdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cdFx0Ly8kc3RhdGVQcm92aWRlclxuXHRcdC8vXHRcdC5zdGF0ZSgnbWFpbicsIHtcblx0XHQvL1x0XHRcdHVybDogJy8nLFxuXHRcdC8vXHRcdFx0dGVtcGxhdGVVcmw6IGAke0JBU0VfVVJMfS9tYWluL21haW4udmlldy5odG1sYCxcblx0XHQvL1x0XHRcdGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG5cdFx0Ly8gICAgICBjb250cm9sbGVyQXM6ICd2bSdcblx0XHQvL1x0XHR9KTtcblx0XHQvLy5zdGF0ZSgnYWJvdXQnLCB7XG5cdFx0Ly9cdHVybDogJy9hYm91dCcsXG5cdFx0Ly9cdHRlbXBsYXRlVXJsOiAnYWJvdXQuaHRtbCcsXG5cdFx0Ly9cdGNvbnRyb2xsZXI6ICdhYm91dEN0cmwnXG5cdFx0Ly99KVxuXHRcdC8vLnN0YXRlKCdjb250YWN0Jywge1xuXHRcdC8vXHR1cmw6ICcvY29udGFjdCcsXG5cdFx0Ly9cdHRlbXBsYXRlVXJsOiAnY29udGFjdC5odG1sJ1xuXHRcdC8vfSlcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImF1dGguc2VydmljZVwiLCBbXSkuZmFjdG9yeShcIkF1dGhcIiwgQXV0aCk7XG5cblx0ZnVuY3Rpb24gQXV0aCgkZmlyZWJhc2VBdXRoKSB7XG5cdFx0cmV0dXJuICRmaXJlYmFzZUF1dGgoKTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGguc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcIm92ZXJ2aWV3LWFkdmVydGlzbWVudC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiT3ZlcnZpZXdBZHZlcnRpc21lbnRDb250cm9sbGVyXCIsIE92ZXJ2aWV3QWR2ZXJ0aXNtZW50Q29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gT3ZlcnZpZXdBZHZlcnRpc21lbnRDb250cm9sbGVyKEFkdmVydGlzbWVudFNlcnZpY2UsICRsb2NhdGlvbiwgRnVuY3Rpb25zKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdHZtLnRpdGxlID0gJ1NpZ24gaW4gdG8gUGlvbmVhcic7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vdmVydmlldy5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2lnbi1pbi5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiU2lnbkluQ29udHJvbGxlclwiLCBTaWduSW5Db250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBTaWduSW5Db250cm9sbGVyKEF1dGgsICRsb2NhdGlvbiwgRnVuY3Rpb25zKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdHZtLnRpdGxlID0gJ1NpZ24gaW4gdG8gUGlvbmVhcic7XG5cdFx0dm0ubG9hZGluZyA9IHRydWU7XG5cblx0XHR2bS5zaWduSW4gPSBzaWduSW47XG5cblx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdGlmICh1c2VyKSAkbG9jYXRpb24ucGF0aCgnLycpO1xuXHRcdH0pO1xuXG5cdFx0ZnVuY3Rpb24gc2lnbkluKGNyZWRlbnRpYWxzKSB7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0XHR2bS5sb2FkaW5nID0gdHJ1ZTtcblx0XHRcdEF1dGguJHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGNyZWRlbnRpYWxzLmVtYWlsLCBjcmVkZW50aWFscy5wYXNzKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRcdF90aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoXCJTaWduZWQgaW4gYXMgXCIgKyB1c2VyLmVtYWlsKTtcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9kYXNoYm9hcmQnKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiQXV0aGVudGljYXRpb24gZmFpbGVkOlwiLCBlcnJvcik7XG5cdFx0XHRcdF90aGlzLl9mcy50b2FzdCgpLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHR2bS5lcnJvciA9IGVycm9yLm1lc3NhZ2U7XG5cdFx0XHRcdHZtLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ24taW4uY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBdXRoQ29udHJvbGxlclwiLCBBdXRoQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQXV0aENvbnRyb2xsZXIoQXV0aCwgVXNlclNlcnZpY2UsIEZ1bmN0aW9ucywgJGxvY2F0aW9uKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblx0XHRjb25zb2xlLmxvZygnYXV0aGNvbnRyb2xsZXInKTtcblx0XHR2bS5zaWduVXAgPSBzaWduVXA7XG5cdFx0dm0uc2lnbkluID0gc2lnbkluO1xuXG5cdFx0dm0ubG9hZGluZyA9IHRydWU7XG5cblx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdC8vaWYodXNlcikgJGxvY2F0aW9uLnBhdGgoJy8nKTtcblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIHNpZ25JbihjcmVkZW50aWFscykge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdFx0Y29uc29sZS5sb2coY3JlZGVudGlhbHMpO1xuXHRcdFx0Y29uc29sZS5sb2coJ3NpbmdpbicpO1xuXHRcdFx0dm0ubG9hZGluZyA9IHRydWU7XG5cdFx0XHRBdXRoLiRzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzcykudGhlbihmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHRfdGhpcy5fZnMudG9hc3QoKS5zdWNjZXNzKFwiU2lnbmVkIGluIGFzIFwiICsgdXNlci5lbWFpbCk7XG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvZGFzaGJvYXJkJyk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkF1dGhlbnRpY2F0aW9uIGZhaWxlZDpcIiwgZXJyb3IpO1xuXHRcdFx0XHRfdGhpcy5fZnMudG9hc3QoKS5lcnJvcihlcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0dm0uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0XHR2bS5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzaWduVXAoY3JlZGVudGlhbHMpIHtcblx0XHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0XHRjb25zb2xlLmxvZyhjcmVkZW50aWFscyk7XG5cdFx0XHRBdXRoLiRjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3MpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0dmFyIG5ld1VzZXIgPSBVc2VyU2VydmljZS5nZXRVc2VyKHVzZXIudWlkKTtcblx0XHRcdFx0Y29uc29sZS5sb2coY3JlZGVudGlhbHMpO1xuXHRcdFx0XHRuZXdVc2VyLmVtYWlsID0gdXNlci5lbWFpbDtcblx0XHRcdFx0bmV3VXNlci5uYW1lID0gY3JlZGVudGlhbHMubmFtZTtcblx0XHRcdFx0bmV3VXNlci5jb21wYW55ID0gY3JlZGVudGlhbHMuY29tcGFueTtcblx0XHRcdFx0bmV3VXNlci5hZGRyZXNzID0gY3JlZGVudGlhbHMuYWRkcmVzcztcblx0XHRcdFx0bmV3VXNlci56aXBjb2RlID0gY3JlZGVudGlhbHMuemlwY29kZTtcblx0XHRcdFx0bmV3VXNlci5waG9uZSA9IGNyZWRlbnRpYWxzLnBob25lO1xuXHRcdFx0XHRuZXdVc2VyLmxhbmQgPSBjcmVkZW50aWFscy5sYW5kO1xuXHRcdFx0XHRuZXdVc2VyLiRzYXZlKCkudGhlbihfdGhpczIuX2ZzLnRvYXN0KCkuc3VjY2VzcygnU2lnbmVkIHVwIHN1Y2Nlc3NmdWxseSEnKSkudGhlbigkbG9jYXRpb24ucGF0aCgnLycpKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRfdGhpczIuX2ZzLnRvYXN0KCkuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogXCIsIGVycm9yKTtcblx0XHRcdFx0dm0uZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2F1dGgubW9kdWxlJywgWydhdXRoLnJvdXRlcycsICdhdXRoLmNvbnRyb2xsZXInLCAnYXV0aC5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJhdXRoLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ2F1dGggY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBBVVRIX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvYXV0aCc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXV0aCcsIHtcblx0XHRcdHVybDogJy9hdXRoJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBBVVRIX1BBVEggKyAnL2F1dGgudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBdXRoQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1dGgucm91dGVzLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2NvbXBvbmVudHMubW9kdWxlJywgWydhdXRoLm1vZHVsZScsICdkYXNoYm9hcmQubW9kdWxlJywgJ29mZmVyLm1vZHVsZScsICdzZXR0aW5ncy5tb2R1bGUnLCAncGhvdG8ubW9kdWxlJywgJ3VzZXIubW9kdWxlJywgJ21haW4ubW9kdWxlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBvbmVudHMubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcImRhc2hib2FyZC5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiRGFzaGJvYXJkQ29udHJvbGxlclwiLCBEYXNoYm9hcmRDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBEYXNoYm9hcmRDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cblx0XHQvLyBzZXQgaGVhZGVyIHRpdGxlc1xuXHRcdHZtLmhlYWRlclRpdGxlID0gJ0Rhc2hib2FyZCc7XG5cdFx0dm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9ICdvdmVydmlldyc7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXNoYm9hcmQuY29udHJvbGxlci5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJkYXNoYm9hcmQubW9kdWxlXCIsIFtcImRhc2hib2FyZC5jb250cm9sbGVyXCJdKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXNoYm9hcmQubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm1haW4uY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIk1haW5Db250cm9sbGVyXCIsIE1haW5Db250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm1haW4ubW9kdWxlXCIsIFtcIm1haW4uY29udHJvbGxlclwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdGFuZ3VsYXIubW9kdWxlKFwiYWRkLW9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBZGRPZmZlckNvbnRyb2xsZXJcIiwgQWRkT2ZmZXJDb250cm9sbGVyKTtcblxuXHRcdGZ1bmN0aW9uIEFkZE9mZmVyQ29udHJvbGxlcihPZmZlclNlcnZpY2UsIEZ1bmN0aW9ucywgU2hhcmUsICRzY29wZSwgJHRpbWVvdXQsICRsb2NhdGlvbikge1xuXHRcdFx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdFx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdFx0XHQvLyB2aWV3bW9kZWwgdmFyaWFibGVzXG5cdFx0XHRcdHZtLm5ld1Bob3RvO1xuXG5cdFx0XHRcdHZtLm9wdGlvbmFsRGVzY3JpcHRpb24gPSBTaGFyZS5oZWFkZXJEZXNjcmlwdGlvbiA9ICdhZGQnO1xuXG5cdFx0XHRcdC8vIGZ1bmN0aW9uc1xuXHRcdFx0XHR2bS5hZGRPZmZlciA9IGFkZE9mZmVyO1xuXHRcdFx0XHQkc2NvcGUuc2V0RmlsZSA9IHNldEZpbGU7XG5cblx0XHRcdFx0LyoqXHJcbiAgICAgKiBzZXQgZmlsZSB0byBwcmV2aWV3IHVwbG9hZGVkIGltZ1xyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqL1xuXHRcdFx0XHRmdW5jdGlvbiBzZXRGaWxlKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdHZtLmN1cnJlbnRGaWxlID0gZWxlbWVudC5maWxlc1swXTsgLy8gc2V0IHVwbG9hZGVkIGltZyBhcyBjdXJyZW50RmlsZVxuXHRcdFx0XHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0XHQvLyB0cmlnZ2VyZCB3aGVuIGZpbGUgaXMgcmVhZFxuXHRcdFx0XHRcdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdHZtLmltYWdlX3NvdXJjZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdFx0JHNjb3BlLiRhcHBseSgpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGVsZW1lbnQuZmlsZXNbMF0pOyAvLyB3aGVuIHRoZSBmaWxlIGlzIHJlYWQsIGl0IHRyaWdnZXJzIHRoZSBvbmxvYWQgZXZlbnQgYWJvdmUuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcclxuICAgICAqIGFkZCBhbiBvZmZlciB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEB0cmlnZ2VyIChuZy1zdWJtaXQpXHJcbiAgICAgKi9cblx0XHRcdFx0ZnVuY3Rpb24gYWRkT2ZmZXIoKSB7XG5cdFx0XHRcdFx0XHRPZmZlclNlcnZpY2UuYWRkT2ZmZXIodm0ubmV3UGhvdG8pLnRoZW4oY29uc29sZS5sb2codm0ubmV3UGhvdG8pKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIkFkZGVkIG5ldyBvZmZlciBcIiArIHZtLm5ld1Bob3RvLm5hbWUpKS50aGVuKHZtLm5ld1Bob3RvID0ge30pO1xuXHRcdFx0XHR9XG5cdFx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZC1vZmZlci5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcIm9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJPZmZlckNvbnRyb2xsZXJcIiwgT2ZmZXJDb250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBPZmZlckNvbnRyb2xsZXIoU2hhcmUpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFNoYXJlKTtcblxuXHRcdC8vIHNldCBoZWFkZXIgdGl0bGVzXG5cdFx0dm0uaGVhZGVyVGl0bGUgPSAnT2ZmZXJzJztcblx0XHR2bS5vcHRpb25hbERlc2NyaXB0aW9uID0gU2hhcmUuaGVhZGVyRGVzY3JpcHRpb24gPSAnb3ZlcnZpZXcnO1xuXHRcdC8vdm0ub3B0aW9uYWxEZXNjcmlwdGlvbiA9ICd0ZXN0Jztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnb2ZmZXIubW9kdWxlJywgWydvZmZlci5yb3V0ZXMnLCAnb2ZmZXIuY29udHJvbGxlcicsICdvdmVydmlldy1vZmZlci5jb250cm9sbGVyJywgJ2FkZC1vZmZlci5jb250cm9sbGVyJywgJ29mZmVyLnNlcnZpY2UnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2ZmZXIubW9kdWxlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvZmZlci5yb3V0ZXNcIiwgW10pLmNvbmZpZyhjb25maWcpO1xuXG5cdGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdvZmZlciBjb25maWcgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXG5cdFx0dmFyIE9GRkVSX1BBVEggPSAnYXBwL2NvbXBvbmVudHMvb2ZmZXInO1xuXG5cdFx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21haW4ub2ZmZXInLCB7XG5cdFx0XHR1cmw6ICcvb2ZmZXInLFxuXHRcdFx0YWJzdHJhY3Q6IHRydWUsXG5cdFx0XHR0ZW1wbGF0ZVVybDogT0ZGRVJfUEFUSCArICcvb2ZmZXIudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdQaG90b0NvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ21haW4ub2ZmZXIub3ZlcnZpZXcnLCB7XG5cdFx0XHR1cmw6ICcvb3ZlcnZpZXcnLFxuXHRcdFx0dGVtcGxhdGVVcmw6IE9GRkVSX1BBVEggKyAnL292ZXJ2aWV3L292ZXJ2aWV3LnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSkuc3RhdGUoJ21haW4ub2ZmZXIuYWRkJywge1xuXHRcdFx0dXJsOiAnL2FkZC1vZmZlcicsXG5cdFx0XHR0ZW1wbGF0ZVVybDogT0ZGRVJfUEFUSCArICcvYWRkLW9mZmVyL2FkZC1vZmZlci52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0FkZE9mZmVyQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLnJvdXRlcy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvZmZlci5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiT2ZmZXJTZXJ2aWNlXCIsIE9mZmVyU2VydmljZSk7XG5cblx0ZnVuY3Rpb24gT2ZmZXJTZXJ2aWNlKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHZhciBvZmZlcnMgPSAkZmlyZWJhc2VBcnJheSgkZmlyZWJhc2VSZWYub2ZmZXJzKTtcblxuXHRcdHZhciBBUEkgPSB7XG5cdFx0XHRhZGRPZmZlcjogYWRkT2ZmZXIsXG5cdFx0XHRnZXRPZmZlcnM6IGdldE9mZmVycyxcblx0XHRcdGdldE9mZmVyOiBnZXRPZmZlcixcblx0XHRcdHVwZGF0ZU9mZmVyOiB1cGRhdGVPZmZlcixcblx0XHRcdGRlbGV0ZU9mZmVyOiBkZWxldGVPZmZlclxuXHRcdH07XG5cdFx0cmV0dXJuIEFQSTtcblxuXHRcdGZ1bmN0aW9uIGFkZE9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzLiRhZGQoe1xuXHRcdFx0XHRuYW1lOiBvZmZlci5uYW1lXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRPZmZlcnMoKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldE9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi5vZmZlcnMuY2hpbGQob2ZmZXIuJGlkKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlci4kc2F2ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbGV0ZU9mZmVyKG9mZmVyKSB7XG5cdFx0XHRyZXR1cm4gb2ZmZXJzLiRyZW1vdmUob2ZmZXIpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mZmVyLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvdmVydmlldy1vZmZlci5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXJcIiwgT3ZlcnZpZXdPZmZlckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE92ZXJ2aWV3T2ZmZXJDb250cm9sbGVyKE9mZmVyU2VydmljZSwgJGxvY2F0aW9uLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0dm0udGl0bGUgPSAnU2lnbiBpbiB0byBQaW9uZWFyJztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW92ZXJ2aWV3LmNvbnRyb2xsZXIuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdGFuZ3VsYXIubW9kdWxlKFwiYWRkLW9mZmVyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBZGRPZmZlckNvbnRyb2xsZXJcIiwgQWRkT2ZmZXJDb250cm9sbGVyKTtcblxuXHRcdGZ1bmN0aW9uIEFkZE9mZmVyQ29udHJvbGxlcihPZmZlclNlcnZpY2UsIEZ1bmN0aW9ucywgU2hhcmUsICRzY29wZSwgJHRpbWVvdXQsICRsb2NhdGlvbikge1xuXHRcdFx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdFx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdFx0XHQvLyB2aWV3bW9kZWwgdmFyaWFibGVzXG5cdFx0XHRcdHZtLm5ld09mZmVyO1xuXG5cdFx0XHRcdHZtLm9wdGlvbmFsRGVzY3JpcHRpb24gPSBTaGFyZS5oZWFkZXJEZXNjcmlwdGlvbiA9ICdhZGQnO1xuXG5cdFx0XHRcdC8vIGZ1bmN0aW9uc1xuXHRcdFx0XHR2bS5hZGRPZmZlciA9IGFkZE9mZmVyO1xuXHRcdFx0XHQkc2NvcGUuc2V0RmlsZSA9IHNldEZpbGU7XG5cblx0XHRcdFx0LyoqXHJcbiAgICAgKiBzZXQgZmlsZSB0byBwcmV2aWV3IHVwbG9hZGVkIGltZ1xyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqL1xuXHRcdFx0XHRmdW5jdGlvbiBzZXRGaWxlKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdHZtLmN1cnJlbnRGaWxlID0gZWxlbWVudC5maWxlc1swXTsgLy8gc2V0IHVwbG9hZGVkIGltZyBhcyBjdXJyZW50RmlsZVxuXHRcdFx0XHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0XHQvLyB0cmlnZ2VyZCB3aGVuIGZpbGUgaXMgcmVhZFxuXHRcdFx0XHRcdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdHZtLmltYWdlX3NvdXJjZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdFx0JHNjb3BlLiRhcHBseSgpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGVsZW1lbnQuZmlsZXNbMF0pOyAvLyB3aGVuIHRoZSBmaWxlIGlzIHJlYWQsIGl0IHRyaWdnZXJzIHRoZSBvbmxvYWQgZXZlbnQgYWJvdmUuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKipcclxuICAgICAqIGFkZCBhbiBvZmZlciB0byB0aGUgZGF0YWJhc2VcclxuICAgICAqIEB0cmlnZ2VyIChuZy1zdWJtaXQpXHJcbiAgICAgKi9cblx0XHRcdFx0ZnVuY3Rpb24gYWRkT2ZmZXIoKSB7XG5cdFx0XHRcdFx0XHRPZmZlclNlcnZpY2UuYWRkT2ZmZXIodm0ubmV3T2ZmZXIpLnRoZW4oY29uc29sZS5sb2codm0ubmV3T2ZmZXIpKS50aGVuKHRoaXMuX2ZzLnRvYXN0KCkuc3VjY2VzcyhcIkFkZGVkIG5ldyBvZmZlciBcIiArIHZtLm5ld09mZmVyLm5hbWUpKS50aGVuKHZtLm5ld09mZmVyID0ge30pO1xuXHRcdFx0XHR9XG5cdFx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFkZC1vZmZlci5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYWRkLXBob3RvLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJBZGRQaG90b0NvbnRyb2xsZXJcIiwgQWRkUGhvdG9Db250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBBZGRQaG90b0NvbnRyb2xsZXIoUGhvdG9TZXJ2aWNlLCBGdW5jdGlvbnMsIFNoYXJlLCAkc2NvcGUsICRsb2csIEdvb2dsZU1hcEFwaSwgdWlHbWFwR29vZ2xlTWFwQXBpKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR0aGlzLl9mcyA9IEZ1bmN0aW9ucztcblxuXHRcdC8vIHZpZXdtb2RlbCB2YXJpYWJsZXNcblx0XHR2bS5uZXdQaG90bztcblxuXHRcdHZtLm9wdGlvbmFsRGVzY3JpcHRpb24gPSBTaGFyZS5oZWFkZXJEZXNjcmlwdGlvbiA9ICdhZGQnO1xuXHRcdHZtLm1hcCA9IHtcblx0XHRcdGNlbnRlcjogeyBsYXRpdHVkZTogNDUsIGxvbmdpdHVkZTogLTczIH0sXG5cdFx0XHR6b29tOiA4LFxuXHRcdFx0c2VhcmNoYm94OiB7XG5cdFx0XHRcdHRlbXBsYXRlOiAnc2VhcmNoYm94LnRwbC5odG1sJyxcblx0XHRcdFx0ZXZlbnRzOiB7XG5cdFx0XHRcdFx0cGxhY2VzX2NoYW5nZWQ6IGZ1bmN0aW9uIHBsYWNlc19jaGFuZ2VkKHNlYXJjaEJveCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coc2VhcmNoQm94KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdHNjcm9sbHdoZWVsOiBmYWxzZVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRHb29nbGVNYXBBcGkudGhlbihmdW5jdGlvbiAobWFwcykge1xuXHRcdFx0bWFwcy52aXN1YWxSZWZyZXNoID0gdHJ1ZTtcblx0XHR9KTtcblx0XHR1aUdtYXBHb29nbGVNYXBBcGkudGhlbihmdW5jdGlvbiAobWFwcykge1xuXHRcdFx0bWFwcy52aXN1YWxSZWZyZXNoID0gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdC8vIGZ1bmN0aW9uc1xuXHRcdHZtLmFkZFBob3RvID0gYWRkUGhvdG87XG5cdFx0JHNjb3BlLnNldEZpbGUgPSBzZXRGaWxlO1xuXG5cdFx0LyoqXHJcbiAgICogc2V0IGZpbGUgdG8gcHJldmlldyB1cGxvYWRlZCBpbWdcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqL1xuXHRcdGZ1bmN0aW9uIHNldEZpbGUoZWxlbWVudCkge1xuXHRcdFx0dm0uY3VycmVudEZpbGUgPSBlbGVtZW50LmZpbGVzWzBdOyAvLyBzZXQgdXBsb2FkZWQgaW1nIGFzIGN1cnJlbnRGaWxlXG5cdFx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdC8vIHRyaWdnZXJkIHdoZW4gZmlsZSBpcyByZWFkXG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZtLmltYWdlX3NvdXJjZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdCRzY29wZS4kYXBwbHkoKTtcblx0XHRcdH07XG5cdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChlbGVtZW50LmZpbGVzWzBdKTsgLy8gd2hlbiB0aGUgZmlsZSBpcyByZWFkLCBpdCB0cmlnZ2VycyB0aGUgb25sb2FkIGV2ZW50IGFib3ZlLlxuXHRcdH1cblxuXHRcdC8qKlxyXG4gICAqIGFkZCBhbiBvZmZlciB0byB0aGUgZGF0YWJhc2VcclxuICAgKiBAdHJpZ2dlciAobmctc3VibWl0KVxyXG4gICAqL1xuXHRcdGZ1bmN0aW9uIGFkZFBob3RvKCkge1xuXHRcdFx0UGhvdG9TZXJ2aWNlLmFkZFBob3RvKHZtLm5ld1Bob3RvKS50aGVuKGNvbnNvbGUubG9nKHZtLm5ld1Bob3RvKSkudGhlbih0aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoXCJBZGRlZCBuZXcgb2ZmZXIgXCIgKyB2bS5uZXdQaG90by5uYW1lKSkudGhlbih2bS5uZXdQaG90byA9IHt9KTtcblx0XHR9XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGQtcGhvdG8uY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwib2ZmZXIucm91dGVzXCIsIFtdKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnb2ZmZXIgY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBPRkZFUl9QQVRIID0gJ2FwcC9jb21wb25lbnRzL29mZmVyJztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtYWluLm9mZmVyJywge1xuXHRcdFx0dXJsOiAnL29mZmVyJyxcblx0XHRcdGFic3RyYWN0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6IE9GRkVSX1BBVEggKyAnL29mZmVyLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnT2ZmZXJDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdtYWluLm9mZmVyLm92ZXJ2aWV3Jywge1xuXHRcdFx0dXJsOiAnL292ZXJ2aWV3Jyxcblx0XHRcdHRlbXBsYXRlVXJsOiBPRkZFUl9QQVRIICsgJy9vdmVydmlldy9vdmVydmlldy52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ092ZXJ2aWV3T2ZmZXJDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pLnN0YXRlKCdtYWluLm9mZmVyLmFkZCcsIHtcblx0XHRcdHVybDogJy9hZGQtb2ZmZXInLFxuXHRcdFx0dGVtcGxhdGVVcmw6IE9GRkVSX1BBVEggKyAnL2FkZC1vZmZlci9hZGQtb2ZmZXIudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdBZGRPZmZlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0fSk7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZmZlci5yb3V0ZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJvdmVydmlldy1waG90by5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiT3ZlcnZpZXdQaG90b0NvbnRyb2xsZXJcIiwgT3ZlcnZpZXdQaG90b0NvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE92ZXJ2aWV3UGhvdG9Db250cm9sbGVyKEZ1bmN0aW9ucykge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vdmVydmlldy5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInBob3RvLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJQaG90b0NvbnRyb2xsZXJcIiwgUGhvdG9Db250cm9sbGVyKTtcblxuXHRmdW5jdGlvbiBQaG90b0NvbnRyb2xsZXIoU2hhcmUpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdGNvbnNvbGUubG9nKFNoYXJlKTtcblxuXHRcdC8vIHNldCBoZWFkZXIgdGl0bGVzXG5cdFx0dm0uaGVhZGVyVGl0bGUgPSAnUGhvdG9zJztcblx0XHR2bS5vcHRpb25hbERlc2NyaXB0aW9uID0gU2hhcmUuaGVhZGVyRGVzY3JpcHRpb24gPSAnb3ZlcnZpZXcnO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGhvdG8uY29udHJvbGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdwaG90by5tb2R1bGUnLCBbJ3Bob3RvLnJvdXRlcycsICdwaG90by5jb250cm9sbGVyJywgJ292ZXJ2aWV3LXBob3RvLmNvbnRyb2xsZXInLCAnYWRkLXBob3RvLmNvbnRyb2xsZXInLCAncGhvdG8uc2VydmljZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waG90by5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInBob3RvLnJvdXRlc1wiLCBbXSkuY29uZmlnKGNvbmZpZyk7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XG5cdFx0Y29uc29sZS5sb2coJ3Bob3RvIGNvbmZpZyBmdW5jdGlvbiBzdGFydGVkJyk7XG5cblx0XHR2YXIgUEhPVE9fUEFUSCA9ICdhcHAvY29tcG9uZW50cy9waG90byc7XG5cblx0XHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWFpbi5waG90bycsIHtcblx0XHRcdHVybDogJy9waG90bycsXG5cdFx0XHRhYnN0cmFjdDogdHJ1ZSxcblx0XHRcdHRlbXBsYXRlVXJsOiBQSE9UT19QQVRIICsgJy9waG90by52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1Bob3RvQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnbWFpbi5waG90by5vdmVydmlldycsIHtcblx0XHRcdHVybDogJy9vdmVydmlldycsXG5cdFx0XHR0ZW1wbGF0ZVVybDogUEhPVE9fUEFUSCArICcvb3ZlcnZpZXcvb3ZlcnZpZXcudmlldy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdPdmVydmlld1Bob3RvQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KS5zdGF0ZSgnbWFpbi5waG90by5hZGQnLCB7XG5cdFx0XHR1cmw6ICcvYWRkLXBob3RvJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBQSE9UT19QQVRIICsgJy9hZGQtcGhvdG8vYWRkLXBob3RvLnZpZXcuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnQWRkUGhvdG9Db250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGhvdG8ucm91dGVzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInBob3RvLnNlcnZpY2VcIiwgW10pLmZhY3RvcnkoXCJQaG90b1NlcnZpY2VcIiwgUGhvdG9TZXJ2aWNlKTtcblxuXHRmdW5jdGlvbiBQaG90b1NlcnZpY2UoJGZpcmViYXNlUmVmLCAkZmlyZWJhc2VBcnJheSwgJGZpcmViYXNlT2JqZWN0KSB7XG5cdFx0dmFyIG9mZmVycyA9ICRmaXJlYmFzZUFycmF5KCRmaXJlYmFzZVJlZi5vZmZlcnMpO1xuXG5cdFx0dmFyIEFQSSA9IHtcblx0XHRcdGFkZE9mZmVyOiBhZGRPZmZlcixcblx0XHRcdGdldE9mZmVyczogZ2V0T2ZmZXJzLFxuXHRcdFx0Z2V0T2ZmZXI6IGdldE9mZmVyLFxuXHRcdFx0dXBkYXRlT2ZmZXI6IHVwZGF0ZU9mZmVyLFxuXHRcdFx0ZGVsZXRlT2ZmZXI6IGRlbGV0ZU9mZmVyXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gYWRkT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlcnMuJGFkZCh7XG5cdFx0XHRcdG5hbWU6IG9mZmVyLm5hbWVcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldE9mZmVycygpIHtcblx0XHRcdHJldHVybiBvZmZlcnM7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0T2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLm9mZmVycy5jaGlsZChvZmZlci4kaWQpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVPZmZlcihvZmZlcikge1xuXHRcdFx0cmV0dXJuIG9mZmVyLiRzYXZlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGVsZXRlT2ZmZXIob2ZmZXIpIHtcblx0XHRcdHJldHVybiBvZmZlcnMuJHJlbW92ZShvZmZlcik7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGhvdG8uc2VydmljZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcdCd1c2Ugc3RyaWN0JztcblxuXHRcdGFuZ3VsYXIubW9kdWxlKFwic2V0dGluZ3MuY29udHJvbGxlclwiLCBbXSkuY29udHJvbGxlcihcIlNldHRpbmdzQ29udHJvbGxlclwiLCBTZXR0aW5nc0NvbnRyb2xsZXIpO1xuXG5cdFx0ZnVuY3Rpb24gU2V0dGluZ3NDb250cm9sbGVyKFNoYXJlLCBVc2VyU2VydmljZSwgQXV0aCwgRnVuY3Rpb25zKSB7XG5cdFx0XHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuX2ZzID0gRnVuY3Rpb25zO1xuXG5cdFx0XHRcdHZtLnVwZGF0ZVByb2ZpbGUgPSB1cGRhdGVQcm9maWxlO1xuXG5cdFx0XHRcdC8vIHNldCBoZWFkZXIgdGl0bGVzXG5cdFx0XHRcdHZtLmhlYWRlclRpdGxlID0gJ0FjY291bnQgc2V0dGluZ3MnO1xuXHRcdFx0XHR2bS5vcHRpb25hbERlc2NyaXB0aW9uID0gU2hhcmUuaGVhZGVyRGVzY3JpcHRpb24gPSAnb3ZlcnZpZXcnO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0XHRcdFx0XHRnZXRVc2VyKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5pdCgpO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIGdldFVzZXIoKSB7XG5cdFx0XHRcdFx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodXNlcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2bS5jdXJyZW50VXNlciA9IFVzZXJTZXJ2aWNlLmdldFVzZXIodXNlci51aWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh2bS5jdXJyZW50VXNlcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmdW5jdGlvbiB1cGRhdGVQcm9maWxlKCkge1xuXHRcdFx0XHRcdFx0VXNlclNlcnZpY2UudXBkYXRlVXNlcih2bS5jdXJyZW50VXNlcikudGhlbih0aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoXCJVcGRhdGVkIHByb2ZpbGVcIikpO1xuXHRcdFx0XHR9XG5cdFx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNldHRpbmdzLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MubW9kdWxlJywgWydzZXR0aW5ncy5yb3V0ZXMnLCAnc2V0dGluZ3MuY29udHJvbGxlcicsICdzZXR0aW5ncy5zZXJ2aWNlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNldHRpbmdzLm1vZHVsZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwic2V0dGluZ3Mucm91dGVzXCIsIFtdKS5jb25maWcoY29uZmlnKTtcblxuXHRmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcblx0XHRjb25zb2xlLmxvZygnc2V0dGluZ3MgY29uZmlnIGZ1bmN0aW9uIHN0YXJ0ZWQnKTtcblxuXHRcdHZhciBTRVRUSU5HU19QQVRIID0gJ2FwcC9jb21wb25lbnRzL3NldHRpbmdzJztcblxuXHRcdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtYWluLnNldHRpbmdzJywge1xuXHRcdFx0dXJsOiAnL3NldHRpbmdzJyxcblx0XHRcdHRlbXBsYXRlVXJsOiBTRVRUSU5HU19QQVRIICsgJy9zZXR0aW5ncy52aWV3Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1NldHRpbmdzQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd2bSdcblx0XHR9KTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNldHRpbmdzLnJvdXRlcy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzZXR0aW5ncy5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiU2V0dGluZ3NTZXJ2aWNlXCIsIFNldHRpbmdzU2VydmljZSk7XG5cblx0ZnVuY3Rpb24gU2V0dGluZ3NTZXJ2aWNlKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHZhciBwcm9maWxlID0gJGZpcmViYXNlT2JqZWN0KCRmaXJlYmFzZVJlZi5zZXR0aW5ncyk7XG5cblx0XHR2YXIgQVBJID0ge1xuXHRcdFx0Z2V0UHJvZmlsZTogZ2V0UHJvZmlsZSxcblx0XHRcdHVwZGF0ZVByb2ZpbGU6IHVwZGF0ZVByb2ZpbGVcblx0XHR9O1xuXHRcdHJldHVybiBBUEk7XG5cblx0XHRmdW5jdGlvbiBnZXRQcm9maWxlKCkge1xuXHRcdFx0cmV0dXJuIHByb2ZpbGU7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlUHJvZmlsZShwcm9maWxlKSB7XG5cdFx0XHRyZXR1cm4gcHJvZmlsZS4kc2F2ZSgpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNldHRpbmdzLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwidXNlci5jb250cm9sbGVyXCIsIFtdKS5jb250cm9sbGVyKFwiVXNlckNvbnRyb2xsZXJcIiwgVXNlckNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIFVzZXJDb250cm9sbGVyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLmNvbnRyb2xsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgndXNlci5tb2R1bGUnLCBbJ3VzZXIuY29udHJvbGxlcicsICd1c2VyLnNlcnZpY2UnXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwidXNlci5zZXJ2aWNlXCIsIFtdKS5mYWN0b3J5KFwiVXNlclNlcnZpY2VcIiwgVXNlclNlcnZpY2UpO1xuXG5cdGZ1bmN0aW9uIFVzZXJTZXJ2aWNlKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHZhciB1c2VycyA9ICRmaXJlYmFzZUFycmF5KCRmaXJlYmFzZVJlZi51c2Vycyk7XG5cblx0XHR2YXIgQVBJID0ge1xuXHRcdFx0Z2V0VXNlcnM6IGdldFVzZXJzLFxuXHRcdFx0Z2V0VXNlcjogZ2V0VXNlcixcblx0XHRcdHVwZGF0ZVVzZXI6IHVwZGF0ZVVzZXIsXG5cdFx0XHRkZWxldGVVc2VyOiBkZWxldGVVc2VyXG5cdFx0fTtcblx0XHRyZXR1cm4gQVBJO1xuXG5cdFx0ZnVuY3Rpb24gZ2V0VXNlcnMoKSB7XG5cdFx0XHRyZXR1cm4gdXNlcnM7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0VXNlcih1aWQpIHtcblx0XHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLnVzZXJzLmNoaWxkKHVpZCkpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZVVzZXIodXNlcikge1xuXHRcdFx0cmV0dXJuIHVzZXIuJHNhdmUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBkZWxldGVVc2VyKHVzZXIpIHtcblx0XHRcdHJldHVybiB1c2Vycy4kcmVtb3ZlKHVzZXIpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuc2VydmljZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwibXlBcHBcIikuY29uZmlnKGNvbmZpZykucnVuKHJ1bik7XG5cblx0ZnVuY3Rpb24gY29uZmlnKCRmaXJlYmFzZVJlZlByb3ZpZGVyLCB1aUdtYXBHb29nbGVNYXBBcGlQcm92aWRlcikge1xuXHRcdGNvbnNvbGUubG9nKCdjb25maWcgZnVuY3Rpb24gc3RhcnRlZCcpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBGaXJlYmFzZVxuXHRcdHZhciBDT05GSUcgPSB7XG5cdFx0XHRhcGlLZXk6IFwiQUl6YVN5RHNwX29CTThsUE9uRUdWbkJ5anNvZkd3N0twZnR6ZmU4XCIsXG5cdFx0XHRhdXRoRG9tYWluOiBcInBpb25lYXItZDA3MGUuZmlyZWJhc2VhcHAuY29tXCIsXG5cdFx0XHRkYXRhYmFzZVVSTDogXCJodHRwczovL3Bpb25lYXItZDA3MGUuZmlyZWJhc2Vpby5jb21cIixcblx0XHRcdHN0b3JhZ2VCdWNrZXQ6IFwicGlvbmVhci1kMDcwZS5hcHBzcG90LmNvbVwiLFxuXHRcdFx0bWVzc2FnaW5nU2VuZGVySWQ6IFwiOTY3NDA1ODYyNTFcIlxuXHRcdH07XG5cdFx0ZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChDT05GSUcpO1xuXG5cdFx0JGZpcmViYXNlUmVmUHJvdmlkZXIucmVnaXN0ZXJVcmwoe1xuXHRcdFx0ZGVmYXVsdDogQ09ORklHLmRhdGFiYXNlVVJMLFxuXHRcdFx0dXNlcnM6IENPTkZJRy5kYXRhYmFzZVVSTCArICcvdXNlcnMnLFxuXHRcdFx0b2ZmZXJzOiBDT05GSUcuZGF0YWJhc2VVUkwgKyAnL29mZmVycydcblx0XHR9KTtcblxuXHRcdHVpR21hcEdvb2dsZU1hcEFwaVByb3ZpZGVyLmNvbmZpZ3VyZSh7XG5cdFx0XHRrZXk6ICdBSXphU3lCbnNhbUlKVlZZaHc5cUkxblM3b29GSGdraHhuc0dCZUUnLFxuXHRcdFx0djogJzMuMjAnLCAvL2RlZmF1bHRzIHRvIGxhdGVzdCAzLlggYW55aG93XG5cdFx0XHRsaWJyYXJpZXM6ICdwbGFjZXMsIGdlb21ldHJ5LCB2aXN1YWxpemF0aW9uJ1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcnVuKEF1dGgsICRyb290U2NvcGUsICRsb2NhdGlvbiwgJHN0YXRlKSB7XG5cdFx0Y29uc29sZS5sb2coJ3J1biBmdW5jdGlvbiBzdGFydGVkJyk7XG5cdFx0Y2hlY2tBdXRoKCk7XG5cdFx0Ly8kcm9vdFNjb3BlLl8gPSB3aW5kb3cuXztcblxuXHRcdCRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChuZXh0LCBjdXJyZW50KSB7XG5cdFx0XHRjaGVja0F1dGgoKTtcblx0XHR9KTtcblxuXHRcdCRyb290U2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlRXJyb3JcIiwgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBlcnJvcikge1xuXHRcdFx0Ly8gV2UgY2FuIGNhdGNoIHRoZSBlcnJvciB0aHJvd24gd2hlbiB0aGUgJHJlcXVpcmVTaWduSW4gcHJvbWlzZSBpcyByZWplY3RlZFxuXHRcdFx0Ly8gYW5kIHJlZGlyZWN0IHRoZSB1c2VyIGJhY2sgdG8gdGhlIGhvbWUgcGFnZVxuXHRcdFx0aWYgKGVycm9yID09PSBcIkFVVEhfUkVRVUlSRURcIikge1xuXHRcdFx0XHQvLyRzdGF0ZS5nbyhcImhvbWVcIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBjaGVja0F1dGgoKSB7XG5cdFx0XHRBdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0Ly9pZighdXNlcikgJGxvY2F0aW9uLnBhdGgoJy9hdXRoJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHVzZXIpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJjb3JlLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJDb3JlQ29udHJvbGxlclwiLCBDb3JlQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gQ29yZUNvbnRyb2xsZXIoQXV0aCwgVXNlclNlcnZpY2UsIEZ1bmN0aW9ucywgJHJvb3RTY29wZSkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0dGhpcy5fZnMgPSBGdW5jdGlvbnM7XG5cblx0XHR2bS5pc1RvZ2dsZWQgPSBmYWxzZTtcblxuXHRcdHZtLnRvZ2dsZVNpZGViYXJQYXJlbnQgPSB0b2dnbGVTaWRlYmFyUGFyZW50O1xuXHRcdHZtLnNpZ25PdXQgPSBzaWduT3V0O1xuXG5cdFx0QXV0aC4kb25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRpZiAodXNlcikgdm0uY3VycmVudFVzZXIgPSBVc2VyU2VydmljZS5nZXRVc2VyKHVzZXIudWlkKTtcblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIHNpZ25PdXQoKSB7XG5cdFx0XHRBdXRoLiRzaWduT3V0KCkudGhlbih0aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoJ1lvdSBhcmUgc2lnbmVkIG91dC4nKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG9nZ2xlU2lkZWJhclBhcmVudCgpIHtcblx0XHRcdHZtLmlzVG9nZ2xlZCA9ICF2bS5pc1RvZ2dsZWQ7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL2ltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG4vL1xuLy9pbXBvcnQgQ29yZUNvbnRyb2xsZXIgZnJvbSAnLi9jb3JlLmNvbnRyb2xsZXIuanMnO1xuLy9cbi8vZXhwb3J0IGRlZmF1bHQgYW5ndWxhclxuLy9cdFx0Lm1vZHVsZSgnY29yZU1vZHVsZScsIFtdKVxuLy9cdFx0LmNvbnRyb2xsZXIoJ2F1dGguY29udHJvbGxlcicsIENvcmVDb250cm9sbGVyKVxuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2NvcmUubW9kdWxlJywgWydjb3JlLmNvbnRyb2xsZXInXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5tb2R1bGUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbi8vXG4vL2ltcG9ydCBDb3JlQ29udHJvbGxlciBmcm9tICcuL2NvcmUuY29udHJvbGxlci5qcyc7XG4vL1xuLy9leHBvcnQgZGVmYXVsdCBhbmd1bGFyXG4vL1x0XHQubW9kdWxlKCdjb3JlTW9kdWxlJywgW10pXG4vL1x0XHQuY29udHJvbGxlcignYXV0aC5jb250cm9sbGVyJywgQ29yZUNvbnRyb2xsZXIpXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnY29yZS5tb2R1bGUnLCBbJ2NvcmUuY29udHJvbGxlciddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLm1vZHVsZXMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnYm9keS1jbGFzc2VzLmRpcmVjdGl2ZScsIFtdKS5kaXJlY3RpdmUoJ2JvZHlDbGFzc2VzJywgYm9keUNsYXNzZXMpO1xuXG5cdGZ1bmN0aW9uIGJvZHlDbGFzc2VzKCRyb290U2NvcGUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRcdHNjb3BlOiB7fSxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHIsIGN0cmwpIHtcblxuXHRcdFx0XHQkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuXHRcdFx0XHRcdHZhciBmcm9tQ2xhc3NuYW1lcyA9IGFuZ3VsYXIuaXNEZWZpbmVkKGZyb21TdGF0ZS5kYXRhKSAmJiBhbmd1bGFyLmlzRGVmaW5lZChmcm9tU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcykgPyBmcm9tU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcyA6IG51bGw7XG5cdFx0XHRcdFx0dmFyIHRvQ2xhc3NuYW1lcyA9IGFuZ3VsYXIuaXNEZWZpbmVkKHRvU3RhdGUuZGF0YSkgJiYgYW5ndWxhci5pc0RlZmluZWQodG9TdGF0ZS5kYXRhLmJvZHlDbGFzc2VzKSA/IHRvU3RhdGUuZGF0YS5ib2R5Q2xhc3NlcyA6IG51bGw7XG5cblx0XHRcdFx0XHQvLyBkb24ndCBkbyBhbnl0aGluZyBpZiB0aGV5IGFyZSB0aGUgc2FtZVxuXHRcdFx0XHRcdGlmIChmcm9tQ2xhc3NuYW1lcyAhPSB0b0NsYXNzbmFtZXMpIHtcblx0XHRcdFx0XHRcdGlmIChmcm9tQ2xhc3NuYW1lcykgZWxlbS5yZW1vdmVDbGFzcyhmcm9tQ2xhc3NuYW1lcyk7XG5cdFx0XHRcdFx0XHRpZiAodG9DbGFzc25hbWVzKSBlbGVtLmFkZENsYXNzKHRvQ2xhc3NuYW1lcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9keS1jbGFzc2VzLmRpcmVjdGl2ZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdkaXJlY3RpdmVzLm1vZHVsZScsIFsnbG9hZGluZy5kaXJlY3RpdmUnLCAncGFnZS1oZWFkZXIuZGlyZWN0aXZlJ10pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpcmVjdGl2ZXMubW9kdWxlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGFtcGxlLmRlcmVjdGl2ZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEV4YW1wbGVEaXJlY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIEV4YW1wbGVEaXJlY3RpdmUoKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4YW1wbGVEaXJlY3RpdmUpO1xuXG5cdFx0dGhpcy50ZW1wbGF0ZSA9ICc8ZGl2Pnt7Y3RybC5uYW1lfX08L2Rpdj4nO1xuXHRcdHRoaXMucmVzdHJpY3QgPSAnRSc7XG5cdFx0dGhpcy5zY29wZSA9IHt9O1xuXG5cdFx0dGhpcy5jb250cm9sbGVyID0gRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXI7XG5cdFx0dGhpcy5jb250cm9sbGVyQXMgPSAnY3RybCc7XG5cdFx0dGhpcy5iaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcblx0fVxuXG5cdC8vIERpcmVjdGl2ZSBjb21waWxlIGZ1bmN0aW9uXG5cblxuXHRfY3JlYXRlQ2xhc3MoRXhhbXBsZURpcmVjdGl2ZSwgW3tcblx0XHRrZXk6ICdjb21waWxlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcGlsZSgpIHt9XG5cblx0XHQvLyBEaXJlY3RpdmUgbGluayBmdW5jdGlvblxuXG5cdH0sIHtcblx0XHRrZXk6ICdsaW5rJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gbGluaygpIHt9XG5cdH1dKTtcblxuXHRyZXR1cm4gRXhhbXBsZURpcmVjdGl2ZTtcbn0oKTtcblxuLy8gRGlyZWN0aXZlJ3MgY29udHJvbGxlclxuXG5cbmV4cG9ydHMuZGVmYXVsdCA9IEV4YW1wbGVEaXJlY3RpdmU7XG5cbnZhciBFeGFtcGxlRGlyZWN0aXZlQ29udHJvbGxlciA9IGZ1bmN0aW9uIEV4YW1wbGVEaXJlY3RpdmVDb250cm9sbGVyKCkge1xuXHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXhhbXBsZURpcmVjdGl2ZUNvbnRyb2xsZXIpO1xuXG5cdHRoaXMubmFtZSA9ICdZYXNzaW5lJztcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGFtcGxlLmRpcmVjdGl2ZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZShcImxvYWRpbmcuZGlyZWN0aXZlXCIsIFtdKS5kaXJlY3RpdmUoXCJsb2FkaW5nU3Bpbm5lclwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRkYXRhOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9sb2FkaW5nLmRpcmVjdGl2ZS9sb2FkaW5nLnRlbXBsYXRlLmh0bWwnXG5cdFx0fTtcblx0fSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9hZGluZy5kaXJlY3RpdmUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJwYWdlLWhlYWRlci5kaXJlY3RpdmVcIiwgW10pLmRpcmVjdGl2ZShcInBhZ2VIZWFkZXJcIiwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0dGl0bGU6ICdAJyxcblx0XHRcdFx0b3B0aW9uYWxEZXNjcmlwdGlvbjogJ0AnLFxuXHRcdFx0XHR0b2dnbGU6ICcmJ1xuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uIGNvbnRyb2xsZXIoJHNjb3BlKSB7XG5cdFx0XHRcdCRzY29wZS50b2dnbGVWYWx1ZSA9IGZhbHNlO1xuXHRcdFx0XHQkc2NvcGUudG9nZ2xlU2lkZWJhckluc2lkZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUudG9nZ2xlVmFsdWUgPSAhJHNjb3BlLnRvZ2dsZVZhbHVlO1xuXHRcdFx0XHRcdCRzY29wZS50b2dnbGUoKTtcblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50ZW1wbGF0ZS5odG1sJ1xuXHRcdH07XG5cdH0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2UtaGVhZGVyLmRpcmVjdGl2ZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJsYXlvdXQubW9kdWxlXCIsIFtcInNpZGViYXIuY29udHJvbGxlclwiXSk7XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0Lm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaWRlYmFyLmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJTaWRlYmFyQ29udHJvbGxlclwiLCBTaWRlYmFyQ29udHJvbGxlcik7XG5cblx0ZnVuY3Rpb24gU2lkZWJhckNvbnRyb2xsZXIoJGxvY2F0aW9uLCBBdXRoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblxuXHRcdHZtLnNpZ25PdXQgPSBzaWduT3V0O1xuXG5cdFx0ZnVuY3Rpb24gc2lnbk91dCgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdzaWdub3V0Jyk7XG5cdFx0XHRBdXRoLiRzaWduT3V0KCkudGhlbih0aGlzLl9mcy50b2FzdCgpLnN1Y2Nlc3MoJ1lvdSBhcmUgc2lnbmVkIG91dC4nKSk7XG5cdFx0fVxuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lkZWJhci5jb250cm9sbGVyLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdGFuZ3VsYXIubW9kdWxlKFwibmF2LmNvbnRyb2xsZXJcIiwgW10pLmNvbnRyb2xsZXIoXCJOYXZDb250cm9sbGVyXCIsIE5hdkNvbnRyb2xsZXIpO1xuXG5cdGZ1bmN0aW9uIE5hdkNvbnRyb2xsZXIoJGxvY2F0aW9uLCBBdXRoLCBGdW5jdGlvbnMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHZhciBfZnMgPSBGdW5jdGlvbnM7XG5cdFx0dm0uc2lnbk91dCA9IHNpZ25PdXQ7XG5cdFx0dm0uaXNBY3RpdmUgPSBpc0FjdGl2ZTtcblx0XHQvLyBpbml0aWFsaXplIHZpZXcgZGF0YVxuXHRcdGZ1bmN0aW9uIGluaXQoKSB7fVxuXG5cdFx0aW5pdCgpO1xuXG5cdFx0Ly92bS5hdXRoLiRvbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24odXNlcikge1xuXHRcdC8vXHR2bS51c2VyID0gdXNlcjtcblx0XHQvL30pO1xuXG5cdFx0ZnVuY3Rpb24gc2lnbk91dCgpIHtcblx0XHRcdEF1dGguJHNpZ25PdXQoKS50aGVuKF9mcy50b2FzdCgnWW91IGFyZSBzaWduZWQgb3V0LicpKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBpc0FjdGl2ZShkZXN0aW5hdGlvbikge1xuXHRcdFx0cmV0dXJuIGRlc3RpbmF0aW9uID09PSAkbG9jYXRpb24ucGF0aCgpO1xuXHRcdH1cblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdi5jb250cm9sbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICBhbmd1bGFyLm1vZHVsZShcIm5hdi5tb2R1bGVcIiwgW1wibmF2LmNvbnRyb2xsZXJcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdi5tb2R1bGUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXV0aC5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiQXV0aFwiLCBBdXRoKTtcblxuXHRmdW5jdGlvbiBBdXRoKCRmaXJlYmFzZUF1dGgpIHtcblx0XHRyZXR1cm4gJGZpcmViYXNlQXV0aCgpO1xuXHR9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0aC5mYWN0b3J5LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZShcImZ1bmN0aW9ucy5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiRnVuY3Rpb25zXCIsIEZ1bmN0aW9ucyk7XG5cbiAgZnVuY3Rpb24gRnVuY3Rpb25zKCkge1xuXG4gICAgdmFyIEZVTkNUSU9OUyA9IHtcbiAgICAgIHRvYXN0OiB0b2FzdFxuICAgIH07XG4gICAgcmV0dXJuIEZVTkNUSU9OUztcblxuICAgIC8vIHRvYXN0IHBvcHVwIHdpdGggY3VzdG9tIG1zZ1xuICAgIGZ1bmN0aW9uIHRvYXN0KG1zZykge1xuICAgICAgdmFyIHRpbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDMwMDA7XG5cbiAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1zZywgdGltZSk7XG4gICAgfVxuICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVuY3Rpb25zLmZhY3RvcnkuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwiZnVuY3Rpb25zLmZhY3RvcnlcIiwgW10pLmZhY3RvcnkoXCJGdW5jdGlvbnNcIiwgRnVuY3Rpb25zKTtcblxuICBmdW5jdGlvbiBGdW5jdGlvbnModG9hc3RyKSB7XG5cbiAgICB2YXIgRlVOQ1RJT05TID0ge1xuICAgICAgdG9hc3Q6IHRvYXN0XG4gICAgfTtcbiAgICByZXR1cm4gRlVOQ1RJT05TO1xuXG4gICAgLy8gdG9hc3QgcG9wdXAgd2l0aCBjdXN0b20gbXNnXG4gICAgLy8gaW5mbzpibHVlIHN1Y2Nlc3M6Z3JlZW4gZXJyb3I6cmVkIHdhcm5pbmc6b3JhbmdlXG4gICAgZnVuY3Rpb24gdG9hc3QoKSB7XG4gICAgICByZXR1cm4gdG9hc3RyO1xuICAgIH1cbiAgfVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZ1bmN0aW9ucy5zZXJ2aWNlLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZShcInNlcnZpY2VzLm1vZHVsZVwiLCBbXCJmdW5jdGlvbnMuZmFjdG9yeVwiLCBcInNoYXJlLnNlcnZpY2VcIl0pO1xufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZpY2VzLm1vZHVsZS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoXCJzaGFyZS5zZXJ2aWNlXCIsIFtdKS5zZXJ2aWNlKFwiU2hhcmVcIiwgU2hhcmUpO1xuXG5cdGZ1bmN0aW9uIFNoYXJlKCkge1xuXHRcdHRoaXMuaGVhZGVyRGVzY3JpcHRpb24gPSAnJztcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYXJlLnNlcnZpY2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKFwidXNlci5mYWN0b3J5XCIsIFtdKS5mYWN0b3J5KFwiVXNlclwiLCBVc2VyKTtcblxuXHRmdW5jdGlvbiBVc2VyKCRmaXJlYmFzZVJlZiwgJGZpcmViYXNlQXJyYXksICRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHJldHVybiAkZmlyZWJhc2VPYmplY3QoJGZpcmViYXNlUmVmLnVzZXJzKTtcblx0fVxufSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZXIuZmFjdG9yeS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdzaGFyZWQubW9kdWxlJywgWydzZXJ2aWNlcy5tb2R1bGUnLCAnZGlyZWN0aXZlcy5tb2R1bGUnLCAnbGF5b3V0Lm1vZHVsZSddKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFyZWQubW9kdWxlLmpzLm1hcFxuIl19
