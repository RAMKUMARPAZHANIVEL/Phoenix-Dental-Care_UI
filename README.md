# Phoenix Dental Care

A modern, SEO-friendly dental clinic website built with Next.js 14 and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Deployment:** Netlify

## Prerequisites

- Node.js 18 or later
- npm 9 or later

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ramkumarAkash/phoenix-dental.git
cd phoenix-dental
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |

## Project Structure

```
phoenix-dental/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
├── public/               # Static assets (images, icons)
├── styles/               # Global styles
├── netlify.toml          # Netlify deployment configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── next.config.js        # Next.js configuration
```

The build output is placed in `.next/`. Check bundle sizes and any build warnings before deploying.
