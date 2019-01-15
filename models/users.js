/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

	let registered = ( username, password, callback) => {

		const values = [username, password];

	    dbPoolInstance.query('SELECT * from users WHERE name=$1', [username], (error, queryResult) => {
	      if( error ){
	      	console.log("hi");
	        // invoke callback function with results after query has executed
	        callback(error, null);

	      }else{

	        if( queryResult.rows.length > 0 ){
	        	callback(null, queryResult.rows[0]);

	        }else{
	         	dbPoolInstance.query('INSERT INTO users (name, password) VALUES ($1, $2)', values, (error, queryResult) => {
	         	callback(null, null);
	        	})
	        }
	      }
	    });
	}

	return {
    registered
  };

}