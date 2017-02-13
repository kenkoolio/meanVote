app.factory('pollFactory', ['$http', function($http){

  function PollFactory(){
    this.index = function(callback){
      $http.get('/polls').then(function(returnedData){
        if(typeof(returnedData.data.Error) !== 'undefined'){
          if(typeof(callback) == 'function'){
            callback({'Error': returnedData.data.Error});
          };
        } else if (typeof(returnedData.data.Success) !== 'undefined'){
          if(typeof(callback) == 'function'){
            callback({'Success': returnedData.data.Success});
          };
        };
      });
    };

    this.create = function(newPollData, callback){
      $http.post('/polls', newPollData).then(function(returnedData){
        if(typeof(returnedData.data.Error)!=='undefined'){
          if(typeof(callback)=='function'){
            callback({'Error': returnedData.data.Error});
          };
        } else if (typeof(returnedData.data.Success)!=='undefined'){
          if(typeof(callback)=='function'){
            callback({'Success': returnedData.data.Success});
          };
        };
      });
    };

    this.delete = function(pollId, callback){
      $http.delete('/polls/'+pollId).then(function(returnedData){

        if(typeof(returnedData.data.Error)!=='undefined'){
          if(typeof(callback)=='function'){
            callback({'Error': returnedData.data.Error});
          };
        } else if (typeof(returnedData.data.Success)!=='undefined'){
          if(typeof(callback)=='function'){
            callback({'Success': returnedData.data.Success});
          };
        };
      });
    };


    this.show = function(pollId, callback){
      $http.get('/polls/'+pollId).then(function(returnedData){

        if(typeof(returnedData.data.Error)!=='undefined'){
          if(typeof(callback)=='function'){
            callback({'Error': returnedData.data.Error});
          };
        } else if(typeof(returnedData.data.Success)!=='undefined'){
          if(typeof(callback)=='function'){
            callback({'Success': returnedData.data.Success});
          };
        };
      });
     };

    this.vote = function(optionId, callback){
      $http.get('/vote/'+optionId).then(function(returnedData){
        if(typeof(callback)=='function'){
          callback(returnedData.data);
        };
      });
    };

  }; //function

  return new PollFactory();

}]);
