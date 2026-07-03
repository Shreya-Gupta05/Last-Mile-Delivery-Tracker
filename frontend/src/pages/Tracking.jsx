import { useState } from "react";
import axios from "../api";

export default function Tracking() {

    const [id, setId] = useState("");

    const [tracking, setTracking] = useState([]);

    const search = async () => {

        try {

            const res = await axios.get("/tracking/" + id);

            setTracking(res.data);

        } catch (err) {

            console.log(err);

            alert("Tracking not found");

        }

    };

    return (

        <div className="container">

            <h2>Track Order</h2>

            <input
                placeholder="Enter Order ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <button onClick={search}>
                Track
            </button>

            <br /><br />

            {

                tracking.length > 0 && (

                    <div className="card">

                        <h3>Tracking Timeline</h3>

                        {

                            tracking.map((item, index) => (

                                <div key={index}>

                                    <p>
                                        <b>Status:</b> {item.status}
                                    </p>

                                    <p>
                                        <b>Time:</b>{" "}
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>

                                    <hr />

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}