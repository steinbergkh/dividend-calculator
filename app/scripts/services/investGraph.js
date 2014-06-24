'use strict';

angular.module('dividendCalculatorApp').factory('InvestGraph', function () {
    // Define the constructor function.
    return function( curYear , curTotalInvestment) {
        var x = curYear;
        var y = curTotalInvestment;
        return {
            x: x,
            y: y
        };

    };
});