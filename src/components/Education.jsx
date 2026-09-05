import { FiMapPin, FiCalendar, FiFlag } from "react-icons/fi";
import { personalInfo } from "../data/personalInfo";
import { useReveal } from "../hooks/useReveal";
import "./Education.css";

export default function Education() {
  const { ref, isVisible } = useReveal();
  const { education } = personalInfo;

  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">02 · Education</span>
          <h2 className="section-title">Education</h2>
        </div>

        <div ref={ref} className={`education__card card reveal ${isVisible ? "is-visible" : ""}`}>
          <div className="education__timeline-dot" aria-hidden="true" />
          <div className="education__main">
            <span className="education__status">{education.status}</span>
            <h3 className="education__degree">{education.degree}</h3>
            <p className="education__year">{education.year}</p>
          </div>

          <div className="education__meta">
            <div className="education__meta-item">
              <FiFlag />
              <div>
                <span className="education__meta-label">Institution</span>
                <span className="education__meta-value">{education.institution}</span>
              </div>
            </div>
            <div className="education__meta-item">
              <FiMapPin />
              <div>
                <span className="education__meta-label">Location</span>
                <span className="education__meta-value">{education.location}</span>
              </div>
            </div>
            <div className="education__meta-item">
              <FiCalendar />
              <div>
                <span className="education__meta-label">Expected Graduation</span>
                <span className="education__meta-value">{education.expectedGraduation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
