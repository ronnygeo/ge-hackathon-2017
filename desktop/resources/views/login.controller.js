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
            $location.url('/home');
            $rootScope.user = user.username;
            if(user.username){
                socket.emit('authenticate', user.username);
            }

            // UserService.login(user).then(render);
        }

        function render(res) {
            $location.url('/home');
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