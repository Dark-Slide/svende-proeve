var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', { templateUrl: '/templates/home.html', controller: 'HomeCtrl' })
        .when('/posts', { templateUrl: '/templates/posts.html', controller: 'PostsCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('AuthInterceptor');
});

app.factory('AuthService', function($window) {
    return {
        setToken(token) { $window.localStorage.setItem('token', token); },
        getToken() { return $window.localStorage.getItem('token'); },
        clear() { $window.localStorage.removeItem('token'); }
    };
});

app.factory('AuthInterceptor', function(AuthService) {
    return {
        request: function(config) {
            var t = AuthService.getToken();
            if (t) config.headers.Authorization = 'Bearer ' + t;
            return config;
        }
    };
});

app.controller('LoginCtrl', function($scope, $http, AuthService, $location) {
    $scope.login = function() {
        $http.post('/api/login', { email: $scope.email, password: $scope.password })
            .then(function(res) {
                AuthService.setToken(res.data.token);
                $location.path('/posts');
            }, function() { $scope.error = 'Login failed'; });
    };
});

app.controller('PostsCtrl', function($scope, $http) {
    $http.get('/api/posts').then(function(res) {
        $scope.posts = res.data;
    }, function(err) {
        if (err.status === 401) { /* redirect to login, etc. */ }
    });
});
