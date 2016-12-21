(() => {
	'use strict';

	angular
			.module('auth.module', [
				'auth.routes',
				'auth.controller',
				'sign-in.controller',
				'sign-up.controller',
				'auth.service'
			]);

})();
