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
  app.get('/journals/random/new', journals.randomJournal);
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
  app.get('/journals/photo/new', journals.newPhoto);
  app.post('/journals/photo/sent', upload.single('file-to-upload'), journals.sentPhoto);
  app.get('/journals/photos', journals.photos);



};



//unified history
// - if template = photo
// other than sort by asc and desc, also sort by catergory (total, basic, customised, random, photos)
//profile statistics
// - relevant functions
// - - date and time of first and last post (array.length-1)
// - - number of basic posts, random posts, custom posts, photo posts
// - - delete user button
//profile page
//fix CSS
// - display of posts
// - post color
// - button color
// - styles.css not applying to new random post and new photo page

  //responsive navbars - pending decision on the input to decide if/else function if/else function

//index page
  //edit photos
  //delete photos

 //email reminders

//cloudinary
//herokuapp
