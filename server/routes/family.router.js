const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// GET by family ID
router.get('/family', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT * FROM family
    WHERE "id" = ($1);
    `;
    const queryValues = [req.user.family_id]
    pool
    .query(queryText, queryValues)
    .then(result => res.send(result.rows))
    .catch(err => {
        console.log('Error making get request for family', err);
        res.sendStatus(500);
    })
  });

// GET list of children in a family by ID excluding the parent
  router.get('/family_list', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT id, nickname FROM "user"
    WHERE "family_id" = ($1)
    AND "is_parent" = 'false';
    `;
    const queryValues = [req.user.family_id]
    pool
    .query(queryText, queryValues)
    .then(result => res.send(result.rows))
    .catch(err => {
        console.log('Error making get request for family', err);
        res.sendStatus(500);
    })
  });

  // delete a child user
  router.delete(`/family_list/:id`, rejectUnauthenticated,(req, res) => {
    const queryText = `
    DELETE from "user"
    WHERE id = $1
    ;
    `;
    const queryValue = [req.params.id];
    pool
      .query(queryText, queryValue)
      .then( () => res.sendStatus(200))
      .catch(err => {
        console.log('error in del', err);
        res.sendStatus(500);
      })
  })


  // return active child
  router.get(`/:id`, rejectUnauthenticated,(req, res) => {
    const queryText = `
    SELECT * from "user"
    WHERE id = $1;
    `;
    const queryValue = [req.params.id];
    pool
      .query(queryText, queryValue)
      .then( result => res.send(result.rows))
      .catch(err => {
        console.log('error in get current child', err);
        res.sendStatus(500);
      })
  })


module.exports = router;
