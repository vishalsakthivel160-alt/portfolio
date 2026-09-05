import { db, storage, isFirebaseConfigured } from "../firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { personalInfo } from "../data/personalInfo";
import { featuredProject, otherProjects } from "../data/projects";
import { ecommerceAreas } from "../data/ecommerce";
import { skillCategories } from "../data/skills";
import { freelancingServices } from "../data/freelancing";

// Initial default seeds for fallback/local storage
const defaultProfile = {
  name: personalInfo.name,
  headline: personalInfo.headline,
  shortHeadline: personalInfo.shortHeadline,
  heroDescription: personalInfo.heroDescription,
  aboutText: personalInfo.aboutText.join("\n\n"),
  profileImage: personalInfo.profileImage || null,
};

const defaultContact = {
  email: personalInfo.contact.email,
  phone: personalInfo.contact.phone,
  location: personalInfo.contact.location,
  linkedin: personalInfo.social.linkedin,
  github: personalInfo.social.github,
};

const defaultResume = {
  resumeUrl: personalInfo.resumePath || null,
  fileName: "Vishal-Sakthivel-R-Resume.pdf",
  updatedAt: new Date().toISOString(),
};

const defaultProjects = [
  {
    id: "project-1",
    name: featuredProject.name,
    featured: true,
    description: featuredProject.description,
    technologies: featuredProject.technologies.join(", "),
    githubUrl: featuredProject.githubUrl || "",
    liveUrl: featuredProject.liveUrl || "",
    image: null,
    status: "Active",
  },
  ...otherProjects.map((p, idx) => ({
    id: `project-${idx + 2}`,
    name: p.name,
    featured: false,
    description: p.description,
    technologies: Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies,
    githubUrl: p.githubUrl || "",
    liveUrl: p.liveUrl || "",
    image: null,
    status: "Active",
  })),
];

const defaultProducts = [
  {
    id: "prod-1",
    name: "Custom Web Development Package",
    description: "Full-stack responsive React web application custom designed for your brand.",
    price: 4999,
    discountPrice: 3999,
    stockStatus: "In Stock",
    category: "Services",
    quantity: 10,
    buyNowUrl: "https://wa.me/?text=Hi%20Vishal,%20I'm%20interested%20in%20the%20Web%20Development%20Package",
    status: "Active",
    image: null,
  },
  {
    id: "prod-2",
    name: "Developer Starter Kit Template",
    description: "Modern production-ready Vite + React portfolio template with dark mode & SEO.",
    price: 1499,
    discountPrice: 999,
    stockStatus: "In Stock",
    category: "Digital Products",
    quantity: 50,
    buyNowUrl: "https://wa.me/?text=Hi%20Vishal,%20I'm%20interested%20in%20the%20Developer%20Starter%20Kit",
    status: "Active",
    image: null,
  },
];

// Helper to manage LocalStorage fallback
const getLocal = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(`portfolio_${key}`);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

const setLocal = (key, val) => {
  try {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(val));
    window.dispatchEvent(new Event("portfolio_storage_update"));
  } catch (e) {
    console.error("Local storage error:", e);
  }
};

// -------------------------------------------------------------
// Real-Time Listener Wrappers
// -------------------------------------------------------------

export const subscribeToData = (onUpdate) => {
  if (isFirebaseConfigured() && db) {
    const unsubscribes = [];
    const state = {
      profile: defaultProfile,
      contact: defaultContact,
      resume: defaultResume,
      projects: defaultProjects,
      products: defaultProducts,
    };

    const notify = () => onUpdate({ ...state });

    // Profile listener
    unsubscribes.push(
      onSnapshot(doc(db, "portfolio", "profile"), (snapshot) => {
        if (snapshot.exists()) state.profile = snapshot.data();
        notify();
      })
    );

    // Contact listener
    unsubscribes.push(
      onSnapshot(doc(db, "portfolio", "contact"), (snapshot) => {
        if (snapshot.exists()) state.contact = snapshot.data();
        notify();
      })
    );

    // Resume listener
    unsubscribes.push(
      onSnapshot(doc(db, "portfolio", "resume"), (snapshot) => {
        if (snapshot.exists()) state.resume = snapshot.data();
        notify();
      })
    );

    // Projects listener
    unsubscribes.push(
      onSnapshot(collection(db, "projects"), (snapshot) => {
        state.projects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        notify();
      })
    );

    // Products listener
    unsubscribes.push(
      onSnapshot(collection(db, "products"), (snapshot) => {
        state.products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        notify();
      })
    );

    return () => unsubscribes.forEach((unsub) => unsub());
  } else {
    // LocalStorage mode with window storage event trigger
    const fetchLocalState = () => ({
      profile: getLocal("profile", defaultProfile),
      contact: getLocal("contact", defaultContact),
      resume: getLocal("resume", defaultResume),
      projects: getLocal("projects", defaultProjects),
      products: getLocal("products", defaultProducts),
    });

    onUpdate(fetchLocalState());

    const handleStorageUpdate = () => {
      onUpdate(fetchLocalState());
    };

    window.addEventListener("portfolio_storage_update", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("portfolio_storage_update", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }
};

// -------------------------------------------------------------
// CRUD Operations
// -------------------------------------------------------------

export const updateProfileData = async (data) => {
  if (isFirebaseConfigured() && db) {
    await setDoc(doc(db, "portfolio", "profile"), data, { merge: true });
  } else {
    const current = getLocal("profile", defaultProfile);
    setLocal("profile", { ...current, ...data });
  }
};

export const updateContactData = async (data) => {
  if (isFirebaseConfigured() && db) {
    await setDoc(doc(db, "portfolio", "contact"), data, { merge: true });
  } else {
    const current = getLocal("contact", defaultContact);
    setLocal("contact", { ...current, ...data });
  }
};

export const updateResumeData = async (data) => {
  if (isFirebaseConfigured() && db) {
    await setDoc(doc(db, "portfolio", "resume"), data, { merge: true });
  } else {
    const current = getLocal("resume", defaultResume);
    setLocal("resume", { ...current, ...data });
  }
};

// Projects CRUD
export const addProjectData = async (project) => {
  if (isFirebaseConfigured() && db) {
    await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: new Date().toISOString(),
    });
  } else {
    const list = getLocal("projects", defaultProjects);
    const newProj = { ...project, id: `proj-${Date.now()}` };
    setLocal("projects", [newProj, ...list]);
  }
};

export const updateProjectData = async (id, project) => {
  if (isFirebaseConfigured() && db) {
    await updateDoc(doc(db, "projects", id), project);
  } else {
    const list = getLocal("projects", defaultProjects);
    const updated = list.map((p) => (p.id === id ? { ...p, ...project } : p));
    setLocal("projects", updated);
  }
};

export const deleteProjectData = async (id) => {
  if (isFirebaseConfigured() && db) {
    await deleteDoc(doc(db, "projects", id));
  } else {
    const list = getLocal("projects", defaultProjects);
    const filtered = list.filter((p) => p.id !== id);
    setLocal("projects", filtered);
  }
};

// Products CRUD
export const addProductData = async (product) => {
  if (isFirebaseConfigured() && db) {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: new Date().toISOString(),
    });
  } else {
    const list = getLocal("products", defaultProducts);
    const newProd = { ...product, id: `prod-${Date.now()}` };
    setLocal("products", [newProd, ...list]);
  }
};

export const updateProductData = async (id, product) => {
  if (isFirebaseConfigured() && db) {
    await updateDoc(doc(db, "products", id), product);
  } else {
    const list = getLocal("products", defaultProducts);
    const updated = list.map((p) => (p.id === id ? { ...p, ...product } : p));
    setLocal("products", updated);
  }
};

export const deleteProductData = async (id) => {
  if (isFirebaseConfigured() && db) {
    await deleteDoc(doc(db, "products", id));
  } else {
    const list = getLocal("products", defaultProducts);
    const filtered = list.filter((p) => p.id !== id);
    setLocal("products", filtered);
  }
};

// File & Image Upload Helper
export const uploadMediaFile = async (file, path) => {
  if (isFirebaseConfigured() && storage) {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  } else {
    // Fallback: Convert file to Base64 Data URL for local storage preview
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
};
