//this schema was plan B, as of right now it is useless -- using embedded options in Polls instead

  // update: doing it the other way (embedded document way) gave me more troubles because
  // I had to reaccess the embedded document to update the vote count.
  // if I had done two models and separately saved them -- then populate when needed --
  // was told only do the said method if I needed to reuse either models at some point,
  // and it was to update vote count but I hadn't realized it from the start.
  // it would have been easier to solve -- with some proper asynchronous-to-sync programming --
  // so maybe it was more complicated -- but there were reasons I had to do it this way --
  // regardless: the solution to increasing the embedded document vote count was
  // Poll.update({'options': {$elemMatch: {"_id": optionId }}}, {$inc: {"options.$.votes": 1}}, function(err, poll){


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var optionsSchema = new mongoose.Schema({
  _poll: {type: Schema.Types.ObjectId, ref:'Poll'},
  text: {
    type: String,
    required: true,
    minlength: 3
  },
  votes: {
    type: Number
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
});

mongoose.model('Option', optionsSchema);
