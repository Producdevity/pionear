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
//# sourceMappingURL=advertisment.service.js.map
