import React, { useState } from 'react';

import '../Styles/register.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    
    first_name: '',
    last_name:'',
    email: '',
    username: '',
    password: '',
    password2: '',
  });
     
  const navigate=useNavigate()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    	try{
		const res=await axios.post("http://127.0.0.1:8000/api/register/",formData)
		console.log(res)
    navigate("/login")
	}catch (err){
console.log("this is error",err)
   }
    // Add validation or API calls here
    console.log(formData);
  };

  return (
    <div className='registerMainContainer'>
    <div className="form-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>
        <div className='d-flex'style={{display:"flex" }}><input type="text" name="first_name" placeholder="first Name" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="last name" onChange={handleChange} required /></div>
        <input type="email" name="email" placeholder="Email address" onChange={handleChange} required />
        <input type="text" name="username" placeholder="username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} required />

        <div className="terms">
          <input type="checkbox" required /> <span>I agree to the terms and conditions</span>
        </div>

        <button type="submit">CREATE ACCOUNT</button>
        <p className="signin-link">Already have an account?<Link to="/login"> login</Link> </p> 
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
