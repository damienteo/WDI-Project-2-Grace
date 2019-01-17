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

  // Authentication

  app.get('/users/login', users.login);
  app.post('/users/loggedin', users.loggedin);
  app.get('/users/logout', users.logout);
  app.get('/users/profile', users.profile);

  //pending profile statistics in profile
  //customise templates
  //email reminders
  //responsive navbar

  /*
   *  =========================================
   *  Entries
   *  =========================================
   */

  app.get('/journals/new', journals.newJournal);
  app.get('/journals/random/new', journals.randomJournal);
  app.post('/journals/new', journals.newJournal);
  app.post('/journals/complete', journals.complete);
  app.get('/journals/history', journals.history);
  app.post('/edit/journal', journals.editEntry);
  app.post('/edited/journal', journals.editedEntry);
  app.delete('/delete/journal', journals.deleteEntry);
  app.post('/journals/sortby', journals.sortby);
  app.post('/journals/search', journals.search);
  //sortby template
  //upload photo
  //show photo posts

};