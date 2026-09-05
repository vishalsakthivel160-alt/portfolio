import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import {
  FiGrid,
  FiUser,
  FiFileText,
  FiFolder,
  FiShoppingBag,
  FiMail,
  FiSettings,
  FiLogOut,
  FiUpload,
  FiTrash2,
  FiEdit,
  FiPlus,
  FiCheckCircle,
  FiExternalLink,
  FiX,
  FiEye,
  FiDatabase,
  FiLock,
  FiKey,
} from "react-icons/fi";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { logout, currentUser, isFirebase, adminCreds, updateAdminCredentials } = useAuth();
  const {
    profile,
    contact,
    resume,
    projects,
    products,
    updateProfile,
    updateContact,
    updateResume,
    addProject,
    updateProject,
    deleteProject,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadFile,
  } = useData();

  const [activeTab, setActiveTab] = useState("overview");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isUploading, setIsUploading] = useState(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState(profile || {});
  const [photoPreview, setPhotoPreview] = useState(profile?.profileImage || null);

  // Contact Form state
  const [contactForm, setContactForm] = useState(contact || {});

  // Custom Password / Security state
  const [securityForm, setSecurityForm] = useState({
    email: adminCreds?.email || "admin@portfolio.com",
    password: adminCreds?.password || "admin123",
  });

  // Project Modal / Form state
  const [projectModal, setProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    status: "Active",
    image: "",
    featured: false,
  });

  // Product Modal / Form state
  const [productModal, setProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    stockStatus: "In Stock",
    category: "Services",
    quantity: 10,
    buyNowUrl: "",
    status: "Active",
    image: "",
  });

  const showNotify = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "profile" && profile) {
      setProfileForm(profile);
      setPhotoPreview(profile.profileImage);
    }
    if (tab === "contact" && contact) {
      setContactForm(contact);
    }
    if (tab === "settings" && adminCreds) {
      setSecurityForm({ email: adminCreds.email, password: adminCreds.password });
    }
  };

  // Save Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      showNotify("Profile updated successfully!");
    } catch (err) {
      showNotify("Failed to update profile: " + err.message, "error");
    }
  };

  // Photo Upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotify("Please select a valid image file (JPG, PNG, WebP).", "error");
      return;
    }

    try {
      setIsUploading(true);
      const url = await uploadFile(file, "profile_photos");
      setPhotoPreview(url);
      setProfileForm((prev) => ({ ...prev, profileImage: url }));
      await updateProfile({ profileImage: url });
      showNotify("Profile photo uploaded and saved!");
    } catch (err) {
      showNotify("Photo upload failed: " + err.message, "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Resume Upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      showNotify("Resume file must be a PDF document.", "error");
      return;
    }

    try {
      setIsUploading(true);
      const url = await uploadFile(file, "resumes");
      const resumeData = {
        resumeUrl: url,
        fileName: file.name,
        updatedAt: new Date().toISOString(),
      };
      await updateResume(resumeData);
      showNotify("Resume PDF uploaded successfully!");
    } catch (err) {
      showNotify("Resume upload failed: " + err.message, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (window.confirm("Are you sure you want to remove the current resume PDF?")) {
      await updateResume({ resumeUrl: null, fileName: null, updatedAt: null });
      showNotify("Resume removed.");
    }
  };

  // Save Contact
  const handleSaveContact = async (e) => {
    e.preventDefault();
    try {
      await updateContact(contactForm);
      showNotify("Contact information & email key saved!");
    } catch (err) {
      showNotify("Failed to save contact info: " + err.message, "error");
    }
  };

  // Save Custom Admin Password & Credentials
  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (!securityForm.password || securityForm.password.length < 6) {
      showNotify("Password must be at least 6 characters long.", "error");
      return;
    }
    updateAdminCredentials(securityForm.email, securityForm.password);
    showNotify("Admin login credentials & password updated successfully!");
  };

  // Project Handlers
  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm(proj);
    } else {
      setEditingProject(null);
      setProjectForm({
        name: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
        status: "Active",
        image: "",
        featured: false,
      });
    }
    setProjectModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.name.trim() || !projectForm.description.trim()) {
      showNotify("Project name and description are required.", "error");
      return;
    }

    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectForm);
        showNotify("Project updated successfully!");
      } else {
        await addProject(projectForm);
        showNotify("Project added successfully!");
      }
      setProjectModal(false);
    } catch (err) {
      showNotify("Error saving project: " + err.message, "error");
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      showNotify("Project deleted.");
    }
  };

  // Product Handlers
  const handleOpenProductModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm(prod);
    } else {
      setEditingProduct(null);
      setProductForm({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        stockStatus: "In Stock",
        category: "Services",
        quantity: 10,
        buyNowUrl: "",
        status: "Active",
        image: "",
      });
    }
    setProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name.trim() || !productForm.price || !productForm.buyNowUrl.trim()) {
      showNotify("Product name, price, and Buy Now URL are required.", "error");
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productForm);
        showNotify("Product updated successfully!");
      } else {
        await addProduct(productForm);
        showNotify("Product added successfully!");
      }
      setProductModal(false);
    } catch (err) {
      showNotify("Error saving product: " + err.message, "error");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      showNotify("Product deleted.");
    }
  };

  const handleToggleProductStatus = async (prod) => {
    const nextStatus = prod.status === "Active" ? "Inactive" : "Active";
    await updateProduct(prod.id, { status: nextStatus });
    showNotify(`Product status updated to ${nextStatus}.`);
  };

  return (
    <div className="admin-container">
      {/* Top Notification Toast */}
      {notification.message && (
        <div className={`admin-toast admin-toast--${notification.type}`}>
          <FiCheckCircle /> {notification.message}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="brand-mark">VS</div>
          <div>
            <h3>Admin Portal</h3>
            <span>{isFirebase ? "Firebase Live" : "Local Mode (Custom Pass)"}</span>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === "overview" ? "is-active" : ""}`}
            onClick={() => handleTabChange("overview")}
          >
            <FiGrid /> Overview
          </button>
          <button
            className={`admin-nav-item ${activeTab === "profile" ? "is-active" : ""}`}
            onClick={() => handleTabChange("profile")}
          >
            <FiUser /> Profile & Photo
          </button>
          <button
            className={`admin-nav-item ${activeTab === "resume" ? "is-active" : ""}`}
            onClick={() => handleTabChange("resume")}
          >
            <FiFileText /> Resume PDF
          </button>
          <button
            className={`admin-nav-item ${activeTab === "projects" ? "is-active" : ""}`}
            onClick={() => handleTabChange("projects")}
          >
            <FiFolder /> Projects ({projects.length})
          </button>
          <button
            className={`admin-nav-item ${activeTab === "products" ? "is-active" : ""}`}
            onClick={() => handleTabChange("products")}
          >
            <FiShoppingBag /> E-Commerce ({products.length})
          </button>
          <button
            className={`admin-nav-item ${activeTab === "contact" ? "is-active" : ""}`}
            onClick={() => handleTabChange("contact")}
          >
            <FiMail /> Contact & Email
          </button>
          <button
            className={`admin-nav-item ${activeTab === "settings" ? "is-active" : ""}`}
            onClick={() => handleTabChange("settings")}
          >
            <FiSettings /> Security & Password
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-view-site-btn">
            <FiExternalLink /> View Live Website
          </a>
          <button onClick={logout} className="admin-logout-btn">
            <FiLogOut /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "profile" && "Profile & Headline Management"}
            {activeTab === "resume" && "Resume Management"}
            {activeTab === "projects" && "Projects Management"}
            {activeTab === "products" && "E-Commerce Product Management"}
            {activeTab === "contact" && "Contact Info & Email Inbox Setup"}
            {activeTab === "settings" && "Security & Custom Password Settings"}
          </h2>
          <div className="admin-user-pill">
            <FiUser /> {currentUser?.email || "Admin User"}
          </div>
        </header>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="admin-content">
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="stat-icon stat-icon--blue">
                  <FiFolder />
                </div>
                <div>
                  <span className="stat-label">Total Projects</span>
                  <h3 className="stat-val">{projects.length}</h3>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon stat-icon--green">
                  <FiShoppingBag />
                </div>
                <div>
                  <span className="stat-label">Active Products</span>
                  <h3 className="stat-val">
                    {products.filter((p) => p.status === "Active").length}
                  </h3>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon stat-icon--purple">
                  <FiFileText />
                </div>
                <div>
                  <span className="stat-label">Resume Status</span>
                  <h3 className="stat-val">{resume?.resumeUrl ? "Uploaded" : "Pending"}</h3>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon stat-icon--amber">
                  <FiDatabase />
                </div>
                <div>
                  <span className="stat-label">Admin Security</span>
                  <h3 className="stat-val">Custom Password Set</h3>
                </div>
              </div>
            </div>

            <div className="admin-card mt-6">
              <h3>Quick Actions</h3>
              <p>Direct shortcuts to update your public portfolio in real-time:</p>
              <div className="admin-quick-actions">
                <button className="btn btn-outline" onClick={() => handleTabChange("profile")}>
                  <FiUser /> Edit Bio & Photo
                </button>
                <button className="btn btn-outline" onClick={() => handleTabChange("resume")}>
                  <FiUpload /> Upload Resume PDF
                </button>
                <button className="btn btn-outline" onClick={() => handleOpenProjectModal()}>
                  <FiPlus /> Add New Project
                </button>
                <button className="btn btn-outline" onClick={() => handleOpenProductModal()}>
                  <FiPlus /> Add E-Commerce Product
                </button>
                <button className="btn btn-outline" onClick={() => handleTabChange("settings")}>
                  <FiLock /> Change Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="admin-content">
            <div className="admin-grid-2col">
              <div className="admin-card">
                <h3>Profile Photo</h3>
                <p>Upload a clean photo from your device. It updates Hero & About instantly.</p>
                <div className="admin-photo-preview-wrapper">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile preview" className="admin-photo-preview" />
                  ) : (
                    <div className="admin-photo-placeholder">No photo uploaded</div>
                  )}
                </div>

                <label className="btn btn-primary admin-upload-lbl">
                  <FiUpload /> {isUploading ? "Uploading..." : "Upload New Photo"}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden disabled={isUploading} />
                </label>
              </div>

              <div className="admin-card">
                <h3>Personal Information</h3>
                <form onSubmit={handleSaveProfile} className="admin-form">
                  <div className="admin-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-field">
                    <label>Short Headline (Hero Subtitle)</label>
                    <input
                      type="text"
                      value={profileForm.shortHeadline || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, shortHeadline: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>Full Headline</label>
                    <input
                      type="text"
                      value={profileForm.headline || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>Hero Description</label>
                    <textarea
                      rows={3}
                      value={profileForm.heroDescription || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, heroDescription: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>About Me Bio</label>
                    <textarea
                      rows={5}
                      value={profileForm.aboutText || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, aboutText: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Save Profile Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* RESUME TAB */}
        {activeTab === "resume" && (
          <div className="admin-content">
            <div className="admin-card">
              <h3>Resume Management</h3>
              <p>Upload your official resume PDF. Visitors will be able to view or download it directly.</p>

              <div className="admin-resume-status-box">
                {resume?.resumeUrl ? (
                  <div className="admin-resume-info">
                    <FiFileText className="pdf-icon" />
                    <div>
                      <strong>{resume.fileName || "Uploaded Resume PDF"}</strong>
                      <p>Last updated: {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : "Recently"}</p>
                    </div>
                    <div className="admin-resume-actions">
                      <a href={resume.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                        <FiEye /> View PDF
                      </a>
                      <button onClick={handleDeleteResume} className="btn btn-ghost btn-sm text-red">
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="admin-empty-state">
                    <p>No resume uploaded yet. Public website will show "Resume coming soon".</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label className="btn btn-primary admin-upload-lbl">
                  <FiUpload /> {isUploading ? "Uploading PDF..." : "Upload / Replace Resume PDF"}
                  <input type="file" accept="application/pdf" onChange={handleResumeUpload} hidden disabled={isUploading} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="admin-content">
            <div className="admin-flex-between mb-4">
              <h3>Project Showcase ({projects.length})</h3>
              <button className="btn btn-primary" onClick={() => handleOpenProjectModal()}>
                <FiPlus /> Add New Project
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Technologies</th>
                    <th>GitHub</th>
                    <th>Live Demo</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center">No projects added yet.</td>
                    </tr>
                  ) : (
                    projects.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <strong>{p.name}</strong>
                          {p.featured && <span className="admin-badge badge-blue ml-2">Featured</span>}
                        </td>
                        <td>{p.technologies}</td>
                        <td>
                          {p.githubUrl ? (
                            <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-link">
                              Repo <FiExternalLink />
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>
                          {p.liveUrl ? (
                            <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-link">
                              Live <FiExternalLink />
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>
                          <div className="admin-table-actions">
                            <button className="btn-icon" onClick={() => handleOpenProjectModal(p)} title="Edit">
                              <FiEdit />
                            </button>
                            <button className="btn-icon text-red" onClick={() => handleDeleteProject(p.id)} title="Delete">
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* E-COMMERCE TAB */}
        {activeTab === "products" && (
          <div className="admin-content">
            <div className="admin-flex-between mb-4">
              <h3>Product Showcase ({products.length})</h3>
              <button className="btn btn-primary" onClick={() => handleOpenProductModal()}>
                <FiPlus /> Add New Product
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Status</th>
                    <th>Buy Now Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">No products added yet.</td>
                    </tr>
                  ) : (
                    products.map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          <strong>{prod.name}</strong>
                          <span className="block text-sm text-gray">{prod.category}</span>
                        </td>
                        <td>₹{prod.price}</td>
                        <td>{prod.discountPrice ? `₹${prod.discountPrice}` : "—"}</td>
                        <td>
                          <button
                            className={`admin-badge ${
                              prod.status === "Active" ? "badge-green" : "badge-gray"
                            }`}
                            onClick={() => handleToggleProductStatus(prod)}
                          >
                            {prod.status}
                          </button>
                        </td>
                        <td>
                          <a href={prod.buyNowUrl} target="_blank" rel="noreferrer" className="text-link">
                            Buy Link <FiExternalLink />
                          </a>
                        </td>
                        <td>
                          <div className="admin-table-actions">
                            <button className="btn-icon" onClick={() => handleOpenProductModal(prod)} title="Edit">
                              <FiEdit />
                            </button>
                            <button className="btn-icon text-red" onClick={() => handleDeleteProduct(prod.id)} title="Delete">
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === "contact" && (
          <div className="admin-content">
            <div className="admin-card">
              <h3>Contact Info & Social Links</h3>
              <p>Update your contact details displayed across the public footer & contact section.</p>

              <form onSubmit={handleSaveContact} className="admin-form mt-4">
                <div className="admin-field">
                  <label>Your Personal Email Address (Publicly Visible)</label>
                  <input
                    type="email"
                    value={contactForm.email || ""}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-field">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={contactForm.phone || ""}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>Location / City</label>
                  <input
                    type="text"
                    value={contactForm.location || ""}
                    onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>LinkedIn URL</label>
                  <input
                    type="url"
                    value={contactForm.linkedin || ""}
                    onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>GitHub Profile URL</label>
                  <input
                    type="url"
                    value={contactForm.github || ""}
                    onChange={(e) => setContactForm({ ...contactForm, github: e.target.value })}
                  />
                </div>

                <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)", margin: "1.5rem 0" }} />

                <h3>📬 Receive Visitor Messages Directly to Your Email Inbox</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                  To receive messages from website visitors directly in your email inbox, paste your 100% Free <strong>Web3Forms Access Key</strong> below:
                </p>

                <div className="admin-field">
                  <label>Web3Forms Access Key (Optional for Direct Inbox Delivery)</label>
                  <input
                    type="text"
                    placeholder="e.g. 12345678-abcd-1234-abcd-1234567890ab"
                    value={contactForm.accessKey || ""}
                    onChange={(e) => setContactForm({ ...contactForm, accessKey: e.target.value })}
                  />
                  <span style={{ fontSize: "0.8rem", color: "#38bdf8", marginTop: "0.25rem" }}>
                    👉 Get a free instant key by entering your email at{" "}
                    <a href="https://web3forms.com" target="_blank" rel="noreferrer" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                      web3forms.com
                    </a>
                  </span>
                </div>

                <button type="submit" className="btn btn-primary">
                  Save Contact & Email Settings
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="admin-content">
            <div className="admin-card">
              <h3>🔒 Custom Admin Password & Login Email</h3>
              <p>Set your own custom password for logging into the Admin Dashboard (`/admin`):</p>

              <form onSubmit={handleSaveSecurity} className="admin-form mt-4">
                <div className="admin-field">
                  <label>Admin Login Email</label>
                  <input
                    type="email"
                    value={securityForm.email}
                    onChange={(e) => setSecurityForm({ ...securityForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-field">
                  <label>New Custom Password (Min 6 characters)</label>
                  <input
                    type="password"
                    placeholder="Enter your new custom password"
                    value={securityForm.password}
                    onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update Admin Password
                </button>
              </form>
            </div>

            <div className="admin-card">
              <h3>Firebase Connection & Status</h3>
              <div className="admin-status-indicator">
                Status: <strong>{isFirebase ? "🟢 Connected to Firebase Cloud" : "🟡 Running in Local Storage Mode (Custom Password Enabled)"}</strong>
              </div>
              <p className="mt-2">
                {isFirebase
                  ? "Your admin dashboard is currently syncing directly to Cloud Firestore & Firebase Storage in real-time!"
                  : "To connect to live Firebase, add your credentials into the .env file as outlined in FIREBASE_SETUP.md."}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* PROJECT MODAL */}
      {projectModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h4>{editingProject ? "Edit Project" : "Add New Project"}</h4>
              <button onClick={() => setProjectModal(false)} className="btn-icon">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="admin-form mt-4">
              <div className="admin-field">
                <label>Project Name *</label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-field">
                <label>Description *</label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                />
              </div>

              <div className="admin-field">
                <label>Technologies Used (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, Tailwind, Firebase"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                />
              </div>

              <div className="admin-field">
                <label>GitHub Repository URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={projectForm.githubUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                />
              </div>

              <div className="admin-field">
                <label>Live Demo URL</label>
                <input
                  type="url"
                  placeholder="https://my-demo.com"
                  value={projectForm.liveUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setProjectModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProject ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {productModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h4>{editingProduct ? "Edit Product" : "Add New Product"}</h4>
              <button onClick={() => setProductModal(false)} className="btn-icon">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="admin-form mt-4">
              <div className="admin-field">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-field">
                <label>Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-field">
                  <label>Discount Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.discountPrice}
                    onChange={(e) => setProductForm({ ...productForm, discountPrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-field">
                <label>Buy Now / Order URL *</label>
                <input
                  type="url"
                  placeholder="https://wa.me/... or payment link"
                  value={productForm.buyNowUrl}
                  onChange={(e) => setProductForm({ ...productForm, buyNowUrl: e.target.value })}
                  required
                />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setProductModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
