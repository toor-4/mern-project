const mongoose = require('mongoose');
const Workout = require('../models/workoutModel.js');

// GET: get all workouts
const getWorkouts = async (req, res) => {
  // console.log(req.method, req.url, req.headers);
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.json({ success: true, items: workouts.length, data: workouts });
  } catch (error) {
    console.error(`Error in fetching workouts: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// GET: get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// POST: create a new workout
const createWorkout = async (req, res) => {
  const workout = req.body; // user will send this data
  console.log('Workout', workout);

  if (!workout.title || !workout.load || !workout.reps) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' });
  }

  const newWorkout = new Workout(workout); // create new workout instance which will be saved in DB
  // new Workout({title: '...', load: '...', reps: '...'})
  try {
    await newWorkout.save();
    res.status(201).json({ success: true, data: newWorkout });
  } catch (error) {
    console.error('Error in Create workout:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// PUT: update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  const workout = req.body;
  // console.dir(mongoose);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Workout Id' });
  }

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, workout, {
      new: true,
    });
    // console.log('updatedWorkout: ', updatedWorkout);
    res.status(200).json({ success: true, data: updatedWorkout });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE: delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Workout Id' });
  }
  try {
    await Workout.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Workout deleted' });
  } catch (error) {
    console.log('error in deleting workout:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
