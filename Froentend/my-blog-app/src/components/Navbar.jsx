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

  useEffect(()=>{
    const handlescroll =()=>{
      const isscrolled=window.scrollY > 0;
      setscrolled(isscrolled)
    }
     window.addEventListener("scroll",handlescroll)
     return ()=>{ window.removeEventListener("scroll",handlescroll)}
  },[]);

  const handleLogin = () => {
    navigate("/login");
  };
  const HandleClickBlogs = ()=>{
    navigate("/showBlogs")
  }
  const HandleClickHome = ()=>{
    navigate("/")
  }
  const HandleClickCreate=()=>{
    if (!access_token){
      navigate("/login")
    }
    navigate("/create_blogs")
  }
const access_token=localStorage.getItem("access_token")
  // ✅ Close menu whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  const handleLogout = (e) =>{
    e.preventDefault()
  const confirm= window.confirm("you are sure for logout ")
  if(confirm){
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      toast.success("logout succesfully")
setTimeout(()=>{
    navigate("/")
  },2000)
  }else{
    toast.error("logout canceled")
  }
  }

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
            Logout
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
                <i className="fa-solid fa-user"></i>
                <a href="/Profile">Profile</a>
                <hr />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer autoClose={1500} toastClassName="custom-logout"/>
    </nav>
  );
}

export default Navbar;
