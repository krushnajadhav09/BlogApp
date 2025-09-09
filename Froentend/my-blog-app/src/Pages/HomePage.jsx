import Navbar from '../components/Navbar';
import '../Styles/HomePage.css';
import { useState, useEffect } from 'react';
import "../Styles/Homepage.css";
import redimage from '../assets/redcolorimg.png';
import greenimg from '../assets/greencolorimg.png';
import blueimg from '../assets/bluecolorimg.png';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function HomePage() {
  const navigate = useNavigate();
  const color = ["#BC382E", "#388D80", "#4583AA"];
  const images = [redimage, greenimg, blueimg];
  const [bgimages, setimages] = useState(images[0]);
  const [bgcolor, setcolor] = useState(color[0]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const Token = localStorage.getItem("access_token");
const isTokenExpire = (token) => {
      if (!token) return true;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000; // in seconds
        return payload.exp < currentTime;
      } catch (error) {
        console.log("Token decode error:", error);
        return true;
      }
    };

    // ✅ Only check expiry, don’t refresh
    if (isTokenExpire(Token)) {
      localStorage.removeItem("access_token");``
      localStorage.removeItem("user");
    }

    // background image/color rotation
    let index = 0;
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        index = (index + 1) % color.length;
        setcolor(color[index]);
        setimages(images[index]);
        setFade(false);
      }, 800);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const HandleCreate = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // user logged in
      navigate("/Create_blogs");
    } else {
      // user not logged in
      toast.error("Login Required : please login to create blogs..!");
    }
  };

  return (
    <>
      <section className="hero-section" style={{ backgroundColor: bgcolor }}>
        <h1>Publish your passions, your way</h1>
        <p>Create a unique and beautiful blog easily.</p>
        <button className="hero-btn" onClick={HandleCreate}>
          CREATE YOUR BLOG
        </button>
        <div className="bgimages">
          <img
            src={bgimages}
            height={400}
            width={600}
            alt="background Image"
            className={`image ${fade ? "fade-out" : "fade-in"} 'imagesBG'`}
          />
          <ToastContainer position="top-center" theme="light" />
        </div>
      </section>
    </>
  );
}

export default HomePage;
