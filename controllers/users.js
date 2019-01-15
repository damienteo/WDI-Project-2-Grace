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
		let password = request.body.password;

		db.users.registered(username, password, (error, users) => {
        // queryResult contains pokemon data returned from the pokemon model
        if (error) {

          console.error('error getting user', error);
          response.status(500);
          response.send('server error');

        } else {

          if( users === null ){

            // render pokemon view in the pokemon folder
            response.send('registered');

          }else{

            // render pokemon view in the pokemon folder
            response.send(users);

          }
        }
      });
     }

		let login = (request, response) => {
		response.render('users/Login');
	}


	/**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    login,
    register,
    registered
  };

}