import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLock, FiMail, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import "./AdminDashboard.css";

export default function AdminLogin() {
  const { login, isFirebase, adminCreds } = useAuth();
  const [email, setEmail] = useState(adminCreds?.email || "admin@portfolio.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <a href="/" className="admin-login-back">
          <FiArrowLeft /> Back to Website
        </a>

        <div className="admin-login-header">
          <div className="admin-login-icon">
            <FiLock />
          </div>
          <h2>Admin Portal Login</h2>
          <p>Sign in to manage portfolio content, resume, projects, and e-commerce products.</p>
        </div>

        {!isFirebase && (
          <div className="admin-notice-box">
            <strong>🔑 Custom Password Protection Active</strong>
            <p style={{ marginTop: "0.25rem" }}>
              Current credentials: <strong>{adminCreds?.email}</strong> / Password: <strong>{adminCreds?.password}</strong>
              <br />
              <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>You can change your password anytime inside Admin → Security Settings!</span>
            </p>
          </div>
        )}

        {error && (
          <div className="admin-error-box">
            <FiAlertCircle /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label htmlFor="admin-email">Admin Email</label>
            <div className="admin-input-icon-wrapper">
              <FiMail />
              <input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-input-icon-wrapper">
              <FiLock />
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary admin-login-btn" disabled={isSubmitting}>
            {isSubmitting ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
