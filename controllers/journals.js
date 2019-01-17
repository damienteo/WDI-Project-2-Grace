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

const userAuthentication = (request, response, model) => {

	currentUserId = request.cookies['userId'];
	currentLog = request.cookies['loggedin'];
	compareLog = sha256(loginString + currentUserId);

	if( currentLog == null ){

		message = "Please Login";
		response.render('Message', {message});

    }else{
      
		if( currentLog == compareLog ){
			
			model;

	    }else{
	     	message = "Invalid Profile";
	     	response.render('Message', {message});
	    }
    }

}

let newJournal = (request, response) => {

	let templateChoice = request.body.id;

	if (templateChoice == null) {
		templateChoice = 1;
	}

	let model = 
	db.journals.newJournal( templateChoice, (journals) => {
		    response.render('entries/NewJournal', journals);
		});

	userAuthentication(
		request, 
		response, 
		model
	)

}

let complete = (request, response) => {

	let object = request.body.object;
	let reason = request.body.reason;
	let template_id = request.body.id;

	let model = 	
	db.journals.complete( object, reason, template_id, currentUserId, (results) => {
	    response.render('entries/LatestJournal', results);
	});	

	userAuthentication(
		request, 
		response, 
		model
	)

}

let history = (request, response) => {

	let model =
	db.journals.history(currentUserId, (results) => {
		console.log(results);
		response.render('entries/PastJournals', results);
	});	

	userAuthentication(
		request, 
		response, 
		model
	) 

	console.log("controller use id:" + currentUserId);
}

/**
* ===========================================
* Export controller functions as a module
* ===========================================
*/
	return {
		newJournal,
		complete,
		history
	};

}