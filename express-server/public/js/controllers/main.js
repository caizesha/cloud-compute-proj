/* eslint-disable */
angular.module('todoController', [])
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});
		//登录账户
		$scope.user_login = function() {
			if ($scope.login.account != undefined) {
				$scope.loading = true;
				Todos.create($scope.login)
					.success(function(data) {
						$scope.loading = false;
						$scope.login = {}; 
						$scope.User= data;
						$scope.iuser=data[0];
					}).error(function(data){
						alert('不存在此用户或密码不正确!');
					});
			}
		};
		//注册
		$scope.register = function() {
			if ($scope.user.account != undefined) {
				$scope.loading = true;
				if ($scope.user.password!=$scope.user.password2){
					alert('两次输入密码不一致!');
					$scope.user.password='';
					$scope.user.password2='';
					focus($scope.user.password);
				}
				Todos.create($scope.user)
					.success(function(data) {
						$scope.loading = false;
						$scope.user = {};
					});
			}
		};
		//存款
		$scope.deposit = function() {
			if ($scope.deposit_money != undefined) {
				if ($scope.deposit_money<0){
					alert("金额不能为负数!");
					return;
				}
				$scope.loading = true;
				var dataForm={
					"account":$scope.iuser.account,
					"deposit": parseFloat($scope.deposit_money)
				};
				Todos.create(dataForm)
					.success(function(data) {
						$scope.loading = false;
						$scope.iuser=data[0];
						$scope.deposit_money =undefined; 
					});
			}
		};
		//取款
		$scope.withdraw = function() {
			if ($scope.withdraw_money != undefined) {
				$scope.loading = true;
				if($scope.withdraw_money>$scope.iuser.balance) {
					alert("余额不足!");
					return;
				}
				if ($scope.withdraw_money<0){
					alert("金额不能为负数!");
					return;
				}
				else{
				var dataForm={
					"account":$scope.iuser.account,
					"withdraw":parseFloat($scope.withdraw_money),
				};
				Todos.create(dataForm)
					.success(function(data) {
						$scope.loading = false;
						$scope.iuser=data[0];
						$scope.withdraw_money =undefined; 
					});
				}
			}
		};
		//转账
		$scope.trans= function () {
			if (($scope.trans_money!=undefined)&&($scope.trans_account!=undefined)) {
				if ($scope.trans_money > $scope.iuser.balance) { alert("余额不足"); }
				if ($scope.trans_money<0){
					alert('金额不能为负数!')
				}
				else {
					$scope.loading = true;
					var dataForm = {
						"account": $scope.iuser.account,
						"balance": $scope.iuser.balance - parseFloat($scope.trans_money),
						"trans_account": $scope.trans_account,
						"trans_money": parseFloat($scope.trans_money)
					};
					Todos.create(dataForm)
						.success(function (data) {
							$scope.loading = false;
							$scope.iuser = data[0];
							$scope.trans_money = undefined; 
							$scope.trans_account = undefined;
						});
				}
			}
		};
	}]);
