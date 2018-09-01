app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'js/home/home.html',
        resolve: {
        	LatestBlock: function(BlockFactory, NeblioAPIFactory) {
                return NeblioAPIFactory.fetchLatestBlock()
                .then(latestBlock => {
                    return BlockFactory.getAllBlockData(latestBlock.lastblockhash);
                });
            }
        }
    });
});


app.controller('HomeController', function ($scope, LatestBlock) {
	$scope.blockData = LatestBlock;
});