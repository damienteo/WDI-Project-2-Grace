module.exports = (app, db) => {

  const users = require('./controllers/users')(db);
  // const entries = require('./controllers/entries')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  
  app.get('/users/register', users.register);
  app.post('/users/registered', users.registered);
  app.get('/users/login', users.login);

  // Authentication

  /*
   *  =========================================
   *  Entries
   *  =========================================
   */

  // app.get('/entries', entries.index);

};