const express = require("express");
const {
  signin,
  signup,
  google,
  signOut,
} = require("../controllers/authcontrol");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);

module.exports = router;
