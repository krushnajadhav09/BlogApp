// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import MainLayout from './Layouts/MainLayout'
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import '@fortawesome/fontawesome-free/css/all.min.css';
import PrivateRoute from "./PrivateRoutes";
import Create_blogs from "./Pages/create_blogs";
import ShowBlogs from "./Pages/showBlogs";
import Register from "./Pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Routes without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
         

        {/* ✅ Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* more routes with navbar/footer */}
          <Route path="/create_Blogs" element={
            <PrivateRoute>
              <Create_blogs/>
            </PrivateRoute>}/>
            <Route path="/showBlogs" element={<ShowBlogs/>}/>
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
