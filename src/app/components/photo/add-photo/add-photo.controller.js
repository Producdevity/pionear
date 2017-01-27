(() => {
	"use strict";

	angular
			.module("add-photo.controller", [])
			.controller("AddPhotoController", AddPhotoController);

	function AddPhotoController(PhotoService, Functions, Share, $scope, $log, GoogleMapApi, uiGmapGoogleMapApi) {
		let vm   = this;
		this._fs = Functions;

		// viewmodel variables
		vm.newPhoto;

		vm.optionalDescription = Share.headerDescription = 'add';
		vm.map = {
			center:    {latitude: 45, longitude: -73},
			zoom:      8,
			searchbox: {
				template: 'searchbox.tpl.html',
				events:   {
					places_changed: function(searchBox) {
						console.log(searchBox);
					}
				}
			},
			options:   {
				scrollwheel: false
			}
		};

		GoogleMapApi.then(function(maps) {
			maps.visualRefresh = true;
		});
		uiGmapGoogleMapApi.then(function(maps) {
			maps.visualRefresh = true;
		});

		// functions
		vm.addPhoto    = addPhoto;
		$scope.setFile = setFile;

		/**
		 * set file to preview uploaded img
		 * @param element
		 */
		function setFile(element) {
			vm.currentFile = element.files[0]; // set uploaded img as currentFile
			let reader     = new FileReader();
			// triggerd when file is read
			reader.onload  = function(event) {
				vm.image_source = event.target.result;
				$scope.$apply();
			}
			reader.readAsDataURL(element.files[0]); // when the file is read, it triggers the onload event above.
		}

		/**
		 * add an offer to the database
		 * @trigger (ng-submit)
		 */
		function addPhoto() {
			PhotoService.addPhoto(vm.newPhoto)
					.then(console.log(vm.newPhoto))
					.then(this._fs.toast().success(`Added new offer ${vm.newPhoto.name}`))
					.then(vm.newPhoto = {});
		}

	}
	}

	)();
