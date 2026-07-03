import { useState } from "react";
import axios from "../api";

export default function Register() {

const [form,setForm]=useState({

name:"",
email:"",
password:"",
phone:"",
role:"customer",
zone:"North"

});

const submit = async () => {

    try {

        console.log(form);

        const res = await axios.post("/auth/register", form);

        alert(res.data.message);

    } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "Registration Failed");
    }
};

return(
<div className="container">

<h2>Register</h2>

<input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>

<input placeholder="Email" onChange={(e) =>
        setForm({ ...form, email: e.target.value })
    }/>

<input placeholder="Password" onChange={(e) =>
        setForm({ ...form, password: e.target.value })
    }/>

<button onClick={submit}>Register</button>

</div>
);

}