/* eslint-disable max-len */
const app = angular.module('bankController', []);
// inject the Todo service factory into our controller
app.controller('mainController', ['$scope', '$http', 'Accounts', ($scope, $http, Accounts) => {
  $scope.formData = {};
  $scope.loading = false;
  // 定义了点击登录按钮的动作
  $scope.login = () => {
    if ($scope.user.account == undefined) {
      alert('用户名不能为空！');
      return;
    }
    if ($scope.user.passwd == undefined) {
      alert('密码不能为空！');
      return;
    }
    $scope.loading = true;
    Accounts.create($scope.user)
        .success((data) => {
          $scope.loading = false;
          $scope.formData = {};
        });
  };
  // 定义了点击注册按钮的动作
  $scope.register = function() {
    if ($scope.user.account == undefined) {
      alert('用户名不能为空！');
      return;
    }
    if ($scope.user.passwd == undefined) {
      alert('密码不能为空！');
      return;
    }
    $scope.loading = true;
    Accounts.create($scope.user)
        .success((data) => {
          $scope.loading = false;
          $scope.user = {};
        });
  };
}]);
