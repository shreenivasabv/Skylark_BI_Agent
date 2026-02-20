const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const MemberProfile = require("../models/MemberProfile");
const Team = require("../models/Team");
const auth = require("../middleware/auth");

// 🔹 Get Current User Profile (JWT Protected)
router.get("/me", auth, async (req, res) => {
  try {
    const member = await Member.findById(req.user.id);
    if (!member) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(member);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// 🔹 Update Current User Profile (JWT Protected)
// This updates the Member auth record AND syncs to Team model for public display
router.put("/me", auth, async (req, res) => {
  try {
    const { skills, projects, workExperience, designation, ...otherFields } = req.body;
    
    // Update member auth record
    const updated = await Member.findByIdAndUpdate(
      req.user.id,
      { 
        skills: skills || [],
        projects: projects || [],
        workExperience: workExperience || [],
        designation: designation || "",
        ...otherFields
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Also sync to Team model if member is linked to a team member
    if (updated.teamMemberId) {
      await Team.findByIdAndUpdate(
        updated.teamMemberId,
        { 
          features: skills || [],
          workExperience: workExperience || [],
          projects: projects || [],
          designation: designation || updated.designation
        }
      );
      console.log("✅ Skills synced to Team record:", updated.teamMemberId);
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// 🔹 Get Single Member (Public)
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Error fetching member" });
  }
});

module.exports = router;