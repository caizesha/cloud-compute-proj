/* eslint-disable max-len */
const app = angular.module('bankController', []);
// inject the Todo service factory into our controller
app.controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
  $scope.formData = {};
  $scope.loading = true;
  // 定义了点击登录按钮的动作
  $scope.login = function() {
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    // if ($scope.user.account != undefined) {
    //   $scope.loading = true;
    //   // call the create function from our service (returns a promise object)
    //   Todos.create($scope.user)
    //   // if successful creation, call our get function to get all the new todos
    //       .success(function(data) {
    //         $scope.loading = false;
    //         $scope.formData = {}; // clear the form so our user is ready to enter another
    //         // $scope.todos = data; // assign our new list of todos
    //       });
    // }
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
    $scope.formData = {};
  };
  // 定义了点击注册按钮的动作
  $scope.register = function() {
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.user.account != undefined) {
      $scope.loading = true;
      // call the create function from our service (returns a promise object)
      Todos.create($scope.user)
      // if successful creation, call our get function to get all the new todos
          .success(function(data) {
            $scope.loading = false;
            $scope.user = {}; // clear the form so our user is ready to enter another
            // $scope.todos = data; // assign our new list of todos
          });
    }
  };
}]);
