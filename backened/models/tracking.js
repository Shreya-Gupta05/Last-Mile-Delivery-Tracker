const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema(
{
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },

    status:{
        type:String,
        required:true
    },

    actor:{
        type:String,
        required:true
    },

    timestamp:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Tracking", trackingSchema);