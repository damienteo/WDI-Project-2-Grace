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

  //pending profile statistics in profile
  //delete user?
  //customise templates
  //-how to structure the tables
  //-how to show posts with both customised templates and system templates, if calling from a different table
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
  app.get('/journals/photo/new', journals.newPhoto);
  app.post('/journals/photo/sent', upload.single('file-to-upload'), journals.sentPhoto);
  app.get('/journals/photos', journals.photos);

  //edit photos
  //delete photos

  //showing photos and journals together in one page other than through columns, issue of view

  //multiple entries
  //sortby template

};


//redo templates table -- for customised templates
//- add category to the templates, basic, photo, random, user
//customised tamplates
//unified history
// - if template = photo
// other than sort by asc and desc, also sort by catergory (total, basic, customised, random, photos)
//profile statistics
// - relevant functions
// - - date and time of first and last post (array.length-1)
// - - number of basic posts, random posts, custom posts, photo posts
// - - delete use button
//profile page
//fix CSS
// - navbar margin, fixed position
// - display of posts
// - overall navbar color
// - background color
// - post color
// - button color
//index page
//cloudinary
//herokuapp


// -- it is possible to use templates table for customised templates, but the issue lies wherein changes need to be made to the system-provided prompts

// -- feeding starter and addons directly into the entries table whenever the user is posting

// -- customised entries will still need to be made from their own indicual page? unless there are two separate forms? 

// -- combining data from two separate  tables into one table, when the data is 'mutually exclusive'(?)

// -- Using hidden input to highlight additional value o denote whether the template is customised? If Else conditions in models/journals/new, if yes, select from usertemplates. If no, select from templates