const router = require("express").Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

// Validate contact data
const validateContact = (data) => {
  const { name, email, message } = data;
  if (!name || !email || !message) {
    return "Name, email, and message are required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format";
  }
  return null;
};

// POST: /api/contact (Public)
router.post("/", async (req, res) => {
  try {
    console.log("📝 Contact form received:", JSON.stringify(req.body, null, 2));
    
    const error = validateContact(req.body);
    if (error) {
      console.error("❌ Validation failed:", error);
      return res.status(400).json({ message: error });
    }

    const contact = new Contact(req.body);
    await contact.save();
    console.log("✅ Contact saved successfully");
    res.status(201).json({ message: "Thank you! Your message has been received." });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ message: "Failed to save message", error: err.message });
  }
});

// GET: /api/contact (Admin only)
router.get("/", auth, async (req, res) => {
  try {
    console.log("📥 Admin fetching contacts | User ID:", req.user?.id);
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`✅ Fetched ${contacts.length} contacts`);
    res.json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// DELETE: /api/contact/:id (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("🗑️ Admin deleting contact:", req.params.id);
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      console.error("❌ Contact not found:", req.params.id);
      return res.status(404).json({ message: "Message not found" });
    }
    console.log("✅ Contact deleted successfully");
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting contact:", err);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

module.exports = router;