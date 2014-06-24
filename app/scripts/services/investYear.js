'use strict';

angular.module('dividendCalculatorApp').factory('InvestYear', function () {
    // Define the constructor function.
    return function( curYear , curTotalInvestment, beginNumShares, dividendPerShare, reinvestAmount) {
        var year = curYear;
        var beginningTotal = curTotalInvestment;
        var beginningNumShares = beginNumShares;
        var dividendIncome = beginningNumShares*dividendPerShare;
        var reinvestment = reinvestAmount;



        //console.log("starting year " + curYear + " with a total of $" + beginningTotal +" and $" + reinvestment + " reinvested, and "+beginningNumShares +" shares");

        var getRepurchased = function(sharePrice){

           //console.log('reinvestment = '+reinvestment);
            var amountReinvested = (reinvestment+dividendIncome);
            //console.log('reinvestment + dividendIncome = ' +amountReinvested);

            return ((amountReinvested)/sharePrice);
        };

        return {
            getSharesRepurchased: getRepurchased,
            getEndingTotal: function (sharePrice) {
                //console.log('Using dividend income of $'+dividendIncome +' & reinvestment of $'+reinvestment+' to repurchase '+getRepurchased(sharePrice)+ ' shares at $'+sharePrice+' per share');
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