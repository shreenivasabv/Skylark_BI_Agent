const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 🔹 Get All Team Members (Public)
router.get("/", async (req, res) => {
  try {
    console.log("👥 Fetching all team members");
    const members = await Team.find();
    console.log(`✅ Found ${members.length} team members`);
    res.json(members);
  } catch (err) {
    console.error("❌ Error fetching team:", err.message);
    res.status(500).json({ message: "Error fetching team" });
  }
});

// 🔹 Get Single Team Member (Public)
router.get("/:id", async (req, res) => {
  try {
    console.log("📋 Fetching team member:", req.params.id);
    const member = await Team.findById(req.params.id);
    if (!member) {
      console.error("❌ Member not found:", req.params.id);
      return res.status(404).json({ message: "Member not found" });
    }
    console.log("✅ Member found:", member.name);
    res.json(member);
  } catch (err) {
    console.error("❌ Error fetching member:", err.message);
    res.status(500).json({ message: "Error fetching member", error: err.message });
  }
});

// 🔹 Admin Create Team Member
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, email, designation, specialization, experience, features } = req.body;

    // Validate required fields
    if (!name || !email || !designation) {
      return res.status(400).json({ message: "Name, email, and designation are required" });
    }

    console.log("👤 Creating team member:", name, "| Image:", req.file?.filename || "none");

    const existing = await Team.findOne({ email });
    if (existing) {
      console.error("❌ Member already exists:", email);
      return res.status(400).json({ message: "Member already exists" });
    }

    const member = await Team.create({
      name,
      email,
      designation,
      specialization,
      experience: Number(experience),
      features: Array.isArray(features) ? features : JSON.parse(features || "[]"),
      image: req.file ? req.file.filename : ""
    });

    console.log("✅ Team member created:", member._id, member.name);
    res.status(201).json(member);
  } catch (err) {
    console.error("❌ Error creating member:", err.message);
    res.status(500).json({ message: "Error creating member", error: err.message });
  }
});

// 🔹 Admin Update Team Member
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, email, designation, specialization, experience, features } = req.body;

    console.log("✏️ Updating team member:", req.params.id, "| New image:", req.file?.filename || "unchanged");

    const updateData = { name, email, designation, specialization, experience: Number(experience) };
    if (features) {
      updateData.features = Array.isArray(features) ? features : JSON.parse(features || "[]");
    }
    if (req.file) {
      updateData.image = req.file.filename;
      console.log("📸 Image updated to:", req.file.filename);
    }

    const member = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!member) {
      console.error("❌ Member not found for update:", req.params.id);
      return res.status(404).json({ message: "Member not found" });
    }
    
    console.log("✅ Team member updated:", member.name);
    res.json(member);
  } catch (err) {
    console.error("❌ Error updating member:", err.message);
    res.status(500).json({ message: "Error updating member", error: err.message });
  }
});

// 🔹 Admin Delete Team Member
router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("🗑️ Deleting team member:", req.params.id);
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      console.error("❌ Member not found for deletion:", req.params.id);
      return res.status(404).json({ message: "Member not found" });
    }
    console.log("✅ Team member deleted:", member.name);
    res.json({ message: "Member deleted", deletedMember: member });
  } catch (err) {
    console.error("❌ Error deleting member:", err.message);
    res.status(500).json({ message: "Error deleting member", error: err.message });
  }
});

module.exports = router;