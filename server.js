const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://user77:qwerty77@ds135810.mlab.com:35810/heroku_fldkh30b",
  {
    useNewUrlParser: true
  }
);

//routes!!  routes!!  routes!!
//html routes//
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});

//api routes
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  });
});

//put
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $set: { exercises: req.body } },
    (err, data) => {
      if (err) {
        throw err;
      } else {
        res.send(data);
      }
    }
  );
});
//post
app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  });
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}!`);
// });
