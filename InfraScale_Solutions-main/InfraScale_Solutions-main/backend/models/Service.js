const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    // These MUST match the values in your Admin dropdown exactly
    enum: ['Virtualization', 'StorageBackup', 'DevOps','Office365',] 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Service", serviceSchema);