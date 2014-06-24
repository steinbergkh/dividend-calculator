'use strict';
angular.module('dividendCalculatorApp')
.directive('percent', function ($filter) {
  var p = function(viewValue){
      var m = viewValue.match(/^(\d+)\/(\d+)/);
      if (m !== null){
        return $filter('number')(parseInt(m[1])/parseInt(m[2]), 2);
      }
      return $filter('number')(parseFloat(viewValue)/100, 2);
    };

  var f = function(modelValue){
      return $filter('number')(parseFloat(modelValue)*100, 2);
    };
  return {
      require: 'ngModel',
      link: function(scope, ele, attr, ctrl){
          ctrl.$parsers.unshift(p);
          ctrl.$formatters.unshift(f);
        }
    };
});