const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// returns all chores per family 
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT FROM chore
  WHERE "family_id" = ($1);
  `;
  const queryValues = [req.user.family_id]
  pool
    .query(queryText, queryValues)
    .then(results => res.send(results.rows))
    .catch(err => {
      console.log('Error making get request for chores', err);
      res.sendStatus(500);
    })
});


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
