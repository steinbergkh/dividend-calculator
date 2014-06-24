'use strict';
var app = angular.module('dividendCalculatorApp');
String.prototype.splice = function(idx, rem, s) {
  return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};

app.directive('currencyInput', function() {
  return {
    restrict: 'A',
    scope: {
      field: '='
    },
    replace: true,
    template: '<span><input type="text" ng-model="field"></input></span>',
    link: function(scope, element) {

      $(element).bind('keyup', function(e) {
        //clearing left side zeros
        while (scope.field.charAt(0) === '0') {
          scope.field = scope.field.substr(1);
        }

        scope.field = scope.field.replace(/[^\d.\',']/g, '');

        var point = scope.field.indexOf('.');
        if (point >= 0) {
          scope.field = scope.field.slice(0, point + 3);
        }

        var decimalSplit = scope.field.split('.');
        var intPart = decimalSplit[0];
        var decPart = decimalSplit[1];

        intPart = intPart.replace(/[^\d]/g, '');
        if (intPart.length > 3) {
          var intDiv = Math.floor(intPart.length / 3);
          while (intDiv > 0) {
            var lastComma = intPart.indexOf(',');
            if (lastComma < 0) {
              lastComma = intPart.length;
            }

            if (lastComma - 3 > 0) {
              intPart = intPart.splice(lastComma - 3, 0, ',');
            }
            intDiv--;
          }
        }

        if (decPart === undefined) {
          decPart = '';
        }
        else {
          decPart = '.' + decPart;
        }
        var res = intPart + decPart;

        scope.$apply(function() {scope.field = res;});
      });

    }
  };
});