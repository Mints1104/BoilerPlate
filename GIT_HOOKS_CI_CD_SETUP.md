# Git Hooks, CI/CD & Loading Components Setup

## What Was Added

### 1. 🪝 Git Hooks (Husky + Lint-Staged)

Automatically runs linting and formatting before every commit to ensure code quality.

**Files added:**

- `.husky/pre-commit` - Pre-commit hook script
- `.lintstagedrc.json` - Configuration for staged files
- Updated `package.json` with husky and lint-staged dependencies

### 2. 🚀 CI/CD (GitHub Actions)

Automated testing, linting, and deployment pipelines.

**Files added:**

- `.github/workflows/ci.yml` - Continuous Integration (runs on push/PR)
  - Linting
  - Type checking
  - Tests with coverage
  - Build verification
  - Runs on Node 18.x and 20.x
- `.github/workflows/deploy.yml` - Deployment (runs on main branch)
  - Builds the project
  - Deploys to GitHub Pages (configurable)
  - Includes examples for Netlify/Vercel

### 3. ⏳ Loading/Spinner Component

Reusable loading spinner with multiple sizes and customization options.

**Files added:**

- `src/components/ui/Spinner.tsx` - Spinner component
- `src/components/ui/Spinner.module.css` - Spinner styles
- `src/components/ui/Spinner.test.tsx` - Component tests
- Updated `src/App.tsx` to use the Spinner

## Installation

### Install new dependencies:

```bash
npm install
```

### Initialize Husky:

```bash
npm run prepare
```

This creates the `.husky` directory and sets up git hooks.

## Usage

### Git Hooks

Once installed, hooks run automatically:

```bash
git add .
git commit -m "your message"
# ↑ Pre-commit hook runs automatically:
#   - Lints staged .ts/.tsx files
#   - Formats all staged files
#   - Commits only if checks pass
```

**Bypass hooks (not recommended):**

```bash
git commit -m "message" --no-verify
```

### CI/CD Workflows

**CI Workflow** (`.github/workflows/ci.yml`):

- Triggers on push/PR to `main` or `develop` branches
- Runs: lint → type-check → tests → build
- Tests on Node 18.x and 20.x
- Uploads coverage to Codecov (needs `CODECOV_TOKEN` secret)

**Deploy Workflow** (`.github/workflows/deploy.yml`):

- Triggers on push to `main` or manually
- Currently deploys to GitHub Pages
- To enable GitHub Pages:
  1. Go to repo Settings → Pages
  2. Source: Deploy from branch
  3. Branch: `gh-pages` / `root`

**For Netlify/Vercel:** Uncomment the relevant sections and add secrets:

- Netlify: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`
- Vercel: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### Spinner Component

**Basic usage:**

```tsx
import Spinner from '@components/ui/Spinner'

// Simple spinner
<Spinner />

// With text
<Spinner text="Loading data..." />

// Different sizes
<Spinner size="small" />
<Spinner size="medium" /> // default
<Spinner size="large" />

// Custom height
<Spinner containerHeight="100vh" />

// Custom styling
<Spinner className="my-custom-class" />
```

**Already integrated in:**

- `App.tsx` - Page loading fallback

**Common use cases:**

```tsx
// Loading state in components
{isLoading && <Spinner text="Fetching users..." />}

// Full page loading
<Spinner text="Initializing app..." containerHeight="100vh" />

// Inline loading
<Spinner size="small" containerHeight="50px" />
```

## Customization

### Spinner Styling

Edit `Spinner.module.css` to customize:

- Colors via CSS variables: `--spinner-color`, `--spinner-bg`
- Animation speed (default: 0.8s)
- Sizes (small: 20px, medium: 40px, large: 60px)

### CI/CD Workflows

Customize in `.github/workflows/`:

- Change Node versions
- Add more test environments
- Configure different deployment targets
- Add environment variables

### Lint-Staged

Modify `.lintstagedrc.json` to change what runs on commit:

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{css,json,md}": ["prettier --write"]
}
```

## Testing

Test the spinner:

```bash
npm test Spinner
```

Test everything:

```bash
npm test
```

## Troubleshooting

**Husky hooks not running:**

```bash
rm -rf .husky
npm run prepare
```

**CI failing:**

- Check Node version compatibility
- Ensure all dependencies are in package.json
- Review workflow logs in GitHub Actions tab

**Spinner not styling correctly:**

- Ensure CSS modules are imported
- Check CSS variable definitions in your global styles
