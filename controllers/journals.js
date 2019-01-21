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
			
			authentication = true
			model(authentication);

	    }else{
	     	message = "Invalid Profile";
	     	response.render('Message', {message});
	    }
    }

}

// express middleware

let newJournal = (request, response) => {

	let templateChoice = request.body.id;

	if (templateChoice == null) {
		templateChoice = 1;
	}

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.newJournal( templateChoice, currentUserId, (journals) => {
				response.render('entries/NewJournal', {journals, authentication});
			});
		}
	)
}

let newPhoto = (request, response) => {

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			response.render('entries/NewPhoto', {authentication})
		}
	)
}

let randomJournal = (request, response) => {

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.randomJournal( (journals) => {
				response.render('entries/RandomJournal', {journals, authentication});
			});
		}
	)

}

let complete = (request, response) => {

	let object = request.body.object;
	let reason = request.body.reason;
	let template_id = request.body.id;

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.complete( object, reason, template_id, currentUserId, (results) => {

				response.render('entries/PastJournals', {results, authentication});
			});	
		}
	)
}

let sentPhoto = (request, response) => {

	let object = request.file.url;
	let reason = request.body.reason;
	let templateId = request.body.templateId;

	console.log(object);

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.sentPhoto(object, reason, templateId, currentUserId, (results) => {
				response.render('entries/PastJournals', {results, authentication});
			});	
		}
	)
}

let history = (request, response) => {

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.history(currentUserId, (results) => {
				response.render('entries/PastJournals', {results, authentication});
			});
		}
	) 
}

let deleteEntry = (request, response) => {

	let entryChoice = request.body.id;

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.deleteEntry(entryChoice, (results) => {

				message = "You have deleted the entry";
	     		response.render('Message', {message, authentication});
			});	
		}
	) 
}

let editEntry = (request, response) => {

	let entryChoice = request.body.id;

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.editEntry(entryChoice, (results) => {
				response.render('entries/EditJournal', {results, authentication});
			});
		}
	) 
}

let editedEntry = (request, response) => {

	let entryChoice = request.body.id;
	let object = request.body.object;
	let reason = request.body.reason;

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.editedEntry(entryChoice, object, reason, (results) => {

				let info = [];

				let message = {message: "You have edited the following post"};

				info.push(message);
				info.push(results);

				response.render('entries/LatestJournal', {info, authentication});
			});	
		}
	) 
}

let sortby = (request, response) => {

	let choice = request.body.choice;

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.sortby(currentUserId, choice, (results) => {
				response.render('entries/PastJournals', {results, authentication});
			});
		}
	) 
}

let search = (request, response) => {

	searchTerm = request.body.searchTerm;

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.search(currentUserId, searchTerm, (results) => {
				response.render('entries/PastJournals', {results, authentication});
			});
		}
	) 
}

let customise = (request, response) => {

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.customise(currentUserId, (results) => {
				response.render('entries/Customise', {results, authentication});
			});
		}
	)
}

let createTemplate = (request, response) => {

	let name = request.body.name;
	let starter = request.body.starter;
	let addon = request.body.addon;

	userAuthentication(
		request, 
		response, 
		(authentication) => {
			db.journals.createTemplate(name, starter, addon, currentUserId, (results) => {
				response.render('entries/Customise', {results, authentication});
			});	
		}
	)
}

/**
* ===========================================
* Export controller functions as a module
* ===========================================
*/
	return {
		newJournal,
		complete,
		history,
		deleteEntry,
		editEntry,
		editedEntry,
		sortby,
		search,
		randomJournal,
		newPhoto,
		sentPhoto,
		customise,
		createTemplate
	};

}