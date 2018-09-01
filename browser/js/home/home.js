app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'js/home/home.html',
        resolve: {
            PopularTokens: function(NeblioAPIFactory) {
                return NeblioAPIFactory.fetchPopularTokens();
            }
        }
    });
});


app.controller('HomeController', function ($scope, PopularTokens) {
	$scope.PopularTokens = PopularTokens;
});