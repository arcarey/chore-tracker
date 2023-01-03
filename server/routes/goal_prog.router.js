const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



// add new goal for a user
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  INSERT INTO goal_prog ("user_id", "cumulative_val", "description" )
  VALUES ($1, $2, $3);
  `;
  const queryValues = [req.body.user_id, req.body.cumulative_val, req.body.description]
  pool
    .query(queryText, queryValues)
    .then(result => res.sendStatus(201))
    .catch(err => {
      console.log('Error adding goal');
      res.sendStatus(500);      
    })
});



// GET goal progress
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM goal_prog
  WHERE "user_id" = ($1);   
  `;
  const queryValues = [req.body.user_id]
  pool
  .query(queryText, queryValues)
  .then(result => res.send(result.rows))
  .catch(err => {
      console.log('Error making get request for goal progress', err);
      res.sendStatus(500);
  })
});



// increment goal progress with each completed task
router.put('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  UPDATE goal_prog
  SET progress = progress + ($1)
  WHERE "user_id" = ($2);
  `;
  const queryValue = [req.body.progress, req.user.id]
  console.log(queryValue);
  pool
      .query(queryText, queryValue)
      .then(result => res.sendStatus(200))
      .catch(err => {
          console.log('Error updating goal progress', err);
          res.sendStatus(500)
      })
})



// set new goal
router.put('/edit', rejectUnauthenticated, (req, res) => {
  const queryText = `
  UPDATE goal_prog
  SET progress = 0, description = ($1), cumulative_val = ($2)
  WHERE "user_id" = ($3);
  `;
  const queryValue = [req.body.description, req.body.cumulative_val, req.user.id]
  console.log(queryValue);
  pool
      .query(queryText, queryValue)
      .then(result => res.sendStatus(200))
      .catch(err => {
          console.log('Error updating goal progress', err);
          res.sendStatus(500)
      })
});

// Delete goal
router.delete('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  DELETE FROM goal_prog
  WHERE "user_id" = ($1);  
  `;
  const queryValue = [req.body.user_id]
  pool
    .query(queryText, queryValue)
    .then(result => res.sendStatus(200))
    .catch(err => {
      console.log('Error Deleting goal', err);
      res.sendStatus(500);      
    })
})

module.exports = router;
