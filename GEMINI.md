# Project Context: HCDE Designer Portfolio

## 1. Project Overview
This project is a personal portfolio website for an HCDE (Human Centered Design & Engineering) student. The goal is to create a modern, high-fidelity, and performant static website to showcase design case studies. The project translates UI/UX designs (originally from Framer) into a scalable, maintainable frontend codebase.

### Core Technologies
- **Framework:** [Astro](https://astro.build/) (Selected for static content performance and zero-JS default).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid utility-first styling.
- **Language:** TypeScript (Strict mode).
- **Animation:** standard CSS transitions or [Framer Motion](https://www.framer.com/motion/) (integrated via Astro).
- **Deployment:** Optimized for Static Site Generation (SSG) for Vercel or GitHub Pages.

### Architecture
- **Content Separation:** All project data (text, image paths, case study details) must be stored in a dedicated `data/` directory (e.g., `.ts`, `.json`, or Astro content collections via `.mdx`). Avoid hardcoding data into UI components.
- **Modular Components:** The UI should be broken down into reusable components (e.g., `NavBar`, `ProjectCard`, `HeroSection`, `Footer`).

---

## 2. Building and Running

### Development Environment
- **Environment:** Docker Dev Container via WSL2 (Node.js 20).
- **Default Port:** `12233` (This is critical for WSL2/Docker port forwarding).

### Initialization
To initialize the project with the stack (Astro + Tailwind + TypeScript):
```bash
# In the frontend directory
npm create astro@latest -- --template minimal --install --git --typescript strict
# Note: Ensure the dev server is configured to run on port 12233
```


### Key Commands
- **Install Dependencies:** `npm install`
- **Run Development Server:** `npm run dev -- --port 12233` (or equivalent for chosen framework)
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview -- --port 12233`

---

## 3. Development Conventions

### AI Interaction & Developer Persona
- **User Profile:** Experienced backend C/C++ developer (Systems/Database background). Highly proficient in architecture, Docker, and WSL2, but seeks expertise in modern frontend implementation.
- **AI Role:** Act as a Senior Frontend Engineer and UI/UX expert. Focus on best practices for performance, accessibility, and clean component architecture. Explain frontend concepts (CORS, hooks, CSS Grid/Flexbox) clearly, but omit basic programming logic.

### Coding Standards
- **Style:** utility-first CSS via Tailwind.
- **Typing:** Strict TypeScript.
- **Formatting:** Prettier (configured in `.devcontainer/devcontainer.json` to format on save).
- **Linting:** ESLint for code quality.

### Deployment & Maintenance
- **SSG Focus:** Prioritize Static Site Generation for speed and SEO.
- **Minimal Dependencies:** Avoid adding unnecessary third-party libraries to keep the bundle size small and maintenance low.

---

## 4. Execution Guidelines
When working on new components or sections:
1. Provide the specific terminal commands for any needed installations.
2. Provide complete code for the component, ensuring it uses the centralized `data/` store.
3. Briefly explain how the component integrates into the existing layout or routing structure.
