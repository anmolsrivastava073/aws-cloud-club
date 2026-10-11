# AWS Student Builder Group MUJ - Official Website ☁️

> **Live Environment:** <https://awscloudclubmuj.vercel.app/>

## 🏗️ Mission & Purpose

The **AWS Student Builder Group at Manipal University Jaipur (MUJ)** is a student-driven community engineered to bridge the gap between theoretical knowledge and production-ready cloud applications. Our community provides a platform where students actively explore AWS technologies, understand how modern, scalable, and highly available systems are built, and gain hands-on experience before entering the industry. We focus on practical learning—from deploying serverless architectures to provisioning backend infrastructure.

## 🗄️ Repository Architecture

Understanding the project topology is crucial for maintaining and updating the website. Here is the primary breakdown of our frontend infrastructure:

```text
/src
 ├── /components       # Reusable modular UI elements
 │    ├── EventCard.tsx   # Renders individual event details and recaps
 │    └── CloudVisual.tsx # Animated cloud architecture visualizations
 │
 ├── /pages            # Main application views
 │    └── LandingPage.tsx # The primary homepage layout
 │
 ├── /types            # TypeScript definitions & schemas
 │    └── index.ts        # Interfaces for Event, Member, and Faculty data models
 │
 └── constants.ts      # 🛑 THE DATA HUB: All events, members, and faculty are stored here.
                       # Edit this state file to update content without touching UI code.

/public                # Static assets exposed to the browser
 ├── /images           # All photographs, headshots, and event recaps
 │    ├── about1.jpeg     
 │    ├── about2.jpeg     
 │    └── newlogo.jpg     # Default placeholder image
 └── /aws              # AWS specific branding assets
      └── aws.svg         # Background architecture grid graphic
```

## ⚙️ Core Infrastructure & Features

### 1. Interactive Cloud Workflows
The "How We Work" section utilizes an interactive dashboard to simulate real cloud architecture diagrams:
* **Discover & Learn:** Compute, storage, and security foundations.
* **Interactive Labs:** Simulated terminal environments and CLI operations.
* **Architect & Build:** Client-to-API-to-Database data packet routing (Serverless).
* **Deploy & Scale:** CI/CD pipeline and global deployment visualizations.

### 2. Builder Slider
The Members section features a highly optimized, infinite-looping horizontal slider representing our builder hierarchy.

### 3. Faculty Grid
A dedicated, responsive grid highlighting our Faculty Coordinators with hover-to-reveal contact integration.

## 💻 Technology Stack

* **Framework:** React + Vite (TypeScript)
* **Styling:** Tailwind CSS (Utility-first styling)
* **Animations:** Framer Motion & Custom Native JS event loops
* **Icons:** Lucide React
* **Hosting:** Vercel (Edge Network)

## 🔄 Content Management & Updates

The entire website is strictly data-driven. **You do not need to modify any React components to update the site data.**

Open **`src/constants.ts`** and modify the respective arrays:

1. **To Provision an Event:** Find the `EVENTS` array and append a new object following the schema.
2. **To Update Builders (Members):** Find the `MEMBERS` array. Add the member's name, position, and category. Ensure their image asset is uploaded to `/public/images/`.
3. **To Update Faculty:** Find the `FACULTY` array to update coordinator parameters.

## 🛠️ Local Setup & Development

To spin up this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize the local development server:**
   ```bash
   npm run dev
   ```
   *The environment will be accessible at `http://localhost:5173`.*

## 👥 Join the Builder Community

If you are an MUJ student and want to contribute to the website (adding features, optimizing performance, or building new components), please reach out to the core team with your GitHub username to be added as a collaborator.