import { FiArrowRight, FiDownload, FiMail, FiCamera } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./Hero.css";

export default function Hero() {
  const { ref } = useReveal();
  const name = profile.name || "Vishal Sakthivel R";
  const role = profile.shortHeadline || profile.role;
  const heroDescription = profile.heroDescription;
  const profileImage = profile.profileImage;
  const resumePath = profile.resumePath;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <section ref={ref} className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow reveal" style={{ transitionDelay: "0ms" }}>
            <span className="hero__dot" /> Available for internships & freelance work
          </p>
          <h1 className="hero__name reveal" style={{ transitionDelay: "100ms" }}>
            {name}
          </h1>
          <h2 className="hero__role reveal" style={{ transitionDelay: "200ms" }}>
            {role}
          </h2>
          <p className="hero__desc reveal" style={{ transitionDelay: "300ms" }}>
            {heroDescription}
          </p>

          <div className="hero__actions reveal" style={{ transitionDelay: "400ms" }}>
            <a href="#projects" className="btn btn-primary">
              View Projects <FiArrowRight />
            </a>
            {resumePath ? (
              <a href={resumePath} target="_blank" rel="noreferrer" download className="btn btn-outline">
                <FiDownload /> Download Resume
              </a>
            ) : (
              <button className="btn btn-outline" disabled title="Resume will be available soon">
                <FiDownload /> Resume will be available soon
              </button>
            )}
            <a href="#contact" className="btn btn-ghost">
              <FiMail /> Contact Me
            </a>
          </div>
        </div>

        <div className="hero__visual reveal" style={{ transitionDelay: "250ms" }}>
          <div className="hero__photo-frame">
            {profileImage ? (
              <img src={profileImage} alt={name} />
            ) : (
              <div className="hero__photo-placeholder">
                <span>{initials}</span>
                <div className="hero__photo-hint">
                  <FiCamera />
                  <span>Add photo in src/assets/profile/</span>
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
