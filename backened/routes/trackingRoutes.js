const express = require("express");

const router = express.Router();
const { getTracking } = require("../controllers/trackingController");
router.get("/:orderId", getTracking);
module.exports = router;