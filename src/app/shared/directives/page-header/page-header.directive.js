(() => {
	"use strict";

	angular
			.module("page-header.directive", [])
			.directive("pageHeader", function() {
				return {
					restrict:    'E',
					scope:       {
						data: '=',
						title: '@'
					},
					templateUrl: 'app/shared/directives/page-header/page-header.template.html'
				}
			})

})();