import { useEffect, useState } from "react";
import axios from "../api";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res = await axios.get("/orders");

                setOrders(res.data);

            } catch (err) {

                console.log(err);

                alert("Failed to load orders");

            }

        };

        fetchOrders();

    }, []);

    return (

        <div className="container">

            <h2>All Orders</h2>

            {
                orders.length === 0 ?

                    <p>No Orders Found</p>

                    :

                    orders.map((order) => (

                        <div className="card" key={order._id}>

                            <p><b>Order ID:</b> {order._id}</p>

                            <p><b>Pickup:</b> {order.pickupAddress}</p>

                            <p><b>Drop:</b> {order.dropAddress}</p>

                            <p><b>Status:</b> {order.status}</p>

                            <p><b>Charge:</b> ₹{order.charge}</p>
                            
                            <p><b>Assigned Agent:</b> {order.assignedAgent?.name || "Not Assigned"}</p>

                        </div>

                    ))
            }

        </div>

    );

}