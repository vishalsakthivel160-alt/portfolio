import { FiBookOpen, FiCode, FiGlobe, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./About.css";

const infoCards = [
  { icon: <FiBookOpen />, label: "2nd Year CSE Student" },
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
