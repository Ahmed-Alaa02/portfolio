# Modern Developer Portfolio

A stunning, modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Features a premium dark mode design with smooth animations and micro-interactions.

## Features

- ✨ Modern, clean, and professional design
- 🌙 Premium dark mode aesthetic
- 🎬 Smooth animations with Framer Motion
- 📱 Fully responsive (mobile-first)
- 🚀 Optimized for performance
- 🔍 SEO-friendly
- ⚡ Built with Next.js 14 and TypeScript

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd my-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/sections/Hero.tsx`):
   - Change your name and tagline
2. **Projects** (`src/components/sections/Projects.tsx`):
   - Update the `projects` array with your own projects
   - Add real URLs for live demos and GitHub repos

3. **Skills** (`src/components/sections/Skills.tsx`):
   - Modify the `skills` object with your technologies

4. **About** (`src/components/sections/About.tsx`):
   - Update your bio and professional journey

5. **Contact** (`src/components/sections/Contact.tsx`):
   - Add your email, phone, and social media links
   - Configure form submission (currently logs to console)

### Color Scheme

The color scheme can be customized in `tailwind.config.ts`:

- Primary colors (blue shades)
- Dark theme colors
- Custom animations

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to Other Platforms

The portfolio can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout with SEO
│   │   └── page.tsx          # Main page
│   ├── components/
│   │   └── sections/         # All section components
│   │       ├── Hero.tsx
│   │       ├── Projects.tsx
│   │       ├── Skills.tsx
│   │       ├── About.tsx
│   │       └── Contact.tsx
│   └── lib/
│       └── animations.ts     # Framer Motion variants
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## License

This project is open source and available under the MIT License.

## Contact

Feel free to reach out if you have any questions or suggestions!

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)
