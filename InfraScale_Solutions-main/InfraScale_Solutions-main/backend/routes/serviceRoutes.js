const router = require("express").Router();
const Service = require("../models/Service");
const multer = require("multer");
const path = require("path");

// 1. Setup Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 2. Updated POST Route with Category
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Extract 'category' from req.body alongside title and description
    const { title, description, category } = req.body;

    const newService = new Service({
      title: title,
      description: description,
      category: category, // Save the category to the database
      image: req.file.path.replace(/\\/g, "/") 
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Validation or Server Error" });
  }
});

// 3. Updated GET Route to support filtering
// Example usage: GET /api/services?category=Virtualization
router.get("/", async (req, res) => {
  try {
    const { category } = req.query; // Check if a category is passed in the URL
    
    // Create a filter: if category exists, find by it; else, find everything
    const filter = category ? { category: category } : {};
    
    const services = await Service.find(filter);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;