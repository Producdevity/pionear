(() => {
	'use strict';

	angular
			.module("share.service", [])
			.service("Share", Share);

	function Share() {
		this.headerDescription = '';

	}
})();