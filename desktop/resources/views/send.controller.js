/**
 * Created by ronnygeo on 2/26/17.
 */
(function () {
    'use strict';
    angular.module("CharlesApp")
        .controller("SendController", SendController);

    SendController.$inject = ['$location', '$rootScope', 'RuleService'];

    function SendController($location, $rootScope, RuleService) {
        var vm = this;
        vm.send = send;

        let data = {
            "user": {
                "status": "LR"
            },
            "source": "US",
            "destination": "CN"
        }

        function send() {
            console.log("sending")
            // $http.post('http://localhost:8080/api/rules/send/', data)
            RuleService.checkCountryRules(data)
                .then(function (res) {
                    console.log(res);
                }, function (err) {
                    console.log(err);
                });
        }

    }
})();