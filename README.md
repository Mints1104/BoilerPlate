# Vite + React + TypeScript Boilerplate 🚀

A production-ready boilerplate for building modern web applications with Vite, React, and TypeScript. Clone this repo and start building immediately!

## Features ✨

- ⚡️ **Vite** - Lightning-fast development with HMR
- ⚛️ **React 18** - Latest React with concurrent features
- 🔷 **TypeScript** - Type safety and better DX
- 🎨 **CSS Modules** - Scoped styling out of the box
- 🧭 **React Router** - Declarative routing
- 🎯 **Path Aliases** - Clean imports with `@` prefix
- 📏 **ESLint + Prettier** - Code quality and formatting
- 🎨 **Pre-built Components** - Reusable UI components
- 🪝 **Custom Hooks** - Ready-to-use React hooks
- 🛠️ **Utility Functions** - Common helpers included
- 📱 **Responsive** - Mobile-first design approach

## Quick Start 🎯

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

```bash
# Clone this repository
git clone <your-repo-url> my-new-project

# Navigate to project
cd my-new-project

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:3000`

## Available Scripts 📜

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix

# Format code with Prettier
npm run format

# Type check without emitting files
npm run type-check
```

## Project Structure 📁

```
src/
├── components/          # React components
│   ├── pages/          # Page components (Home, About, NotFound)
│   ├── ui/             # Reusable UI components (Button, Card)
│   ├── Layout.tsx      # Main layout component
│   ├── Header.tsx      # Header component
│   └── Footer.tsx      # Footer component
├── hooks/              # Custom React hooks
│   ├── useCounter.ts   # Counter hook example
│   ├── useLocalStorage.ts  # LocalStorage hook
│   └── useFetch.ts     # Data fetching hook
├── utils/              # Utility functions
│   └── helpers.ts      # Common helper functions
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types and interfaces
├── styles/             # Global styles
│   └── index.css       # Global CSS with CSS variables
├── assets/             # Static assets (images, fonts, etc.)
├── App.tsx             # Root App component with routing
├── main.tsx            # Application entry point
└── vite-env.d.ts       # Vite environment types
```

## Path Aliases 🔗

The following path aliases are configured for cleaner imports:

```typescript
import Component from '@components/Component'
import { useCustomHook } from '@hooks/useCustomHook'
import { helper } from '@utils/helpers'
import type { User } from '@types'
import '@styles/index.css'
import logo from '@assets/logo.png'
```

Available aliases:
- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@hooks/*` → `./src/hooks/*`
- `@utils/*` → `./src/utils/*`
- `@types/*` → `./src/types/*`
- `@styles/*` → `./src/styles/*`
- `@assets/*` → `./src/assets/*`

## Styling 🎨

This boilerplate uses CSS Modules for component-level styling and global CSS for shared styles.

### CSS Modules Example

```tsx
import styles from './Component.module.css'

const Component = () => {
  return <div className={styles.container}>Content</div>
}
```

### CSS Variables

Global CSS variables are defined in `src/styles/index.css`:

```css
:root {
  --primary-color: #646cff;
  --spacing-sm: 1rem;
  --font-size-base: 1rem;
  /* ... and more */
}
```

## Environment Variables 🔐

1. Copy `.env.example` to `.env`
2. Add your environment variables (must be prefixed with `VITE_`)

```bash
VITE_API_URL=http://localhost:4000
VITE_APP_NAME=My App
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Custom Hooks 🪝

### useCounter

```typescript
import { useCounter } from '@hooks/useCounter'

const { count, increment, decrement, reset } = useCounter(0)
```

### useLocalStorage

```typescript
import { useLocalStorage } from '@hooks/useLocalStorage'

const [value, setValue] = useLocalStorage('key', 'default')
```

### useFetch

```typescript
import { useFetch } from '@hooks/useFetch'

const { data, loading, error } = useFetch<User[]>('/api/users')
```

## Utility Functions 🛠️

Common helpers available in `@utils/helpers`:

- `formatDate(date)` - Format dates
- `sleep(ms)` - Async delay
- `debounce(func, wait)` - Debounce function calls
- `generateId()` - Generate unique IDs
- `capitalize(str)` - Capitalize strings
- `truncate(str, length)` - Truncate strings

## Customization 🎨

### Changing the Theme

Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --primary-color: #your-color;
  --background-color: #your-bg;
  /* ... */
}
```

### Adding New Routes

Edit `src/App.tsx`:

```tsx
<Route path="/new-page" element={<NewPage />} />
```

### Adding New Components

Create components in `src/components/` or `src/components/ui/` for reusable UI elements.

## Building for Production 🏗️

```bash
npm run build
```

The production-ready files will be in the `dist/` directory. Deploy this folder to your hosting service.

## Deployment 🚀

This project can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `dist/` to S3 bucket

## License 📄

MIT License - feel free to use this boilerplate for any project!

## Contributing 🤝

Feel free to submit issues and enhancement requests!

---

**Happy coding! 🎉**

Built with ❤️ using Vite, React, and TypeScript
