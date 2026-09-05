# Vishal Sakthivel R — Portfolio Website

A modern, responsive personal portfolio built with **React + Vite**, representing Vishal
Sakthivel R as a Computer Science Engineering student, developer, freelancer, and
e-commerce entrepreneur.

---

## 1. Folder structure

```
portfolio/
├── index.html                 # HTML shell, SEO meta tags, fonts
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── resume/
│       └── PLACE_YOUR_RESUME_HERE.txt   # replace with your real resume PDF
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # composes all sections
│   ├── index.css               # design tokens + global styles
│   ├── data/                   # <-- ALL EDITABLE CONTENT LIVES HERE
│   │   ├── personalInfo.js     # name, about text, education, contact, socials, resume path
│   │   ├── navLinks.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   ├── freelancing.js
│   │   ├── ecommerce.js
│   │   └── experience.js
│   ├── hooks/
│   │   ├── useTheme.js         # dark/light mode
│   │   ├── useReveal.js        # scroll-reveal animation
│   │   └── useActiveSection.js # navbar scroll-spy
│   └── components/
│       ├── Navbar.jsx / .css
│       ├── Hero.jsx / .css
│       ├── About.jsx / .css
│       ├── Education.jsx / .css
│       ├── Skills.jsx / .css
│       ├── Projects.jsx / .css
│       ├── Freelancing.jsx / .css
│       ├── Ecommerce.jsx / .css
│       ├── Experience.jsx / .css
│       ├── Resume.jsx / .css
│       ├── Contact.jsx / .css
│       └── Footer.jsx / .css
```

---

## 2. Install dependencies

You'll need [Node.js](https://nodejs.org) (v18+) installed. Then, inside the
`portfolio/` folder, run:

```bash
npm install
```

This installs React, Vite, and `react-icons`.

---

## 3. Run the project locally

```bash
npm run dev
```

Vite will start a local dev server (usually at `http://localhost:5173`). Open that
URL in your browser. The page hot-reloads as you edit files.

To build a production-ready version:

```bash
npm run build
```

This outputs static files into a `dist/` folder. Preview the production build with:

```bash
npm run preview
```

---

## 4. How to replace your profile photo

1. Add your photo file to `src/assets/`, e.g. `src/assets/profile-photo.jpg`.
2. Open `src/data/personalInfo.js` and set:
   ```js
   profileImage: "/src/assets/profile-photo.jpg",
   ```
   (During `npm run build`, you may instead `import profilePhoto from "../assets/profile-photo.jpg"`
   in `Hero.jsx` and pass that import instead of a string path — this is the more
   production-safe approach since Vite will hash and optimize the file. The string
   path above works fine for local development.)
3. Save — the hero section will automatically show your photo instead of the placeholder.

---

## 5. How to replace your resume PDF

1. Rename your resume PDF to `Vishal-Sakthivel-R-Resume.pdf`.
2. Place it inside `public/resume/`, replacing the placeholder text file.
3. The **Resume** buttons throughout the site already point to
   `/resume/Vishal-Sakthivel-R-Resume.pdf` (set in `src/data/personalInfo.js` as
   `resumePath`) — no code changes needed.

---

## 6. How to update your personal information

Almost everything editable lives in `src/data/`:

| What you want to change              | File to edit                     |
|---------------------------------------|-----------------------------------|
| Name, headline, about text            | `src/data/personalInfo.js`       |
| Education (college, location, year)   | `src/data/personalInfo.js`       |
| Contact email / phone / location      | `src/data/personalInfo.js`       |
| GitHub / LinkedIn / email links       | `src/data/personalInfo.js`       |
| Resume file path                      | `src/data/personalInfo.js`       |
| Skills                                | `src/data/skills.js`             |
| Projects (featured + others)          | `src/data/projects.js`           |
| Freelancing services                  | `src/data/freelancing.js`        |
| E-commerce focus areas                | `src/data/ecommerce.js`          |
| Experience & activities timeline      | `src/data/experience.js`         |
| Navigation labels                     | `src/data/navLinks.js`           |

**Important:** placeholders like `[Your College / University Name]`,
`your.email@example.com`, and GitHub/LinkedIn URLs in `personalInfo.js` are
intentionally not filled in — update them with your real details before publishing.

---

## 7. Connecting the contact form to a real email service

The contact form in `src/components/Contact.jsx` currently validates input and
shows a success message, but does **not** send data anywhere (no backend is
configured). Inside `handleSubmit`, you'll find clearly marked, ready-to-uncomment
snippets for:

- **Formspree** — easiest, no extra package needed.
- **EmailJS** — `npm install @emailjs/browser`, then use your service/template/public keys.
- **Your own backend** — a plain `fetch` POST to an API you control.

Pick one, uncomment/adjust the corresponding block, and remove the simulated
`setTimeout` delay.

---

## 8. Deployment

This is a static Vite build, so it deploys anywhere that serves static files:

### Vercel
```bash
npm install -g vercel
vercel
```
Follow the prompts (framework preset: Vite).

### Netlify
1. Push the project to a GitHub repo.
2. In Netlify: "Add new site" → "Import an existing project" → select the repo.
3. Build command: `npm run build` — Publish directory: `dist`.

### GitHub Pages
1. `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "homepage": "https://<your-username>.github.io/<repo-name>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy`.

---

## 9. Notes on content accuracy

Per the original brief, this project intentionally avoids inventing:
college name, phone number, email address, social media URLs, certifications,
awards, employment history, revenue/sales figures, or fake achievements.
All such fields are left as clearly marked placeholders (e.g. `[Your College Name]`)
for you to fill in with accurate information.
