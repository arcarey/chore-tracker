const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// GET by User ID
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
    SELECT * FROM "user"
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

  // this registers a new family and sets the user as the family owner (UNUSED)
// router.post('/register', rejectUnauthenticated, (req, res) => {
//     const queryText = `
//     INSERT INTO family ("name", "id")
//     VALUES ($1, $2);
//     `;
//     const queryValues = [req.body.familyName, req.user.id]
//     pool
//         .query(queryText, queryValues)
//         .then(result => res.sendStatus(201))
//         .catch(err => {
//         console.log('Error adding family name');
//         res.sendStatus(500);      
//         })
// });




module.exports = router;
