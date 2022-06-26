const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

app.use(cors());
app.use(express.json());

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

mongoose.connect(uri);

connection.once('open', () => console.log('MongoDB database connection established successfully'));

app.listen(port, () => console.log(`Server is running on port: ${port}`));