import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Education from "./components/Education.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Freelancing from "./components/Freelancing.jsx";
import Ecommerce from "./components/Ecommerce.jsx";
import Experience from "./components/Experience.jsx";
import Resume from "./components/Resume.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <a href="#home" className="skip-link">
        Skip to main content
      </a>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="home">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Freelancing />
        <Ecommerce />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
