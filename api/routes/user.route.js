const express = require("express");

const verifyCookie = require("../utils/verifyCookie");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUserListing,
  getUser,
} = require("../controllers/usercontrol");
//const deleteUser = require("../controllers/usercontrol");

router.post("/update/:id", verifyCookie, updateUser);
router.delete("/delete/:id", verifyCookie, deleteUser);
router.get("/listing/:id", verifyCookie, getUserListing);
router.get("/:id", verifyCookie, getUser);
module.exports = router;
