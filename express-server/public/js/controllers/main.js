/* eslint-disable max-len */
const app = angular.module('todoController', []);
// angular.module('todoController', [])
// inject the Todo service factory into our controller
app.controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
  $scope.formData = {};
  $scope.loading = true;
  // GET =====================================================================
  // when landing on the page, get all todos and show them
  // use the service to get all the todos
  Todos.get()
      .success(function(data) {
        $scope.todos = data;
        $scope.loading = false;
      });
  // CREATE ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.login = function() {
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.user.account != undefined) {
      $scope.loading = true;
      // call the create function from our service (returns a promise object)
      Todos.create($scope.user)
      // if successful creation, call our get function to get all the new todos
          .success(function(data) {
            $scope.loading = false;
            $scope.formData = {}; // clear the form so our user is ready to enter another
            // $scope.todos = data; // assign our new list of todos
          });
    }
  };
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
  // 下面这部分删除功能是多余的
  // // DELETE ==================================================================
  // // delete a todo after checking it
  // $scope.deleteTodo = function(id) {
  //   $scope.loading = true;
  //   Todos.delete(id)
  //   // if successful creation, call our get function to get all the new todos
  //       .success(function(data) {
  //         $scope.loading = false;
  //         $scope.todos = data; // assign our new list of todos
  //       });
  // };
}]);
