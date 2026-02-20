const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const bcrypt = require("bcryptjs");

// 🔹 Admin Create Member
router.post("/", async (req, res) => {
  try {
    const { email, name, designation, department, specialization, experienceYears, image } = req.body;

    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Member already exists" });
    }

    const member = await Member.create({
      email,
      name,
      designation,
      department,
      specialization,
      experienceYears,
      image
    });

    res.status(201).json(member);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get All Members (For Admin)
router.get("/", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// 🔹 Delete Member
router.delete("/:id", async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ message: "Member deleted" });
});

module.exports = router;