(() => {
	'use strict';

	angular
			.module('myApp', [
				//	Third Party Modules
				'ui.router',
				'firebase',
				'toastr',
				//	My Modules
				'components.module',
				'shared.module',
				'core.module'
			]);

})();
