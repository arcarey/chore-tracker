const { query } = require('express');
const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// returns all chores per family 
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM chore
  WHERE "family_id" = ($1);
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

// creates a new chore assigned to a whole family
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  INSERT INTO chore ( "description", "val", "family_id" )
  VALUES ($1, $2, $3);
  `
  const queryValues = [req.body.description, req.body.val, req.user.family_id]
  pool
    .query(queryText, queryValues)
    .then(result => res.sendStatus(201))
    .catch(err => {
      console.log('Error adding chore', err);
      res.sendStatus(500);      
    })

});


// deletes a chore based on it's chore ID
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
  DELETE FROM chore
  WHERE "id" = ($1);  
  `;
  const queryValue = [req.params.id]
  pool
    .query(queryText, queryValue)
    .then(result => res.sendStatus(200))
    .catch(err => {
      console.log('Error Deleting task', err);
      res.sendStatus(500);      
    })
})




module.exports = router;
