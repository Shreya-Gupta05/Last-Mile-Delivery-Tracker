const RateCard = require("../models/rateCard");

const createRate = async (req, res) => {
    try {
        const rate = await RateCard.create(req.body);
        res.json(rate);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRates = async (req, res) => {
    const rates = await RateCard.find();
    res.json(rates);
};

module.exports = {
    createRate,
    getRates
};