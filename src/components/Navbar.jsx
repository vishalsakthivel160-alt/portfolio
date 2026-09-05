import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from "react-icons/fi";
import { navLinks } from "../data/navLinks";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import "./Navbar.css";

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navLinks.map((link) => link.to);
  const { activeId, scrolled } = useActiveSection(sectionIds);

  const name = profile.name || "Vishal Sakthivel R";
  const resumePath = profile.resumePath;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="container navbar__inner" aria-label="Primary">
        <a href="#home" className="navbar__brand" onClick={handleLinkClick}>
          <span className="navbar__brand-mark">VS</span>
          <span className="navbar__brand-name">{name}</span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={`#${link.to}`}
                className={`navbar__link ${activeId === link.to ? "is-active" : ""}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          {resumePath ? (
            <a
              href={resumePath}
              target="_blank"
              rel="noreferrer"
              download
              className="btn btn-outline btn-sm navbar__resume-btn"
            >
              <FiDownload /> Resume
            </a>
          ) : (
            <a href="#resume" className="btn btn-outline btn-sm navbar__resume-btn">
              <FiDownload /> Resume
            </a>
          )}
          <button
            className="navbar__icon-btn navbar__hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div className={`navbar__mobile ${menuOpen ? "is-open" : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={`#${link.to}`}
                className={activeId === link.to ? "is-active" : ""}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {resumePath ? (
          <a
            href={resumePath}
            target="_blank"
            rel="noreferrer"
            download
            className="btn btn-primary navbar__mobile-resume"
            onClick={handleLinkClick}
          >
            <FiDownload /> Download Resume
          </a>
        ) : (
          <a
            href="#resume"
            className="btn btn-primary navbar__mobile-resume"
            onClick={handleLinkClick}
          >
            <FiDownload /> Resume
          </a>
        )}
      </div>
    </header>
  );
}
