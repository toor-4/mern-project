const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const workoutRoute = require('./routes/workoutRoutes');
const connectDB = require('./config/db');

const app = express();

const port = process.env.PORT || 3600;

// middlewares
app.use(morgan('tiny'));
app.use(express.json()); // allows to parse json in the body of a request
app.use(express.urlencoded({ extended: false })); // allows to parse url encoded data

// setting up a route handler
app.use('/api/workouts', workoutRoute);

app.listen(port, () => {
  connectDB();
  console.log(`server is listening on http://localhost:${port}`);
});
