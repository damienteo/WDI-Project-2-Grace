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
			
			model();

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

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.newJournal( templateChoice, (journals) => {
				response.render('entries/NewJournal', journals);
			});
		}
	)

}

let randomJournal = (request, response) => {

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.randomJournal( (journals) => {
				response.render('entries/RandomJournal', journals);
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
		() => {
			db.journals.complete( object, reason, template_id, currentUserId, (results) => {

				let info = [];

				let message = {message: "You have inserted the following post"};
				info.push(message);

				info.push(results);

				response.render('entries/LatestJournal', info);
			});	
		}
	)
}

let history = (request, response) => {

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.history(currentUserId, (results) => {
				response.render('entries/PastJournals', results);
			});
		}
	) 
}

let deleteEntry = (request, response) => {

	let entryChoice = request.body.id;

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.deleteEntry(entryChoice, (results) => {

				let info = [];

				let message = {message: "You have deleted the following post"};

				info.push(message);
				info.push(results);

				response.render('entries/LatestJournal', info);
			});	
		}
	) 
}

let editEntry = (request, response) => {

	let entryChoice = request.body.id;

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.editEntry(entryChoice, (results) => {
				response.render('entries/EditJournal', results);
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
		() => {
			db.journals.editedEntry(entryChoice, object, reason, (results) => {

				let info = [];

				let message = {message: "You have edited the following post"};

				info.push(message);
				info.push(results);

				response.render('entries/LatestJournal', info);
			});	
		}
	) 
}

let sortby = (request, response) => {

	if (request.body.sort == "dateAsc") {
        	order = 'ASC';
        } else if (request.body.sort == "dateDesc"){
    		order = 'DESC';
        }

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.sortby(currentUserId, order, (results) => {
				response.render('entries/PastJournals', results);
			});
		}
	) 
}

let search = (request, response) => {

	searchTerm = request.body.searchTerm;

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.search(currentUserId, searchTerm, (results) => {
				response.render('entries/PastJournals', results);
			});
		}
	) 
}

let newPhoto = (request, response) => {

	userAuthentication(
		request, 
		response, 
		() => {
			response.render('entries/NewPhoto')
		}
	)
}

let sentPhoto = (request, response) => {

	let object = request.file.filename;
	let reason = request.body.reason;
	let templateId = request.body.templateId;

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.sentPhoto(object, reason, templateId, currentUserId, (results) => {

				let info = [];

				let message = {message: "You have posted the following photo"};

				info.push(message);
				info.push(results);

				response.render('entries/LatestPhoto', info);
			});	
		}
	)
}


let photos = (request, response) => {

	userAuthentication(
		request, 
		response, 
		() => {
			db.journals.photos(currentUserId, (results) => {
				response.render('entries/Photos', results);
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
		photos
	};

}