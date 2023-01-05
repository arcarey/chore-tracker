const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// returns list of all chores for a user
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('user id', req.body.id);
    const queryText = `
    SELECT * FROM user_chore
    WHERE "user_id" = ($1);    
    `;
    const queryValues = [req.body.id]
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
    console.log(req.body);
    const queryText = `
    INSERT INTO user_chore ("user_id", "chore_id", "recurrence")
    VALUES ($1, $2, $3);
    `;
    const queryValues = [req.body.userId, req.body.choreId, req.body.recurrence]
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
router.put('/delete/', rejectUnauthenticated, (req, res) => {
    console.log('del req body', req.body);
    const queryText = `
    DELETE FROM user_chore
    WHERE "user_id" = ($1) AND "chore_id" = ($2);  
    `;
    const queryValue = [req.body.userId, req.body.choreId]
    pool
      .query(queryText, queryValue)
      .then(result => res.sendStatus(200))
      .catch(err => {
        console.log('Error Deleting task', err);
        res.sendStatus(500);      
      })
  })
  
  






module.exports = router;
