import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import MainLayout from './Layouts/MainLayout'
import HomePage from "./Pages/HomePage";

function App() {

  return (
    <>
   <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </MainLayout>
   </BrowserRouter>
    </>
  )
}

export default App
