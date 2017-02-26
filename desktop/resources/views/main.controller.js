/**
 * Created by ronnygeo on 2/26/17.
 */
(function () {
    'use strict';
    angular.module("CharlesApp")
        .controller('MainController', MainController);

    MainController.$inject = ['$location', '$rootScope', 'UserService'];

    function MainController($location, $rootScope, UserService){
        var vm = this;
        vm.$location = $location;
        vm.logout = logout;
        vm.isActive = isActive;
        vm.isLocation = isLocation;
        vm.goTo = goTo;

        function isLocation(loc) {
            return loc === $location.url;
        }

        function isActive(loc) {
            if ($location.url == loc)
                return 'selected-tab';
        }

        function logout() {
            delete $rootScope.user;
            //console.log($rootScope.user);
            $location.url('/login');
            // UserService.logout().then(function(){
            //     delete $rootScope.user;
            //     //console.log($rootScope.user);
            //     $location.url('/login');
            // });
        }

        function goTo(loc) {
            $location.url('/'+loc);
        }
    }
})();