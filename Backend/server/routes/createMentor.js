const router = require("express").Router();
const Mentor = require("../models/mentor");
const Students = require("../models/students");
//creating new mentor
router.post("/creatementor", async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const addMentor = new Mentor({
      name: name,
      email: email,
      course: course,
      studentsList: req.body.studentsList ? req.body.studentsList : null,
    });

    const newMentor = await addMentor.save();
    res.send(newMentor);
  } catch (error) {
    res.send(error);
  }
});
//get all mentors
router.get("/", async (req, res) => {
  try {
    const getMentor = await Mentor.find();
    res.send(getMentor);
  } catch (error) {
    res.send(error);
  }
});
//get mentors based on id and assign mulitiple students
router.get("/getmentor-id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const studentArr = req.body.studentsList;
    let validatedStudents = [];

    const students = await Students.find();
    for (let i = 0; i <= studentArr.length; i++) {
      students.forEach((stud) => {
        if (stud.name === studentArr[i]) {
          validatedStudents.push(studentArr[i]);
        }
      });
    }

    const mentor = await Mentor.findById({ _id: id });
    await mentor.updateOne({ $set: { studentsList: validatedStudents } });

    for (let i = 0; i <= validatedStudents.length; i++) {
      await Students.findOneAndUpdate(
        { name: validatedStudents[i] },
        { $set: { currentMentor: mentor.name } }
      );
    }

    res.status(200).send(mentor);
  } catch (error) {
    res.status(500).send(error);
  }
});
// to get all student details for a particular mentor
router.get("/studentslist/:mentorid", async (req, res) => {
  try {
    const id = req.params.mentorid;
    const mentor = await Mentor.findById({ _id: id });
    res.send(`${mentor.name} students list :${mentor.studentsList}`);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
