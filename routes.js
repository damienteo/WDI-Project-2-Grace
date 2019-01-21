module.exports = (app, db, upload) => {

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

  /*
   *  =========================================
   *  Entries
   *  =========================================
   */


 // CRUD journals
  app.get('/journals/new', journals.newJournal);
  app.get('/journals/random', journals.randomJournal);
  app.post('/journals/new', journals.newJournal);
  app.post('/journals/complete', journals.complete);
  app.get('/journals/history', journals.history);
  app.post('/edit/journal', journals.editEntry);
  app.post('/edited/journal', journals.editedEntry);
  app.delete('/delete/journal', journals.deleteEntry);
  app.post('/journals/sortby', journals.sortby);
  app.post('/journals/search', journals.search);
  app.get('/customise/journals', journals.customise);
  app.post('/customise/complete', journals.createTemplate);

  // CRUD photos
  app.get('/photo/new', journals.newPhoto);
  app.post('/photo/sent', upload.single('file-to-upload'), journals.sentPhoto);
};

  

//index page

//edit photos
//delete photos

// - - delete user button

// refactor customised templates
//css for upload photo page

//responsive navbars - pending decision on the input to decide if/else function if/else function

 //email reminders

 //mobile ready

 //npm i moment
 