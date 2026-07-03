const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "agent"],
      default: "customer",
    },

    zone: {
      type: String,
    },

    available: {
      type: Boolean,
      default: true,
    },

    location: {
      lat: Number,
      lng: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);