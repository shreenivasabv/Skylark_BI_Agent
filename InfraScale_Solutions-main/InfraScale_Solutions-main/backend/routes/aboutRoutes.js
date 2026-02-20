const router = require("express").Router();
const { getAbout, updateAbout } = require("../controllers/AboutCompanyController");
const auth = require("../middleware/auth");

// Public
router.get("/", getAbout);

// Admin Protected
router.put("/", updateAbout);

module.exports = router;