const app = angular.module('scutbank', []);
/* eslint-disable max-len */
app.controller('mainController', ($scope, $http, Accounts) => {
  $scope.accountShow = $scope.account;
  // 定义了点击登录按钮的动作
  $scope.login = () => {
    console.log('正在登录');
    Accounts.login({})
        .success((data) => {
        // $scope.user = {};
          $scope.user.account = '';
          console.log('登录成功');
        });
  };
  // 定义了点击注册按钮的动作
  $scope.register = function() {
    Accounts.create($scope.user)
        .success((data) => {
          $scope.formData = {};
          alert('注册账号成功');
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
});
