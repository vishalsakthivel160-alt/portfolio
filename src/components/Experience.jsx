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
    <section id="experience" ref={ref} className="section section--sandal experience">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 08 / Trajectory &amp; Growth</span>
          <h2 className="section-title">Experience &amp; Engagements</h2>
          <p className="section-desc">
            A chronological timeline of active academic studies, freelance initiatives, entrepreneurial endeavors, and independent engineering projects.
          </p>
        </div>

        <div className="experience__chronology">
          {experienceItems.map((item, i) => (
            <div
              key={item.title}
              className="exp-item reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="exp-item__time-col">
                <span className="exp-item__index">0{i + 1}</span>
                <span className="exp-item__marker">{iconMap[item.icon]}</span>
              </div>
              <div className="exp-item__body card">
                <h3 className="exp-item__title">{item.title}</h3>
                <p className="exp-item__desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
