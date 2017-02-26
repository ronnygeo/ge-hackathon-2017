/**
 * Created by ronnygeo on 2/26/17.
 */
(function () {
    'use strict';
    angular.module("CharlesApp")
        .factory('RuleService', RuleService);

    RuleService.$inject = ['$http'];
    function RuleService($http) {
        var api = {
            checkCountryRules: checkCountryRules,
            checkSendRules: checkSendRules,
            checkToolConditions: checkToolConditions
        };
        return api;

        function checkCountryRules(data) {
            return $http.post('http://localhost:8080/api/rules/country', data);
        }

        function checkSendRules(data) {
            return $http.post('http://localhost:8080/api/rules/send', data);
        }

        function checkToolConditions(data) {
            return $http.post('http://localhost:8080/api/rules/tool-conditions', data);
        }
    }
})();