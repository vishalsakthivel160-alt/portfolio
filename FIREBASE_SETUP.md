# Firebase Integration & Deployment Setup Guide

Your portfolio is fully configured to run with **Firebase (Authentication, Firestore Database, Firebase Storage)** while supporting a seamless **Offline / Local Storage Fallback** mode out-of-the-box!

---

## 1. Quick Start (Running Locally right now)

You can run the app immediately!

```bash
npm run dev
```

- **Public Portfolio Website**: `http://localhost:5173/`
- **Admin Dashboard Portal**: `http://localhost:5173/admin` (or navigate directly to `/admin/login`)

> In Local Fallback mode (when `.env` is not set), you can log in with any valid email and a 6+ character password to test and use all Admin Dashboard features locally!

---

## 2. Firebase Setup (To Connect Live Cloud)

Follow these steps to connect your portfolio to your live Firebase project:

### Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it `vishal-portfolio` (or your choice).

### Step 2: Enable Firebase Authentication
1. In the left menu, click **Build** -> **Authentication**.
2. Click **Get Started** -> Choose **Email/Password**.
3. Enable **Email/Password** and click **Save**.
4. Go to the **Users** tab -> Click **Add User** to create your Admin email and password.

### Step 3: Enable Firestore Database
1. Click **Build** -> **Firestore Database** -> Click **Create Database**.
2. Start in **Production Mode**.
3. Copy the contents of `firestore.rules` into the **Rules** tab in the Firebase Console and click **Publish**.

### Step 4: Enable Firebase Storage
1. Click **Build** -> **Storage** -> Click **Get Started**.
2. Copy the contents of `storage.rules` into the **Rules** tab in the Firebase Console and click **Publish**.

### Step 5: Copy Config into `.env`
1. Go to **Project Settings** -> **General** -> **Your apps** -> Click the **Web (`</>`)** icon.
2. Register your app name.
3. Copy the `firebaseConfig` keys into a new `.env` file in your root folder:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

4. Restart your development server (`npm run dev`). Your Admin dashboard and public portfolio will now automatically read, write, and sync with live Firebase Firestore & Storage in real-time!

---

## 3. How to Use the Admin Dashboard (`/admin`)

- **Profile & Photo**: Update your full name, headlines, hero description, bio, and upload a profile photo from your device.
- **Resume Management**: Upload your official resume PDF. The public site will render both **View Resume** (opens in new tab) and **Download Resume** buttons.
- **Projects Showcase**: Add, edit, or delete projects with project title, description, tech stack tags, image, GitHub repository URL, and Live Demo URL.
- **E-Commerce Products**: Add, edit, delete, or toggle products with price (₹), discount price, stock status, category, and functional **Buy Now** links (WhatsApp order link, marketplace URL, or payment page).
- **Contact Info**: Edit Email (`mailto:`), Phone (`tel:`), Location, LinkedIn URL, and GitHub URL.
