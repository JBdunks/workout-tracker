const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  exercises: [
    {
      type: {
        type: String,
        allowNull: false
      },
      name: {
        type: String,
        allowNull: false
      },
      duration: {
        type: Number,
        allowNull: false
      },
      distance: {
        type: Number
      },

      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Exercise = mongoose.model("workout", WorkoutSchema);

module.exports = Exercise;
