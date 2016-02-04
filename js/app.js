'use strict';
angular.module('starter', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'toastr'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
        	.state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html'
            })
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'templates/main.html'
            })
            .state('main.dashboard', {
                url: '/dashboard',
                views: {
                    'mainView': {
                        templateUrl: 'templates/dashboard.html'
                    }
                }
            })

        $urlRouterProvider.otherwise('/login');
    }]);
