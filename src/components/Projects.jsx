import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import { useData } from "../context/DataContext";
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
        <button className="btn btn-primary btn-sm" disabled>
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
        <button className="btn btn-outline btn-sm" disabled>
          <FiGithub /> Repository Soon
        </button>
      )}
    </div>
  );
}

export default function Projects() {
  const { projects } = useData();
  const { ref, isVisible } = useReveal();

  const projectList = projects || [];
  const featured = projectList.find((p) => p.featured) || projectList[0];
  const others = featured ? projectList.filter((p) => p.id !== featured.id) : projectList;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">04 · Projects</span>
          <h2 className="section-title">My Projects</h2>
          <p className="section-desc">
            Projects added and managed in real-time from the Admin portal.
          </p>
        </div>

        <div ref={ref}>
          {featured && (
            <article className={`project project--featured card reveal ${isVisible ? "is-visible" : ""}`}>
              <span className="project__featured-badge">
                <FiStar /> Featured Project
              </span>
              {featured.image && (
                <img src={featured.image} alt={featured.name} style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }} />
              )}
              <h3 className="project__name">{featured.name}</h3>
              <p className="project__desc">{featured.description}</p>

              <div className="project__tags">
                {(typeof featured.technologies === "string"
                  ? featured.technologies.split(",")
                  : featured.technologies || []
                ).map((tech, idx) => (
                  <span key={idx} className="tag">
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <ProjectLinks project={featured} />
            </article>
          )}

          <div className="projects__grid" style={{ marginTop: "2rem" }}>
            {others.map((project, i) => (
              <article
                key={project.id || i}
                className={`project card reveal ${isVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {project.image && (
                  <img src={project.image} alt={project.name} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "1rem" }} />
                )}
                <h3 className="project__name">{project.name}</h3>
                <p className="project__desc">{project.description}</p>
                <div className="project__tags">
                  {(typeof project.technologies === "string"
                    ? project.technologies.split(",")
                    : project.technologies || []
                  ).map((tech, idx) => (
                    <span key={idx} className="tag">
                      {tech.trim()}
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
