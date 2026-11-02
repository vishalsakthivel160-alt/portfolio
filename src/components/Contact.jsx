import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle, FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data/profile";
import { useReveal } from "../hooks/useReveal";
import "./Contact.css";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const { ref } = useReveal();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const email = profile.contact.email;
  const phone = profile.contact.phone;
  const location = profile.contact.location;

  const validate = (values) => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) {
      next.message = "Please write your message.";
    } else if (values.message.trim().length < 10) {
      next.message = "Message should contain at least 10 characters.";
    }
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (status === "error") {
      setStatus("idle");
      setServerError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerError("");

    const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!web3Key || web3Key === "YOUR_WEB3FORMS_ACCESS_KEY") {
      setStatus("error");
      setServerError(
        "Direct email key is not set. You can click the direct email link on the left to write directly to my inbox."
      );
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          subject: `Portfolio Inquiry from ${form.name.trim()}`,
          from_name: "Vishal Sakthivel Portfolio",
        }),
      });

      const res = await response.json();
      if (response.ok && res.success) {
        setStatus("success");
        setForm(initialForm);
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setServerError(res.message || "Failed to send message. Please contact via direct email.");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setStatus("error");
      setServerError("Network error. Please use direct email to reach out.");
    }
  };

  return (
    <section id="contact" ref={ref} className="section section--sandal contact">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">&mdash; 10 / Direct Dialogue</span>
          <h2 className="section-title">Initiate Contact</h2>
          <p className="section-desc">
            Open for software internships, technical development roles, freelance collaboration, and engineering discourse.
          </p>
        </div>

        <div className="contact__layout">
          {/* Direct channels dossier */}
          <div className="contact__dossier reveal" style={{ transitionDelay: "120ms" }}>
            <span className="editorial-label" style={{ marginBottom: "16px", display: "block" }}>
              Primary Correspondence
            </span>

            <div className="contact__card card">
              <a className="contact__channel-row" href={`mailto:${email}`}>
                <div className="contact__channel-icon"><FiMail /></div>
                <div className="contact__channel-info">
                  <span className="contact__channel-label">Direct Electronic Mail</span>
                  <strong className="contact__channel-val">{email}</strong>
                </div>
                <FiArrowUpRight className="contact__channel-arrow" />
              </a>

              <a className="contact__channel-row" href={`tel:${phone}`}>
                <div className="contact__channel-icon"><FiPhone /></div>
                <div className="contact__channel-info">
                  <span className="contact__channel-label">Telephone &amp; Mobile</span>
                  <strong className="contact__channel-val">{phone}</strong>
                </div>
                <FiArrowUpRight className="contact__channel-arrow" />
              </a>

              <div className="contact__channel-row contact__channel-row--static">
                <div className="contact__channel-icon"><FiMapPin /></div>
                <div className="contact__channel-info">
                  <span className="contact__channel-label">Physical Residence &amp; Campus</span>
                  <strong className="contact__channel-val">{location} &middot; Christian College of Engg.</strong>
                </div>
              </div>
            </div>

            <div className="contact__schedule-note">
              <p>
                <strong>Availability Status:</strong> Actively preparing for upcoming technical internships &amp; development projects. Inquiries typically receive a reply within 24 hours.
              </p>
            </div>
          </div>

          {/* Editorial Form */}
          <form
            className="contact__form card reveal"
            style={{ transitionDelay: "200ms" }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="contact__form-head">
              <span className="editorial-label">Dispatch Form</span>
              <h3 className="contact__form-title">Send a Written Message</h3>
            </div>

            <div className="contact__field">
              <label htmlFor="name" className="contact__label">
                Full Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="contact__input"
                placeholder="e.g. Eleanor Vance"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span className="contact__error-text" id="name-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="contact__field">
              <label htmlFor="email" className="contact__label">
                Electronic Mail Address <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="contact__input"
                placeholder="e.g. eleanor@example.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span className="contact__error-text" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="contact__field">
              <label htmlFor="message" className="contact__label">
                Message Content <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="contact__textarea"
                placeholder="Please outline your project goals, role requirements, or general message..."
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span className="contact__error-text" id="message-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary contact__submit-btn"
              disabled={status === "submitting"}
            >
              {status === "success" ? (
                <>
                  <FiCheckCircle /> Transmission Successful
                </>
              ) : (
                <>
                  <FiSend /> {status === "submitting" ? "Transmitting..." : "Dispatch Message"}
                </>
              )}
            </button>

            {status === "success" && (
              <div className="contact__success-box" role="status">
                <FiCheckCircle />
                <p>Thank you for reaching out. Your transmission has been dispatched.</p>
              </div>
            )}

            {status === "error" && (
              <div className="contact__error-box" role="alert">
                <FiAlertCircle />
                <div>
                  <p className="contact__error-title">{serverError}</p>
                  <a
                    className="contact__error-direct-link"
                    href={`mailto:${email}?subject=${encodeURIComponent(
                      `Portfolio Inquiry from ${form.name || "Colleague"}`
                    )}&body=${encodeURIComponent(
                      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
                    )}`}
                  >
                    Click here to open your default mail client &rarr;
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
