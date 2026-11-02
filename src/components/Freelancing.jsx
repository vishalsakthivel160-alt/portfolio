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
  const { ref } = useReveal();

  return (
    <section id="freelancing" ref={ref} className="section section--sandal freelancing">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 06 / Client Services</span>
          <h2 className="section-title">Freelancing &amp; Solutions</h2>
          <p className="section-desc">
            Tailored digital development services for businesses, creators, and teams seeking responsive, reliable, and modern web applications.
          </p>
        </div>

        <div className="freelancing__grid">
          {freelancingServices.map((service, i) => (
            <div
              key={service.title}
              className="freelance-card card reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="freelance-card__header">
                <span className="freelance-card__index">0{i + 1}</span>
                <span className="freelance-card__icon">{iconMap[service.icon]}</span>
              </div>
              <h3 className="freelance-card__title">{service.title}</h3>
              <p className="freelance-card__desc">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="freelancing__cta card reveal" style={{ transitionDelay: "220ms" }}>
          <div className="freelancing__cta-text">
            <span className="editorial-label">Collaboration Inquiry</span>
            <h3 className="freelancing__cta-heading">Let&rsquo;s Build Your Next Project Together</h3>
            <p className="freelancing__cta-desc">
              Have a website or application concept in mind? Let&rsquo;s discuss requirements and bring it to life.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary freelancing__cta-btn">
            Initiate Contact <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
