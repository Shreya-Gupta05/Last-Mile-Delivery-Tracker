const Tracking = require("../models/tracking");

const getTracking = async (req, res) => {
    try {
        const { orderId } = req.params;

        const tracking = await Tracking.find({
            order: orderId
        }).sort({ createdAt: 1 });

        res.json(tracking);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getTracking
};