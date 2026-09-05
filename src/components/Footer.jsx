import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiLock } from "react-icons/fi";
import { navLinks } from "../data/navLinks";
import { useData } from "../context/DataContext";
import "./Footer.css";

export default function Footer() {
  const { profile, contact } = useData();

  const name = profile?.name || "Vishal Sakthivel R";
  const github = contact?.github || "https://github.com";
  const linkedin = contact?.linkedin || "https://linkedin.com";
  const email = contact?.email || "your.email@example.com";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="navbar__brand-mark">VS</span>
          <p>{name}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <a href={`#${link.to}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__socials">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
          )}
          <a href={`mailto:${email}`} aria-label="Email">
            <FiMail />
          </a>
        </div>
      </div>

      <div className="container footer__bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p>© {new Date().getFullYear()} {name}. All Rights Reserved.</p>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="/admin"
            title="Admin Login Portal"
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              opacity: 0.6,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          >
            <FiLock style={{ fontSize: "0.75rem" }} /> Admin
          </a>
          
          <button className="footer__top-btn" onClick={scrollToTop} aria-label="Back to top">
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
