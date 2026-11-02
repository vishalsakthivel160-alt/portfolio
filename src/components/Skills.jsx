import { FiTerminal, FiGlobe, FiTool, FiCpu, FiCompass, FiCode } from "react-icons/fi";
import { skillCategories } from "../data/skills";
import { useReveal } from "../hooks/useReveal";
import "./Skills.css";

const iconMap = {
  code: <FiTerminal />,
  web: <FiGlobe />,
  tools: <FiTool />,
  cs: <FiCpu />,
  interest: <FiCompass />,
  globe: <FiGlobe />,
};

export default function Skills() {
  const { ref } = useReveal();

  return (
    <section id="skills" ref={ref} className="section section--sandal skills">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 03 / Capabilities &amp; Taxonomy</span>
          <h2 className="section-title">Skills &amp; Languages</h2>
          <p className="section-desc">
            A structured index of technical tools, foundational computing languages, human communication, and core competencies.
          </p>
        </div>

        <div className="skills__catalog">
          {skillCategories.map((category, i) => (
            <article
              key={category.title}
              className="skills__section-card card reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="skills__card-head">
                <span className="skills__card-index">0{i + 1}</span>
                <div className="skills__card-title-group">
                  <span className="skills__card-icon">{iconMap[category.icon] || <FiCode />}</span>
                  <h3 className="skills__card-title">{category.title}</h3>
                </div>
              </div>

              <div className="skills__items-wrap">
                {category.items.map((item) => {
                  if (item.includes(" — ")) {
                    const [lang, level] = item.split(" — ");
                    return (
                      <div key={item} className="skills__lang-pill">
                        <span className="skills__lang-name">{lang}</span>
                        <span className="skills__lang-level">{level}</span>
                      </div>
                    );
                  }
                  return (
                    <span key={item} className="skills__item-tag">
                      {item}
                    </span>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
