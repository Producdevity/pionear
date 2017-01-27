(() => {
	'use strict';

	angular
			.module("settings.service", [])
			.factory("SettingsService", SettingsService);

	function SettingsService($firebaseRef, $firebaseArray, $firebaseObject) {
		const profile = $firebaseObject($firebaseRef.settings);

		const API = {
			getProfile:    getProfile,
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
