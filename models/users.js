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
    	SELECT 
	    	entries.id,
	       	entries.created_on,
	    	to_char(entries.created_at, 'HH12:MI:SS AM'), 
	     	templates.category
    	FROM entries
    	INNER JOIN templates
    	ON entries.template_id = templates.id 
    	WHERE entries.user_id = ${currentUserId}
    	ORDER BY entries.created_at DESC
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

        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const lastEntry = basicResult.rows.length - 1;

        let firstDay = basicResult.rows[0].created_on.toLocaleDateString("en-US", dateOptions);
        let firstTime = basicResult.rows[0].to_char;
        let lastDay = basicResult.rows[lastEntry].created_on.toLocaleDateString("en-US", dateOptions);
        let lastTime = basicResult.rows[lastEntry].to_char;

     	let results = {};
     	results.list=[];
     	results.list.push(
     		{basic:basicCount, 
     		random:randomCount,
     		customised:customisedCount, 
     		photo:photoCount,
            firstDay,
            firstTime,
            lastDay,
            lastTime}
     	);

     	callback(null, results);
    });
}

return {
	registered,
	loggedin,
	profile
};

}