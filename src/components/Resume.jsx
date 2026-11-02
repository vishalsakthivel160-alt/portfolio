import { FiDownload, FiEye, FiFileText, FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./Resume.css";

const resumeSections = [
  {
    title: "Education",
    label: "Academic Pathway",
    content: "B.E. Computer Science and Engineering | Christian College of Engineering and Technology (2025 – 2029)",
  },
  {
    title: "Technical Stack",
    label: "Core Engineering Tools",
    content: "HTML5, Modern CSS, JavaScript (ES6+), React.js, C, C++, Python, Object-Oriented Programming (OOP), Node.js, Git & GitHub, MS Office Suite",
  },
  {
    title: "Highlighted Work",
    label: "Institutional Solution",
    content: "Teacher Period Assistant (Architected with React.js, JavaScript, and Node.js for academic schedule automation & attendance metrics)",
  },
  {
    title: "Languages & Strengths",
    label: "Interpersonal & Polyglot",
    content: "Fluent in Tamil & English; Conversational in Hindi & Malayalam; German (Elementary learner) | Fast Learner, Systems Thinking, Collaborative Execution",
  },
];

export default function Resume() {
  const { ref } = useReveal();
  const resumePath = profile.resumePath;

  return (
    <section id="resume" ref={ref} className="section section--beige resume">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 09 / Professional Resume</span>
          <h2 className="section-title">My Resume</h2>
          <p className="section-desc">
            A concise digest of qualifications, technical capabilities, and academic credentials &mdash; available for immediate review or PDF download.
          </p>
        </div>

        <div className="resume__sheet card reveal" style={{ transitionDelay: "120ms" }}>
          <div className="resume__sheet-header">
            <div className="resume__sheet-title-group">
              <span className="editorial-label">Official Candidate Record</span>
              <h3 className="resume__sheet-name">{profile.name}</h3>
              <p className="resume__sheet-sub">{profile.shortHeadline}</p>
            </div>
            <div className="resume__sheet-meta">
              <span>Location: <strong>Dindigul, Tamil Nadu, India</strong></span>
              <span>Degree: <strong>B.E. Computer Science and Engineering</strong></span>
              <span>Institution: <strong>Christian College of Engineering and Technology</strong></span>
            </div>
          </div>

          <div className="resume__sheet-body">
            {resumeSections.map((item) => (
              <div key={item.title} className="resume__section-row">
                <div className="resume__section-meta">
                  <span className="editorial-label">{item.label}</span>
                  <h4 className="resume__section-heading">{item.title}</h4>
                </div>
                <div className="resume__section-content">
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="resume__sheet-footer">
            {resumePath ? (
              <div className="resume__actions">
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <FiEye /> View Resume <FiArrowUpRight />
                </a>
                <a
                  href={resumePath}
                  download="Vishal-Sakthivel-R-Resume.pdf"
                  className="btn btn-primary"
                >
                  <FiDownload /> Download Resume (PDF)
                </a>
              </div>
            ) : (
              <div className="resume__empty">
                <FiFileText className="resume__empty-icon" />
                <p>Resume PDF is currently being finalized.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
