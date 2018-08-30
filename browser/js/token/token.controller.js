app.controller('TokenController', function ($scope, TokenMetadata, NeblioAPIFactory) {

	console.log('All Token Data: ', TokenMetadata);

	$scope.tokenMetadata = TokenMetadata;
	NeblioAPIFactory.fetchTokenHolders(TokenMetadata.tokenId)
	.then(response => {
		$scope.holders = response.holders;
		setTimeout(function() {
			$scope.$evalAsync();
			$('#holders-table').DataTable();
			$('.loading-div').css('display', 'none');
		}, 0);
	})

});