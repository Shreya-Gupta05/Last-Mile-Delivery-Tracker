import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateOrder from "./pages/CreateOrder";
import Orders from "./pages/Orders";
import Tracking from "./pages/Tracking";
import Navbar from "./components/Navbar";
import Agent from "./pages/Agent";

function App() {

  return (

    <BrowserRouter>

      <Navbar/>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/create-order" element={<CreateOrder />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/agent" element={<Agent />} />
        
        <Route path="/tracking" element={<Tracking />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;