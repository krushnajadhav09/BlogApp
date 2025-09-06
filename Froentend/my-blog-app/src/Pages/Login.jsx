import React, { useState } from "react";
import '../Styles/Login.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [UserData,SetUserData]=useState();
const  navigate=useNavigate()
  const [loginData,setLoginData]=useState({
    username:"",
    password:""
  })
// const handlechange = (e) =>{
//   setLoginData({
//     ...loginData,[e.target.name]:e.target.value

//   });
// }
const handleChange = (e)=>{
    
    setLoginData({
      ...loginData,
      [e.target.name]:e.target.value
  });
  }
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login/", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });


    // Save tokens
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    console.log("this is a access token here",res.data.access)

    // Save user info (optional, so you can show username, email, etc.)
    localStorage.setItem("user", JSON.stringify(res.data.user));

    console.log("User data:", res.data.user);

    setLoginData({
      username:"",
      password:"",
    })
        toast.success("Login successfull ✅",{className:"toast-custom"});
  setTimeout (()=>{
    navigate("/")
  },2000)

  } catch (err) {
    console.error("Login failed ❌", err.response?.data);

    setLoginData({
      username: "",
      password: "",
    });
  }


}
  return (
    <div className="login-container">
      <div className="login-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" value={loginData.username} autoComplete="off" name="username" className="form-control" onChange={handleChange} placeholder="Enter your username" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password"  className="form-control" autoComplete="off" name="password" onChange={handleChange} placeholder="Enter your password" />
          </div>
          <button className="btn btn-primary w-100" type="submit" onClick={handleSubmit}>Login</button>
          <br></br>
          <hr/>
          Don't have account? <Link to="/Register"> Register</Link>
        </form>
      </div>
      <ToastContainer autoClose={2000} position='top-center' theme='light'/>
    </div>
  );
}

export default Login;
