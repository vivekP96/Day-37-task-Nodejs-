const router = require("express").Router();
const Student = require("../models/students");
const Mentor = require("../models/mentor");
//create a student
router.post("/createstudent", async (req, res) => {
  try {
    const addStudent = new Student({
      name: req.body.name,
      batch: req.body.batch,
      currentMentor: req.body.currentMentor ? req.body.currentMentor : null,
      previousMentor: req.body.previousMentor ? req.body.previousMentor : null,
    });
    const newStudent = await addStudent.save();
    res.status(200).send(newStudent);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get student those who dont have mentor
router.get("/nomentorstudents", async (req, res) => {
  const students = await Student.find({ currentMentor: null });
  res.send(students);
});

//Select one student and assign one mentor
router.get("/asigningmentor/:studentid/:mentorid", async (req, res) => {
  try {
    const studentid = req.params.studentid;
    const mentorid = req.params.mentorid;

    const studentdetail = await Student.find({ _id: studentid });
    const mentordetail = await Mentor.find({ _id: mentorid });
    let preMentor = [
      ...studentdetail[0].previousMentor,
      studentdetail[0].currentMentor,
    ];
    let currMentor = mentordetail[0].name;
    let studList = [...mentordetail[0].studentsList, studentdetail[0].name];

    await Student.findByIdAndUpdate(
      { _id: studentid },
      { $set: { previousMentor: preMentor, currentMentor: currMentor } }
    );
    await Mentor.findByIdAndUpdate(
      { _id: mentorid },
      { $set: { studentsList: studList } }
    );
    console.log(studList);
    res.send(
      `Student name: ${studentdetail[0].name} is assigned to a mentor ${mentordetail[0].name} Successfully!!!`
    );
  } catch (err) {
    res.send(err);
  }
});

// to get previous mentor details for a particular student
router.get("/previousmentor/:studentid", async (req, res) => {
  try {
    const id = req.params.studentid;
    const student = await Student.find({ _id: id });
    let prevmentor = student[0].previousMentor;
    let previousmentor = prevmentor[prevmentor.length - 1];
    res.send(`Previous mentor for ${student[0].name} was ${previousmentor}`);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
