const mongoose = require("mongoose");
const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  studentsList: { type: Array, default: null },
});

const Mentors = mongoose.model("Mentor", mentorSchema);
module.exports = Mentors;
