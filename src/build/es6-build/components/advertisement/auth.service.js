"use strict";

(function () {
	'use strict';

	angular.module("auth.service", []).factory("Auth", Auth);

	function Auth($firebaseAuth) {
		return $firebaseAuth();
	}
})();
//# sourceMappingURL=auth.service.js.map
