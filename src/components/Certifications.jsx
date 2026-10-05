import { FiExternalLink, FiAward, FiCalendar } from "react-icons/fi";
import { certifications } from "../data/certifications";
import { useReveal } from "../hooks/useReveal";
import "./Certifications.css";

export default function Certifications() {
  const { ref } = useReveal();

  return (
    <section id="certifications" ref={ref} className="section certifications">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">05 · Certifications</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-desc">
            Professional workshops, courses, and certifications I have completed.
          </p>
        </div>

        <div className="certifications__grid">
          {certifications.map((cert, i) => (
            <article
              key={cert.id}
              className="cert card reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {cert.preview && (
                <div className="cert__image-wrapper">
                  <img
                    src={cert.preview}
                    alt={cert.title}
                    className="cert__image"
                  />
                </div>
              )}
              <h3 className="cert__title">{cert.title}</h3>
              <p className="cert__org">
                <FiAward className="cert__icon" /> {cert.organization}
              </p>
              {cert.date && (
                <p className="cert__date">
                  <FiCalendar style={{ marginRight: '6px' }}/>
                  {cert.date}
                </p>
              )}
              {cert.description && <p className="cert__desc">{cert.description}</p>}
              
              <div className="cert__links">
                {cert.image && (
                  <a
                    href={cert.image}
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiExternalLink /> View Certificate
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
