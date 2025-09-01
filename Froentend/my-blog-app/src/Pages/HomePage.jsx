import Navbar from '../components/Navbar';
import '../Styles/HomePage.css'
import { useState,useEffect } from 'react';
import "../Styles/Homepage.css";
import redimage from '../assets/redcolorimg.png'
import greenimg from '../assets/greencolorimg.png'
import blueimg from '../assets/bluecolorimg.png'
import { useNavigate } from 'react-router-dom';

function HomePage() {
   const navigate=useNavigate()
    const  color=["#BC382E","#388D80","#4583AA"]
    const images=[redimage , greenimg , blueimg]
    const[bgimages,setimages]=useState(images[0])
     const[bgcolor,setcolor]= useState(color[0])
    //  const[animate,setanimate]=useState(true)
      const [fade, setFade] = useState(false);

       useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFade(true); // start fade out & slide down

      setTimeout(() => {
        index = (index + 1) % color.length;
        setcolor(color[index]);
        setimages(images[index]);
        setFade(false); // fade in & slide up
      }, 800); // match CSS transition duration
    }, 4000);

    return () => clearInterval(interval);
  }, []);
     
   const HandleCreate=() => {
   const token = localStorage.getItem("access_token");
  if (token) {
    // user logged in
    navigate("/Create_blogs");
  } else {
    // user not logged in
    navigate("/login");
  }
  };

  return (
    <>
    <section className="hero-section" style={{backgroundColor:bgcolor}}>
     
      {/* Text content */}
      <h1>Publish your passions, your way</h1>
      <p>Create a unique and beautiful blog easily.</p>
      <button className="hero-btn" onClick={HandleCreate}>CREATE YOUR BLOG</button>
            <div className='bgimages'>
        <img src={bgimages} height={400} width={600}  alt="background Image"   className={`image ${fade ? "fade-out" : "fade-in"} 'imagesBG'`}
 />
      </div>
    </section>
    </>
  );
}


export default HomePage;
