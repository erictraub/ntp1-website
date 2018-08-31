app.controller('TokenController', function ($scope, TokenMetadata, NeblioAPIFactory) {

	console.log('All Token Data: ', TokenMetadata);

	$scope.noData = false;
	$scope.tokenMetadata = TokenMetadata;

	// handle case if token not present
	if (TokenMetadata.error) {
		$scope.noData = true;
		return;
	};

	NeblioAPIFactory.fetchTokenHolders(TokenMetadata.tokenId)
	.then(response => {
		$scope.holders = response.holders;
		setTimeout(function() {
			$scope.$evalAsync();
			$('#holders-table').DataTable();
			$('.loading-div').css('display', 'none');
		}, 0);
	});


});