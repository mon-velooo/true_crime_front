# NYC Crime Data Visualization

Real-time visualization and reporting platform for crime data in New York City. The application provides interactive maps, statistical analysis, and incident reporting capabilities.

Demo : [https://drive.google.com/file/d/1BLyWgdJd5BD_XZCUUiLb2r78_v6iYapt/view?usp=sharing](https://drive.google.com/file/d/1BLyWgdJd5BD_XZCUUiLb2r78_v6iYapt/view?usp=sharing)

## Tech Stack

- **Frontend Framework**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn (Radix UI)
- **Data Visualization**: 
  - Mapbox GL (Interactive Maps)
  - Recharts (Statistics)
- **Query Management**: TanStack Query (react-query)
- **Form Handling**: React Hook Form, Zod
- **Type Safety**: TypeScript

## Features

- 📊 Statistical analysis and trend visualization
- 🗺️ Interactive crime map with real-time updates
- 📝 Incident reporting system in real-time with websocket
- 🌓 Dark/Light mode
- 📱 Responsive design
- 🔒 Authentication system

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your API keys
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_MAPBOX_MAPSTYLE=mapbox://styles/samuelaudic/cm4sk93os000401r90nzvc3no
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_api_token

# Run development server
npm run dev
