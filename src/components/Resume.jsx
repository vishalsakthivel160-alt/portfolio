import { FiDownload, FiEye, FiFileText } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./Resume.css";

const resumeSections = [
  {
    title: "Education",
    content: "B.E. Computer Science and Engineering",
  },
  {
    title: "Technical Skills",
    content: "Web Development (HTML, CSS, Basic JavaScript), C, C++, Basic Python, OOP, Microsoft Office",
  },
  {
    title: "Projects",
    content: "Teacher Period Assistant",
  },
  {
    title: "Strengths & Languages",
    content: "Quick Learner, Team Player, Problem Solving | Tamil — Fluent, English — Fluent, Hindi — Basic conversation, Malayalam — Basic Conversation, German — Learning",
  },
];

export default function Resume() {
  const { ref } = useReveal();
  const resumePath = profile.resumePath;

  return (
    <section id="resume" ref={ref} className="section resume">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">08 · Resume</span>
          <h2 className="section-title">My Resume</h2>
          <p className="section-desc">A snapshot of my qualifications — view or download the full PDF below.</p>
        </div>

        <div className="resume__panel card reveal" style={{ transitionDelay: "120ms" }}>
          <div className="resume__list">
            {resumeSections.map((item) => (
              <div key={item.title} className="resume__row">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>

          <div className="resume__download">
            {resumePath ? (
              <div className="resume__action-buttons" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <FiEye /> View Resume
                </a>
                <a
                  href={resumePath}
                  download="Vishal-Sakthivel-R-Resume.pdf"
                  className="btn btn-primary"
                >
                  <FiDownload /> Download Resume
                </a>
              </div>
            ) : (
              <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
                <FiFileText style={{ fontSize: "2rem", marginBottom: "0.5rem" }} />
                <p><strong>Resume will be available soon.</strong></p>
                <span style={{ fontSize: "0.85rem" }}>Place your PDF inside public/resume/ and update src/data/profile.js</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
