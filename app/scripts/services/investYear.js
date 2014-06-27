'use strict';

angular.module('dividendCalculatorApp').factory('InvestYear', function () {
    // Define the constructor function.
    return function( curYear , curTotalInvestment, beginNumShares, dividendPerShare, reinvestAmount) {
        var year = curYear;
        var beginningTotal = curTotalInvestment;
        var beginningNumShares = beginNumShares;
        var dividendIncome = beginningNumShares*dividendPerShare;
        var reinvestment = reinvestAmount;
        var endingTotal = beginningTotal;



        //console.log("starting year " + curYear + " with a total of $" + beginningTotal +" and $" + reinvestment + " reinvested, and "+beginningNumShares +" shares");

        var getRepurchased = function(sharePrice){

           console.log('share price = '+sharePrice);
            var amountReinvested = (reinvestment+dividendIncome);
            console.log('reinvestment + dividendIncome = ' +amountReinvested);
            console.log('repurchased shares = ' + amountReinvested/sharePrice);
            return ((amountReinvested)/sharePrice);
        };

        return {
            getSharesRepurchased: getRepurchased,
            getEndingTotal: function (sharePrice) {
                if (endingTotal != beginningTotal){
                    return endingTotal;
                }
                //console.log('getting ending total');
                var amountRepurchased = getRepurchased(sharePrice);
                var endingNumShares = beginningNumShares + amountRepurchased;
                console.log('bought back '+amountRepurchased+' shares for a total of '+endingNumShares);
                endingTotal = (beginningNumShares + getRepurchased(sharePrice))*sharePrice;
                return( (beginningNumShares + getRepurchased(sharePrice))*sharePrice);
            },
            getBeginningTotal: function () {
                return( beginningTotal );
            },
            reinvest: function (reinvestmentAmount) {
                reinvestment = reinvestmentAmount;
            },
            getYear: function(){
                return(year);
            },
            hasReinvestment: function(){
                return (reinvestment > 0);
            }
        };

    };
});