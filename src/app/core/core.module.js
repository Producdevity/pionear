//import * as angular from 'angular';
//
//import CoreController from './core.controller.js';
//
//export default angular
//		.module('coreModule', [])
//		.controller('auth.controller', CoreController)

(() => {
	'use strict';

	angular
			.module('core.module', [
				'core.controller'
			]);
})();
