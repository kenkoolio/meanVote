var Users = require('../controllers/users.js'),
    Polls = require('../controllers/polls.js');

module.exports = (function(app){
  app.get('/users', Users.index);
  app.post('/users', Users.create);
  app.post('/login', Users.login);
  app.get('/polls', Polls.index);
  app.post('/polls', Polls.create);
  app.get('/polls/:id', Polls.show);
  app.delete('/polls/:id', Polls.delete);
  app.get('/vote/:id', Polls.vote);
});
