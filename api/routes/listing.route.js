const express = require("express");
const {
  handleListing,
  handleDelList,
  handleUpdateListing,
  getListing,
  getListings,
} = require("../controllers/listcontrol");
const verifyCookie = require("../utils/verifyCookie");

const router = express.Router();

router.post("/create", verifyCookie, handleListing);
router.post("/update/:id", verifyCookie, handleUpdateListing);
router.get("/getListing/:id", getListing);
router.delete("/delete/:id", verifyCookie, handleDelList);
router.get("/get", getListings);
module.exports = router;
