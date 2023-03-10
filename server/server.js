const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const scheduler = require('./modules/cron-scheduler');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const choreRouter = require('./routes/chore.router');
const completedChoreRouter = require('./routes/completed_chore.router');
const goalProgRouter = require('./routes/goal_prog.router');
const familyRouter = require('./routes/family.router');
const userChoreRouter = require('./routes/user_chore.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cron scheduler middleware
scheduler();

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/chore', choreRouter);
app.use('/api/completed_chore', completedChoreRouter);
app.use('/api/goal_prog', goalProgRouter);
app.use('/api/family', familyRouter);
app.use('/api/user_chore', userChoreRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
