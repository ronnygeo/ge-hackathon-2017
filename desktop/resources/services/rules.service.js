/**
 * Created by ronnygeo on 2/26/17.
 */
(function () {
    'use strict';
    angular.module("CharlesApp")
        .factory('RulesService', RulesService);

    RulesService.$inject = ['$http'];
    function RulesService($http) {
        var api = {
            checkCountryRules: checkCountryRules,
            checkToolConditions: checkToolConditions
        };

        return api;

        function checkCountryRules() {
            return $http.post('/api/rules/country/');
        }

        function checkToolConditions() {
            return $http.post('/api/rules/tool-conditions');
        }
    }
});