import { FiBookOpen, FiGlobe, FiShoppingBag, FiFolder, FiTrendingUp } from "react-icons/fi";
import { experienceItems } from "../data/experience";
import { useReveal } from "../hooks/useReveal";
import "./Experience.css";

const iconMap = {
  student: <FiBookOpen />,
  freelance: <FiGlobe />,
  ecommerce: <FiShoppingBag />,
  project: <FiFolder />,
  learning: <FiTrendingUp />,
};

export default function Experience() {
  const { ref } = useReveal();

  return (
    <section id="experience" ref={ref} className="section experience">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">07 · Experience</span>
          <h2 className="section-title">Experience & Activities</h2>
        </div>

        <div className="experience__timeline">
          {experienceItems.map((item, i) => (
            <div
              key={item.title}
              className="experience__item reveal"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="experience__marker">{iconMap[item.icon]}</div>
              <div className="experience__body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
