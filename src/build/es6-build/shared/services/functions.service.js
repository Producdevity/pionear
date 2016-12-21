"use strict";

(function () {
  'use strict';

  angular.module("functions.factory", []).factory("Functions", Functions);

  function Functions(toastr) {

    var FUNCTIONS = {
      toast: toast
    };
    return FUNCTIONS;

    // toast popup with custom msg
    // info:blue success:green error:red warning:orange
    function toast() {
      return toastr;
    }
  }
})();
//# sourceMappingURL=functions.service.js.map
