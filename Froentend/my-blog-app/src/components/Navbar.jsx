import React, { useState, useEffect } from "react";
import "../Styles/Nav.css";
import Logo from "../assets/Blogger.png";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,setscrolled] =  useState();
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser=localStorage.getItem("user")
  const user = storedUser ? JSON.parse(storedUser) : null;

console.log(user)
  useEffect(()=>{
    const handlescroll =()=>{
      const isscrolled=(window.scrollY > 36);
      setscrolled(isscrolled)
    }
     window.addEventListener("scroll",handlescroll)
     return ()=>{ window.removeEventListener("scroll",handlescroll)}
  },[]);

  const handleLogin = () => {
    navigate("/login");
  };
  const HandleProfile =()=>{
    navigate("/Profile")
  }
  const HandleClickBlogs = ()=>{
    navigate("/showBlogs")
  }
  const HandleClickHome = ()=>{
    navigate("/")
  }
  const HandleClickCreate=()=>{
    if (!access_token){
      toast.error("login required ....!")
    }
    navigate("/create_blogs")
  }
const access_token=localStorage.getItem("access_token")
  // ✅ Close menu whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
const handleLogout = (e) => {
  e.preventDefault();
  const confirm = window.confirm("Are you sure you want to logout?");
  
  const toastId = "logout-toast"; // Unique toast ID

  // Always dismiss existing toast with same ID before showing a new one
  toast.dismiss(toastId);

  if (confirm) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    toast.success("Logout successfully", {
      toastId: toastId,
      autoClose: 2000,       // Toast disappears after 2 seconds
      closeOnClick: true,
      draggable: true
    });

    setTimeout(() => {
      navigate("/");         // Navigate AFTER toast disappears
    }, 2200);                // Give 200ms buffer after toast
  } else {
    toast.error("Logout cancelled", {
      toastId: toastId,
      autoClose: 2000,
      closeOnClick: true,
      draggable: true
    });
  }
};


  return (
    <nav className={`navbar position-fixed`}>
      <div className={`container-fluid  ${scrolled ? "scrollednav" :""}  `}>
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
          { !access_token ? (
          <button
            className="btn me-3 text-white fw-bold"
            onClick={handleLogin}
            type="button"
          >
            LOG IN
          </button>):(
            <button
            className="btn me-3 text-white fw-bold"
            onClick={handleLogout}
            type="button"
          >
            LOG OUT
          </button>
          )
          
          }
          
        </form>
      </div>

      {menuOpen && (
        <div className="container mt-4 menuopen">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="p-4 text-white rounded shadow box">
                <button className="btn btn-link" onClick={HandleClickHome} style={{textDecoration:"none", color:"white", marginLeft:"-10px"}}>Home</button>
                <hr />
                <button className="btn btn-link" onClick={HandleClickBlogs} style={{textDecoration:"none", color:"white", marginLeft:"-10px"}}>Blogs</button>
                <hr />
                <button className="btn btn-success" onClick={HandleClickCreate} style={{textDecoration:"none", color:"white", marginLeft:"-10px"}}>create Blogs</button>
<hr/>
                <button className="fa-solid fa-user btn btn-link" style={{textDecoration:"none"}} onClick={HandleProfile}></button>
                <button  className="btn btn-link" style={{textDecoration:"none", color:"white", fontSize:"17px"}} onClick={HandleProfile}> {user?.first_name ||"user not find" }  {user?.last_name } </button>
                <hr />
              </div>
            </div>
          </div>

        </div>
      )}
                  <ToastContainer   theme="light" toastClassName="custom-logout"/>

    </nav>
  );
}

export default Navbar;
