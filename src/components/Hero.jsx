import { FiArrowRight, FiDownload, FiMail, FiCamera, FiEye } from "react-icons/fi";
import { useData } from "../context/DataContext";
import "./Hero.css";

export default function Hero() {
  const { profile, resume, contact } = useData();

  const name = profile?.name || "Vishal Sakthivel R";
  const shortHeadline = profile?.shortHeadline || "Computer Science Engineering Student & Aspiring Software Developer";
  const heroDescription = profile?.heroDescription || "Building my skills in technology, developing real-world projects, exploring freelancing, and growing an e-commerce business.";
  const profileImage = profile?.profileImage || null;
  const resumeUrl = resume?.resumeUrl || null;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <section className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__dot" /> Available for internships & freelance work
          </p>
          <h1 className="hero__name">{name}</h1>
          <h2 className="hero__role">{shortHeadline}</h2>
          <p className="hero__desc">{heroDescription}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">
              View Projects <FiArrowRight />
            </a>
            {resumeUrl ? (
              <a href={resumeUrl} download="Resume.pdf" className="btn btn-outline">
                <FiDownload /> Download Resume
              </a>
            ) : (
              <button className="btn btn-outline" disabled title="No resume uploaded yet">
                <FiDownload /> Resume coming soon
              </button>
            )}
            <a href="#contact" className="btn btn-ghost">
              <FiMail /> Contact Me
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-frame">
            {profileImage ? (
              <img src={profileImage} alt={name} />
            ) : (
              <div className="hero__photo-placeholder">
                <span>{initials}</span>
                <div className="hero__photo-hint">
                  <FiCamera />
                  <span>Photo uploaded via /admin</span>
                </div>
              </div>
            )}
          </div>
          <div className="hero__badge hero__badge--code">{"</>"}</div>
          <div className="hero__badge hero__badge--cart">🛒</div>
          <div className="hero__badge hero__badge--rocket">🚀</div>
        </div>
      </div>
    </section>
  );
}
