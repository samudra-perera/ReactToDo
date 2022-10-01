const express = require("express");
const mongoose = require("mongoose");
const toDoRoutes = require('../backend/routes/toDo')
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', toDoRoutes)


mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => console.log('Server Started on Port 3001'))