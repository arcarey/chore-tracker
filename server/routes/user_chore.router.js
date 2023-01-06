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

// returns list of all chores for a logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('user id', req.user.id);
  const queryText = `
  SELECT user_chore.id AS id, user_chore.is_active, user_chore.chore_id, chore.description FROM user_chore
  JOIN chore ON chore.id = user_chore.chore_id
  WHERE "user_id" = ($1)
  ORDER BY id;
  `;
  const queryValues = [req.user.id]
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

// mark a chore as incomplete
router.put('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    UPDATE user_chore
    SET "is_active" = 'true'
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

// mark a chore's completeness 
router.put('/toggle', rejectUnauthenticated, (req, res) => {
  const queryText = `
  UPDATE user_chore
  SET "is_active" = NOT "is_active"
  WHERE "id" = ($1);
  `;
  const queryValue = [req.body.userChoreId]
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
