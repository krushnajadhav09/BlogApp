import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout({children}) {
  return (
    <>
    <main style={{ minHeight: "100vh"  }}>{children}</main>
    <Footer/>
    </>   
  )
}

export default MainLayout