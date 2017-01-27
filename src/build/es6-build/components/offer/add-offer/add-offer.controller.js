"use strict";

(function () {
		"use strict";

		angular.module("add-offer.controller", []).controller("AddOfferController", AddOfferController);

		function AddOfferController(OfferService, Functions, Share, $scope, $timeout, $location) {
				var vm = this;
				this._fs = Functions;

				// viewmodel variables
				vm.newPhoto;

				vm.optionalDescription = Share.headerDescription = 'add';

				// functions
				vm.addOffer = addOffer;
				$scope.setFile = setFile;

				/**
     * set file to preview uploaded img
     * @param element
     */
				function setFile(element) {
						vm.currentFile = element.files[0]; // set uploaded img as currentFile
						var reader = new FileReader();
						// triggerd when file is read
						reader.onload = function (event) {
								vm.image_source = event.target.result;
								$scope.$apply();
						};
						reader.readAsDataURL(element.files[0]); // when the file is read, it triggers the onload event above.
				}

				/**
     * add an offer to the database
     * @trigger (ng-submit)
     */
				function addOffer() {
						OfferService.addOffer(vm.newPhoto).then(console.log(vm.newPhoto)).then(this._fs.toast().success("Added new offer " + vm.newPhoto.name)).then(vm.newPhoto = {});
				}
		}
})();
//# sourceMappingURL=add-offer.controller.js.map
