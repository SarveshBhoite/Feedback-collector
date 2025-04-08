# Feedback-collector

Got you! 🔥  
You need a **proper README** that clearly explains:

- Project structure 📂  
- Tech stack 🛠️  
- Deployment steps 🚀

Let’s write the **perfect README.md** for your submission right now:

---

# 📋 Feedback Collector Application

A fully responsive Feedback Collector App built with **Next.js** and **Tailwind CSS**, deployed on **Netlify**.  
It allows users to submit feedback and provides an admin view to display all submitted feedbacks in a clean card layout.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Netlify Functions](https://docs.netlify.com/functions/overview/)
- **Hosting**: [Netlify](https://netlify.com)

## 🚀 Deployment Steps

### 1. Clone the Repository
```bash
git clone https://github.com/SarveshBhoite/Feedback-collector.git
cd Feedback-collector
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

### 4. Deploy on Netlify
- Connect your GitHub repository to Netlify.
- Set **Build Command**: 
  ```bash
  npm run build
  ```
- Set **Publish Directory**:
  ```
  .next
  ```
- Set environment variables if required.
- Click **Deploy**.

After successful deployment, you will get a live Netlify link like:
> feedbackcollect.netlify.app

---

## ✨ Features

- User-friendly Feedback Form (Name, Email Validation, Feedback Message)
- Loading spinner on form submission
- Toggle button to switch between Feedback Form and Admin View
- Admin View shows submitted feedbacks with Name, Email, Message, and Timestamp
- Responsive Design (Mobile, Tablet, Desktop)
- Dark/Light Theme Toggle
- Smooth Transitions and Micro Animations
- Footer Watermark: "Created by Sarvesh Bhoite | Internship Submission"

---

## 📄 Footer

> Created by **Sarvesh Bhoite** | Internship Submission
