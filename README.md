# AWS Student Builder Group MUJ - Official Website ☁️🚀

![Live Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer&logoColor=blue)

> **Live Website:** [https://awscloudclubmuj.vercel.app/](https://awscloudclubmuj.vercel.app/)

The official website for the **AWS Student Builder Group at Manipal University Jaipur (MUJ)**. This platform serves as the central hub for our student-led community to showcase upcoming cloud workshops, highlight our core team and faculty, and document our hands-on technical workflows.

## ✨ Key Features

* **Interactive Cloud Workflows:** A dynamic, auto-cycling visualization dashboard explaining our step-by-step process (Discover → Lab → Architect → Deploy).
* **Cinematic Infinite Slider:** A custom, math-driven, seamless infinite looping slider for the Team Members section featuring click-and-drag interactions and hover-to-pause functionality.
* **Animated Hero Section:** Deep gradient background graphics with floating, continuous-loop AWS architecture icons.
* **Data-Driven Architecture:** All events, faculty details, and member profiles are strictly isolated in a single configuration file (`constants.ts`) for effortless updates without touching UI components.
* **Fully Responsive:** Optimized for desktop, tablet, and mobile views using Tailwind CSS.

## 🛠️ Tech Stack

* **Framework:** React (TypeScript)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion (UI transitions) & Custom Native JS (Infinite Scroll)
* **Icons:** Lucide React
* **Hosting/Deployment:** Vercel

## 🚀 Getting Started (Local Development)

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and Git installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be running at `http://localhost:5173` (or the port specified in your terminal).

## 📝 How to Update Content (For Maintainers)

The website is fully data-driven. You do not need to touch the complex animation logic or UI components to update the site's content.

All data is stored in **`src/constants.ts`**.

* **To add/remove an Event:** Locate the `EVENTS` array in `constants.ts`. Add a new object following the `Event` interface structure, or simply delete an existing object block to remove it from the live site.
* **To update Team Members:** Locate the `MEMBERS` array. Add the new member's name, position, category, and image path. The slider will automatically calculate the new layout and maintain the infinite loop.
* **To update Faculty:** Edit the `FACULTY` array.

*Note: All images should be placed inside the `public/images/` directory.*

## 🤝 Contributing

We welcome contributions from all MUJ students! Whether you want to fix a bug, improve animations, or add a new feature (like a blog or resource repository), we'd love your help.

1. Reach out to the repository admin to be added as a **Collaborator**.
2. **Pull the latest changes** before you start working:
   ```bash
   git pull origin main
   ```
3. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-amazing-feature
   ```
4. Commit your changes:
   ```bash
   git commit -m "feat: added an amazing new feature"
   ```
5. Push to the branch:
   ```bash
   git push origin feature/your-amazing-feature
   ```
6. Open a **Pull Request** on GitHub for review.

## 🌐 Deployment

This project is configured for seamless deployment via Vercel. Any code pushed to the `main` branch will automatically trigger a production build.

```bash
git add .
git commit -m "update: deployed latest changes"
git push origin main
```

---
*Built by the AWS Student Builder Group MUJ Team.* ☁️
