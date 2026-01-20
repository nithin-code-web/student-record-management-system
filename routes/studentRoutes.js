const router = require("express").Router();
const Student = require("../models/student");

// CREATE
router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student Added" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});


// READ
router.get("/all", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send("Student Updated");
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Student Deleted");
});

module.exports = router;
