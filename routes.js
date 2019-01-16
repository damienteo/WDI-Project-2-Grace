module.exports = (app, db) => {

  const users = require('./controllers/users')(db);
  const journals = require('./controllers/journals')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  
  app.get('/users/register', users.register);
  app.post('/users/registered', users.registered);
  app.get('/users/login', users.login);
  app.post('/users/loggedin', users.loggedin);
  app.get('/users/logout', users.logout);
  app.get('/users/profile', users.profile);

  // Authentication

  /*
   *  =========================================
   *  Entries
   *  =========================================
   */

  // app.get('/journal/home', entries.show);
  app.get('/journals/new', journals.newJournal);
  app.post('/journals/new', journals.newJournal);
  app.post('/journals/complete', journals.complete);
};