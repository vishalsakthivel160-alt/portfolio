import { FiGlobe, FiLayout, FiCode, FiZap, FiTool, FiArrowRight } from "react-icons/fi";
import { freelancingServices } from "../data/freelancing";
import { useReveal } from "../hooks/useReveal";
import "./Freelancing.css";

const iconMap = {
  globe: <FiGlobe />,
  layout: <FiLayout />,
  react: <FiCode />,
  landing: <FiZap />,
  maintenance: <FiTool />,
};

export default function Freelancing() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="freelancing" className="section freelancing">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">05 · Freelancing</span>
          <h2 className="section-title">Freelancing</h2>
          <p className="section-desc">
            I provide freelance digital and web development solutions, focusing on
            building responsive, user-friendly and practical websites and applications.
          </p>
        </div>

        <div ref={ref} className="freelancing__grid">
          {freelancingServices.map((service, i) => (
            <div
              key={service.title}
              className={`freelancing__card card reveal ${isVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="freelancing__icon">{iconMap[service.icon]}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="freelancing__cta">
          <div>
            <h3>Let's Work Together</h3>
            <p>Have a project in mind? I'd love to hear about it.</p>
          </div>
          <a href="#contact" className="btn btn-primary">
            Get in touch <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
