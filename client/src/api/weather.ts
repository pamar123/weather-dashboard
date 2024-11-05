// client/src/api/weather.ts
export const fetchWeather = async (cityName: string) => {
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityName }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };
  
  export const fetchSearchHistory = async () => {
    const response = await fetch('/api/weather/history');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };
  
  export const deleteCity = async (id: string) => {
    const response = await fetch(`/api/weather/history/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };