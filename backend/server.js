const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const connectDB = require('./config/db');
const app = express();

const Workout = require('./models/workoutModel');

const port = process.env.PORT || 3600;

// middleware
app.use(morgan('tiny'));

app.get('/', async function (req, res) {
  const workouts = await Workout.find();
  console.log(workouts);
  // console.log(req.method, req.url);
  res.json({ message: 'Hello from Node.js' });
});

app.listen(port, () => {
  connectDB();
  console.log(`server is listening on http://localhost:${port}`);
});
