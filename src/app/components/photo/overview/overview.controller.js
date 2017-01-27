(() => {
	"use strict";

	angular
			.module("overview-photo.controller", [])
			.controller("OverviewPhotoController", OverviewPhotoController);

	function OverviewPhotoController(Functions) {
		let vm   = this;
		this._fs = Functions;


	}
})();