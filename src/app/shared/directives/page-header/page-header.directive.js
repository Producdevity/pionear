(() => {
	"use strict";

	angular
			.module("page-header.directive", [])
			.directive("pageHeader", function() {
				return {
					restrict:    'E',
					scope:       {
						data: '=',
						title: '@',
						toggle: '&'
					},
					controller: function($scope) {
						$scope.toggleValue = false;
						$scope.toggleSidebarInside = function() {
							$scope.toggleValue = !$scope.toggleValue;
							$scope.toggle();
						};
					},
					templateUrl: 'app/shared/directives/page-header/page-header.template.html'
				}
			})

})();