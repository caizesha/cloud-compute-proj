import swal from 'sweetalert';

/* eslint-disable max-len */
const app = angular.module('scutbank', []);
// inject the Todo service factory into our controller
app.controller('mainController', ['$scope', '$http', 'Accounts', ($scope, $http, Accounts) => {
  $scope.formData = {};
  // 定义了点击登录按钮的动作
  $scope.login = () => {
    swal('成功', '登录账号成功', 'success');
    Accounts.login({})
        .success((data) => {
        // $scope.user = {};
          $scope.user.account = '';
        });
  };
  // 定义了点击注册按钮的动作
  $scope.register = function() {
    Accounts.create($scope.user)
        .success((data) => {
          $scope.formData = {};
          swal('成功', '注册账号成功', 'success');
        });
  };
  // 定义了点击存钱按钮的操作
  $scope.trans = () => {
    Accounts.trans()
        .success((data) => {

        });
  };
  //
}]);
