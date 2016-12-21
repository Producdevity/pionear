(() => {
  'use strict';

  angular
      .module("functions.factory", [])
      .factory("Functions", Functions);

  function Functions(toastr) {

    const FUNCTIONS = {
      toast: toast
    };
    return FUNCTIONS;

    // toast popup with custom msg
    // info:blue success:green error:red warning:orange
    function toast(){
    	return toastr;
    }

  }
})();