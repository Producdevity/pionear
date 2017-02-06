(() => {
	'use strict';

	angular
			.module("photo.service", [])
			.factory("PhotoService", PhotoService);

	function PhotoService($firebaseRef, $firebaseArray, $firebaseObject, $firebaseStorage) {
		const photos  = $firebaseArray($firebaseRef.photos);
		const storage = firebase.storage().ref("images/photos");

		const API     = {
			addPhoto:    addPhoto,
			getPhotos:   getPhotos,
			getStorage:  getStorage,
			getPhoto:    getPhoto,
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
