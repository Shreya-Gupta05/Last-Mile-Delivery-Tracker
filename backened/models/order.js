
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    pickupAddress:String,
    dropAddress:String,

    pickupZone:String,
    dropZone:String,

    length:Number,
    breadth:Number,
    height:Number,

    actualWeight:Number,
    volumetricWeight:Number,
    billableWeight:Number,

    orderType:{
        type:String,
        enum:["B2B","B2C"]
    },

    paymentType:{
        type:String,
        enum:["Prepaid","COD"]
    },

    charge:Number,

    status:{
        type:String,
        enum:[
            "Pending",
            "Picked Up",
            "In Transit",
            "Out for Delivery",
            "Delivered",
            "Failed"
        ],
        default:"Pending"
    },
    
    assignedAgent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    trackingHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tracking"
        }
        ],
        
        failedReason: {
            type: String,
            default: ""
        },
        
        rescheduleDate: {
            type: Date
        },

},
{
    timestamps:true
});

module.exports=mongoose.model("Order",orderSchema);