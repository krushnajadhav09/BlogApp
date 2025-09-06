import React, { useEffect, useState } from 'react'
import "../Styles/Profile.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profile() {


  const[profileData,setProfileData]=useState("");
  const token=localStorage.getItem("access_token")
  const storedUser=localStorage.getItem("user")
  const user = storedUser ? JSON.parse(storedUser) : null;

console.log(user)
  useEffect(()=>{
 const showProfile = async() =>{
   try {
    const res= await axios.get("http://127.0.0.1:8000/api/profile/",{
      headers : {
         Authorization: `Bearer ${token}`,
      } 
    });
    console.log(res.data)
          setProfileData(res.data)

   } catch (err){
console.log("you will be get error on :",err.data)
   }
 }
 showProfile();
 },[]);
 

  const navigate= useNavigate()
const HandleClickEdit= ()=>{
  navigate("/EditProfile")
}

  return (
    <div className='main-parent-class-profile'>
    <div className="profile-card-container">
      <div className="profile-card-left">
       <p><i className="fas  fa-envelope"></i> {user.email || "--------"}</p>
        <p><i className="fas  fa-location-dot"></i> {profileData.location || "--------"}</p>
        <p><i className="fas fa-phone"></i> {profileData.bio || "--------"}</p>
        <p><i className="fas  fa-calendar-days"></i> {profileData.birth_date || "--------"}</p>
        <p><i className="fas  fa-pen"></i> {profileData.bio || "--------"}</p>
        <button onClick={HandleClickEdit} className='EditBtn'>Edit</button>
      </div>
      <div className="profile-card-right">
        <div className="profile-image">
          {profileData.profile_picture ? (
            <img src={profileData.profile_picture} alt="Profile" />
          ) : (
            <div className="placeholder-img">No Image</div>
          )}
        </div>
        <h6 style={{marginLeft:30}}>{user.username || "Your Name"}</h6>
        {/* <p className="job-title">{job || "Job Position"}</p> */}
      </div>
    </div>
    </div>
  )
}

export default Profile