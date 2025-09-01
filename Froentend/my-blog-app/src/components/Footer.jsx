import React from 'react'
import '../Styles/footer.css'
function Footer() {
  return (
<>
    <footer class="bg-dark text-white  " style={{position:"relative", height:"260px", }}>
  <div class="container" style={{position:"relative",top:"30px"}}>
    <div class="row">
      <div class="col-md-4 col-12 mb-3">
        <h5>About Us</h5>
        <p>
          We provide the best web solutions for businesses of all sizes.
        </p>
      </div>

      <div class="col-md-4 col-12 mb-3">
        <h5>Quick Links</h5>
        <ul class="list-unstyled">
          <li><a href="#" class="text-white text-decoration-none">Home</a></li>
          <li><a href="#" class="text-white text-decoration-none">Services</a></li>
          <li><a href="#" class="text-white text-decoration-none">Contact</a></li>
          <li><a href="#" class="text-white text-decoration-none">About</a></li>
        </ul>
      </div>

      <div class="col-md-4 col-12 mb-3">
        <h5>Contact</h5>
        <p>Email: example@gmail.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>


    <div class="text-center">
      <p class="mb-0">&copy; 2025 Your Company. All Rights Reserved.</p>
    </div>
  </div>
</footer>

</>  
)
}

export default Footer