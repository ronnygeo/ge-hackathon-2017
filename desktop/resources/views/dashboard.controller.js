/**
 * Created by ronnygeo on 2/26/17.
 */
(function () {
    'use strict';
    angular.module("CharlesApp")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ['$location', '$rootScope'];

    function DashboardController($location, $rootScope) {
        var vm = this;

    }
})();