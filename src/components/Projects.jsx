import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
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
          <FiExternalLink /> Live Demo
        </a>
      ) : (
        <button className="btn btn-primary btn-sm" disabled title="Live demo link not available yet">
          <FiExternalLink /> Live Demo Soon
        </button>
      )}

      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          className="btn btn-outline btn-sm"
          target="_blank"
          rel="noreferrer"
        >
          <FiGithub /> GitHub Repo
        </a>
      ) : (
        <button className="btn btn-outline btn-sm" disabled title="GitHub repository link not available yet">
          <FiGithub /> Repository Soon
        </button>
      )}
    </div>
  );
}

export default function Projects() {
  const { ref } = useReveal();

  return (
    <section id="projects" ref={ref} className="section projects">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">04 · Projects</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-desc">
            A showcase of what I've built and what's currently in progress.
          </p>
        </div>

        <div>
          {featuredProject && (
            <article
              className="project project--featured card reveal"
              style={{ transitionDelay: "120ms" }}
            >
              <span className="project__featured-badge">
                <FiStar /> Featured Project
              </span>
              {featuredProject.image && (
                <img
                  src={featuredProject.image}
                  alt={featuredProject.name}
                  style={{ width: "100%", maxHeight: "240px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
                />
              )}
              <h3 className="project__name">{featuredProject.name}</h3>
              <p className="project__desc">{featuredProject.description}</p>

              <div className="project__tags">
                {featuredProject.technologies.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              {featuredProject.features && (
                <div className="project__features">
                  <h4>Key Features</h4>
                  <ul>
                    {featuredProject.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <ProjectLinks project={featuredProject} />
            </article>
          )}

          <div className="projects__grid" style={{ marginTop: "2rem" }}>
            {otherProjects.map((project, i) => (
              <article
                key={project.name}
                className="project card reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "1rem" }}
                  />
                )}
                <h3 className="project__name">{project.name}</h3>
                <p className="project__desc">{project.description}</p>
                <div className="project__tags">
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
        </div>
      </div>
    </section>
  );
}
