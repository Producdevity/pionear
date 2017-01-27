(() => {
	'use strict';

	angular
			.module('photo.module', [
				'photo.routes',
				'photo.controller',
				'overview-photo.controller',
				'add-photo.controller',
				'photo.service'
			]);

})();
