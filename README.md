
# 🎮 Discord Portfolio

A modern, interactive portfolio website that integrates with Discord's Rich Presence to showcase your real-time status, Spotify activity, and connected social accounts. Built with React, TypeScript, and Vite.

_Note: This Repo is maintained with the help of AI. However UI/UX design and integrations are mine._


## ✨ Features

### 🎵 Live Discord Integration
- **Real-time Discord Status**: Shows your current online status (online, idle, DND, offline)
- **Spotify Integration**: Displays currently playing music with animated album art
- **Custom Status**: Shows your Discord custom status with emoji support
- **Activity Tracking**: Displays what you're currently doing on Discord
- **Connected Accounts**: Showcases your linked social media accounts (GitHub, Reddit, Spotify, TikTok, Twitter, Facebook)
- **Profile Badges**: Displays Discord profile badges and achievements

### 🎨 Beautiful UI/UX
- **Pixel Art Theme**: Retro-inspired design with modern animations
- **Sakura Falling Effect**: Animated cherry blossom petals for aesthetic appeal
- **Wavy Underline Navigation**: Smooth snake-like animation on navigation links
- **Speech Bubble Status**: Pixel-art style custom status display
- **Responsive Design**: Fully optimized for desktop and mobile devices
- **Dark/Light Mode**: Automatic theme switching based on system preferences

### 📱 Pages
- **Portfolio**: Main landing page with Discord profile and tech stack
- **Spotify**: Recently played tracks and favorite playlists
- **GitHub**: Project showcase and repository information
- **Contact**: Get in touch form and social links

### 🚀 Additional Features
- **Back to Top**: Animated sprite-based scroll-to-top button
- **Lazy Loading**: Optimized image loading for better performance
- **SEO Optimized**: Meta tags and sitemap for better search visibility
- **Analytics**: Integrated with Vercel Analytics
- **Oneko Cat**: Interactive pixel cat that follows your cursor (Easter egg!)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching
- **Radix UI** - Accessible component primitives

### Backend
- **Express.js** - API server
- **Node.js** - Runtime environment

### APIs & Services
- **Lanyard API** - Real-time Discord presence data
- **Discord API** - User profile and connection data
- **Spotify Web API** - Music integration

## Spotify Integration: [spotify-tracks](https://github.com/notsopreety/spotify-tracks)

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/notsopreety/DiscordPortfolio.git
cd DiscordPortfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Update Discord ID**
Edit the Discord user ID in these files:
- `client/src/hooks/useDiscordPresence.ts`
- `client/src/components/DiscordProfile.tsx`

Replace `931511745284038696` with your Discord user ID.

4. **Run development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🚀 Deployment

### Deploy on Replit
1. Fork this repository on Replit
2. Update your Discord ID in the configuration files
3. Click the "Run" button
4. Your portfolio will be live!

### Build for Production
```bash
npm run build
npm run start
```

## 🎨 Customization

### Update Personal Information
- **Discord Profile**: Update the Discord ID in `useDiscordPresence.ts`
- **GitHub Projects**: Modify `client/src/pages/GitHub.tsx`
- **Spotify Playlists**: Update playlist IDs in `client/src/pages/Spotify.tsx`
- **Tech Stack**: Edit the tech stack items in `client/src/components/TechStackCard.tsx`
- **About Me**: Customize your bio in `client/src/components/AboutMeCard.tsx`

### Styling
- **Colors**: Modify color scheme in `client/src/index.css`
- **Fonts**: Change font families in the CSS variables
- **Animations**: Adjust animation timings and effects in `client/src/index.css`

### Adding Features
The project uses a modular component structure. Add new components in `client/src/components/` and integrate them into pages.

## 📝 API Endpoints

The project uses the following external APIs:

- **Lanyard API**: `https://api.lanyard.rest/v1/users/{DISCORD_ID}`
  - Provides real-time Discord presence data
  - No authentication required for public profiles

## 🎮 Easter Eggs

- **Oneko Cat**: A pixel cat follows your cursor! Look for the cute companion.
- **Sakura Petals**: Beautiful falling cherry blossoms in the background
- **Hover Animations**: Interactive animations on various elements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lanyard](https://github.com/Phineas/lanyard) - Discord presence API
- [Oneko.js](https://github.com/adryd325/oneko.js) - Cursor-following cat
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vercel](https://vercel.com/) - Analytics and deployment

## 🔗 Links

- **Live Demo**: [https://samirbadaila.is-a.dev]
- **GitHub**: [https://github.com/notsopreety](https://github.com/notsopreety)
- **Discord**: [Samir Thakuri#0000](https://discord.com/users/931511745284038696)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/notsopreety/DiscordPortfolio/issues).

---

Made with 💜 by [notsopreety](https://github.com/notsopreety)
