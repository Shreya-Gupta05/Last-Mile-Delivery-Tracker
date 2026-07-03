const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const orderRoutes=require("./routes/orderRoutes");
// const statusRoutes=require("./routes/statusRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const rateCardRoutes = require("./routes/rateCardRoutes");

const app = express();

// Middleware FIRST
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));
app.use(express.json());

app.use((req, res, next) => {
    next();
});

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/orders",orderRoutes);
// app.use("/api/status",statusRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/ratecard", rateCardRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(console.error);

app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(3000, () => {
    console.log("Server Running");
});