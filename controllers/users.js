const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

const loginString = "Welcome to Grace";

module.exports = (db) => {

/**
* ===========================================
* Controller logic
* ===========================================
*/


let register = (request, response) => {
	response.render('users/Register');
}

let registered = (request, response) => {

	let username = request.body.name;
	let password = sha256(request.body.password);

	db.users.registered(username, password, (error, users) => {

	    if (error) {

	     	console.error('error getting username', error);
	     	response.status(500);
	     	response.send('server error');

	    } else {

	    	if( users === null ){

	        	response.send('registered');

	    	}else{
	        	response.send(users);
	      	}
	    }
	});
}

let login = (request, response) => {
	response.render('users/Login');
}

let loggedin = (request, response) => {

	let username = request.body.name;
	let password = sha256(request.body.password);
	
	db.users.loggedin(username, password, (error, users) => {

		let userId = users[0].id;
		let hashUserId = sha256(loginString + userId);

	    if (error) {

	      console.error('error getting username', error);
	      response.status(500);
	      response.send('server error');

	    } else {

	    	if ( users === null ){

		      	response.send("no such user");

			} else {
				
				if (users[0].password == password) {

				response.cookie('loggedin', hashUserId);
				response.cookie('userId', userId);
				response.send('Success');
		          
		        } else {
		          response.send('Password incorrect');
		        }
			}
	    }
	});
}

let profile = (request, response) => {

	let currentUserId = request.cookies['userId'];
	let currentLog = request.cookies['loggedin'];
	let compareLog = sha256(loginString + currentUserId);

	if( currentLog == null ){

		response.send('Please Login');

    }else{
      
		if( currentLog == compareLog ){

			response.send('Here is your profile');

	    }else{

	      response.send('Invalid Profile');

	    }
    }
}


/**
* ===========================================
* Export controller functions as a module
* ===========================================
*/
	return {
		login,
		register,
		registered,
		loggedin,
		profile
	};

}