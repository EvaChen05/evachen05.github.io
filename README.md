# HCDE Designer Portfolio

A modern, high-fidelity personal portfolio website for an HCDE (Human Centered Design & Engineering) student. This project is built with a focus on **Static Site Generation (SSG)** for maximum performance, accessibility, and a minimalist architectural aesthetic.

## 🎨 Design Philosophy
Inspired by minimalist architectural layouts, the site features:
- **Negative Space Typography:** Using layout as a primary design element.
- **Paper-textured Aesthetic:** A clean, high-contrast black-and-white palette.
- **Content-First Architecture:** Separated data store for easy updates of case studies.

## 🛠️ Tech Stack
- **Framework:** [Astro](https://astro.build/) (v6+)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4+)
- **Language:** TypeScript (Strict mode)
- **Deployment:** Optimized for Vercel / GitHub Pages

## 📁 Project Structure
- `frontend/`: The Astro project source code.
- `data/`: Centralized project and content data (TypeScript/JSON).
- `raw-portfolio/`: Original design assets and research documents.
- `public/`: Static assets like resumes and images.

## 🚀 Getting Started

### Prerequisites
- Node.js 22.x or higher
- Docker (if using the Dev Container environment)

### Local Development
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev -- --port 12233
   ```
   The site will be available at `http://localhost:12233`.

### Build for Production
```bash
npm run build
```
The static files will be generated in the `dist/` directory.

## 🌐 Live Site
The portfolio is deployed at: **[URL HERE]**
