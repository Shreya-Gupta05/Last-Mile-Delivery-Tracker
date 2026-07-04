const Order = require("../models/order");
const User = require("../models/user");
const Tracking = require("../models/tracking");
const RateCard = require("../models/rateCard");

// ================= CREATE ORDER =================

const createOrder = async (req, res) => {
    try {

        const {
            customer,
            pickupAddress,
            dropAddress,
            pickupZone,
            dropZone,
            length,
            breadth,
            height,
            actualWeight,
            orderType,
            paymentType
        } = req.body;

        // Calculate weights
        const volumetricWeight = (length * breadth * height) / 5000;
        const billableWeight = Math.max(actualWeight, volumetricWeight);

        // Get Rate Card
        // const rate = await RateCard.findOne({
        //     pickupZone,
        //     dropZone,
        //     orderType
        // });

        console.log("Request values:", {
            pickupZone,
            dropZone,
            orderType
          });
          
          const rate = await RateCard.findOne({
            pickupZone,
            dropZone,
            orderType
          });
          
          console.log("Rate found:", rate);
          
        if (!rate) {
            return res.status(400).json({
                message: "Rate card not found"
            });
        }

        // Calculate Charge
        let totalCharge =
            rate.baseCharge +
            (billableWeight * rate.pricePerKg);

        if (paymentType === "COD") {
            totalCharge += rate.codCharge;
        }
        
        // Auto Assign Agent
        const agent = await User.findOne({
            role: "agent",
            zone: pickupZone,
            available: true
        });

        // Create Order
        const order = await Order.create({

            customer,

            pickupAddress,
            dropAddress,

            pickupZone,
            dropZone,

            length,
            breadth,
            height,

            actualWeight,
            volumetricWeight,
            billableWeight,

            orderType,
            paymentType,

            charge: totalCharge,

            assignedAgent: agent ? agent._id : null

        });

        // First Tracking Entry
        const tracking = await Tracking.create({

            order: order._id,
            status: "Pending",
            actor: "Customer"

        });

        order.trackingHistory.push(tracking._id);

        await order.save();

        res.status(201).json({

            message: "Order Created Successfully",
            assignedAgent: agent,
            order

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }
};

// ================= GET ORDERS =================

const getOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("customer", "name email")
            .populate("assignedAgent", "name");

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ================= UPDATE STATUS =================

const updateStatus = async (req, res) => {

    try {

        const {
            status,
            failedReason,
            rescheduleDate
        } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.status === "Delivered") {
            return res.status(400).json({
                message: "Order already delivered"
            });
        }

        order.status = status;

        if (status === "Failed") {

            order.failedReason = failedReason || "";

            order.rescheduleDate = rescheduleDate || null;

        }

        // Tracking History
        const tracking = await Tracking.create({

            order: order._id,

            status,

            actor: "Agent"

        });

        order.trackingHistory.push(tracking._id);

        await order.save();

        const updatedOrder = await Order.findById(order._id)
            .populate("customer", "name email")
            .populate("assignedAgent", "name");

        res.json({

            message: "Status Updated Successfully",

            order: updatedOrder

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

// ================= EXPORT =================

module.exports = {

    createOrder,

    getOrders,

    updateStatus

};