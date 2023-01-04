const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});


// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
// this is the register route for a parent
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const isParent = 'true';
  const familyId = req.body.family_id;
  const familyName = req.body.familyName


  const queryText = `INSERT INTO "user" (username, password, is_parent, family_id)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [username, password, isParent, familyId])
    .then(results => {
      console.log(results.rows);
      // res.sendStatus(201)
      // add the returning ID as the key ID for the family in the 
      pool.query(`INSERT INTO family ("name", "id") VALUES ($1, $2);`, [familyName, results.rows[0].id]
      ).then(result => {
        // this then updates the family ID to link the user to the family
        pool.query(`UPDATE "user" SET family_id = $1 WHERE id = $1`, [results.rows[0].id])
          .then(() => res.sendStatus(201))
          .catch(err => {
            console.log('user update family code failed', err);
            res.sendStatus(500)
          })
      }).catch(err => console.log('family registration failed', err))
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// handles the registration of a child
router.post('/register_child', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const isParent = 'false';
  const familyId = req.user.family_id;
  const nickname = req.body.nickname


  const queryText = `INSERT INTO "user" (username, password, is_parent, family_id, nickname)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [username, password, isParent, familyId, nickname])
    .then(results => {
      console.log(results.rows);
      res.sendStatus(201)
      })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});


// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
