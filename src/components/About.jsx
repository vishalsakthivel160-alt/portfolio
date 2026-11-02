import { FiBookOpen, FiCode, FiGlobe, FiShoppingBag, FiTrendingUp, FiCheck } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./About.css";

const infoCards = [
  { icon: <FiBookOpen />, label: "Computer Science Scholar", desc: "Second-year B.E. at Christian College of Engineering and Technology" },
  { icon: <FiCode />, label: "Software & Web Developer", desc: "Focusing on modern reactive applications, clean code, and UI design" },
  { icon: <FiGlobe />, label: "Digital Freelancer", desc: "Building conversion-focused web applications for businesses" },
  { icon: <FiShoppingBag />, label: "E-Commerce Operator", desc: "Managing product logistics, marketplace listing, and commerce sales" },
  { icon: <FiTrendingUp />, label: "Continuous Learner", desc: "Deepening knowledge across artificial intelligence, modern web, and systems" },
];

export default function About() {
  const { ref } = useReveal();

  const aboutParagraphs = Array.isArray(profile.aboutText)
    ? profile.aboutText
    : (profile.aboutText || "").split("\n\n");

  return (
    <section id="about" ref={ref} className="section section--cream about">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 01 / Biography</span>
          <h2 className="section-title">A Bit About Me</h2>
          <p className="section-desc">
            Bridging rigorous engineering fundamentals with practical software craftsmanship and real-world execution.
          </p>
        </div>

        <div className="about__grid">
          <div className="about__narrative reveal" style={{ transitionDelay: "120ms" }}>
            <div className="about__profile-lead">
              <span className="about__dropcap">E</span>
              <p className="about__lead-text">
                {aboutParagraphs[0]}
              </p>
            </div>

            {aboutParagraphs.slice(1).map((para, i) => (
              <p key={i} className="about__body-para">{para}</p>
            ))}

            <div className="about__quote-block">
              <blockquote>
                &ldquo;Engineering is more than writing syntax&mdash;it is about understanding human needs, creating sustainable systems, and delivering tangible value.&rdquo;
              </blockquote>
              <cite>&mdash; Vishal Sakthivel R</cite>
            </div>
          </div>

          <div className="about__dossier reveal" style={{ transitionDelay: "200ms" }}>
            <div className="about__dossier-header">
              <span className="editorial-label">Core Pillars &amp; Competencies</span>
            </div>

            <div className="about__ledger">
              {infoCards.map((card, i) => (
                <div key={card.label} className="about__ledger-row">
                  <div className="about__ledger-icon">{card.icon}</div>
                  <div className="about__ledger-content">
                    <h3 className="about__ledger-title">{card.label}</h3>
                    <p className="about__ledger-desc">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
