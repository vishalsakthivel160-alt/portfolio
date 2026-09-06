import { FiTerminal, FiGlobe, FiTool, FiCpu, FiCompass } from "react-icons/fi";
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
    <section id="skills" ref={ref} className="section skills">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">03 · Skills & Languages</span>
          <h2 className="section-title">Skills & Languages</h2>
          <p className="section-desc">
            Technologies, concepts, and languages I actively use and continue to build on.
          </p>
        </div>

        <div className="skills__grid">
          {skillCategories.map((category, i) => (
            <div
              key={category.title}
              className="skills__card card reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="skills__card-head">
                <span className="skills__icon">{iconMap[category.icon] || <FiGlobe />}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skills__chips">
                {category.items.map((item) => {
                  if (item.includes(" — ")) {
                    const [lang, level] = item.split(" — ");
                    return (
                      <span key={item} className="tag skills__chip skills__chip--lang">
                        <span className="skills__lang-name">{lang}</span>
                        <span className="skills__lang-sep">•</span>
                        <span className="skills__lang-level">{level}</span>
                      </span>
                    );
                  }
                  return (
                    <span key={item} className="tag skills__chip">
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
