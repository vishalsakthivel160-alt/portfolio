import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { navLinks } from "../data/navLinks";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import "./Navbar.css";

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navLinks.map((link) => link.to);
  const { activeId, scrolled } = useActiveSection(sectionIds);

  const name = profile.name || "Vishal Sakthivel R";

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
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">{name}</span>
            <span className="navbar__brand-tag">Portfolio &middot; 2026</span>
          </div>
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
          <a href="#contact" className="btn btn-primary btn-sm navbar__cta">
            Contact <FiArrowUpRight />
          </a>
          <button
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "espresso" ? "Switch to warm sandal theme" : "Switch to espresso dark theme"}
            title={theme === "espresso" ? "Switch to warm sandal theme" : "Switch to espresso dark theme"}
          >
            {theme === "espresso" ? <FiSun /> : <FiMoon />}
          </button>
          <button
            className="navbar__icon-btn navbar__hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Editorial Mobile Navigation Drawer */}
      <div className={`navbar__mobile ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="navbar__mobile-header">
          <span className="editorial-label">&mdash; Navigation Index</span>
          <button
            className="navbar__icon-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>
        <ul className="navbar__mobile-list">
          {navLinks.map((link, idx) => (
            <li key={link.to}>
              <a
                href={`#${link.to}`}
                className={`navbar__mobile-link ${activeId === link.to ? "is-active" : ""}`}
                onClick={handleLinkClick}
              >
                <span className="navbar__mobile-num">0{idx + 1}</span>
                <span className="navbar__mobile-text">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-footer">
          <a href="#contact" className="btn btn-primary" style={{ width: "100%" }} onClick={handleLinkClick}>
            Get in Touch <FiArrowUpRight />
          </a>
        </div>
      </div>
    </header>
  );
}
