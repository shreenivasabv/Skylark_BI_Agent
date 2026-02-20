const mongoose = require("mongoose");

const aboutCompanySchema = new mongoose.Schema({
  heading: { type: String, default: "About InfraScale" },
  tagline: { type: String, default: "" },
  description: { type: String, default: "" },
  mission: { type: String, default: "" },
  vision: { type: String, default: "" },
  values: [{ type: String }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AboutCompany", aboutCompanySchema);