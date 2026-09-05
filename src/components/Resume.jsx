import { FiDownload, FiEye, FiFileText } from "react-icons/fi";
import { useData } from "../context/DataContext";
import { useReveal } from "../hooks/useReveal";
import "./Resume.css";

const resumeSections = [
  {
    title: "Education",
    content: "B.E. Computer Science and Engineering – Currently Pursuing",
  },
  {
    title: "Technical Skills",
    content: "Programming, Web Development, React.js, Git/GitHub, Data Structures & OOP",
  },
  {
    title: "Projects",
    content: "Real-world web solutions, Teacher Period Assistant & E-Commerce applications",
  },
  {
    title: "Freelancing & E-Commerce",
    content: "Web development freelancing & digital store product operations",
  },
];

export default function Resume() {
  const { resume } = useData();
  const { ref, isVisible } = useReveal();

  const resumeUrl = resume?.resumeUrl || null;
  const fileName = resume?.fileName || "Resume.pdf";

  return (
    <section id="resume" className="section resume">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">08 · Resume</span>
          <h2 className="section-title">My Resume</h2>
          <p className="section-desc">View or download my official curriculum vitae.</p>
        </div>

        <div ref={ref} className={`resume__panel card reveal ${isVisible ? "is-visible" : ""}`}>
          <div className="resume__list">
            {resumeSections.map((item) => (
              <div key={item.title} className="resume__row">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>

          <div className="resume__download">
            {resumeUrl ? (
              <div className="resume__action-buttons" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <FiEye /> View Resume
                </a>
                <a
                  href={resumeUrl}
                  download={fileName}
                  className="btn btn-primary"
                >
                  <FiDownload /> Download Resume
                </a>
              </div>
            ) : (
              <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
                <FiFileText style={{ fontSize: "2rem", marginBottom: "0.5rem" }} />
                <p><strong>Resume coming soon</strong></p>
                <span style={{ fontSize: "0.85rem" }}>Upload PDF from the /admin portal</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
