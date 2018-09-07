app.run(['$rootScope',function($rootScope){

    $rootScope.stateIsLoading = false;
    $rootScope.$on('$stateChangeStart', function() {
        $rootScope.stateIsLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.stateIsLoading = false;
        window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeError', function() {
        //catch error
    });

}]);