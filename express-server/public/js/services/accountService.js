angular.module('accountService', [])
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
