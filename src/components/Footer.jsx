import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { navLinks } from "../data/navLinks";
import { profile } from "../data/profile";
import "./Footer.css";

export default function Footer() {
  const name = profile.name || "Vishal Sakthivel R";
  const github = profile.social.github;
  const linkedin = profile.social.linkedin;
  const email = profile.contact.email;

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
        
        <button className="footer__top-btn" onClick={scrollToTop} aria-label="Back to top">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
