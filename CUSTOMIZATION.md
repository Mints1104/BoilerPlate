# 🎨 Customization Guide

This boilerplate is designed to be **easily customizable** for any project. Follow this guide to quickly rebrand and adapt it to your needs.

---

## 🚀 Quick Start: Clone & Customize

### 1. Clone and Setup

```bash
git clone <your-repo-url> my-project
cd my-project
rm -rf .git  # Remove git history to start fresh
npm install
```

### 2. Rebrand in 5 Minutes

Follow these steps in order:

#### **Step 1: Update Site Configuration** (MOST IMPORTANT)

Edit [`src/config/site.config.ts`](src/config/site.config.ts):

```typescript
export const siteConfig = {
  name: 'My Awesome App', // ← Change this
  shortName: 'MAA', // ← And this
  description: 'My app does...', // ← And this
  author: 'Your Name', // ← Your name
  email: 'you@example.com', // ← Your email
  url: 'https://myapp.com', // ← Your domain
  // ... update the rest
}
```

#### **Step 2: Update Theme Colors**

Edit [`src/config/theme.config.ts`](src/config/theme.config.ts):

```typescript
colors: {
  primary: '#your-brand-color',  // ← Your brand color
  primaryHover: '#darker-shade', // ← Darker version
  // ... customize other colors
}
```

#### **Step 3: Update package.json**

```json
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "My awesome application"
}
```

#### **Step 4: Run the app**

```bash
npm run dev
```

Your rebranded app is ready! 🎉

---

## 🎯 Detailed Customization

### Configuration Files

| File                         | Purpose                       | When to Edit               |
| ---------------------------- | ----------------------------- | -------------------------- |
| `src/config/site.config.ts`  | Site name, nav, SEO, features | **Always** (first thing)   |
| `src/config/theme.config.ts` | Colors, fonts, spacing        | **Always** (for branding)  |
| `package.json`               | Project metadata              | Always                     |
| `index.html`                 | HTML meta tags                | If config doesn't cover it |
| `public/manifest.json`       | PWA settings                  | If building a PWA          |

### Removing Example Content

#### **Remove Demo Pages**

Don't need the example content?

1. **Keep structure, remove content:**
   - Edit `src/components/pages/Home.tsx` - remove counter/form examples
   - Edit `src/components/pages/About.tsx` - replace with your content
2. **Or delete pages entirely:**

   ```bash
   # Delete pages you don't need
   rm src/components/pages/About.tsx
   rm src/components/pages/About.module.css
   ```

   Then update `src/App.tsx`:

   ```typescript
   // Remove the About route
   <Route path="about" element={<About />} />  // ← Delete this
   ```

#### **Remove Demo Components**

```bash
# Remove example UI components if not needed
rm src/components/ui/Card.tsx
rm src/components/ui/Card.module.css
```

#### **Remove Example Hooks**

```bash
# Keep only the hooks you need
rm src/hooks/useCounter.ts
rm src/hooks/useCounter.test.ts
```

---

## 🎨 Theming & Styling

### CSS Variables

All design tokens are in [`src/styles/index.css`](src/styles/index.css):

```css
:root {
  --primary-color: #646cff; /* ← Change to your brand color */
  --background-color: #242424; /* ← Background */
  --text-color: rgba(255, 255, 255, 0.87); /* ← Text color */
  /* ... */
}
```

**Pro Tip:** Use `src/config/theme.config.ts` to generate these automatically!

### Color Schemes

- **Dark mode by default**: Edit `:root` in `index.css`
- **Light mode**: Edit `@media (prefers-color-scheme: light)` section
- **Both**: Keep both, system will auto-switch

### Fonts

1. Add font files to `src/assets/fonts/` (create folder)
2. Update `--font-family` in `index.css`
3. Or use Google Fonts in `index.html`

---

## 🧩 Common Customizations

### Add a New Page

```bash
# 1. Create page component
touch src/components/pages/MyPage.tsx
touch src/components/pages/MyPage.module.css

# 2. Add route in src/App.tsx
<Route path="my-page" element={<MyPage />} />

# 3. Add to navigation in site.config.ts
nav: [
  { label: 'My Page', path: '/my-page', ariaLabel: 'Navigate to My Page' }
]
```

### Change Logo

1. **Text logo**: Update `siteConfig.logo.text` in `site.config.ts`
2. **Image logo**:
   - Add image to `public/logo.png`
   - Edit `Header.tsx` to use `<img>` instead of `<h1>`

### Add External Links

Edit [`site.config.ts`](src/config/site.config.ts):

```typescript
nav: [{ label: 'Docs', path: 'https://docs.example.com', external: true }]
```

### Custom Footer

Edit [`src/components/Footer.tsx`](src/components/Footer.tsx) directly or update `siteConfig.footer`.

---

## 📦 Features to Keep/Remove

### Core Features (Keep These)

- ✅ Error Boundary
- ✅ SEO Component
- ✅ Accessibility features
- ✅ Responsive design
- ✅ Performance optimizations

### Optional Features (Remove if not needed)

| Feature          | Files to Remove                               | Impact                               |
| ---------------- | --------------------------------------------- | ------------------------------------ |
| **Testing**      | `src/test/`, `*.test.ts*`, `vitest.config.ts` | Lose test capability                 |
| **CSS Modules**  | `*.module.css`                                | Switch to styled-components/Tailwind |
| **React Router** | Modify `App.tsx`, remove route imports        | SPA → Single page                    |
| **TypeScript**   | Convert to `.jsx`                             | Lose type safety                     |

---

## 🔧 Advanced Customizations

### Switch to Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Follow Tailwind docs, remove CSS Modules
```

### Add State Management

```bash
# Zustand (recommended)
npm install zustand

# Or Redux Toolkit
npm install @reduxjs/toolkit react-redux
```

### Add a UI Library

```bash
# Material-UI
npm install @mui/material @emotion/react @emotion/styled

# Or shadcn/ui
npx shadcn-ui@latest init
```

### Environment Variables

1. Create `.env.local`:
   ```env
   VITE_API_URL=https://api.example.com
   VITE_APP_NAME=My App
   ```
2. Use: `import.meta.env.VITE_API_URL`
3. Update types in `src/vite-env.d.ts`

### Contact Form Setup

The boilerplate includes a production-ready contact form with multiple backend options. Choose the one that fits your hosting platform:

#### **Option 1: Formspree (Easiest)**

Best for: Beginners, static hosting, quick setup

1. Sign up at [formspree.io](https://formspree.io) (free tier available)
2. Create a new form and get your form ID
3. Add to `.env.local`:
   ```env
   VITE_CONTACT_PROVIDER=formspree
   VITE_FORMSPREE_ID=your_form_id
   ```
4. Done! Form submissions will appear in your Formspree dashboard

#### **Option 2: Getform**

Best for: Static sites, simple setup, webhook support

1. Sign up at [getform.io](https://getform.io)
2. Create a form endpoint
3. Add to `.env.local`:
   ```env
   VITE_CONTACT_PROVIDER=getform
   VITE_GETFORM_ENDPOINT=https://getform.io/f/your_endpoint_id
   ```

#### **Option 3: Web3Forms**

Best for: Privacy-focused projects, no registration needed

1. Get access key at [web3forms.com](https://web3forms.com)
2. Add to `.env.local`:
   ```env
   VITE_CONTACT_PROVIDER=web3forms
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key
   ```

#### **Option 4: Netlify Forms**

Best for: Netlify-hosted sites (zero configuration!)

1. Add to `.env.local`:
   ```env
   VITE_CONTACT_PROVIDER=netlify
   ```
2. Netlify automatically handles form submissions
3. View submissions in Netlify dashboard under "Forms"

**Note**: Netlify Forms requires a `name` attribute on the form and `data-netlify="true"`. This is handled automatically by the ContactForm component.

#### **Option 5: Custom API**

Best for: Full control, existing backend, custom logic

1. Create your own backend endpoint (Express, Next.js API route, etc.)
2. Add to `.env.local`:
   ```env
   VITE_CONTACT_PROVIDER=custom
   VITE_CUSTOM_API_ENDPOINT=https://your-api.com/contact
   ```

**Example backend (Express.js)**:

```javascript
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Send email, save to DB, etc.
  await sendEmail({
    to: 'admin@yourdomain.com',
    from: email,
    subject: `Contact from ${name}`,
    body: message,
  })

  res.json({ success: true, message: 'Message received!' })
})
```

#### **Adding reCAPTCHA (Recommended)**

Protect against spam with Google reCAPTCHA:

1. Get keys at [google.com/recaptcha](https://www.google.com/recaptcha)
2. Add to `.env.local`:
   ```env
   VITE_RECAPTCHA_SITE_KEY=your_site_key
   ```
3. The form automatically includes reCAPTCHA when the key is present

#### **Using the Contact Form**

The contact form is already set up in [`src/components/pages/Contact.tsx`](src/components/pages/Contact.tsx):

```tsx
import ContactForm from '@components/ui/ContactForm'

;<ContactForm
  provider="formspree" // or your chosen provider
  onSuccess={() => console.log('Sent!')}
  onError={(error) => console.error(error)}
/>
```

**Customizing the form**:

- Edit [`src/components/ui/ContactForm.tsx`](src/components/ui/ContactForm.tsx) to add/remove fields
- Edit [`src/components/ui/ContactForm.module.css`](src/components/ui/ContactForm.module.css) for styling
- Validation rules in [`src/utils/validation.ts`](src/utils/validation.ts)
- Security settings in [`src/utils/security.ts`](src/utils/security.ts)

See [SECURITY.md](SECURITY.md) for security best practices.

---

## ✅ Customization Checklist

Before deploying, make sure you've updated:

- [ ] `src/config/site.config.ts` - Site name, description, author
- [ ] `src/config/theme.config.ts` - Brand colors
- [ ] `package.json` - Name, version, description
- [ ] `index.html` - Title, meta tags
- [ ] `public/manifest.json` - App name, colors
- [ ] `public/robots.txt` - Your domain
- [ ] Add actual favicon files (replace `/vite.svg`)
- [ ] Add OG image (`/og-image.png`)
- [ ] Remove example content from Home/About pages
- [ ] Update README with your project details
- [ ] Initialize new git repo: `git init && git add . && git commit -m "Initial commit"`
- [ ] **If using contact form**: Set up `.env.local` with your chosen provider
- [ ] **Security**: Review [SECURITY.md](SECURITY.md) before deploying

---

## 💡 Tips for Maximum Flexibility

1. **Keep it simple**: Don't add features until you need them
2. **Use the config files**: Centralize all branding there
3. **Follow the structure**: Keep components, hooks, utils organized
4. **Test as you go**: Run `npm run dev` after each change
5. **Use path aliases**: Import with `@components/` not `../../`

---

## 🆘 Need Help?

- 📖 **Documentation**: Check README.md
- 🐛 **Issues**: Search existing issues or create new one
- 💬 **Questions**: Discussions tab on GitHub

---

**Remember**: This boilerplate is a starting point, not a framework. Feel free to rip out anything you don't need! 🔥
