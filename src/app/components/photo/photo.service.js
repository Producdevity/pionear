(() => {
	'use strict';

	angular
			.module("photo.service", [])
			.factory("PhotoService", PhotoService);

	function PhotoService($firebaseRef, $firebaseArray, $firebaseObject) {
		const offers = $firebaseArray($firebaseRef.offers);

		const API = {
			addOffer:    addOffer,
			getOffers:   getOffers,
			getOffer:    getOffer,
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
