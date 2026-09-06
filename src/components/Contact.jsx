import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
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
  const github = profile.social.github;
  const linkedin = profile.social.linkedin;

  const validate = (values) => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) {
      next.message = "Please enter a message.";
    } else if (values.message.trim().length < 10) {
      next.message = "Message should be at least 10 characters.";
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
        "Email service key missing. Please configure VITE_WEB3FORMS_ACCESS_KEY in your environment variables (.env file)."
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
          subject: `New Portfolio Message from ${form.name.trim()}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const res = await response.json();
      if (response.ok && res.success) {
        setStatus("success");
        setForm(initialForm);
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setServerError(res.message || "Failed to send message via email service. Please try again.");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setStatus("error");
      setServerError("Network connection error. Please check your internet connection and try again.");
    }
  };

  return (
    <section id="contact" ref={ref} className="section contact">
      <div className="container">
        <div className="section-head reveal" style={{ transitionDelay: "0ms" }}>
          <span className="section-kicker">09 · Contact</span>
          <h2 className="section-title">Get in touch</h2>
          <p className="section-desc">
            Open to internships, freelance projects, and opportunities to connect.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__info reveal" style={{ transitionDelay: "120ms" }}>
            <a className="contact__info-row" href={`mailto:${email}`}>
              <FiMail />
              <div>
                <span>Email</span>
                <strong>{email}</strong>
              </div>
            </a>
            <a className="contact__info-row" href={`tel:${phone}`}>
              <FiPhone />
              <div>
                <span>Phone</span>
                <strong>{phone}</strong>
              </div>
            </a>
            <div className="contact__info-row">
              <FiMapPin />
              <div>
                <span>Location</span>
                <strong>{location}</strong>
              </div>
            </div>

            <div className="contact__socials">
              {github && (
                <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <FiGithub />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                  <FiLinkedin />
                </a>
              )}
              <a href={`mailto:${email}`} aria-label="Send an email">
                <FiMail />
              </a>
            </div>
          </div>

          <form
            className="contact__form card reveal"
            style={{ transitionDelay: "200ms" }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="contact__field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span className="contact__error" id="name-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span className="contact__error" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span className="contact__error" id="message-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-primary contact__submit" disabled={status === "submitting"}>
              {status === "success" ? (
                <>
                  <FiCheckCircle /> Message Sent!
                </>
              ) : (
                <>
                  <FiSend /> {status === "submitting" ? "Sending..." : "Send Message"}
                </>
              )}
            </button>

            {status === "success" && (
              <p className="contact__success-note" role="status">
                Thanks for reaching out! Your message has been sent successfully to {email}.
              </p>
            )}

            {status === "error" && (
              <div className="contact__error-banner" role="alert">
                <FiAlertCircle />
                <div>
                  <p className="contact__error-title">{serverError || "Failed to send message."}</p>
                  <p className="contact__error-subtext">
                    Alternatively, you can email directly at{" "}
                    <a
                      href={`mailto:${email}?subject=${encodeURIComponent(
                        `Portfolio Contact from ${form.name || "Visitor"}`
                      )}&body=${encodeURIComponent(
                        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
                      )}`}
                    >
                      {email}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

