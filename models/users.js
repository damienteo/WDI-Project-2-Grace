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

let loggedin = ( username, password, callback) => {

	const values = [username, password];

    dbPoolInstance.query('SELECT * from users WHERE name=$1', [username], (error, queryResult) => {
      if( error ){
        callback(error, null);

      }else{

        if( queryResult.rows.length > 0 ){
        	callback(null, queryResult.rows);
        }else{
         	callback(null, null);
        }
      }
    });
}

let profile = (currentUserId, callback) => {

    dbPoolInstance.query(`
      SELECT entries.id, templates.category 
      FROM entries
      INNER JOIN templates
      ON entries.template_id = templates.id 
      WHERE entries.user_id = ${currentUserId}
      `, (error, basicResult) => {

      	let basicCount = 0;
      	let randomCount = 0;
      	let customisedCount = 0;
      	let photoCount = 0;

    	for(let i = 0; i < basicResult.rows.length; i++){
    		if (basicResult.rows[i].category == "Basic") {
    			basicCount++;
    		} else if (basicResult.rows[i].category == "Random") {
    			randomCount++;
    		} else if (basicResult.rows[i].category == "Customised") {
    			customisedCount++
    		} else if (basicResult.rows[i].category == "Photo") {
    			photoCount++
    		}
     	}

     	let results=[];
     	results.push(basicCount, randomCount, customisedCount, photoCount);

     	callback(null, results);
    });
}

return {
	registered,
	loggedin,
	profile
};

}