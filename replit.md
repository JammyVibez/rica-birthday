# Overview

This is a React-based birthday website application built specifically for someone named Rica. The application is a multi-page digital birthday book with interactive pages including greetings, personal information, anime references (specifically Kanade from Angel Beats), timeline memories, compliments, photo gallery, surprise gifts, a personal letter, and ending celebration. The application features smooth page transitions, animated elements (floating hearts, sakura petals, confetti, fireworks), and is designed with a pastel aesthetic using gradients and soft shadows.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring pastel gradients and soft shadows
- **UI Components**: shadcn/ui component library with Radix UI primitives for accessible, customizable components
- **Fonts**: Google Fonts integration (Comfortaa, Dancing Script, Inter) for display, handwritten, and body text
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks (useState, useEffect, useCallback) for local component state
- **Data Fetching**: TanStack Query (React Query) for server state management with custom query client configuration

## Component Structure
- **Page-based Architecture**: Individual page components (GreetingPage, AboutRicaPage, AnimeCornerPage, etc.) managed by a main Birthday component
- **Animation Components**: Dedicated components for visual effects (FloatingHearts, SakuraPetals, Fireworks)
- **Navigation**: Keyboard and click-based navigation between pages with currentPage state management
- **Responsive Design**: Mobile-first approach with responsive breakpoints and touch-friendly interactions

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server Structure**: Modular route registration system with middleware for logging and error handling
- **Development**: Vite integration for hot module replacement and development server
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) and interface for future database integration

## Build and Development
- **Build System**: Vite for frontend bundling and esbuild for server-side bundling
- **Development Mode**: Integrated Vite dev server with Express backend
- **TypeScript**: Full TypeScript support with path mapping for clean imports
- **Hot Reload**: Vite HMR for frontend and tsx for backend development

## Design System
- **Theme**: CSS custom properties for consistent color palette with pastel themes
- **Animations**: CSS animations for floating elements, transitions, and interactive feedback
- **Typography**: Three-tier font system (display, handwritten, body) for visual hierarchy
- **Layout**: Flexbox and CSS Grid for responsive layouts with mobile-first approach

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for data fetching
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Backend**: Express.js, Node.js runtime

## UI and Styling
- **Component Library**: Radix UI primitives (@radix-ui/*) for accessible base components
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Fonts**: Google Fonts (Comfortaa, Dancing Script, Inter)
- **Icons**: Lucide React for consistent iconography

## Database and ORM
- **ORM**: Drizzle ORM with PostgreSQL dialect support
- **Database Driver**: @neondatabase/serverless for Neon database connectivity
- **Schema Validation**: Zod for runtime type checking and drizzle-zod for schema generation

## Development and Utilities
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Utilities**: date-fns for date manipulation
- **Class Management**: clsx and tailwind-merge for conditional styling
- **Carousel**: Embla Carousel React for image galleries
- **Animations**: class-variance-authority for component variants

## Development Tools
- **Replit Integration**: @replit/vite-plugin-runtime-error-modal and @replit/vite-plugin-cartographer for development environment
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Command Interface**: cmdk for command palette functionality

## Configuration Files
- **TypeScript**: Configured with path mapping and strict mode
- **Tailwind**: Custom theme with CSS variables and component configurations
- **Drizzle**: PostgreSQL configuration with schema and migration setup
- **Vite**: React plugin with development server and build configurations