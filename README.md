# Mitra - Your Farming Companion 🌾

## Project Overview

Mitra is a comprehensive agricultural assistance platform designed to empower farmers with real-time information and AI-powered insights. The application provides weather forecasts, market prices, and crop-specific advisory services in both English and Hindi.

### Key Features

- 🌤️ **Real-time Weather Information**
  - 7-day weather forecast for major Indian cities
  - Temperature, humidity, rainfall, and wind speed data
  - Weather impact analysis for farming activities

- 💰 **Market Prices**
  - Live market prices for various crops
  - Price trends and fluctuations
  - Regional price comparisons
  - Nearby mandi information

- 🌱 **Crop Advisory**
  - AI-powered crop-specific recommendations
  - Irrigation guidance
  - Pest control suggestions
  - Fertilizer recommendations
  - Bilingual support (English & Hindi)

- 📱 **User-Friendly Interface**
  - Responsive design for all devices
  - Intuitive navigation
  - Dark/Light mode support
  - Bilingual interface

## Dependencies

### Core Technologies
- Node.js >= 18.0.0
- npm >= 9.0.0

### Frontend Dependencies
```json
{
  "dependencies": {
    "@google/generative-ai": "^0.24.0",
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-*": "^1.0.0 - ^2.2.1",
    "@tanstack/react-query": "^5.56.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.5.3",
    "vite": "^5.4.1"
  }
}
```

## Setup Instructions

### Prerequisites
1. Install Node.js and npm from [nodejs.org](https://nodejs.org/)
2. Clone the repository:
   ```bash
   git clone https://github.com/sakshambhatt2005/mitra.git
   cd mitra
   ```

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your API keys to `.env`:
     ```
     VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`

2. Build for production:
   ```bash
   npm run build
   ```

### Basic Usage
1. **Weather Information**
   - Select a city from the dropdown
   - View current weather and 7-day forecast
   - Check weather impact on farming activities

2. **Market Prices**
   - Select your state
   - View crop prices and trends
   - Compare prices across regions

3. **Crop Advisory**
   - Select your crop
   - Choose your region and season
   - Get AI-powered recommendations

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- OpenWeatherMap API for weather data
- Google Generative AI for crop advisory
- All contributors and supporters
