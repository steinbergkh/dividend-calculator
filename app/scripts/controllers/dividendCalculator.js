'use strict';

angular.module('dividendCalculatorApp')
  .controller('DividendCalculatorCtrl', function ($scope, $http, InvestYear) {
        $scope.settings = {
            yearsInvest: 20,
            initialInvestment: 1400000,
            initialDividendPayment: 3.25,
            dividendGrowthPerYear: 7,
            initialStockPrice: 100,
            stockPriceGrowthPerYear: 3.5,
            yearsReinvest: 10
        };

        var stockPrice = $scope.settings.initialStockPrice;
        var dividend = $scope.settings.initialDividendPayment;

        var stockRate = $scope.settings.stockPriceGrowthPerYear / 100;
        var dividendRate = $scope.settings.dividendGrowthPerYear / 100;




        var calcStockPrice = function calculateStockPrice(year){

            return (stockPrice*(Math.pow((1+stockRate),year)));
        };

        var calcDividend = function calculateDividend(year){

            return (dividend*(Math.pow((1+dividendRate),year)));
        };

        $scope.investmentList = [];

        $scope.reinvestmentList = [];
        var initReinvestmentList = function initReinvestList(){
            var year = 0;
            while (year < $scope.settings.yearsInvest + 1){
                var reinvestment = {year: year,amount: 0};
                $scope.reinvestmentList.push(reinvestment);
                ++year;
            }
        };

        initReinvestmentList();

        var populateInvestmentList = function populateInvest(){
            $scope.investmentList = [];
            var year = 0;
            var firstTotal = $scope.settings.initialInvestment;
            var numShares = firstTotal/calcStockPrice(year);
            var curDividend = calcDividend(year);

            var newInvestment = InvestYear(year, firstTotal, numShares, curDividend, $scope.reinvestmentList[year].amount);

            while (year < $scope.settings.yearsInvest){
                $scope.investmentList.push(newInvestment);
                var newStockPrice = calcStockPrice(year+1);
                var newTotal = $scope.investmentList[year].getEndingTotal(newStockPrice);
                numShares += $scope.investmentList[year].getSharesRepurchased(newStockPrice);
                curDividend = calcDividend(year + 1);
                ++year;
                newInvestment = InvestYear(year, newTotal, numShares, curDividend, $scope.reinvestmentList[year].amount);
            }
        };



        var setInitialVals = function setVals(){
            stockPrice = $scope.settings.initialStockPrice;
            dividend = $scope.settings.initialDividendPayment;

            stockRate = $scope.settings.stockPriceGrowthPerYear / 100;
            dividendRate = $scope.settings.dividendGrowthPerYear / 100;

            populateInvestmentList();
        };


        $scope.populateInvestment = populateInvestmentList;

        $scope.$watchCollection('settings', setInitialVals);
        $scope.$watchCollection('reinvestmentList', setInitialVals);

        $scope.stockPrice = calcStockPrice;
        $scope.dividend = calcDividend;

        $scope.reinvest = function(year, reinvestAmount) {
            reinvestAmount = typeof reinvestAmount !== 'undefined' ? reinvestAmount : 0;
            year = typeof year !== 'undefined' ? year : 0;
            var origYear = year;
            if (year == 0){
                year = 1;
            }
            year = year - 1;
            //console.log('reinvesting $'+ reinvestAmount + ' in year '+year);
            $scope.reinvestmentList[year].amount = reinvestAmount;

            $scope.reinvestmentYear = origYear + 1;
            populateInvestmentList();

        };

        $scope.reinvestFilter = function (reinvestmentItem) {
            return reinvestmentItem.amount > 0;
        };
  });
