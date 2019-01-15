const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

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
	let loginString = "Welcome to Grace";
	let hashUsername = sha256(loginString + username);

	let password = sha256(request.body.password);
	
	db.users.loggedin(username, password, (error, users) => {

		console.log(users);

	    if (error) {

	      console.error('error getting username', error);
	      response.status(500);
	      response.send('server error');

	    } else {

	    	if ( users === null ){

		      	response.send("no such user");

			} else {
				
				if (users[0].password == password) {

				response.cookie('loggedin', hashUsername);
				response.cookie('userID', users[0].id);
				response.send('Success');
		          
		        } else {
		          response.send('Password incorrect');
		        }
			}
	    }
	});
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
		loggedin
	};

}