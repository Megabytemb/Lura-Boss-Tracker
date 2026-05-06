# WoW Order Tracker

A React-based web application designed for tracking marker sequences, likely for raid coordination in World of Warcraft. Built with a modern tech stack focused on high performance and smooth animations.

## Project Overview

- **Purpose:** Provide a simple, high-visibility interface for selecting and ordering markers (Triangle, Diamond, X, Circle, T).
- **Architecture:** Single-page React application using functional components and hooks.
- **Tech Stack:**
  - **Framework:** [React 19](https://react.dev/)
  - **Build Tool:** [Vite 6](https://vitejs.dev/)
  - **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
  - **Animations:** [Framer Motion](https://www.framer.com/motion/)
  - **Language:** TypeScript
  - **AI Integration:** `@google/genai` (prepared for AI Studio deployment)

## Building and Running

### Development

```bash
# Install dependencies
npm install

# Start development server (Port 3000)
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Maintenance

```bash
# Type checking
npm run lint

# Clean build artifacts
npm run clean
```

## Deployment (GitHub Pages)

This project is configured for easy deployment to GitHub Pages.

### Automatic Deployment (Recommended)

A GitHub Actions workflow is provided in `.github/workflows/deploy.yml`. 
1. Push your code to the `main` branch.
2. Go to your repository settings on GitHub: **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The site will automatically build and deploy on every push to `main`.

### Manual Deployment

If you prefer to deploy manually from your local machine:
1. Ensure your repository has a `remote` named `origin` pointing to GitHub.
2. Run:
   ```bash
   npm run deploy
   ```
   This will build the project and push the `dist` folder to a `gh-pages` branch.

## Development Conventions

- **Styling:** Uses Tailwind CSS 4 with `@tailwindcss/vite` plugin. Favor utility classes and modern CSS features.
- **Components:** Functional components with TypeScript interfaces for props and state.
- **Icons:** SVG icons are currently managed directly within `src/App.tsx` to maintain minimal dependencies and maximum control over styling (drop shadows, colors).
- **Environment:** Requires `GEMINI_API_KEY` in `.env.local` for full functionality in AI Studio environments.
- **Performance:** HMR is handled specifically for AI Studio environments in `vite.config.ts` via `DISABLE_HMR` environment variable.

## Directory Structure

- `src/App.tsx`: Main application logic and UI.
- `src/index.css`: Global styles and Tailwind imports.
- `src/main.tsx`: Application entry point.
- `vite.config.ts`: Vite configuration including Tailwind and environment variable handling.
- `metadata.json`: Project metadata for AI Studio.
