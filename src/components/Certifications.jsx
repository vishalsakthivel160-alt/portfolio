import { useState, useEffect } from "react";
import { FiExternalLink, FiAward, FiCalendar, FiMaximize2, FiX, FiCheckCircle, FiHash } from "react-icons/fi";
import { certifications } from "../data/certifications";
import { useReveal } from "../hooks/useReveal";
import "./Certifications.css";

export default function Certifications() {
  const { ref } = useReveal();
  const [activeModalCert, setActiveModalCert] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalCert(null);
      }
    };
    if (activeModalCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeModalCert]);

  return (
    <section id="certifications" ref={ref} className="section section--beige certifications">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 05 / Verified Credentials</span>
          <h2 className="section-title">Certifications &amp; Accreditations</h2>
          <p className="section-desc">
            Officially verified workshop participation credentials across Claude AI Agents, Data Science, and Artificial Intelligence.
          </p>
        </div>

        <div className="certifications__grid">
          {certifications.map((cert, i) => (
            <article
              key={cert.id}
              className="cert-card card reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Premium Matting Frame for Actual Certificate Image */}
              <div
                className="cert-card__frame"
                onClick={() => setActiveModalCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveModalCert(cert)}
                aria-label={`Enlarge ${cert.title}`}
              >
                <div className="cert-card__image-container">
                  <img
                    src={cert.preview || cert.image}
                    alt={cert.title}
                    className="cert-card__image"
                    loading="lazy"
                  />
                  <div className="cert-card__overlay">
                    <span className="cert-card__enlarge-hint">
                      <FiMaximize2 /> Click to Enlarge
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Editorial Details */}
              <div className="cert-card__content">
                <div className="cert-card__meta-bar">
                  <span className="cert-card__org">
                    <FiAward className="cert-card__icon" /> {cert.organization}
                  </span>
                  {cert.certificateId && (
                    <span className="cert-card__id">
                      <FiHash /> ID: {cert.certificateId}
                    </span>
                  )}
                </div>

                <h3 className="cert-card__title">{cert.title}</h3>

                <div className="cert-card__award-line">
                  <span className="cert-card__recipient">Awarded to: <strong>{cert.recipient}</strong></span>
                  {cert.date && (
                    <span className="cert-card__date">
                      <FiCalendar style={{ marginRight: "4px" }} /> {cert.date}
                    </span>
                  )}
                </div>

                {cert.description && (
                  <p className="cert-card__desc">{cert.description}</p>
                )}

                {cert.skillsCovered && (
                  <div className="cert-card__skills">
                    {cert.skillsCovered.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                )}

                <div className="cert-card__actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm cert-card__view-btn"
                    onClick={() => setActiveModalCert(cert)}
                  >
                    <FiMaximize2 /> View Certificate
                  </button>
                  <a
                    href={cert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                    title="Open original high-resolution certificate"
                  >
                    Original Image <FiExternalLink />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      {activeModalCert && (
        <div
          className="cert-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cert-title"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            className="cert-modal__dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal__header">
              <div className="cert-modal__header-info">
                <span className="editorial-label">Official Certificate Inspection</span>
                <h3 id="modal-cert-title" className="cert-modal__title">
                  {activeModalCert.title}
                </h3>
                <p className="cert-modal__org">
                  {activeModalCert.organization} &middot; {activeModalCert.recipient}
                </p>
              </div>
              <button
                type="button"
                className="cert-modal__close-btn"
                onClick={() => setActiveModalCert(null)}
                aria-label="Close certificate lightbox"
              >
                <FiX />
              </button>
            </div>

            <div className="cert-modal__body">
              <img
                src={activeModalCert.image}
                alt={activeModalCert.title}
                className="cert-modal__full-image"
              />
            </div>

            <div className="cert-modal__footer">
              {activeModalCert.certificateId && (
                <span className="cert-modal__footer-id">
                  Certificate ID: <strong>{activeModalCert.certificateId}</strong>
                </span>
              )}
              <div className="cert-modal__footer-actions">
                <a
                  href={activeModalCert.image}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Open Full File in New Tab <FiExternalLink />
                </a>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setActiveModalCert(null)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
