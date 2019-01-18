const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser'); 
const multer = require('multer');

const db = require('./db');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })

// Set up middleware
app.use(express.static(__dirname + "/public/"));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// sudo -u postgres createdb Grace
// psql -d Grace -U postgres -f table.sql;

/**
 * ===================================
 * Routes
 * ===================================
 */

 // Import routes to match incoming requests
require('./routes')(app, db, upload);

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
  response.render('Index');
});

 // Catch all unmatched requests and return 404 not found page
app.get('*', (request, response) => {
  message = "Page not found";
  response.render('Message', {message});
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    db.pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);

