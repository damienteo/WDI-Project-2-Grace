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
	     	message = "server error";

	    } else {

	    	if( users === null ){
	    		message = "registered";
	    	}else{
	        	message = "Please pick another username";
	      	}
	    }
	    response.render('Message', {message: message});
	});	
}

let login = (request, response) => {
	response.render('users/Login');
}

let loggedin = (request, response) => {

	let username = request.body.name;
	let password = sha256(request.body.password);
	
	db.users.loggedin(username, password, (error, users) => {

	    if (error) {

	      console.error('error getting username', error);
	      response.status(500);
	      message = "Server error";

	    } else {

	    	if ( users === null ){
		      	message = "There is no such user. Please try again";
			} else {

				let userId = users[0].id;
				let hashUserId = sha256(loginString + userId);
				
				if (users[0].password == password) {

					response.cookie('loggedin', hashUserId);
					response.cookie('userId', userId);
					message = "Successfully logged in.";
		          
		        } else {
		         	message = "Password Incorrect";
		        }
			}
	    }
	    response.render('Message', {message});
	});
}

let profile = (request, response) => {

	let currentUserId = request.cookies['userId'];
	let currentLog = request.cookies['loggedin'];
	let compareLog = sha256(loginString + currentUserId);

	if( currentLog == null ){

		message = "Please Login";

    }else{
      
		if( currentLog == compareLog ){
			message = "Here is your profile";
	    }else{
	     	message = "Invalid Profile";
	    }
    }
    response.render('Message', {message});
}

let logout = (request, response) => {

	let currentUserId = request.cookies['userId'];
	let currentLog = request.cookies['loggedin'];
	let compareLog = sha256(loginString + currentUserId);

	if( currentLog == null ){
		message = "you are not logged in";
    }else{
      
		if( currentLog == compareLog ){

			response.clearCookie('loggedin');
        	response.clearCookie('userId');

			message = "You have logged out";

	    }else{
	     	message = "Invalid User Profile. Please log in again.";
	    }
    }
    response.render('Message', {message});
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
		profile,
		logout
	};

}