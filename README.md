# Fake News Detector - Frontend

A modern, responsive web-based interface for detecting fake news using Natural Language Processing and Machine Learning techniques.

## 📋 Project Overview

This is the frontend application for the Fake News Detector system, developed as part of the COMP1682 Final Year Project. The application provides an intuitive interface for users to analyze news articles and receive real-time credibility assessments powered by advanced NLP and ML models.

### Key Features

- **Real-time Analysis**: Submit news text and receive instant classification results
- **Confidence Scoring**: View probabilistic confidence scores for predictions
- **Explainability Features**: Understand why content was classified with highlighted keywords and feature importance
- **User-Friendly Interface**: Clean, modern design accessible via standard web browsers
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Privacy-Focused**: No unnecessary data storage, compliant with GDPR principles

## 🛠️ Tech Stack

### Core Technologies

- **React 18+** - Component-based UI library
- **TypeScript** - Type-safe JavaScript development
- **React Router v6** - Client-side routing and navigation
- **Vite** - Next-generation frontend build tool

### State & Data Management

- **Zustand** - Lightweight state management (scales from simple Context to complex Redux-like patterns)
- **TanStack Query** - Server state management and caching

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality, accessible React components

### HTTP & API

- **Axios** - Promise-based HTTP client for API requests

### Development Tools

- **TypeScript** - Static type checking
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Opinionated code formatter
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **Husky** - Git hooks for code quality

## 📁 Scalable Project Structure

```
fake-news-detector-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── shared/           # Reusable components across all pages
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Header.module.css
│   │   │   │   └── __tests__/Header.test.tsx
│   │   │   ├── Footer/
│   │   │   ├── Navigation/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   └── Loader/
│   │   └── page-specific/    # Components used on specific pages only
│   │       ├── LandingPage/
│   │       │   ├── Hero/
│   │       │   └── Features/
│   │       └── AuthPage/
│   │           ├── LoginForm/
│   │           └── SignupForm/
│   ├── pages/                # Page-level components (route targets)
│   │   ├── Landing.tsx
│   │   ├── About.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Detector.tsx      # Main analysis page (future)
│   │   ├── Dashboard.tsx     # User dashboard (future)
│   │   └── NotFound.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useApi.ts
│   │   ├── useAuth.ts
│   │   └── useMediaQuery.ts
│   ├── services/             # API calls and external integrations
│   │   ├── api.ts            # Axios instance configuration
│   │   ├── newsService.ts
│   │   └── authService.ts
│   ├── store/                # State management (Zustand)
│   │   ├── authStore.ts      # Auth state
│   │   └── appStore.ts       # Global app state
│   ├── types/                # TypeScript type definitions
│   │   ├── api.types.ts
│   │   ├── user.types.ts
│   │   └── common.types.ts
│   ├── utils/                # Utility functions
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── styles/               # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── tailwind.css
│   ├── config/               # Configuration files
│   │   ├── routes.config.ts
│   │   ├── api.config.ts
│   │   └── env.config.ts
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── Router.tsx            # Centralized routing
├── .env.example              # Environment variables template
├── .env.local                # Local environment (git ignored)
├── .eslintrc.json            # ESLint configuration
├── .prettierrc.json          # Prettier configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json
├── README.md
└── .gitignore
```

│ │ ├── InputForm/
│ │ │ ├── InputForm.jsx
│ │ │ └── InputForm.css
│ │ ├── ResultDisplay/
│ │ │ ├── ResultDisplay.jsx
│ │ │ └── ResultDisplay.css
│ │ ├── ExplainabilityPanel/
│ │ │ ├── ExplainabilityPanel.jsx
│ │ │ └── ExplainabilityPanel.css
│ │ ├── LoadingSpinner/
│ │ │ ├── LoadingSpinner.jsx
│ │ │ └── LoadingSpinner.css
│ │ └── Footer/
│ │ ├── Footer.jsx
│ │ └── Footer.css
│ ├── pages/
│ │ ├── Home/
│ │ │ ├── Home.jsx
│ │ │ └── Home.css
│ │ ├── About/
│ │ │ ├── About.jsx
│ │ │ └── About.css
│ │ └── NotFound/
│ │ ├── NotFound.jsx
│ │ └── NotFound.css
│ ├── services/
│ │ └── api.js
│ ├── utils/
│ │ ├── validation.js
│ │ └── textProcessing.js
│ ├── assets/
│ │ ├── images/
│ │ └── styles/
│ │ └── global.css
│ ├── App.jsx
│ ├── App.css
│ └── index.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

````

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **Backend API** running on `http://localhost:5000` (Flask server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fake-news-detector-frontend.git
   cd fake-news-detector-frontend
````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_MAX_TEXT_LENGTH=5000
   REACT_APP_REQUEST_TIMEOUT=30000
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

   The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be created in the `build/` directory.

## 🔌 API Integration

### Base URL

```javascript
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";
```

### API Endpoints

#### Analyze News Text

```javascript
POST /api/analyze
Content-Type: application/json

Request Body:
{
  "text": "News article text to analyze..."
}

Response:
{
  "prediction": "real" | "fake",
  "confidence": 0.85,
  "explainability": {
    "keywords": ["word1", "word2", "word3"],
    "feature_importance": {...}
  },
  "processing_time": 0.234
}
```

### Example API Call

```javascript
import axios from "axios";

const analyzeNews = async (newsText) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/analyze`,
      { text: newsText },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
```

## 🎨 Component Architecture

### Core Components

#### 1. **Header Component**

- Displays application logo and title
- Navigation menu
- Responsive mobile menu

#### 2. **InputForm Component**

- Text area for news article input
- Character counter
- Submit button with validation
- Clear button functionality

#### 3. **ResultDisplay Component**

- Shows classification result (Real/Fake)
- Displays confidence score with visual indicator
- Color-coded results (green for real, red for fake)
- Processing time display

#### 4. **ExplainabilityPanel Component**

- Highlights important keywords
- Feature importance visualization
- Explanatory text for model decision

#### 5. **LoadingSpinner Component**

- Animated loading indicator during API calls
- Progress feedback

### Component Communication

```
App.jsx
  ├── Header
  ├── Home (Page)
  │   ├── InputForm
  │   │   └── [user input] → handleSubmit()
  │   ├── LoadingSpinner
  │   └── ResultDisplay
  │       └── ExplainabilityPanel
  └── Footer
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: 1920px - 1024px
- **Tablet**: 1024px - 768px
- **Mobile**: 768px - 320px

### Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
}

/* Desktop */
@media (min-width: 1025px) {
}
```

## 🎯 Key Features Implementation

### 1. Text Input Validation

```javascript
const validateInput = (text) => {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: "Please enter some text" };
  }
  if (text.length < 50) {
    return { valid: false, error: "Text too short (minimum 50 characters)" };
  }
  if (text.length > 5000) {
    return { valid: false, error: "Text too long (maximum 5000 characters)" };
  }
  return { valid: true };
};
```

### 2. Error Handling

- Network error messages
- Validation errors
- API timeout handling
- User-friendly error displays

### 3. Loading States

- Disable submit button during processing
- Show loading spinner
- Display processing message

### 4. Result Visualization

- Confidence percentage bar
- Color-coded predictions
- Smooth animations

## 🔒 Security & Privacy

- **No data persistence**: User inputs are not stored on the frontend
- **HTTPS in production**: Secure communication with backend
- **Input sanitization**: Prevent XSS attacks
- **GDPR compliance**: Transparent data handling
- **Rate limiting**: Prevent abuse (handled by backend)

## 🧪 Testing

### Running Tests

```bash
npm test
# or
yarn test
```

### Test Coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

### Testing Strategy

- **Unit Tests**: Individual components
- **Integration Tests**: Component interactions
- **E2E Tests**: User workflows
- **Accessibility Tests**: WCAG compliance

## 🎨 Styling Guidelines

### Color Palette

```css
:root {
  --primary-color: #2563eb; /* Blue */
  --success-color: #10b981; /* Green (Real News) */
  --danger-color: #ef4444; /* Red (Fake News) */
  --text-primary: #1f2937; /* Dark Gray */
  --text-secondary: #6b7280; /* Medium Gray */
  --background: #f9fafb; /* Light Gray */
  --surface: #ffffff; /* White */
  --border: #e5e7eb; /* Border Gray */
}
```

### Typography

- **Font Family**: Inter, system-ui, -apple-system, sans-serif
- **Base Size**: 16px
- **Headings**: Bold, responsive sizing
- **Body**: Regular weight, 1.5 line-height

## 📈 Performance Optimization

- **Code Splitting**: Dynamic imports for routes
- **Lazy Loading**: Load components on demand
- **Memoization**: React.memo for expensive components
- **Debouncing**: Input validation debouncing
- **Compression**: Gzip/Brotli in production
- **Caching**: Service worker for static assets

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Common Issues

**Issue: API connection failed**

- Check if backend server is running
- Verify API_BASE_URL in .env file
- Check CORS settings on backend

**Issue: Slow response times**

- Check network connection
- Verify backend server resources
- Check browser console for errors

**Issue: Styles not loading**

- Clear browser cache
- Run `npm install` again
- Check CSS import statements

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Create React App Documentation](https://create-react-app.dev/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Project Report](./docs/Initial_Contextual_Report.pdf)

## 👨‍💻 Development Workflow

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit: `git commit -m "Add new feature"`
3. Run tests: `npm test`
4. Build for production: `npm run build`
5. Push changes: `git push origin feature/new-feature`
6. Create pull request

## 📄 License

This project is developed as part of academic coursework at University of Westminster.

## 👤 Author

**Muhammad Afnan** - Student ID: 001299057  
Supervisor: Ik So Lim  
BS Computer Science - COMP1682 Final Year Project

## 🙏 Acknowledgments

- University of Westminster
- Supervisor: Ik So Lim
- Research papers and academic literature cited in the project report
- Open-source community for libraries and tools

## 📞 Contact

For questions or feedback about this project:

- Email: [your.email@example.com]
- GitHub: [Your GitHub Profile]

---

**Note**: This is an academic project developed for educational purposes. The system provides probabilistic assessments and should not be considered the sole determinant of news credibility.
