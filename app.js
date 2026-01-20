require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");


const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/students", require("./routes/studentRoutes"));

app.listen(4000, () => {
  console.log("Server running on port http://localhost:4000");
});
  
