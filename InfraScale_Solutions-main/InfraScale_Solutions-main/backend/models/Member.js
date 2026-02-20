const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({

  // 🔹 Link to Team Member (created by admin)
  teamMemberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  // 🔹 Email (from Team member)
  email: {
    type: String,
    required: true,
    unique: true
  },

  // 🔹 Member Editable Fields (synced to Team for public display)
  skills: [String],
  
  projects: [{
    title: String,
    technologies: [String]
  }],
  
  workExperience: [{
    company: String,
    designation: String,
    duration: String
  }],

  // 🔹 Authentication Fields
  password: {
    type: String
  },
  isRegistered: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);