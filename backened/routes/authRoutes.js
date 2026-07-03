const express = require("express");
const { register, login, getAgents } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/agents", getAgents);

module.exports = router;
