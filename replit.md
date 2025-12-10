# Discord Portfolio

## Overview

A real-time Discord presence portfolio application that displays live Discord status, activities, and Spotify playback. Built with React + TypeScript frontend and Express.js backend, the app fetches Discord user data from Lanyard API and DSTN API to showcase a personalized, animated portfolio experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Components & Styling**
- Shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS 4 with custom design tokens for consistent theming
- Dark mode support with CSS variables for theme switching
- Custom animations including pixel-style particles and starfield effects

**Typography & Font Loading** *(Optimized Oct 2024)*
- **JetBrains Mono** (Google Fonts): Primary font for body text, weights 400/500/600/700 with italics
- **Silkscreen** (Google Fonts): Pixel display font for headings (h1-h6) and UI elements, weights 400/700
- **Minecraft Ten**: Theme-specific font for Contact page (optional loading strategy)
- Font preloading with async CSS loading pattern to prevent FOUT/FOIT
- Preconnect to font CDNs for optimized DNS/TCP/TLS handshake
- Font-display: swap for instant text visibility, optional for fallback fonts

**State Management Strategy**
- React Query handles all server state with 10-second refetch intervals for real-time Discord presence
- Local React state for UI interactions and derived data (progress bars, elapsed time)
- No global state management library needed due to server-driven architecture

### Backend Architecture

**Server Framework**
- Express.js backend serving as both API server and static file server
- TypeScript with ES modules for type safety and modern JavaScript features
- Vite middleware integration in development for seamless HMR
- Custom error handling middleware for consistent error responses

**API Design Pattern**
- RESTful API structure with `/api` prefix for all backend routes
- No database interactions - pure proxy/aggregation layer
- Request/response logging middleware for debugging
- CORS and JSON body parsing enabled

**Development vs Production**
- Development: Vite dev server with middleware mode for instant updates
- Production: Pre-built static files served via Express with esbuild-bundled server

### External Dependencies

**Third-Party APIs**
- **Lanyard API** (`api.lanyard.rest`) - Primary Discord presence data source
  - Provides real-time Discord status, activities, and Spotify listening data
  - Polled every 10 seconds for live updates
  - Used for: online/offline status, current activities, custom status

- **DSTN API** (`dcdn.dstn.to`) - Enhanced Discord profile data
  - Provides user bio, pronouns, and connected social accounts
  - Cached for 60 seconds (less frequently updated data)
  - Used for: profile enrichment, social links

**UI & Component Libraries**
- Radix UI primitives (dropdown menus, tooltips, toasts)
- Lucide React for iconography
- React Icons for social media icons
- Class Variance Authority for component variant management

**Development Tools**
- Replit-specific plugins for development environment (cartographer, dev banner, error modal)
- ESBuild for server-side bundling
- TSX for TypeScript execution in development

**Deployment Platform**
- Vercel configuration for serverless deployment
- Static file serving with SPA fallback routing