import HomePage from "./components/HomePage";
import './styles/global.css'
import Navbar from "./components/HomePage/Navbar";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Contact from "./components/Contact";
import AboutPage from "./components/AboutPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
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



