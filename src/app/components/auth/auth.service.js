(() => {
	'use strict';

	angular
			.module("auth.service", [])
			.factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();
