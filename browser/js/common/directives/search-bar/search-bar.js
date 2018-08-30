app.directive('searchbar', function ($rootScope, AuthService, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/search-bar/search-bar.html',
        link: function (scope) {
        	scope.searchText = '';
        	scope.searchBy = null;

        	scope.search = function() {
                if (!searchFormValid()) return;
        		if (scope.searchBy === 'address') $state.go('address', { 'address': scope.searchText });
        		else if (scope.searchBy === 'block') $state.go('block', { 'blockIdentifier': scope.searchText });
        		else if (scope.searchBy === 'token') $state.go('token', { 'tokenIdentifier': scope.searchText });
        		else if (scope.searchBy === 'tx') $state.go('transaction', { 'txId': scope.searchText });
        	};

            function searchFormValid() {
                $('form .ng-invalid').addClass('redRing');
                $('form .ng-valid').removeClass('redRing');
                console.log(scope.searchForm)
                return scope.searchForm.$valid;
            };

            function addRedRing(indentifier) {
                $(indentifier).addClass('redRing');
            };

            function removeRedRing(indentifier) {
                $(indentifier).removeClass('redRing');
            }
        }
    };

});
