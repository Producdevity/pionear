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