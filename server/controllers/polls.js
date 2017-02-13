var mongoose = require('mongoose'),
    Poll = mongoose.model('Poll'),
    // plan B is commented out
    Option = mongoose.model('Option');

function PollsController(){
  this.index = function(req, res){
    //perhaps i foresaw having to populate the _user as well as the poll-options
    Poll.find({}).populate('_user').exec(function(err, polls){
      if(err){
        res.json({'Error': err});
      } else {
        res.json({'Success': polls});
      };
    });
  };

  this.create = function(req, res){
    var newPoll = new Poll({
      _user: req.body._user,
      question: req.body.question
    });

    //Didn't do it this way because I had to save each new option and handle each error.. could have added them to an errors array though

    // for (var i=1; i<5; i++){
    //   var option[i] = {
    //     text: req.body.option[i],
    //     votes: 0
    //   };
    //
    //   var newOption[i] = new Option(option[i]);
    //   newOption[i]._poll = newPoll;
    // };

    var option1 = {
          text: req.body.option1,
          votes: 0
        },
        option2 = {
          text: req.body.option2,
          votes: 0
        },
        option3 = {
          text: req.body.option3,
          votes: 0
        },
        option4 = {
          text: req.body.option4,
          votes: 0
        };

    newPoll.options.push(option1, option2, option3, option4);

    newPoll.save(function(err, poll){
     if(err){
       res.json({'Error': err});
     } else {
       res.json({'Success': poll});
     };
    });
  };

  this.show = function(req, res){
    Poll.findOne({_id: req.params.id}, function(err, poll){
      if(err){
        // res.json({'Error:' err});
        console.log(err);
      } else {
        res.json({'Success': poll});
      };
    });
  };

  // update a poll's vote option
  this.vote = function(req, res){
    var optionId = req.params.id;

    // the missing puzzle piece
    Poll.update({'options': {$elemMatch: {"_id": optionId }}}, {$inc: {"options.$.votes": 1}}, function(err, poll){
      if(err){
        res.json({'Error:': err});
      } else {
        res.json({'Success:': poll});
        //does not really return anything import -- just the poll in question
      };
    });

    // The embedded aspect of the options document made conceptualizing how to select then update it a challenge -- failed attempt:
    // Poll.findOne({"options._id": optionId}).exec(function(err, poll){
    //   if(err){
    //     console.log(err);
    //   } else {
    //     console.log(poll);
    //     var options = poll.options
    //     for (var i=0; i<options.length; i++){
    //       if(options[i]._id == optionId){
    //         options[i].update({votes: {$inc: 1}});
    //       };
    //     };
    //     // option.update({votes: {$inc: 1}});
    //   }
    // });
  };

  this.delete = function(req, res){
    console.log('hey look at me first');
    Poll.remove({_id: req.params.id}, function(err){
      console.log('hey look at me');
      if(err){
        res.json({'Error': err});
        console.log(err);
      } else {
        res.json({'Success': "Poll has been deleted"});
        console.log('EXCELSIOR');
      };
    });
  };

};

module.exports = new PollsController();
