import { useState } from "react";
import axios from "../api";

export default function CreateOrder() {

    const userId = localStorage.getItem("userId");

    const [form, setForm] = useState({
        customer: userId,
        pickupAddress: "",
        dropAddress: "",
        pickupZone: "North",
        dropZone: "North",
        length: 0,
        breadth: 0,
        height: 0,
        actualWeight: 0,
        orderType: "B2C",
        paymentType: "Prepaid"
    });

    const submit = async () => {

        try {

            console.log(form);

            const res = await axios.post("/orders/create", form);

            alert("Order Created Successfully!");

            console.log(res.data);

        } catch (err) {

            console.log(err);

            alert(err.response?.data?.message || "Order Creation Failed");

        }

    };

    return (

        <div className="container">

            <h2>Create Order</h2>

            <input
                placeholder="Pickup Address"
                onChange={(e) =>
                    setForm({ ...form, pickupAddress: e.target.value })
                }
            />

            <input
                placeholder="Drop Address"
                onChange={(e) =>
                    setForm({ ...form, dropAddress: e.target.value })
                }
            />

            <input
                type="number"
                placeholder="Weight"
                onChange={(e) =>
                    setForm({ ...form, actualWeight: Number(e.target.value) })
                }
            />

            <input
                type="number"
                placeholder="Length"
                onChange={(e) =>
                    setForm({ ...form, length: Number(e.target.value) })
                }
            />

            <input
                type="number"
                placeholder="Breadth"
                onChange={(e) =>
                    setForm({ ...form, breadth: Number(e.target.value) })
                }
            />

            <input
                type="number"
                placeholder="Height"
                onChange={(e) =>
                    setForm({ ...form, height: Number(e.target.value) })
                }
            />

            <select
                onChange={(e) =>
                    setForm({ ...form, orderType: e.target.value })
                }
            >
                <option value="B2C">B2C</option>
                <option value="B2B">B2B</option>
            </select>

            <select
                onChange={(e) =>
                    setForm({ ...form, paymentType: e.target.value })
                }
            >
                <option value="Prepaid">Prepaid</option>
                <option value="COD">COD</option>
            </select>

            <button onClick={submit}>
                Create Order
            </button>

        </div>

    );

}