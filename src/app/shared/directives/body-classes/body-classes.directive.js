(() => {
	'use strict';

	angular
			.module('body-classes.directive', [])
			.directive('bodyClasses', bodyClasses);

	function bodyClasses($rootScope) {
		return {
			restrict: 'A',
			scope:    {},
			link:     function(scope, elem, attr, ctrl) {

				$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
					let fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClasses) ? fromState.data.bodyClasses : null;
					let toClassnames   = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClasses) ? toState.data.bodyClasses : null;

					// don't do anything if they are the same
					if(fromClassnames != toClassnames) {
						if(fromClassnames) elem.removeClass(fromClassnames);
						if(toClassnames) elem.addClass(toClassnames);
					}
				});

			}
		}
	}
})();