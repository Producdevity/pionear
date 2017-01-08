'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExampleDirective = function () {
	function ExampleDirective() {
		_classCallCheck(this, ExampleDirective);

		this.template = '<div>{{ctrl.name}}</div>';
		this.restrict = 'E';
		this.scope = {};

		this.controller = ExampleDirectiveController;
		this.controllerAs = 'ctrl';
		this.bindToController = true;
	}

	// Directive compile function


	_createClass(ExampleDirective, [{
		key: 'compile',
		value: function compile() {}

		// Directive link function

	}, {
		key: 'link',
		value: function link() {}
	}]);

	return ExampleDirective;
}();

// Directive's controller


exports.default = ExampleDirective;

var ExampleDirectiveController = function ExampleDirectiveController() {
	_classCallCheck(this, ExampleDirectiveController);

	this.name = 'Yassine';
};
//# sourceMappingURL=example.directive.js.map
