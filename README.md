# MenuHub 🍽️

Live Demo: https://menu-bar-react.netlify.app/

**MenuHub** is a modern, responsive React & TypeScript restaurant menu application built with Vite and Tailwind CSS. It allows customers to easily browse, search, and filter culinary offerings across dynamically extracted categories with real-time feedback and detailed dish views.

---

## ✨ Features

- **Dynamic Category Extraction**: Automatically extracts unique menu categories (Breakfast, Lunch, Dinner, Dessert) from dataset items without hardcoded button lists.
- **Instant Search & Filtering**: Filter dishes by category or search in real time by dish title, ingredients, or dietary tags.
- **Responsive CSS Grid Layout**: Optimally formatted for all screen sizes:
  - 🖥️ **Desktop**: 3-column layout
  - 📱 **Tablet**: 2-column layout
  - 📱 **Mobile**: Single-column layout
- **Interactive Dish Modal**: Click any card to view detailed nutrition, preparation time, dietary tags, and simulated ordering.
- **Favorites & Bookmarking**: Save favorite dishes locally during the session.
- **Refined Restaurant Aesthetics**: Features warm typography, custom emoji accents, and dark/gold accent themes.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: Tailwind CSS & Responsive CSS Grid
- **Deployment Platform**: Cloud Run / AI Studio

---

## 📁 Project Structure

```text
├── index.html          # HTML entry point with app title & meta tags
├── metadata.json       # Applet metadata (name, description, capabilities)
├── package.json        # Dependencies and build scripts
├── README.md           # Project documentation
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── src/
    ├── App.tsx         # Main application component & menu filter logic
    ├── index.css       # Global styles & Tailwind CSS imports
    └── main.tsx        # React entry point
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd MenuHub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

---

## 📜 Available Scripts

- `npm run dev`: Launches the development server.
- `npm run build`: Bundles the application for production.
- `npm run lint`: Runs TypeScript type checking (`tsc --noEmit`).

---

## 📄 License

This project is licensed under the Apache-2.0 License.
