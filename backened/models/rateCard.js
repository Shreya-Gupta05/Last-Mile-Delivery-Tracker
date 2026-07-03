const mongoose = require("mongoose");

const rateCardSchema = new mongoose.Schema(
  {
    pickupZone: {
      type: String,
      required: true,
    },

    dropZone: {
      type: String,
      required: true,
    },

    orderType: {
      type: String,
      enum: ["B2B", "B2C"],
      required: true,
    },

    pricePerKg: {
      type: Number,
      required: true,
    },

    baseCharge: {
      type: Number,
      required: true,
  },

    codCharge: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RateCard", rateCardSchema);