import { useEffect, useState } from "react";
import axios from "../api";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [agents, setAgents] = useState([]);
  const [rates, setRates] = useState([]);

  const [agentForm, setAgentForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    zone: "North"
  });

  const [rateForm, setRateForm] = useState({
    pickupZone: "North",
    dropZone: "North",
    orderType: "B2C",
    baseCharge: 50,
    pricePerKg: 20,
    codCharge: 50
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const orderRes = await axios.get("/orders");
      setOrders(orderRes.data);

      const userRes = await axios.get("/auth/agents");
      setAgents(userRes.data);

      const rateRes = await axios.get("/ratecard");
      setRates(rateRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  const addAgent = async () => {
    try {
      await axios.post("/auth/register", {
        ...agentForm,
        role: "agent"
      });

      alert("Agent Added");

      loadData();

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const addRate = async () => {
    try {

      await axios.post("/ratecard", rateForm);

      alert("Rate Added");

      loadData();

    } catch (err) {

      alert(err.response?.data?.message);

    }
  };

  return (
    <div className="container">

      <h1>Admin Dashboard</h1>

      <hr />

      <h2>Orders</h2>

      {orders.map(order => (
        <div className="card" key={order._id}>
          <p>{order.pickupAddress} ➜ {order.dropAddress}</p>
          <p>{order.status}</p>
          <p>{order.assignedAgent?.name || "No Agent"}</p>
        </div>
      ))}

      <hr />

      <h2>Add Agent</h2>

      <input
        placeholder="Name"
        onChange={e =>
          setAgentForm({
            ...agentForm,
            name: e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        onChange={e =>
          setAgentForm({
            ...agentForm,
            email: e.target.value
          })
        }
      />

      <input
        placeholder="Password"
        type="password"
        onChange={e =>
          setAgentForm({
            ...agentForm,
            password: e.target.value
          })
        }
      />

      <input
        placeholder="Phone"
        onChange={e =>
          setAgentForm({
            ...agentForm,
            phone: e.target.value
          })
        }
      />

      <select
        onChange={e =>
          setAgentForm({
            ...agentForm,
            zone: e.target.value
          })
        }
      >
        <option>North</option>
        <option>South</option>
        <option>East</option>
        <option>West</option>
      </select>

      <button onClick={addAgent}>
        Add Agent
      </button>

      <hr />

      <h2>Agents</h2>

      {agents.map(agent => (
        <div className="card" key={agent._id}>
          <p>{agent.name}</p>
          <p>{agent.email}</p>
          <p>{agent.zone}</p>
        </div>
      ))}

      <hr />

      <h2>Add Rate Card</h2>

      <button onClick={addRate}>
        Add Rate
      </button>

      <h2>Rate Cards</h2>

      {rates.map(rate => (
        <div className="card" key={rate._id}>
          <p>
            {rate.pickupZone} ➜ {rate.dropZone}
          </p>

          <p>{rate.orderType}</p>

          <p>₹{rate.pricePerKg}/kg</p>
        </div>
      ))}

    </div>
  );
}