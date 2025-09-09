import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/showblogs.css"; // external CSS

function ShowBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [scrolled, setscrolled] = useState(false); // ✅ FIX: was "" now boolean
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(searchQuery);

  // Scroll effect
  useEffect(() => {
    const handlescroll = () => {
      const isscrolled = window.scrollY > 36;
      setscrolled(isscrolled);
    };
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // ✅ FIX: Added backticks `` around URL
        const res = await axios.get(
          `http://127.0.0.1:8000/api/blogs/?search=${searchQuery}&page=${page}`
        );

        setBlogs(res.data.results || res.data); // ✅ SAFE: if using DRF pagination
        setTotalPages(res.data.count ? Math.ceil(res.data.count / 6) : 1); // ✅ FIX: safe check
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, [searchQuery, page]);

  return (
    <div className="main-container-showblogs">
      <div className="container-fluid card-container">
        <div>
          <h3 className="Blog_txt" style={{ width: "200px" }}>
            Blogs.........!
          </h3>
          <input
            style={{
              border: "2px solid black",
              position: "relative",
              left: "490px",
              top: "-40px",
              width: "300px",
            }}
            className="form-control"
            value={searchQuery}
            onChange={(e) => {
              setsearchQuery(e.target.value);
            }}
            placeholder="search Blogs Type"
          />

          {scrolled ? (
            <input
              style={{
                border: "2px solid black",
                position: "fixed",
                left: "830px",
                top: "13px",
                width: "300px",
                zIndex: "1",
              }}
              className="form-control"
              value={searchQuery}
              onChange={(e) => {
                setsearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="search Blogs Type"
            />
          ) : (
            ""
          )}
        </div>

        {/* Blog Cards */}
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div className="card" key={blog.id || index}> {/* ✅ FIX: use id if available */}
              {/* Image Section */}
              <div className="card-image">
                {blog.image && (
                  <img src={blog.image} alt="Blog Cover" className="blog-image" />
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
                <p className="author">by {blog.author_name || "Unknown"}</p>

                {/* Additional Content (hovered) */}
                <div className="extra-content">
                  <p>{blog.Description || "No description."}</p>
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

        {/* Pagination */}
        <div className=" gap- mt-4 " style={{display:"flex", justifyContent:"space-evenly", position:"relative" , bottom:"10px", backgroundColor:"orangered", padding:"15px"}}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded  disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              // ✅ FIX: corrected className interpolation
              className={`px-3 py-1 rounded  ${
                page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200  rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowBlogs;
