/**
 * Created by ronnygeo on 2/26/17.
 */
(function () {
    'use strict';
    angular.module("CharlesApp")
        .controller("LoginController", LoginController);

    LoginController.$inject = ['UserService','$location', '$rootScope'];

    function LoginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login =login;
        var user = {};

        function login() {
            //console.log($scope.username+$scope.password);
            user.username = vm.username;
            user.password = vm.password;
            UserService.login(user).then(render);
        }

        function render(res) {
            if (res.data){
                $rootScope.user = res.data;
                $location.url('/profile/');
            }
            else {
                $('#login-alert').show();
            }
            //console.log($rootScope.user);
        }

    }
})();