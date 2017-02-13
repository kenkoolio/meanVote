var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Options = new mongoose.Schema({
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

var pollsSchema = new mongoose.Schema({
  _user : {type: Schema.Types.ObjectId, ref: 'User'},
  question : {
    type: String,
    required: true,
    minlength: 8
  },
  options: [Options]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

mongoose.model('Poll', pollsSchema);
