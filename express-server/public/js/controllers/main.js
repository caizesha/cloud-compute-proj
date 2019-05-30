import swal from 'sweetalert';

/* eslint-disable max-len */
const app = angular.module('mainController', []);
// inject the Todo service factory into our controller
app.controller('mainController', ['$scope', '$http', 'Accounts', ($scope, $http, Accounts) => {
  $scope.formData = {};
  // 定义了点击登录按钮的动作
  $scope.login = () => {
    if ($scope.user.account != undefined && $scope.user.passwd != undefined) {
      swal('成功', '登录账号成功', 'success');
      console.log($scope.user.account);
      console.log($scope.user.passwd);
      Accounts.create($scope.user)
        .success((data) => {
          // $scope.user = {};
          $scope.user.account = '';
        });
    }
  };
  // 定义了点击注册按钮的动作
  $scope.register = function () {
    if ($scope.user.account != undefined && $scope.user.passwd != undefined && $scope.user.name != undefined) {
      Accounts.create($scope.user)
        .success((data) => {
          $scope.formData = {};
        });
    }
  };
}]);
