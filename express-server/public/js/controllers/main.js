/* eslint-disable */
angular.module('todoController', [])
	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
			});
		//登录账户
		$scope.user_login = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.login.account != undefined) {
				// call the create function from our service (returns a promise object)
				Todos.create($scope.login)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						alert('登录成功!');
						$scope.login = {}; // clear the form so our user is ready to enter another
						$scope.User= data; // assign our new list of todos
						$scope.iuser=data[0];
					});
			}
		};
		//注册
		$scope.register = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.user.account != undefined) {
				// call the create function from our service (returns a promise object)
				Todos.create($scope.user)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						alert('注册账户成功!');
						$scope.user = {}; // clear the form so our user is ready to enter another
					});
			}
		};
		//存款
		$scope.deposit = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.deposit_money != undefined) {
				// call the create function from our service (returns a promise object)
				var dataForm={
					"account":$scope.iuser.account,
					"balance":$scope.iuser.balance+parseFloat($scope.deposit_money);
				};
				Todos.create(dataForm)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.iuser=data[0];
						$scope.deposit_money =undefined; // clear the form so our user is ready to enter another
					});
			}
		};
		//取款
		$scope.withdraw = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.withdraw_money != undefined) {
				if($scope.withdraw_money>$scope.iuser.balance) {
					alert("余额不足");
				}
				else{
				// call the create function from our service (returns a promise object)
				var dataForm={
					"account":$scope.iuser.account,
					"balance":$scope.iuser.balance-parseFloat($scope.withdraw_money)
				};
				Todos.create(dataForm)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.iuser=data[0];
						$scope.withdraw_money =undefined; // clear the form so our user is ready to enter another
					});
				}
			}
		};
		//转账
		$scope.trans= function () {
			if (($scope.trans_money!=undefined)&&($scope.trans_account!=undefined)) {
				if ($scope.trans_money > $scope.iuser.balance) { alert("余额不足"); }
				else {
					// call the create function from our service (returns a promise object)
					var dataForm = {
						"account": $scope.iuser.account,
						"balance": $scope.iuser.balance - parseFloat($scope.trans_money),
						"trans_account": $scope.trans_account,
						"trans_money": parseFloat($scope.trans_money)
					};
					Todos.create(dataForm)
						// if successful creation, call our get function to get all the new todos
						.success(function (data) {
							$scope.iuser = data[0];
							$scope.trans_money = undefined; // clear the form so our user is ready to enter another
							$scope.trans_account = undefined;
						});
				}
			}
		};
		// DELETE ==================================================================
		// delete a todo after checking it
		// $scope.deleteTodo = function(id) {
		// 	Todos.delete(id)
		// 		// if successful creation, call our get function to get all the new todos
		// 		.success(function(data) {
		// 			$scope.todos = data; // assign our new list of todos
		// 		});
		// };
	}]);
