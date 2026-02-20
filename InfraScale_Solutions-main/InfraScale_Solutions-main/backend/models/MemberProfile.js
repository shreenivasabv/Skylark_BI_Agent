const mongoose = require("mongoose");

const memberProfileSchema = new mongoose.Schema({

  // Reference to Member Auth
  authId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },

  // Member Editable Fields
  name: { type: String, default: "" },
  image: { type: String, default: "" },
  designation: { type: String, default: "" },
  department: { type: String, default: "" },
  specialization: { type: String, default: "" },
  experienceYears: { type: Number, default: 0 },
  skills: [String],
  projects: [{
    title: String,
    technologies: [String]
  }],
  workExperience: [{
    company: String,
    designation: String,
    duration: String
  }]

}, { timestamps: true });

module.exports = mongoose.model("MemberProfile", memberProfileSchema);