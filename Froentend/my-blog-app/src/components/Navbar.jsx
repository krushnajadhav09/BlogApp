import React, { useState, useEffect } from "react";
import "../Styles/Nav.css";
import Logo from "../assets/Blogger.png";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/login");
  };

  // ✅ Close menu whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar position-fixed">
      <div className="container-fluid">
        <a className="navbar-brand">
          <div className="logo">
            <button
              className="toggle-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i
                className={`fa-solid ${
                  menuOpen ? "fa-xmark" : "fa-bars"
                } toggle-icon`}
              ></i>
            </button>
            <img src={Logo} height={40} alt="logo" />{" "}
            <span className="blogger">Blogger</span>
          </div>
        </a>

        <form className="d-flex">
          {/* ✅ fixed: no more submit */}
          <button
            className="btn me-3 text-white fw-bold"
            onClick={handleLogin}
            type="button"
          >
            LOG IN
          </button>
        </form>
      </div>

      {menuOpen && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="p-4 text-white rounded shadow box">
                <a href="/">Home</a>
                <hr />
                <a href="/Blogs">Blogs</a>
                <hr />
                <i className="fa-solid fa-user"></i>
                <a href="/Profile">Profile</a>
                <hr />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
