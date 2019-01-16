const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

const loginString = "Welcome to Grace";

let message = '';

module.exports = (db) => {

/**
* ===========================================
* Controller logic
* ===========================================
*/

let newJournal = (request, response) => {

	let currentUserId = request.cookies['userId'];
	let currentLog = request.cookies['loggedin'];
	let compareLog = sha256(loginString + currentUserId);

	let templateChoice = request.body.id;

	if (templateChoice == null) {
		templateChoice = 1;
	}

	if( currentLog == null ){

		message = "Please Login";
		response.render('Message', {message});

    }else{
      
		if( currentLog == compareLog ){
			
			db.journals.newJournal( templateChoice, (journals) => {

			    response.render('entries/NewJournal', journals);
			});	

	    }else{
	     	message = "Invalid Profile";
	     	response.render('Message', {message});
	    }
    }
}

let complete = (request, response) => {
	let currentUserId = request.cookies['userId'];
	let currentLog = request.cookies['loggedin'];
	let compareLog = sha256(loginString + currentUserId);

	let object = request.body.object;
	let reason = request.body.reason;
	let template_id = request.body.id;

	if( currentLog == null ){

		message = "Please Login";
		response.render('Message', {message});

    }else{
      
		if( currentLog == compareLog ){
			
			db.journals.complete( object, reason, template_id, currentUserId, (results) => {

				response.send(results);
			    // response.render('entries/LatestJournal', queryResult.rows);
			});	

	    }else{
	     	message = "Invalid Profile";
	     	response.render('Message', {message});
	    }
    }
}


/**
* ===========================================
* Export controller functions as a module
* ===========================================
*/
	return {
		// login,
		newJournal,
		complete
	};

}