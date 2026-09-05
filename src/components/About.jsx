import { FiBookOpen, FiCode, FiGlobe, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./About.css";

const infoCards = [
  { icon: <FiBookOpen />, label: "Computer Science & Engineering Student" },
  { icon: <FiCode />, label: "Developer" },
  { icon: <FiGlobe />, label: "Freelancer" },
  { icon: <FiShoppingBag />, label: "E-commerce Entrepreneur" },
  { icon: <FiTrendingUp />, label: "Continuous Learner" },
];

export default function About() {
  const { ref, isVisible } = useReveal();

  const aboutParagraphs = Array.isArray(profile.aboutText)
    ? profile.aboutText
    : (profile.aboutText || "").split("\n\n");

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">01 · About</span>
          <h2 className="section-title">A bit about me</h2>
        </div>

        <div className="about__grid" ref={ref}>
          <div className={`about__text reveal ${isVisible ? "is-visible" : ""}`}>
            {profile.profileImage && (
              <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--accent-color, #38bdf8)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                />
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>{profile.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>{profile.status}</p>
                </div>
              </div>
            )}
            {aboutParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="about__cards">
            {infoCards.map((card, i) => (
              <div
                key={card.label}
                className={`about__card card reveal ${isVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="about__card-icon">{card.icon}</span>
                <span>{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
