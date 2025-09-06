import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/showblogs.css"; // external CSS


function ShowBlogs() {
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/blogs/");
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="main-container-showblogs">
 <div className=" container-fluid card-container">
 <h3 className="Blog_txt ">Blogs.........!</h3>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div className="card" key={index}>
            {/* Image Section */}
            <div className="card-image">
              {blog.image && (
                <img
                  src={blog.image}
                  alt="Blog Cover"
                  className="blog-image"
                />
              )}
              <span className="category">{blog.Type}</span>
            </div>

            {/* Content Section */}
            <div className="card-content">
              <div className="title_div">
                <h3 className="title">{blog.title}</h3>
                <p className="subtitle">{blog.subtitle || "No subtitle"}</p>
              </div>

              {/* Author and Date */}
              <p className="author">by {blog.author_name  || "Unknown"}</p>

              {/* Additional Content (hovered) */}
              <div className="extra-content">
                <p>{blog.Description || "No description ."}</p>
              </div>

              {/* Footer */}
              <div className="card-footer">
                <span>🕒 {blog.formatted_date || "Time not available"}</span>
                <span>💬</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading blogs...</p>
      )}
    </div>
    </div>
  );
}

export default ShowBlogs;
