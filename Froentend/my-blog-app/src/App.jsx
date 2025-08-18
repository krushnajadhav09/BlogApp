// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import MainLayout from './Layouts/MainLayout'
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Routes without layout */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* more routes with navbar/footer */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
