'use strict';
angular.module('starter')
    .factory('_', ['$window', function($window) {
        return $window._;
    }])
    .factory('dataFactory',['$http', function($http) {
        return {
            getData: function() {
                return $http({
                    url: '/server/index.php',
                    method: 'GET',
                }).then(function(res) {
                    return res.data;
                });
            },
            sendMessage: function(data){
                return $http({
                    url: '/server/index.php',
                    method: 'POST',
                    data: data
                }).then(function(res) {
                    return res.data;
                });
            }
        }
    }]);
