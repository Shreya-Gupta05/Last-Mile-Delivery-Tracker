import { Link } from "react-router-dom";

export default function Navbar(){

return(

<div className="navbar">

<h1>🚚 Delivery Tracker</h1>

<div>

<Link to="/">Login</Link>

<Link to="/register">Register</Link>

<Link to="/create-order">Create Order</Link>

<Link to="/orders">Orders</Link>

<Link to="/agent">Agent</Link>

<Link to="/tracking">Tracking</Link>

</div>

</div>

);

}