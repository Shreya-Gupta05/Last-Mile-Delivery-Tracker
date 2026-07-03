import { useEffect, useState } from "react";
import axios from "../api";

export default function Agent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await axios.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load orders");
    }
  };

  const updateStatus = async (
    id,
    status,
    failedReason = "",
    rescheduleDate = ""
  ) => {
    try {
      await axios.put("/orders/status/" + id, {
        status,
        failedReason,
        rescheduleDate,
      });

      alert("Status Updated");
      loadOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  const failedDelivery = (orderId) => {
    const reason = prompt("Enter reason for failed delivery:");

    if (!reason) return;

    const date = prompt("Enter reschedule date (YYYY-MM-DD):");

    updateStatus(orderId, "Failed", reason, date);
  };

  return (
    <div className="container">
      <h2>Agent Dashboard</h2>

      {orders.length === 0 ? (
        <p>No Orders Assigned</p>
      ) : (
        orders.map((order) => (
          <div className="card" key={order._id}>
            <p>
              <b>Pickup:</b> {order.pickupAddress}
            </p>

            <p>
              <b>Drop:</b> {order.dropAddress}
            </p>

            <p>
              <b>Status:</b> {order.status}
            </p>

            {order.status === "Pending" && (
              <button onClick={() => updateStatus(order._id, "Picked Up")}>
                Pick Up
              </button>
            )}

            {order.status === "Picked Up" && (
              <button onClick={() => updateStatus(order._id, "In Transit")}>
                In Transit
              </button>
            )}

            {order.status === "In Transit" && (
              <button
                onClick={() => updateStatus(order._id, "Out for Delivery")}
              >
                Out for Delivery
              </button>
            )}

            {order.status === "Out for Delivery" && (
              <>
                <button
                  onClick={() => updateStatus(order._id, "Delivered")}
                >
                  Delivered
                </button>

                <button
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                  }}
                  onClick={() => failedDelivery(order._id)}
                >
                  Failed Delivery
                </button>
              </>
            )}

            {order.status === "Delivered" && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                ✔ Delivery Completed
              </p>
            )}

            {order.status === "Failed" && (
              <>
                <p style={{ color: "red", fontWeight: "bold" }}>
                  ❌ Delivery Failed
                </p>

                <p>
                  <b>Reason:</b> {order.failedReason}
                </p>

                <p>
                  <b>Reschedule:</b>{" "}
                  {order.rescheduleDate
                    ? new Date(order.rescheduleDate).toLocaleDateString()
                    : "Not Scheduled"}
                </p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}