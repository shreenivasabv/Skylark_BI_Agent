const AboutCompany = require("../models/AboutCompany");

// GET About Content
exports.getAbout = async (req, res) => {
  try {
    let about = await AboutCompany.findOne();

    if (!about) {
      about = await AboutCompany.create({});
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// UPDATE About (Admin Only)
exports.updateAbout = async (req, res) => {
  try {
    let about = await AboutCompany.findOne();

    if (!about) {
      about = await AboutCompany.create(req.body);
    } else {
      about = await AboutCompany.findOneAndUpdate(
        {},
        { $set: req.body },
        { new: true }
      );
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};