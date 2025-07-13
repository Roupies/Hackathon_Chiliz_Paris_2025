# ⚽ Scoria - AI-Powered Football Predictions dApp

<div align="center">
  <img src="https://img.shields.io/badge/🏆_Chiliz_Paris_Hackathon_2025-Participant-FF6B35?style=for-the-badge&logo=trophy&logoColor=white" alt="Hackathon Participant" />
  <br />
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Wagmi-1C1C1C?style=for-the-badge&logo=wagmi&logoColor=white" alt="Wagmi" />
  <img src="https://img.shields.io/badge/Chiliz-FF6B35?style=for-the-badge&logo=chiliz&logoColor=white" alt="Chiliz" />
</div>

<div align="center">
  <h1>🚀 Football Predictions dApp for Socios.com</h1>
  <h3>Web application for AI-powered football match predictions on Chiliz ecosystem</h3>
  <p><strong>Built with modern web technologies and responsive design</strong></p>
</div>

---

## 🎯 **Project Overview**

Scoria is a web application prototype built for the Chiliz Paris Hackathon 2025. It demonstrates how AI-powered football predictions can be integrated with the Chiliz blockchain ecosystem to create engaging sports experiences for fans.

**Current Status**: Frontend prototype with hardcoded data and mock AI predictions. Future iterations will integrate real sports APIs and LLM-powered prediction engines.

---

## 🌟 **Features**

### 🎯 **Core Functionality**
- **Homepage**: Clean landing page with navigation to predictions
- **Match Predictions**: AI-powered match predictions with confidence indicators
- **Match Details**: Detailed view of upcoming fixtures and analysis
- **User Profile**: Personal settings and prediction history
- **Wallet Integration**: CHZ token connection for future betting features

### 🎨 **User Experience**
- **🌙 Dark Mode**: Intelligent theme switching with system preference detection
- **💫 Loading States**: Skeleton screens and smooth loading animations
- **📱 Pull-to-Refresh**: Native gesture support for data refreshing
- **📳 Haptic Feedback**: Enhanced interaction feedback on supported devices
- **🎭 Smooth Animations**: Framer Motion powered micro-interactions

### 🌐 **Responsive Design**
- **Desktop First**: Optimized for web browsers
- **Mobile Compatible**: Responsive layout that works on all devices
- **Touch-Friendly**: Gesture support for mobile interactions
- **Cross-Browser**: Compatible with modern web browsers

---

## 🛠️ **Technical Stack**

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Web3 Integration
- **Wagmi** - React hooks for Ethereum
- **ConnectKit** - Wallet connection UI
- **Viem** - TypeScript interface for Ethereum

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Roupies/Hackathon_Chiliz_Paris_2025.git
   cd Hackathon_Chiliz_Paris_2025/scoria-dapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 **Project Structure**

```
scoria-dapp/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── matches/            # Matches pages
│   │   ├── predictions/        # Predictions pages
│   │   └── profile/            # Profile pages
│   ├── components/             # Reusable components
│   │   ├── ui/                 # UI components
│   │   ├── BottomNav.tsx       # Navigation
│   │   ├── MatchCard.tsx       # Match display
│   │   ├── PredictionCard.tsx  # Prediction display
│   │   └── ThemeToggle.tsx     # Theme switcher
│   ├── contexts/               # React contexts
│   │   └── ThemeContext.tsx    # Theme management
│   ├── hooks/                  # Custom hooks
│   │   ├── useHapticFeedback.ts
│   │   ├── useLoading.ts
│   │   └── usePullToRefresh.ts
│   ├── data/                   # Hardcoded data
│   │   ├── teams.ts            # Team information
│   │   ├── matches.ts          # Match data
│   │   └── predictions.ts      # Mock predictions
│   └── lib/                    # Utilities
│       └── utils.ts
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
└── package.json               # Dependencies
```

---

## 🎮 **How to Use**

### 🔗 **Wallet Connection**
1. Click "Connect Wallet" in the navigation
2. Select your preferred wallet provider
3. Approve the connection request
4. View your CHZ balance (when connected)

### 🎯 **Viewing Predictions**
1. Navigate to the "Predictions" tab
2. Browse AI-generated match predictions
3. View confidence levels and analysis
4. Explore detailed match insights

### 🏆 **Match Information**
1. Access the "Matches" tab
2. View upcoming fixtures
3. See team information and statistics
4. Pull down to refresh data

### ⚙️ **Profile & Settings**
1. Go to "Profile" tab
2. Toggle between light/dark themes
3. Adjust haptic feedback settings
4. View mock prediction history

---

## 🔧 **Development**

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

---

## 🔮 **Future Development**

### Phase 1: Data Integration
- **Sports API Integration**: Real-time match data from sports APIs
- **Live Scores**: Real-time score updates during matches
- **Team Statistics**: Historical performance data

### Phase 2: AI Enhancement
- **LLM Integration**: Advanced language models for prediction analysis
- **Machine Learning**: Improved prediction algorithms
- **Sentiment Analysis**: Social media and news sentiment integration

### Phase 3: Blockchain Features
- **Smart Contracts**: Automated prediction settlements
- **CHZ Staking**: Token staking for predictions
- **Reward System**: Token rewards for accurate predictions

### Phase 4: Advanced Features
- **Social Features**: Community predictions and discussions
- **Analytics Dashboard**: Detailed performance analytics
- **Mobile App**: Native mobile applications

---

## 🏆 **Hackathon Context**

This project was developed for the **Chiliz Paris Hackathon 2025** as a proof of concept for integrating AI-powered sports predictions with blockchain technology. The current implementation focuses on:

- **Frontend Excellence**: Modern web development practices
- **User Experience**: Intuitive and responsive design
- **Web3 Integration**: Wallet connectivity and CHZ token support
- **Scalable Architecture**: Foundation for future enhancements

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 **Contact**

- **GitHub**: [https://github.com/Roupies/Hackathon_Chiliz_Paris_2025](https://github.com/Roupies/Hackathon_Chiliz_Paris_2025)
- **Issues**: [GitHub Issues](https://github.com/Roupies/Hackathon_Chiliz_Paris_2025/issues)

---

<div align="center">
  <h2>⚽ Built for the Chiliz Ecosystem</h2>
  <p><strong>Scoria - AI-powered football predictions on blockchain</strong></p>
  
  <br />
  
  <img src="https://img.shields.io/badge/Made_with-❤️-red?style=for-the-badge" alt="Made with Love" />
  <img src="https://img.shields.io/badge/For-Chiliz_Ecosystem-FF6B35?style=for-the-badge" alt="For Chiliz" />
  <img src="https://img.shields.io/badge/Hackathon-Paris_2025-blue?style=for-the-badge" alt="Hackathon" />
  
  <br />
  <br />
  
  <p><em>"Demonstrating the future of sports engagement through blockchain technology"</em></p>
</div> 