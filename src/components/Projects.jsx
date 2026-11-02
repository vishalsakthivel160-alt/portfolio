import { FiExternalLink, FiStar, FiCheck, FiFolder, FiCode } from "react-icons/fi";
import { featuredProject, otherProjects } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import "./Projects.css";

function ProjectLinks({ project }) {
  return (
    <div className="project__links">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          className="btn btn-primary btn-sm"
          target="_blank"
          rel="noreferrer"
        >
          Live Demonstration <FiExternalLink />
        </a>
      ) : (
        <button className="btn btn-primary btn-sm" disabled title="Live preview coming soon">
          Live Demonstration Soon
        </button>
      )}

      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          className="btn btn-outline btn-sm"
          target="_blank"
          rel="noreferrer"
        >
          Source Code <FiExternalLink />
        </a>
      ) : (
        <button className="btn btn-outline btn-sm" disabled title="Source repository currently in academic review">
          Repository in Review
        </button>
      )}
    </div>
  );
}

export default function Projects() {
  const { ref } = useReveal();

  return (
    <section id="projects" ref={ref} className="section section--cream projects">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 04 / Engineering Portfolio</span>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-desc">
            Applied software engineering projects solving practical organizational workflows and institutional communication.
          </p>
        </div>

        <div>
          {featuredProject && (
            <article
              className="project-feature card reveal"
              style={{ transitionDelay: "120ms" }}
            >
              <div className="project-feature__masthead">
                <div className="project-feature__badge">
                  <FiStar /> Featured Academic Engineering Work
                </div>
                <span className="editorial-label">Project Index &middot; 01</span>
              </div>

              <div className="project-feature__body">
                <div className="project-feature__lead">
                  <h3 className="project-feature__name">{featuredProject.name}</h3>
                  <p className="project-feature__desc">{featuredProject.description}</p>

                  <div className="project-feature__tech-stack">
                    <span className="editorial-label" style={{ marginRight: "4px" }}>Technologies:</span>
                    {featuredProject.technologies.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ProjectLinks project={featuredProject} />
                </div>

                {featuredProject.features && (
                  <div className="project-feature__spec">
                    <div className="project-feature__spec-title">
                      <FiCheck /> Core System Highlights
                    </div>
                    <ul className="project-feature__spec-list">
                      {featuredProject.features.map((f) => (
                        <li key={f} className="project-feature__spec-item">
                          <span className="project-feature__bullet">&bull;</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          )}

          {otherProjects && otherProjects.length > 0 && (
            <div className="projects__grid" style={{ marginTop: "3rem" }}>
              {otherProjects.map((project, i) => (
                <article
                  key={project.name}
                  className="project-card card reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <h3 className="project-card__title">{project.name}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ProjectLinks project={project} />
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
