(() => {
	'use strict';

	angular
			.module('offer.module', [
				'offer.routes',
				'offer.controller',
				'overview-offer.controller',
				'add-offer.controller',
				'offer.service'
			]);

})();
