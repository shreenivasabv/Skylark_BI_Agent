const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  designation: String,
  specialization: String,
  experience: Number,
  features: [String],  // Skills
  projects: [{
    title: String,
    technologies: [String]
  }],
  workExperience: [{
    company: String,
    designation: String,
    duration: String
  }],
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Team", teamSchema);
