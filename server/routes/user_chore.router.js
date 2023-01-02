const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// returns list of all chores for signed in user

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT * FROM user_chore
    WHERE "user_id" = ($1);    
    `;
    const queryValues = [req.user.family_id]
    pool
    .query(queryText, queryValues)
    .then(result => res.send(result.rows))
    .catch(err => {
        console.log('Error making get request for chores', err);
        res.sendStatus(500);
    })
});

  
  
// add a chore instance for a user
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    INSERT INTO user_chore ("user_id", "chore_id", "recurrence")
    VALUES ($1, $2, $3);
    `;
    const queryValues = [req.body.user_id, req.body.chore_id, req.body.recurrence]
    pool
      .query(queryText, queryValues)
      .then(result => res.sendStatus(201))
      .catch(err => {
        console.log('Error adding chore');
        res.sendStatus(500);      
      })
  });

// mark a chore as complete
router.put('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    UPDATE user_chore
    SET "is_active" = 'false'
    WHERE "id" = ($1);
    `;
    const queryValue = [req.body.chore_id]
    pool
        .query(queryText, queryValue)
        .then(result => res.sendStatus(200))
        .catch(err => {
            console.log('Error updating chore', err);
            res.sendStatus(500)
        })
})

// Delete chore instance
router.delete('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    DELETE FROM user_chore
    WHERE "id" = ($1);  
    `;
    const queryValue = [req.body.id]
    pool
      .query(queryText, queryValue)
      .then(result => res.sendStatus(200))
      .catch(err => {
        console.log('Error Deleting task', err);
        res.sendStatus(500);      
      })
  })
  
  






module.exports = router;
