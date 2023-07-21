const mongoose = require("mongoose");
const studensSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batch: { type: String, required: true },
  previousMentor: { type: Array, default: null },
  currentMentor: {
    type: String,
    default: null,
  },
});

const students = mongoose.model("Student", studensSchema);
module.exports = students;
