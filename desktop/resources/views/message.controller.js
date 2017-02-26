/**
 * Created by ronnygeo on 2/26/17.
 */
(function () {
    'use strict';
    angular.module("CharlesApp")
        .controller("MessageController", MessageController);

    MessageController.$inject = ['$location', '$rootScope'];

    function MessageController($location, $rootScope) {
        var vm = this;

    }
})();