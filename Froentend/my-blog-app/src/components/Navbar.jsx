import React from 'react'
import '../Styles/Nav.css'

import Logo from '../assets/Blogger.png'
function Navbar() {
  return (
    <nav className="navbar position-fixed ">
  <div className="container-fluid">
    <a className="navbar-brand "><div className='logo'>   
<img src={Logo} height={40} /> <span className='blogger'>Blogger</span></div></a>
    <form className="d-flex">
      <button className="btn  me-3 text-white fw-bold" type="submit">LOG IN</button>
    </form>
  </div>
</nav>
  )
}

export default Navbar