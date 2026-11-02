import { FiShoppingCart, FiExternalLink, FiCheckCircle, FiPackage, FiTrendingUp } from "react-icons/fi";
import { products } from "../data/products";
import { ecommerceAreas } from "../data/ecommerce";
import { useReveal } from "../hooks/useReveal";
import "./Ecommerce.css";

export default function Ecommerce() {
  const { ref } = useReveal();

  return (
    <section id="ecommerce" ref={ref} className="section section--cream ecommerce">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 07 / Commercial Venture</span>
          <h2 className="section-title">E-Commerce Enterprise</h2>
          <p className="section-desc">
            Independent online commerce ventures combining supply logistics, marketplace distribution, customer experience, and digital operations.
          </p>
        </div>

        <div className="ecommerce__layout">
          {/* Featured Product Box */}
          <div className="ecommerce__products-col">
            <span className="editorial-label" style={{ marginBottom: "16px", display: "block" }}>
              Active Marketplace Catalog
            </span>

            {products.map((product, i) => (
              <article
                key={product.id || product.name}
                className="ecom-product-card card reveal"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="ecom-product-card__header">
                  <div className="ecom-product-card__tag-row">
                    <span className="tag">Botanical / Wellness</span>
                    <span className="ecom-product-card__stock">
                      <FiCheckCircle /> Verified Marketplace Listing
                    </span>
                  </div>
                  <h3 className="ecom-product-card__name">{product.name}</h3>
                  <p className="ecom-product-card__desc">{product.description}</p>
                </div>

                <div className="ecom-product-card__footer">
                  <div className="ecom-product-card__platform">
                    <span className="ecom-product-card__platform-label">Marketplace</span>
                    <strong className="ecom-product-card__platform-val">Flipkart India</strong>
                  </div>

                  <a
                    href={product.buyNowUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View on Flipkart <FiExternalLink />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Operational Domains */}
          <div className="ecommerce__operations-col">
            <span className="editorial-label" style={{ marginBottom: "16px", display: "block" }}>
              Operational Disciplines
            </span>

            <div className="ecommerce__ops-grid">
              {ecommerceAreas.map((area, i) => (
                <div
                  key={area.title}
                  className="ecom-op-card card reveal"
                  style={{ transitionDelay: `${(i + 2) * 60}ms` }}
                >
                  <div className="ecom-op-card__head">
                    <span className="ecom-op-card__num">0{i + 1}</span>
                    <h4 className="ecom-op-card__title">{area.title}</h4>
                  </div>
                  <p className="ecom-op-card__desc">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
