import { FiMapPin, FiCalendar, FiBookOpen, FiAward } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./Education.css";

export default function Education() {
  const { ref } = useReveal();
  const { education } = profile;

  return (
    <section id="education" ref={ref} className="section section--beige education">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 02 / Academic Foundation</span>
          <h2 className="section-title">Education</h2>
          <p className="section-desc">
            Formal university coursework, foundational computing theory, and engineering discipline.
          </p>
        </div>

        <div className="education__monograph card reveal" style={{ transitionDelay: "120ms" }}>
          <div className="education__monograph-side">
            <span className="editorial-label">Degree Curriculum</span>
            <span className="education__timeline-badge">2024 &mdash; Present</span>
          </div>

          <div className="education__monograph-main">
            <div className="education__degree-block">
              <span className="education__level-tag">Undergraduate Studies</span>
              <h3 className="education__degree">{education.degree}</h3>
              <p className="education__degree-sub">Second Year Undergraduate Engineering Scholar</p>
            </div>

            <div className="education__details-grid">
              <div className="education__detail-cell">
                <span className="education__detail-label">
                  <FiBookOpen /> Institution
                </span>
                <span className="education__detail-val">{education.institution}</span>
              </div>

              <div className="education__detail-cell">
                <span className="education__detail-label">
                  <FiMapPin /> Location
                </span>
                <span className="education__detail-val">{education.location}</span>
              </div>

              <div className="education__detail-cell">
                <span className="education__detail-label">
                  <FiCalendar /> Academic Standing
                </span>
                <span className="education__detail-val">Currently Pursuing &middot; Full Time</span>
              </div>

              <div className="education__detail-cell">
                <span className="education__detail-label">
                  <FiAward /> Key Focus Areas
                </span>
                <span className="education__detail-val">Data Structures, OOP, Web Architecture, Algorithms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
