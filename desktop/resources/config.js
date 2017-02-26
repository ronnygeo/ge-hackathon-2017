/**
 * Created by ronnygeo on 2/26/17.
 */
"use strict";
(function () {
    angular.module("CharlesApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'DashboardController',
                    controllerAs: "model",
                    templateUrl: 'views/dashboard.view.html',
                    // resolve: {
                    //     loggedin: checkCurrentUser
                    // }
                })
                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: 'views/login.view.html',
                    controllerAs: 'lc'
                })
                .when('/upload', {
                    controller: 'UploadController',
                    templateUrl: 'views/upload.view.html',
                    controllerAs: "user",
                    // resolve: {
                    //     loggedin: checkCurrentUser
                    // }
                })
                .when('/send', {
                    templateUrl: 'views/send.view.html',
                    controller: 'SendController',
                    controllerAs: 'model',
                    // resolve: {
                    //     loggedin: checkCurrentUser
                    // }
                })
                .when('/message', {
                    templateUrl: 'views/message.view.html',
                    controller: 'MessageController',
                    controllerAs: 'model',
                    // resolve: {
                    //     loggedin: checkCurrentUser
                    // }
                })
                .otherwise({
                    redirectTo: '/'
                })
        });

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        // console.log("checkLoggedin");
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
                deferred.resolve(user);
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                deferred.resolve(user);
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();
