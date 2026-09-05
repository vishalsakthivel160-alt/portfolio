import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useData } from "../context/DataContext";
import { useReveal } from "../hooks/useReveal";
import "./Contact.css";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const { contact } = useData();
  const { ref, isVisible } = useReveal();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMsg, setServerMsg] = useState("");

  const email = contact?.email || "your.email@example.com";
  const phone = contact?.phone || "+91 00000 00000";
  const location = contact?.location || "[Your City, India]";
  const github = contact?.github || "https://github.com";
  const linkedin = contact?.linkedin || "https://linkedin.com";
  const accessKey = contact?.accessKey || "";

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerMsg("");

    try {
      if (accessKey) {
        // Submit directly to Web3Forms to send email straight to user's inbox
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            name: form.name,
            email: form.email,
            message: form.message,
            subject: `New Portfolio Message from ${form.name}`,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setStatus("success");
          setServerMsg("Message sent successfully! I will receive it directly in my inbox.");
          setForm(initialForm);
        } else {
          throw new Error(data.message || "Failed to send email.");
        }
      } else {
        // Fallback: Open mailto client directly with pre-filled message so email gets sent
        const mailtoUri = `mailto:${email}?subject=${encodeURIComponent(
          `Portfolio Contact from ${form.name}`
        )}&body=${encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        )}`;
        window.location.href = mailtoUri;

        setStatus("success");
        setServerMsg(`Opening mail client to send message directly to ${email}!`);
        setForm(initialForm);
      }
    } catch (err) {
      setStatus("error");
      setServerMsg(err.message || "Something went wrong sending your message.");
    } finally {
      setTimeout(() => {
        if (status === "success") setStatus("idle");
      }, 5000);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">09 · Contact</span>
          <h2 className="section-title">Get in touch</h2>
          <p className="section-desc">
            Open to internships, freelance projects, and opportunities to connect.
          </p>
        </div>

        <div ref={ref} className="contact__grid">
          <div className={`contact__info reveal ${isVisible ? "is-visible" : ""}`}>
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
            className={`contact__form card reveal ${isVisible ? "is-visible" : ""}`}
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
                  <FiSend /> {status === "submitting" ? "Sending Email..." : "Send Message"}
                </>
              )}
            </button>

            {serverMsg && (
              <p className={`contact__success-note ${status === "error" ? "text-red" : ""}`} role="status">
                {serverMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
