const express = require("express");
const router = express.Router();

const {
    createRate,
    getRates
} = require("../controllers/rateCardController");

router.post("/", createRate);
router.get("/", getRates);

module.exports = router;