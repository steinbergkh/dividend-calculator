'use strict';

angular.module('dividendCalculatorApp').factory('InvestGraph', function () {
    // Define the constructor function.
    return function( curYear , curVal) {
        var x = curYear;
        var y = curVal;
        return {
            x: x.toString(),
            y: y
        };

    };
});