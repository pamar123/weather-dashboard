// client/src/main.ts
import './styles/jass.css';
import { fetchWeather, fetchSearchHistory, deleteCity } from './api/weather.ts';

// All necessary DOM elements selected
const searchForm: HTMLFormElement = document.getElementById(
  'search-form'
) as HTMLFormElement;
const searchInput: HTMLInputElement = document.getElementById(
  'search-input'
) as HTMLInputElement;
const todayContainer = document.querySelector('#today') as HTMLDivElement;
const forecastContainer = document.querySelector('#forecast') as HTMLDivElement;
const searchHistoryContainer = document.getElementById(
  'history'
) as HTMLDivElement;
const heading: HTMLHeadingElement = document.getElementById(
  'search-title'
) as HTMLHeadingElement;
const weatherIcon: HTMLImageElement = document.getElementById(
  'weather-img'
) as HTMLImageElement;
const tempEl: HTMLParagraphElement = document.getElementById(
  'temp'
) as HTMLParagraphElement;
const windEl: HTMLParagraphElement = document.getElementById(
  'wind'
) as HTMLParagraphElement;
const humidityEl: HTMLParagraphElement = document.getElementById(
  'humidity'
) as HTMLParagraphElement;

const handleSearchFormSubmit = async (event: Event): Promise<void> => {
  event.preventDefault();

  if (!searchInput.value) {
    throw new Error('City cannot be blank');
  }

  const search: string = searchInput.value.trim();
  try {
    const weatherData = await fetchWeather(search);
    renderCurrentWeather(weatherData[0]);
    renderForecast(weatherData.slice(1));
    await getAndRenderHistory();
    searchInput.value = '';
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleSearchHistoryClick = async (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.matches('.history-btn')) {
    const city = target.textContent;
    if (city) {
      try {
        const weatherData = await fetchWeather(city);
        renderCurrentWeather(weatherData[0]);
        renderForecast(weatherData.slice(1));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};

const handleDeleteHistoryClick = async (event: Event) => {
  event.stopPropagation();
  const target = event.target as HTMLElement;
  const cityData = target.getAttribute('data-city');
  if (cityData) {
    const city = JSON.parse(cityData);
    try {
      await deleteCity(city.id);
      await getAndRenderHistory();
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

const renderCurrentWeather = (currentWeather: any): void => {
  const { city, date, icon, iconDescription, tempF, windSpeed, humidity } = currentWeather;

  heading.textContent = `${city} (${date})`;
  weatherIcon.setAttribute(
    'src',
    `https://openweathermap.org/img/w/${icon}.png`
  );
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.setAttribute('class', 'weather-img');
  heading.append(weatherIcon);
  tempEl.textContent = `Temp: ${tempF}°F`;
  windEl.textContent = `Wind: ${windSpeed} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  if (todayContainer) {
    todayContainer.innerHTML = '';
    todayContainer.append(heading, tempEl, windEl, humidityEl);
  }
};

const createForecastCard = () => {
  const col = document.createElement('div');
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const weatherIcon = document.createElement('img');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.classList.add('col-auto');
  card.classList.add('forecast-card', 'card', 'text-white', 'bg-primary', 'h-100');
  cardBody.classList.add('card-body', 'p-2');
  cardTitle.classList.add('card-title');
  tempEl.classList.add('card-text');
  windEl.classList.add('card-text');
  humidityEl.classList.add('card-text');

  return {
    col,
    cardTitle,
    weatherIcon,
    tempEl,
    windEl,
    humidityEl,
  };
};

const renderForecastCard = (forecast: any) => {
  const { date, icon, iconDescription, tempF, windSpeed, humidity } = forecast;

  const { col, cardTitle, weatherIcon, tempEl, windEl, humidityEl } = createForecastCard();

  cardTitle.textContent = date;
  weatherIcon.setAttribute(
    'src',
    `https://openweathermap.org/img/w/${icon}.png`
  );
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windSpeed} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  if (forecastContainer) {
    forecastContainer.append(col);
  }
};

const renderForecast = (forecast: any[]): void => {
  const headingCol = document.createElement('div');
  const heading = document.createElement('h4');

  headingCol.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingCol.append(heading);

  if (forecastContainer) {
    forecastContainer.innerHTML = '';
    forecastContainer.append(headingCol);
  }

  for (let i = 0; i < forecast.length; i++) {
    renderForecastCard(forecast[i]);
  }
};

const renderSearchHistory = async () => {
  try {
    const historyList = await fetchSearchHistory();

    if (searchHistoryContainer) {
      searchHistoryContainer.innerHTML = '';

      if (!historyList.length) {
        searchHistoryContainer.innerHTML = '<p class="text-center">No Previous Search History</p>';
        return;
      }

      for (let i = historyList.length - 1; i >= 0; i--) {
        const historyItem = buildHistoryListItem(historyList[i]);
        searchHistoryContainer.append(historyItem);
      }
    }
  } catch (error) {
    console.error('Error rendering search history:', error);
  }
};

const buildHistoryListItem = (city: any) => {
  const div = document.createElement('div');
  div.classList.add('display-flex', 'gap-2', 'col-12', 'm-1');

  const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-controls', 'today forecast');
  btn.classList.add('history-btn', 'btn', 'btn-secondary', 'col-10');
  btn.textContent = city.name;

  const delBtn = document.createElement('button');
  delBtn.setAttribute('type', 'button');
  delBtn.classList.add('fas', 'fa-trash-alt', 'delete-city', 'btn', 'btn-danger', 'col-2');
  delBtn.dataset.city = JSON.stringify(city);
  delBtn.addEventListener('click', handleDeleteHistoryClick);

  div.append(btn, delBtn);
  return div;
};

const getAndRenderHistory = async () => {
  try {
    await renderSearchHistory();
  } catch (error) {
    console.error('Error getting and rendering history:', error);
  }
};

searchForm?.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer?.addEventListener('click', handleSearchHistoryClick);

// Initial render
getAndRenderHistory();