import HomePage from "./components/HomePage";
import Navbar from "./components/HomePage/Navbar";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Contact from "./components/Contact";
import AboutPage from "./components/AboutPage";
import { ToastContainer } from "react-toastify";
import HomeDashboard from "./components/Dashboard/HomeDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-neutral-950">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><HomeDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;








// import About from "./components/About";
// import ContactArea from "./components/ContactArea";
// import HeroSection from "./components/HeroSection";
// import Navbar from "./components/Navbar";
// import './styles/global.css'

// function App() {
//   return (
//     <div className="page-bg">
//       <Navbar/>
//       <HeroSection/>
//       <About/>
//       <ContactArea/>
//     </div>
//   );
// }

// export default App;



