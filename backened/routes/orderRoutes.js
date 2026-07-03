const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,updateStatus} = require("../controllers/orderController");

router.post("/create", createOrder);

router.get("/", getOrders);
router.put("/status/:id", updateStatus);

module.exports = router;