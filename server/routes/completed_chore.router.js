const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// add new completed chore
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  INSERT INTO completed_chore ("user_chore_id", "time_completed")
	VALUES ($1, now());
  `;
  const queryValues = [req.body.userChoreId]
  pool
    .query(queryText, queryValues)
    .then(result => res.sendStatus(201))
    .catch(err => {
      console.log('Error adding completed chore');
      res.sendStatus(500);      
    })
});


// GET by User ID
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM completed_chore
  WHERE "user_id" = ($1);
  `;
  const queryValues = [req.body.user_id]
  pool
  .query(queryText, queryValues)
  .then(result => res.send(result.rows))
  .catch(err => {
      console.log('Error making get request for completed chores', err);
      res.sendStatus(500);
  })
});




// DELETE by user_chore_id
// DELETE by id
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
  DELETE FROM completed_chore
  WHERE id = (SELECT id FROM completed_chore 
    WHERE user_chore_id = ($1)
    ORDER BY time_completed DESC
    LIMIT '1');
  `;
  const queryValue = [req.params.id]
    console.log('queryValue',queryValue);
  pool
    .query(queryText, queryValue)
    .then(result => res.sendStatus(200))
    .catch(err => {
      console.log('Error Deleting completed chore', err);
      res.sendStatus(500);      
    })
})




module.exports = router;
