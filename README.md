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

## Maid Cafe standalone page

The independent React + Vite repository [EvaChen05/maid_cafe](https://github.com/EvaChen05/maid_cafe)
is included as a Git submodule at `apps/maid-cafe/` and served at
**`/projects/maid-cafe/`** with its own UI and styles.

Clone this portfolio with its submodules:

```sh
git clone --recurse-submodules <portfolio-repository-url>
```

For an existing checkout, initialize the submodule and install dependencies:

```sh
git submodule update --init --recursive
npm --prefix apps/maid-cafe ci
npm --prefix frontend ci
```

The frontend `npm run dev` and `npm run build` commands build Maid Cafe
automatically. `scripts/build-maid-cafe.mjs` passes the deployment base path to
Vite without modifying the submodule source. It copies static assets to
`frontend/public/projects/maid-cafe/`, and the Astro route renders the built
HTML independently of the portfolio layout. GitHub Pages checks out the pinned
submodule commit and includes the app in the same deployment. Because Maid Cafe
is private, add the `MAID_CAFE_READ_TOKEN` Actions secret to the portfolio
repository: use a fine-grained GitHub token scoped to `EvaChen05/maid_cafe` with
Contents read-only permission. The workflow uses it only for the app checkout;
it is never included in the website build output.

For live development of Maid Cafe alone:

```sh
npm --prefix apps/maid-cafe run dev -- --base /projects/maid-cafe/
```

Visit `http://localhost:5173/projects/maid-cafe/`. After editing the submodule,
rebuild with `npm --prefix frontend run build:maid-cafe` to refresh its portfolio
page. Commit app changes in the Maid Cafe repository, then commit the updated
submodule reference in this portfolio.

To explicitly update to the latest upstream commit:

```sh
git submodule update --remote apps/maid-cafe
npm --prefix apps/maid-cafe ci
npm --prefix frontend run build
```

Review and commit the changed submodule reference after validation. Regular
`git submodule update --init --recursive` restores the pinned commit instead.
The app retains its upstream Firebase configuration and uses the existing
Firestore database; building does not seed or modify live data.
