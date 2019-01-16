/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

let newJournal = (templateChoice, callback) => {

  dbPoolInstance.query('SELECT * FROM templates', (error, queryResult) => {

    let journals = {};
    journals.templates=[];

    for(let i = 0; i < queryResult.rows.length; i++){
          journals.templates.push(queryResult.rows[i]);
    }

    dbPoolInstance.query(`SELECT * FROM templates WHERE id = ${templateChoice}`, (error, queryResult) => {

     	journals.inputs=[];

      for(let i = 0; i < queryResult.rows.length; i++){
        journals.inputs.push(queryResult.rows[i]);

      callback(journals);

      } 

    })
  });
}

let complete = (object, reason, template_id, currentUserId, callback) => {

  const values = [
    object, 
    reason, 
    template_id, 
    currentUserId
  ]

  dbPoolInstance.query(`INSERT INTO entries(object, reason, template_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *, to_char(created_at, 'HH12:MI:SS AM')`, values, (error, queryResult) => {
      let results = queryResult.rows[0];
      console.log(results);
      callback(results);
  });
}

  return {
  	newJournal,
    complete
  };

}