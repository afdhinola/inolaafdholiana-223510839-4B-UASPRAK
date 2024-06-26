<template>
    <div class="weather-widget">
      <h2>Weather in {{ city }}</h2>
      <input v-model="city" placeholder="Enter city name" @keyup.enter="fetchWeather" />
      <button @click="fetchWeather">Search</button>
      <div v-if="weather">
        <p>Temperature: {{ weather.main.temp }}°C</p>
        <p>Humidity: {{ weather.main.humidity }}%</p>
        <p>Conditions: {{ weather.weather[0].description }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'WeatherWidget',
    data() {
      return {
        weather: null,
      };
    },
    created() {
      this.fetchWeather();
    },
    methods: {
      async fetchWeather() {
        const apiKey = '64f60853740a1ee3ba20d0fb595c97d5';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`;
        try {
          const response = await axios.get(url);
          this.weather = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .weather-widget {
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
  }
  
  .weather-widget input {
    margin-right: 10px;
    padding: 5px;
  }
  
  .weather-widget button {
    padding: 5px 10px;
  }
  </style>
  