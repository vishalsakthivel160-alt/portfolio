import { FiShoppingCart, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { products } from "../data/products";
import { useReveal } from "../hooks/useReveal";
import "./Ecommerce.css";

export default function Ecommerce() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="ecommerce" className="section ecommerce">
      <div className="ecommerce__pattern" aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <span className="section-kicker commerce">06 · E-Commerce Showcase</span>
          <h2 className="section-title">E-Commerce Products & Services</h2>
          <p className="section-desc">
            Alongside my studies, I am building and managing an e-commerce business.
            Explore products and service packages below.
          </p>
        </div>

        <div ref={ref} className="ecommerce__grid">
          {products.map((product, i) => (
            <div
              key={product.id || product.name}
              className={`ecommerce__card card reveal ${isVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span className="tag" style={{ fontSize: "0.75rem" }}>{product.category || "Product"}</span>
                <span style={{ fontSize: "0.75rem", color: "#4ade80", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <FiCheckCircle /> {product.stockStatus || "In Stock"}
                </span>
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.5rem" }}>{product.name}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>{product.description}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div>
                  <span style={{ fontSize: "1.3rem", fontWeight: "800", color: "#f8fafc" }}>
                    ₹{product.price}
                  </span>
                  {product.discountPrice && (
                    <span style={{ textDecoration: "line-through", color: "#94a3b8", fontSize: "0.85rem", marginLeft: "0.5rem" }}>
                      ₹{product.discountPrice}
                    </span>
                  )}
                </div>

                <a
                  href={product.buyNowUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ gap: "0.375rem" }}
                >
                  Buy Now <FiExternalLink />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
