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
//# sourceMappingURL=user.service.js.map
