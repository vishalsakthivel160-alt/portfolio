import { Routes, Route } from "react-router-dom";
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
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";

function PublicPortfolio() {
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

export default function App() {
  // Check if running on dedicated Admin Subdomain / Dedicated Admin Host (e.g., admin.domain.com or VITE_APP_MODE=admin)
  const isAdminDomain =
    window.location.hostname.startsWith("admin.") ||
    import.meta.env.VITE_APP_MODE === "admin";

  if (isAdminDomain) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/dashboard/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<PublicPortfolio />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
