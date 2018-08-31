app.directive('nodata', function ($rootScope, $state) {

    return {
        restrict: 'E',
        scope: {
            message: '=message'
        },
        templateUrl: 'js/common/directives/no-data/no-data.html',
        link: function (scope) {
        	console.log('herererere', scope);
        }
    };

});
