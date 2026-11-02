import { FiMail, FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import { navLinks } from "../data/navLinks";
import { profile } from "../data/profile";
import "./Footer.css";

export default function Footer() {
  const name = profile.name || "Vishal Sakthivel R";
  const email = profile.contact.email;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand-col">
          <div className="footer__brand">
            <span className="navbar__brand-mark">VS</span>
            <div className="footer__brand-text">
              <span className="footer__brand-name">{name}</span>
              <span className="editorial-label">Portfolio &middot; Editorial Edition</span>
            </div>
          </div>
          <p className="footer__statement">
            Computer Science &amp; Engineering scholar developing scalable web architectures, intelligent AI workflows, and practical digital commerce solutions.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer Navigation">
          <span className="editorial-label" style={{ marginBottom: "12px", display: "block" }}>
            Section Index
          </span>
          <ul className="footer__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <a href={`#${link.to}`} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact-col">
          <span className="editorial-label" style={{ marginBottom: "12px", display: "block" }}>
            Direct Channels
          </span>
          <a href={`mailto:${email}`} className="footer__email-link">
            <span>{email}</span>
            <FiArrowUpRight />
          </a>
          <span className="footer__loc">Christian College of Engineering and Technology &middot; Dindigul</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} {name}. Curated with Warm Sandal &amp; Pure Black Aesthetics.
        </p>

        <button className="footer__top-btn" onClick={scrollToTop} aria-label="Return to top of page">
          Back to Top <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
