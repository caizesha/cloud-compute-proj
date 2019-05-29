// 这才是真正的routes，app文件夹里面那个命名不规范的
angular.module('routeService', [])
    .factory('Accounts', ['$http', ($http) => {
      return {
        get: () => {
          return $http.get('/api/accounts');
        },
        create: (user) => {
          return $http.post('/api/accounts', user);
        },
      };
    }]);
