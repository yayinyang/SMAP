/**
 * Created by liwanchong on 2016/12/28.
 */
var productDescriptionApp = angular.module('productDescriptionApp', []);
productDescriptionApp.controller('productDescriptionController',function ($scope) {
    $scope.descriptions = [
        {
            name:'产品策略',
            flag: false,
            type: 'strategyProduct'
        },
        {
            name:'日产品',
            flag: true,
            type:'dayProduct',
            children:[
                {
                    name: 'NIMIF-G',
                    flag: false,
                    type: 'nimif-gDay'
                },
                {
                    name: 'IDB',
                    flag: false,
                    type: 'idbDay'
                }
            ]
        },
        {
            name:'月产品',
            flag: false,
            type:'monthProduct',
            children:[
                {
                    name: 'NIMIF-G',
                    flag: false,
                    type: 'nimif-gMonth'
                },
                {
                    name: 'IDB',
                    flag: false,
                    type: 'idbMonth'
                }
            ]
        },
        {
            name:'季产品',
            flag: false,
            type:'seasonProduct',
            children:[
                {
                    name: 'NIMIF-G',
                    flag: false,
                    type: 'nimif-gSeason'
                },
                {
                    name: 'IDB',
                    flag: false,
                    type: 'idbSeason'
                },
                {
                    name: 'NAVEX',
                    flag: false,
                    type: 'navexSeason'
                },
                {
                    name: 'AIF',
                    flag: false,
                    type: 'aifSeason'
                },
                {
                    name: 'NIMIF-K',
                    flag: false,
                    type: 'nimif-kSeason'
                },
            ]
        },
    ];
    $scope.showArrowDirect = function (num) {
        $scope.descriptions.forEach(function (item, index) {
            if (index === num) {
                item.flag = !item.flag;
            } else {
                item.flag = false;
            }
        });
        // $scope.descriptions[ ~~index].flag = !$scope.descriptions[ ~~index].flag;
    }
    $scope.descriptionUrl = '../pages/descriptions/nimif-gDay.html';
    $scope.changeDescriptionPages = function (type) {
        $scope.descriptionUrl = '../pages/descriptions/'+type+'.html';
    };
})


