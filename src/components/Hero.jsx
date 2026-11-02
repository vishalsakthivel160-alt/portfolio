import { FiArrowRight, FiMail, FiMapPin, FiAward } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./Hero.css";

export default function Hero() {
  const { ref } = useReveal();
  const name = profile.name || "Vishal Sakthivel R";
  const heroDescription = profile.heroDescription;
  const profileImage = profile.profileImage;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <section ref={ref} className="hero section--sandal">
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__kicker reveal" style={{ transitionDelay: "60ms" }}>
            <span className="hero__status-bullet" aria-hidden="true" />
            <span className="editorial-label">Available for Internships &middot; 2026</span>
          </div>

          <h1 className="hero__name reveal" style={{ transitionDelay: "140ms" }}>
            {name}
          </h1>

          <p className="hero__role-tag reveal" style={{ transitionDelay: "220ms" }}>
            <em>B.E. Computer Science and Engineering</em> &mdash; Developer, Freelancer &amp; Entrepreneur
          </p>

          <p className="hero__desc reveal" style={{ transitionDelay: "300ms" }}>
            {heroDescription}
          </p>

          <div className="hero__actions reveal" style={{ transitionDelay: "380ms" }}>
            <a href="#projects" className="btn btn-primary">
              Selected Works <FiArrowRight />
            </a>
            <a href="#certifications" className="btn btn-outline">
              <FiAward /> View Certifications
            </a>
            <a href="#contact" className="btn btn-ghost">
              <FiMail /> Contact Me
            </a>
          </div>

          <div className="hero__meta-strip reveal" style={{ transitionDelay: "460ms" }}>
            <div className="hero__meta-item">
              <span className="hero__meta-label">Course</span>
              <span className="hero__meta-val">B.E. Computer Science and Engineering</span>
            </div>
            <div className="hero__meta-divider" />
            <div className="hero__meta-item">
              <span className="hero__meta-label">Institution</span>
              <span className="hero__meta-val">Christian College of Engineering and Technology</span>
            </div>
            <div className="hero__meta-divider" />
            <div className="hero__meta-item">
              <span className="hero__meta-label">Location</span>
              <span className="hero__meta-val">
                <FiMapPin style={{ marginRight: "4px" }} />
                Dindigul, India
              </span>
            </div>
          </div>
        </div>

        <div className="hero__visual reveal" style={{ transitionDelay: "260ms" }}>
          <div className="hero__portrait-frame">
            <div className="hero__portrait-inner">
              {profileImage ? (
                <img src={profileImage} alt={name} className="hero__portrait-img" />
              ) : (
                <div className="hero__photo-monogram">
                  <span>{initials}</span>
                </div>
              )}
            </div>
            <div className="hero__portrait-caption">
              <span className="editorial-label">Vishal Sakthivel R</span>
              <span className="hero__caption-note">Christian College of Engineering and Technology</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
