app.controller('pollsController', ['$scope', 'pollFactory', '$cookies', '$location', '$window', function($scope, pollFactory, $cookies, $location, $window){

  $scope.userInSession = $cookies.getObject('user');
  if (typeof($scope.userInSession)=='undefined'){
    $location.url('/');
  }

  $scope.logout = function(){
    $cookies.remove('user');
    $location.url('/');
  }

  $scope.new = function(){
    $location.url('/create');
  }

  $scope.home = function(){
    $location.url('/dashboard');
  }

  function getPolls(callback){
    pollFactory.index(function(returnedData){
      if(typeof(callback)=='function'){
          callback(returnedData);
      };
    });
  };

  getPolls(function(returnedData){
    if(typeof(returnedData.Error)!=='undefined'){
      console.log(returnedData.Error);
    } else if (typeof(returnedData.Success)!=='undefined'){
      $scope.allPolls = returnedData.Success;
    };
  });

  $scope.newPoll = {};
  $scope.create = function(){
    $scope.badErrors = [];
    if (typeof($scope.newPoll.question) == 'undefined' ||
        typeof($scope.newPoll.option1) == 'undefined'  ||
        typeof($scope.newPoll.option2) == 'undefined'  ||
        typeof($scope.newPoll.option3) == 'undefined'  ||
        typeof($scope.newPoll.option4) == 'undefined' ) {
          $scope.badErrors.push('All fields must be filled out!');
        } else {
            var newPollData = {
              _user: $scope.userInSession._id,
              question: $scope.newPoll.question,
              option1: $scope.newPoll.option1,
              option2: $scope.newPoll.option2,
              option3: $scope.newPoll.option3,
              option4: $scope.newPoll.option4
            };

            pollFactory.create(newPollData, function(returnedData){
              if(typeof(returnedData.Error)!=='undefined'){
                var errors = returnedData.Error.errors;
                $scope.badErrors = [];
                for(var key in errors){
                  if(errors.hasOwnProperty(key)){
                    $scope.badErrors.push(errors[key].message);
                  };
                };
              } else if (typeof(returnedData.Success)!=='undefined'){
                $location.url('/dashboard');
              };
            });
        };
  };

  $scope.delete = function(pollId){
    pollFactory.delete(pollId, function(returnedData){
      if(typeof(returnedData.Error)!=='undefined'){
        console.log(returnedData.Error);
      } else {
        location.reload();
      };
    });
  };


  $scope.show = function(pollId){
    $location.url('/show'+pollId);
  }

  // $scope.getOne = function(pollId){
  //
  //
  //   pollFactory.show(pollId, function(returnedData){
  //     if(typeof(returnedData.Error)!=='undefined'){
  //       console.log('hurr durr', returnedData.Error);
  //     } else if (typeof(returnedData.Success)!=='undefined'){
  //
  //       setProduct(loadShow);
  //
  //       function loadShow(){
  //         $location.url('/show');
  //       };
  //
  //       function setProduct(callback){
  //         $scope.onePoll = returnedData.Success;
  //         $scope.options = $scope.onePoll.options;
  //         console.log('onePoll', $scope.onePoll);
  //         console.log('some options', $scope.options);
  //         callback();
  //       };
  //     };
  //   });
  // };

  // $scope.vote = function(optionId){
  //   pollData = {
  //
  //   }
  //   pollFactory.vote(optionId, function(returnedData){
  //
  //   });
  // };

}]);
