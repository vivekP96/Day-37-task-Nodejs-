require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Connection = require("./db");
const mentorRoute = require("./routes/createMentor");
const studentRoute = require("./routes/createStudent");
//middlewares
app.use(express.json());
app.use(cors());
//db connection
Connection();

app.use("/api", mentorRoute);
app.use("/api", studentRoute);
//server connection
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
