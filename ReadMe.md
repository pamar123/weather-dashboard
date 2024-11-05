# Weather Dashboard

## Description
A weather dashboard application that allows travelers to see the weather outlook for multiple cities to help plan their trips. This application leverages the OpenWeather API to provide current and future weather conditions, featuring a clean interface for searching cities and maintaining a search history.

## Features
- Real-time weather data from OpenWeather API
- Current weather conditions including:
  - Temperature
  - Wind speed
  - Humidity
  - Weather icon with description
- 5-day weather forecast
- Search history functionality
  - Save searched cities
  - Quick access to previous searches
  - Delete unwanted cities from history

## Technologies Used
- Frontend:
  - HTML
  - CSS (JASS Framework)
  - TypeScript
  - Vite
- Backend:
  - Node.js
  - Express
  - TypeScript
- APIs:
  - OpenWeather API
- Storage:
  - Local JSON file for search history

## Installation
1. Clone the repository
2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```
3. Create a `.env` file in the server directory and add your OpenWeather API key:
```
WEATHER_API_KEY=your_api_key_here
```

## Usage
1. Start the development servers:
```bash
# Start the client
cd client
npm run dev

# Start the server
cd ../server
npm run dev
```
2. Open your browser and navigate to `http://localhost:3000`
3. Search for a city to view its current weather and 5-day forecast
4. Click on cities in the search history to quickly view their weather again
5. Use the delete button to remove cities from the search history

## Screenshots
[Add screenshots of your working application here]

## Deployment
The application is deployed on Render and can be accessed at: [Add deployed URL here]

## License
ISC

## Questions
For any questions about the project, feel free to visit my GitHub profile or contact me via email:
- GitHub: [Your GitHub Profile]
- Email: [Your Email]