# 🍔 GourmetDash - Sr. Full Stack Order Management

A premium, high-performance food delivery order management feature. This project showcases a modern tech stack, real-time status simulations, and a high-end glassmorphic user interface.

## 🚀 Live Demo & Video
- **Hosted App**: [Link to your Vercel deployment]
- **Loom Walkthrough**: [Link to your Loom video]

## ✨ Key Features
- **💎 Premium UI/UX**: Built with a sleek glassmorphic design system, custom HSL color palettes, and fluid animations using Framer Motion.
- **🛒 Dynamic Cart System**: Real-time cart management with quantity adjustment and local storage persistence.
- **🛰️ Order Tracking**: A dedicated tracking dashboard that visualizes the order lifecycle from "Received" to "Delivered".
- **⚡ Real-Time Simulation**: Backend logic that simulates real-world order status updates every 30 seconds.
- **🧪 TDD (Test Driven Development)**: Robust test coverage for both API endpoints and core React components.

## 🛠️ Technology Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Hooks & Custom Hooks
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📦 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/safiyaRafi/Raf-order-management.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Running Tests
Execute the test suite to verify API and UI integrity:
```bash
npm test
```

## 🏗️ Architecture & Design Decisions
- **Persistence**: Used `globalThis` in the API layer to ensure the order store survives Next.js HMR resets during development.
- **Accessibility**: Semantic HTML and focus management for interactive cards and modals.
- **Scalability**: Decoupled custom hooks for cart logic allow for easy expansion of features.

---
Built as part of a Senior Full Stack Developer Assessment. Joint check
