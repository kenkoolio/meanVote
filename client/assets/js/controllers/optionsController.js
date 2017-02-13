app.controller('optionsController', ['$scope', 'pollFactory', '$routeParams', '$location', function($scope, pollFactory, $routeParams, $location){

  $scope.home = function(){
    $location.url('/dashboard');
  }

  var getOne = function(){
    var pollId = $routeParams.id;
    pollFactory.show(pollId, function(returnedData){
      if(typeof(returnedData.Error)!=='undefined'){
        console.log('hurr durr', returnedData.Error);
      } else if (typeof(returnedData.Success)!=='undefined'){

          $scope.onePoll = returnedData.Success;
          $scope.options = $scope.onePoll.options;
          console.log('onePoll', $scope.onePoll);
          console.log('some options', $scope.options);

        };
      });
    };

  getOne();

  $scope.vote = function(optionId){
    pollFactory.vote(optionId, function(returnedData){
      console.log(returnedData);
      location.reload();
    });
  };


}]);
