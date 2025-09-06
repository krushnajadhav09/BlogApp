import React, { useState } from 'react';
import '../Styles/CreateBlog.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import api from '../Api/Api'; // 👈 Import the Axios instance


function Create_blogs() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [Description,setDescription] = useState()
  const [type, setType] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async () => {
    if (!title || !image || !type){
      toast.error("All fields are required");
    }
    try {
      const token = localStorage.getItem("access_token");
      console.log(token);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("Type", type);
      formData.append("Description",Description)

      const res = await axios.post("http://127.0.0.1:8000/api/blogs/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
console.log("blog created",res)
    toast.success("Blog created succesfully");
    setTimeout(()=>{
      navigate("/showBlogs")
    },2000);
    } 
catch (err) {
  const errorData = err.response?.data;

  if (errorData) {
    // Loop through error fields from Django API and show each one
    for (const field in errorData) {
      const messages = errorData[field];
      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          toast.error(`${field}: ${msg}`,{className:"custum-error"});
        });
      } else {
        toast.error(`${field}: ${messages}`,{className:"custum-error"});
      }
    }
  } else {
    // Fallback error
    toast.error("An unexpected error occurred.");
  }

  // Optional: still log in console for debugging
  console.error("Error creating blog:", errorData || err.message);
}

    }
  

  return (
    <div className='main_container container-fluid'>
<div className='row'>    <h2 className='col-12 ' style={{position:"absolute", top:"36px", left:"280px",color:"lightblack"}}>Create your blog here......!</h2>
</div>
    <div className="container_create-blogs" style={{ position: "absolute", top: "120px",marginTop:"-30px", padding:"15px" }}>

      {/* Title Input */}
      <div className="mb-3">
        <label htmlFor="titleInput" className="form-label form-label_create_blog" >Title</label>
        <input
          type="text"
          className="form-control "
          id="titleInput"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <hr/>
      {/* Image Upload */}
      <div className="mb-3">
        <label htmlFor="imageInput" className="form-label form-label_create_blog">Upload Image</label>
        <input
          className="form-control"
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
            <hr/>

      <div className='mb-3'>
         <label htmlFor="titleInput" className="form-label form-label_create_blog">Descripton</label>
        <textarea
          type="text"
          className="form-control "
          id="Description"
          placeholder="Enter Description here"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <hr/>

      {/* Select Type */}
      <div className="mb-3">
        <label htmlFor="selectInput" className="form-label">Select Type</label>
        <select
          className="form-select"
          id="selectInput"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="" disabled>Choose an option</option>
          <option value="Food Blogs">Food Blogs  </option>
          <option value="Lifestyle Blogs">Lifestyle Blogs</option>
          <option value="Technology Blogs"> Technology Blogs</option>
          <option value="Education Blogs"> Education Blogs</option>
          <option value="Business Blogs"> Business Blogs</option>
          <option value="Creative Blogs"> Creative Blogs</option>
          <option value="Hobbies Blogs"> Hobbies Blogs</option>
          <option value="Personal Blogs">  Personal Blogs</option>
          <option value="Social Blogs"> Social Blogs</option>
        </select>
      </div>
      <hr/>

      {/* Submit Button */}
      <button className="btn btn-primary btn-create "  onClick={handleSubmit}>
        Submit
      </button>
    </div>
    <ToastContainer   autoClose={4000}
toastClassName="custum-error" position='top-center' theme='light'/>
    </div>
    
  );
}

export default Create_blogs;
