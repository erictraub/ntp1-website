app.controller('AddressController', function ($scope, AllAddressData) {

	console.log('All Address Data: ', AllAddressData);
	$scope.utxosData = AllAddressData.utxoTxData;
	$scope.tokensObj = AllAddressData.tokensData;


});