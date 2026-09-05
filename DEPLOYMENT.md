# How to Deploy Your Portfolio Website

Your project is fully prepared for instant production deployment with pre-configured single-page application (SPA) rewrite rules (`vercel.json`, `netlify.toml`, `public/_redirects`).

---

## Option 1: Deploy to Vercel (Recommended - Free)

### Method A: Using Command Line (Fastest)
Run the following command in your terminal inside the project directory:

```bash
npx vercel
```

1. Press `Y` to set up and deploy.
2. Select your Vercel account or log in via browser.
3. Accept default project settings.
4. Once deployed, run `npx vercel --prod` for production!

### Method B: Via Vercel Dashboard (GitHub)
1. Push your code to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and click **Import Repository**.
3. Click **Deploy**. Vercel will automatically build and deploy your site with a free SSL domain (e.g., `https://vishal-portfolio.vercel.app`).

---

## Option 2: Deploy to Netlify (Drag & Drop or CLI)

### Method A: Drag & Drop (Easiest - 30 seconds)
1. Run `npm run build` in your terminal to generate the `dist` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist` folder directly onto the page. Your site will be live instantly!

### Method B: Using Netlify CLI
```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

---

## Option 3: Deploy to Firebase Hosting

If you are using Firebase for Firestore & Storage:

1. Log in to Firebase:
   ```bash
   npx firebase-tools login
   ```
2. Initialize Firebase Hosting in project root:
   ```bash
   npx firebase-tools init hosting
   ```
   - Set public directory to: `dist`
   - Configure as a single-page app: `Yes`
3. Build and Deploy:
   ```bash
   npm run build
   npx firebase-tools deploy --only hosting
   ```

---

## 🔒 Post-Deployment Admin Access

Once deployed to any of the above options:
- **Public Portfolio URL**: `https://your-app-name.vercel.app`
- **Admin Dashboard URL**: `https://your-app-name.vercel.app/admin` (or click `Admin 🔒` link in footer)
