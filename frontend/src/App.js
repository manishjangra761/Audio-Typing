import About from "./components/About";
import ContactArea from "./components/ContactArea";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import './styles/global.css'

function App() {
  return (
    <div className="page-bg">
      <Navbar/>
      <HeroSection/>
      <About/>
      <ContactArea/>
    </div>
  );
}

export default App;



