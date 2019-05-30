import swal from 'sweetalert';
const app = angular.module('scutbank', []);
/* eslint-disable max-len */
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
  // 定义了用户点击右上角退出按钮动作
  $scope.close = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };
}]);
