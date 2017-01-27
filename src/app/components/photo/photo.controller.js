(() => {
	'use strict';

	angular
			.module("photo.controller", [])
			.controller("PhotoController", PhotoController);

	function PhotoController(Share) {
		let vm = this;
		console.log(Share);

		// set header titles
		vm.headerTitle = 'Photos';
		vm.optionalDescription = Share.headerDescription = 'overview';

	}
})();