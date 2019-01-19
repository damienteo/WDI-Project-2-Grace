/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  let newJournal = (templateChoice, callback) => {

    dbPoolInstance.query(`SELECT * FROM templates WHERE templates.category = 'Basic'`, (error, queryResult) => {

      let journals = {};
      journals.templates=[];

      for(let i = 0; i < queryResult.rows.length; i++){
            journals.templates.push(queryResult.rows[i]);
      }

      dbPoolInstance.query(`SELECT * FROM templates WHERE id = ${templateChoice}`, (error, queryResult) => {

       	journals.inputs=[];

        for(let i = 0; i < queryResult.rows.length; i++){
          journals.inputs.push(queryResult.rows[i]);
        } 

        callback(journals);

      })
    });
  }

  let randomJournal = (callback) => {

    dbPoolInstance.query(`SELECT * FROM templates WHERE templates.category = 'Random'`, (error, queryResult) => {

      let choices = [];
      for(let i = 0; i < queryResult.rows.length; i++){
        choices.push(queryResult.rows[i]);
      } 
      let templateChoice = Math.floor(Math.random() * choices.length);

      let journals = {};
      journals.inputs=[];
      journals.inputs.push(queryResult.rows[templateChoice]); 

      callback(journals);

    })
  }

  let complete = (object, reason, template_id, currentUserId, callback) => {

    const values = [
      object, 
      reason, 
      template_id, 
      currentUserId
    ]

    dbPoolInstance.query(`
      INSERT INTO entries(object, reason, template_id, user_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *, to_char(created_at, 'HH12:MI:SS AM')`
      , values, (error, queryResult) => {

        let latestEntryId = queryResult.rows[0].id;

        dbPoolInstance.query(`
          SELECT entries.*, to_char(entries.created_at, 'HH12:MI:SS AM'), templates.* 
          FROM entries 
          INNER JOIN templates 
          ON entries.template_id = templates.id 
          WHERE entries.id = ${latestEntryId}`
          , (error, result) => {

          let results = result.rows[0];
          callback(results);
          
        });
    });
  }

  let history = (currentUserId, callback) => {

    dbPoolInstance.query(`
      SELECT entries.*, to_char(entries.created_at, 'HH12:MI:SS AM'), templates.name, templates.starter, templates.addon, templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.user_id = ${currentUserId}
      AND entries.template_id < 5
      OR entries.template_id > 5
      ORDER BY entries.created_at DESC`
      , (error, result) => {

        let entries = {};
        entries.list=[];
        for(let i = 0; i < result.rows.length; i++){
                entries.list.push(result.rows[i]);
        }
        callback(entries);  

    });
  }

  let deleteEntry = (entryChoice, callback) => {

    dbPoolInstance.query(`
      SELECT entries.*, to_char(entries.created_at, 'HH12:MI:SS AM'), templates.name, templates.starter, templates.addon, templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.id = ${entryChoice}`
      , (error, queryResult) => {
        dbPoolInstance.query(`
          DELETE FROM entries
          WHERE entries.id = ${entryChoice}`
          , (error, result) => {

          let results = queryResult.rows[0];
          callback(results);

        });
    });
  }

  let editEntry = (entryChoice, callback) => {

    dbPoolInstance.query(`
      SELECT entries.*, to_char(entries.created_at, 'HH12:MI:SS AM'), templates.name, templates.starter, templates.addon, templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.id = ${entryChoice}`
      , (error, queryResult) => {

        let results = queryResult.rows[0];
        callback(results);
    });
  }

  let editedEntry = (entryChoice, object, reason,callback) => {

    const values = [
      entryChoice,
      object, 
      reason
    ]

    dbPoolInstance.query(`
      UPDATE entries
      SET object = $2, reason = $3
      WHERE ID = $1
      `
      , values, (error, queryResult) => {

        dbPoolInstance.query(`
          SELECT entries.*, to_char(entries.created_at, 'HH12:MI:SS AM'), templates.* 
          FROM entries 
          INNER JOIN templates 
          ON entries.template_id = templates.id 
          WHERE entries.id = $1`
          , [entryChoice], (error, result) => {

          let results = result.rows[0];
          callback(results);
          
        });
    });

  }

  let sortby = (currentUserId, order, callback) => {

    dbPoolInstance.query(`
      SELECT entries.*, to_char(entries.created_at, 'HH12:MI:SS AM'), templates.name, templates.starter, templates.addon, templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.user_id = ${currentUserId}
      AND entries.template_id < 5
      OR entries.template_id > 5
      ORDER BY entries.created_at ${order}`
      , (error, result) => {

        let entries = {};
        entries.list=[];
        for(let i = 0; i < result.rows.length; i++){
                entries.list.push(result.rows[i]);
        }
        callback(entries);  

    });
  }

  let search = (currentUserId, searchTerm, callback) => {

    dbPoolInstance.query(`
      SELECT entries.*, 
        to_char(entries.created_at, 'HH12:MI:SS AM'), 
        templates.name, 
        templates.starter, 
        templates.addon, 
        templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.user_id = ${currentUserId}
      AND ((entries.object ILIKE '%${searchTerm}%')
      OR (entries.reason ILIKE '%${searchTerm}%'))`
      , (error, result) => {
        let entries = {};
        entries.list=[];
        for(let i = 0; i < result.rows.length; i++){
                entries.list.push(result.rows[i]);
        }
        callback(entries);  
    });
  }

  let sentPhoto = (object, reason, templateId, currentUserId, callback) => {

    const values = [
      currentUserId,
      object, 
      reason, 
      templateId, 
    ]

    dbPoolInstance.query(`
      INSERT INTO entries(user_id, object, reason, template_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *, to_char(created_at, 'HH12:MI:SS AM')`
      , values, (error, queryResult) => {

       let latestEntryId = queryResult.rows[0].id;

        dbPoolInstance.query(`
          SELECT entries.*, to_char(entries.created_at, 'HH12:MI:SS AM') 
          FROM entries 
          WHERE entries.id = ${latestEntryId}`
          , (error, result) => {

          let results = result.rows[0];
          callback(results);
          
        });
    });
  }

    let photos = (currentUserId, callback) => {

    dbPoolInstance.query(`
      SELECT entries.*, to_char(entries.created_at, 'HH12:MI:SS AM'), templates.name, templates.starter, templates.addon, templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.user_id = ${currentUserId}
      AND entries.template_id = 5
      ORDER BY entries.created_at DESC`
      , (error, result) => {

        let entries = {};
        entries.list=[];
        for(let i = 0; i < result.rows.length; i++){
                entries.list.push(result.rows[i]);
        }
        callback(entries);  

    });
  }

  return {
  	newJournal,
    randomJournal,
    complete,
    history,
    deleteEntry,
    editEntry,
    editedEntry,
    sortby,
    search,
    sentPhoto,
    photos
  };
}