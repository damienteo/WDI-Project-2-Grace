/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let newJournal = (templateChoice, currentUserId, callback) => {

        dbPoolInstance.query(`
      SELECT * 
      FROM templates 
      WHERE templates.category = 'Basic'
      `, (error, basicResult) => {

            let journals = {};

            journals.templates = [];

            for (let i = 0; i < basicResult.rows.length; i++) {
                journals.templates.push(basicResult.rows[i]);
            }

            dbPoolInstance.query(`
        SELECT templates.* 
        FROM templates 
        INNER JOIN userCustomise
        ON templates.id = userCustomise.template_id
        WHERE userCustomise.user_id= ${currentUserId}
        `, (error, customiseResult) => {
                for (let i = 0; i < customiseResult.rows.length; i++) {
                    journals.templates.push(customiseResult.rows[i]);
                }
            })

            dbPoolInstance.query(`SELECT * FROM templates WHERE id = ${templateChoice}`, (error, queryResult) => {

                journals.inputs = [];

                for (let i = 0; i < queryResult.rows.length; i++) {
                    journals.inputs.push(queryResult.rows[i]);
                }

                callback(journals);

            })
        });
    }

    let randomJournal = (callback) => {

        dbPoolInstance.query(`SELECT * FROM templates WHERE templates.category = 'Random'`, (error, queryResult) => {

            let choices = [];
            for (let i = 0; i < queryResult.rows.length; i++) {
                choices.push(queryResult.rows[i]);
            }
            let templateChoice = Math.floor(Math.random() * choices.length);

            let journals = {};
            journals.inputs = [];
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
      RETURNING *, to_char(created_at at time zone 'Singapore', 'HH12:MI:SS AM')`, values, (error, queryResult) => {

            let latestEntryId = queryResult.rows[0].id;

            dbPoolInstance.query(`
          SELECT 
            entries.*, 
            to_char(entries.created_at at time zone 'Singapore', 'HH12:MI:SS AM'), 
            templates.name, 
            templates.starter, 
            templates.addon, 
            templates.id AS templateID,
            templates.category
          FROM entries 
          INNER JOIN templates 
          ON entries.template_id = templates.id 
          WHERE entries.id = ${latestEntryId}`, (error, result) => {

                let entries = {};
                entries.list = [];
                for (let i = 0; i < result.rows.length; i++) {
                    entries.list.push(result.rows[i]);
                }
                console.log(entries);
                callback(entries);

            });
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
      RETURNING *, to_char(created_at at time zone 'Singapore', 'HH12:MI:SS AM')`, values, (error, queryResult) => {

            let latestEntryId = queryResult.rows[0].id;

            dbPoolInstance.query(`
          SELECT 
            entries.*, 
            to_char(entries.created_at at time zone 'Singapore', 'HH12:MI:SS AM'), 
            templates.name, 
            templates.starter, 
            templates.addon, 
            templates.id AS templateID,
            templates.category
          FROM entries 
          INNER JOIN templates 
          ON entries.template_id = templates.id 
          WHERE entries.id = ${latestEntryId}`, (error, result) => {

                let entries = {};
                entries.list = [];
                for (let i = 0; i < result.rows.length; i++) {
                    entries.list.push(result.rows[i]);
                }
                callback(entries);

            });
        });
    }

    let history = (currentUserId, callback) => {

        dbPoolInstance.query(`
      SELECT 
        entries.*, 
        to_char(entries.created_at at time zone 'Singapore', 'HH12:MI:SS AM'), 
        templates.name, 
        templates.starter, 
        templates.addon, 
        templates.id AS templateID,
        templates.category
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.user_id = ${currentUserId}
      ORDER BY entries.created_on DESC`, (error, result) => {

            let entries = {};
            entries.list = [];
            for (let i = 0; i < result.rows.length; i++) {
                entries.list.push(result.rows[i]);
            }
            callback(entries);

        });
    }

    let deleteEntry = (entryChoice, callback) => {

        dbPoolInstance.query(`
      SELECT entries.*, to_char(entries.created_at at time zone 'Singapore', 'HH12:MI:SS AM'), templates.name, templates.starter, templates.addon, templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.id = ${entryChoice}`, (error, queryResult) => {
            dbPoolInstance.query(`
          DELETE FROM entries
          WHERE entries.id = ${entryChoice}`, (error, result) => {

                let results = queryResult.rows[0];
                callback(results);

            });
        });
    }

    let editEntry = (entryChoice, callback) => {

        dbPoolInstance.query(`
      SELECT entries.*, to_char(entries.created_at at time zone 'Singapore', 'HH12:MI:SS AM'), templates.name, templates.starter, templates.addon, templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.id = ${entryChoice}`, (error, queryResult) => {

            let results = queryResult.rows[0];
            callback(results);
        });
    }

    let editedEntry = (entryChoice, object, reason, callback) => {

        const values = [
            entryChoice,
            object,
            reason
        ]

        dbPoolInstance.query(`
      UPDATE entries
      SET object = $2, reason = $3
      WHERE ID = $1
      `, values, (error, queryResult) => {

            dbPoolInstance.query(`
          SELECT entries.*, to_char(entries.created_at at time zone 'Singapore', 'HH12:MI:SS AM'), templates.* 
          FROM entries 
          INNER JOIN templates 
          ON entries.template_id = templates.id 
          WHERE entries.id = $1`, [entryChoice], (error, result) => {

                let results = result.rows[0];
                callback(results);

            });
        });

    }

    let sortby = (currentUserId, choice, callback) => {

        let sort = choice;

        switch (sort) {
            case "Recent":
                text = `ORDER BY entries.created_on DESC`;
                break;
            case "Older":
                text = `ORDER BY entries.created_on ASC`;
                break;
            case "Basic":
                text = `
          AND templates.category = 'Basic'
          ORDER BY entries.created_on DESC`;
                break;
            case "Random":
                text = `
          AND templates.category = 'Random'
          ORDER BY entries.created_on DESC`;
                break;
            case "Customised":
                text = `
          AND templates.category = 'Customised'
          ORDER BY entries.created_on DESC`;
                break;
            case "Photo":
                text = `
          AND templates.category = 'Photo'
          ORDER BY entries.created_on DESC`;
                break;
            default:
                text = "No value found";
        }

        dbPoolInstance.query(`
      SELECT 
        entries.*, 
        to_char(entries.created_at at time zone 'Singapore', 'HH12:MI:SS AM'), 
        templates.name, 
        templates.starter, 
        templates.addon, 
        templates.id AS templateID,
        templates.category
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.user_id = ${currentUserId}
      ${text}`, (error, result) => {

            let entries = {};
            entries.list = [];
            for (let i = 0; i < result.rows.length; i++) {
                entries.list.push(result.rows[i]);
            }
            callback(entries);

        });
    }

    let search = (currentUserId, searchTerm, callback) => {

        dbPoolInstance.query(`
      SELECT entries.*, 
        to_char(entries.created_at at time zone 'Singapore', 'HH12:MI:SS AM'), 
        templates.name, 
        templates.starter, 
        templates.addon, 
        templates.id AS templateID 
      FROM entries 
      INNER JOIN templates 
      ON entries.template_id = templates.id 
      WHERE entries.user_id = ${currentUserId}
      AND ((entries.object ILIKE '%${searchTerm}%')
      OR (entries.reason ILIKE '%${searchTerm}%'))`, (error, result) => {
            let entries = {};
            entries.list = [];
            for (let i = 0; i < result.rows.length; i++) {
                entries.list.push(result.rows[i]);
            }
            callback(entries);
        });
    }

    let customise = (currentUserId, callback) => {
        dbPoolInstance.query(`
      SELECT * 
      FROM templates 
      INNER JOIN userCustomise 
      ON templates.id = userCustomise.template_id 
      WHERE userCustomise.user_id = ${currentUserId}
      ORDER BY templates.id DESC`, (error, result) => {

            let templates = {};
            templates.list = [];
            for (let i = 0; i < result.rows.length; i++) {
                templates.list.push(result.rows[i]);
            }
            callback(templates);
        });
    }

    let createTemplate = (name, starter, addon, currentUserId, callback) => {

        const values = [
            name,
            starter,
            addon
        ]

        dbPoolInstance.query(`
      INSERT INTO templates(name, starter, addon, category) 
      VALUES ($1, $2, $3, 'Customised') 
      RETURNING *`, values, (error, templateResult) => {

            let latestTemplateId = templateResult.rows[0].id;

            dbPoolInstance.query(`
          INSERT INTO userCustomise(user_id, template_id) 
          VALUES (${currentUserId}, ${latestTemplateId}) 
          RETURNING *`, (error, queryResult) => {

                dbPoolInstance.query(`
            SELECT * 
            FROM templates 
            INNER JOIN userCustomise 
            ON templates.id = userCustomise.template_id 
            WHERE userCustomise.user_id = ${currentUserId}
            ORDER BY templates.id DESC`, (error, result) => {

                    let templates = {};
                    templates.list = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        templates.list.push(result.rows[i]);
                    }
                    callback(templates);
                });
            });
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
        customise,
        createTemplate
    };
}