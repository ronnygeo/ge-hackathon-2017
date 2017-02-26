/**
 * Created by ronnygeo on 2/26/17.
 */
(function () {
    'use strict';
    angular.module("CharlesApp")
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http){
        var api;

        api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            login: login,
            logout: logout,
        };
        return api;

        function findUserByUsername(username) {
            return $http.get('/api/user?username='+username);
        }

        //Accepts parameters username, password, and callback function
        //Iterates over the array of current users looking for user object whose username and password match the parameters
        //Calls back with user found or null otherwise
        function findUserByCredentials(username, password) {
            return $http.get('/api/user?username='+username+'&password='+password);
        }

        //Accepts parameter callback function
        //Calls back with array of all users
        function findAllUsers() {
            return $http.get('/api/admin/user');
        }


        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }
    }
})();