<template>
  <div class="weather-widget-container">
    <div class="weather-widget">
      <div class="search">
        <input v-model="city" placeholder="Enter city name" @keyup.enter="fetchWeather" />
        <button @click="fetchWeather">Search</button>
      </div>
      <div v-if="weather">
        <div class="current-weather">
          <div class="weather-icon">
            <img src="../assets/temp.png">
          </div>
          <div class="temperature">{{ weather.main.temp }}°C</div>
        </div>
        <div class="additional-info">
          <div class="info-item">
            <img src="../assets/press.png">
            <p>Pressure: {{ weather.main.pressure }} hPa</p>
          </div>
          <div class="info-item">
            <img src="../assets/humi.png">
            <p>Humidity: {{ weather.main.humidity }}%</p>
          </div>
          <div class="info-item">
            <img src="../assets/wind.png">
            <p>Wind: {{ weather.wind.speed }} km/h</p>
          </div>
        </div>
        <div class="forecast-tabs">
          <div
            class="tab"
            :class="{ active: activeTab === 'temperature' }"
            @click="setActiveTab('temperature')"
          >
            <q-icon name="mdi-thermometer" /> Temperature
          </div>
          <div
            class="tab"
            :class="{ active: activeTab === 'precipitation' }"
            @click="setActiveTab('precipitation')"
          >
            <q-icon name="mdi-weather-rainy" /> Precipitation
          </div>
          <div
            class="tab"
            :class="{ active: activeTab === 'wind' }"
            @click="setActiveTab('wind')"
          >
            <q-icon name="mdi-weather-windy" /> Wind
          </div>
        </div>
        <div class="hourly-forecast">
          <canvas id="weatherChart"></canvas>
        </div>
        <div class="daily-forecast">
          <div class="day" v-for="(day, index) in weather.daily.slice(1, 8)" :key="index">
            <div class="date">{{ getDay(index) }}</div>
            <div class="weather-icon">
              <img :src="'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="weather icon" />
            </div>
            <div class="temperature-range">
              <p>{{ day.temp.min }}°C</p>
            </div>
          </div>
        </div>        
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'WeatherWidget',
  data() {
    return {
      city: 'Jakarta',
      weather: null,
      iconUrl: '',
      activeTab: 'temperature',
      chart: null,
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
        this.iconUrl = `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`;
        this.fetchDailyForecast(); // Panggil fungsi untuk memuat prakiraan harian setelah memuat data cuaca saat ini
        this.updateChart(); // Panggil fungsi untuk memperbarui grafik
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    async fetchDailyForecast() {
      const apiKey = '64f60853740a1ee3ba20d0fb595c97d5';
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.weather.coord.lat}&lon=${this.weather.coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`;
      try {
        const response = await axios.get(url);
        this.weather.daily = response.data.daily;
      } catch (error) {
        console.error("Error fetching daily forecast:", error);
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      this.updateChart();
    },
    getDay(dayOffset) {
      const date = new Date();
      date.setDate(date.getDate() + dayOffset);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    },
    updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = document.getElementById('weatherChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['01:00', '04:00', '07:00', '10:00', '13:00', '16:00', '19:00', '22:00'],
          datasets: [{
            label: this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1),
            data: this.getChartData(),
            borderColor: 'brown',
            backgroundColor: 'pink',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: 'pink',
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                zeroLineColor: 'rgba(255, 255, 255, 0.3)',
              },
              ticks: {
                color: 'red',
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                zeroLineColor: 'rgba(255, 255, 255, 0.3)',
              },
              ticks: {
                color: 'red',
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    },
    getChartData() {
      if (this.activeTab === 'temperature') {
        return [26, 26, 25, 27, 31, 32, 29, 27];
      } else if (this.activeTab === 'precipitation') {
        return [20, 30, 50, 40, 60, 80, 70, 90];
      } else if (this.activeTab === 'wind') {
        return [11, 10, 12, 9, 8, 14, 13, 15];
      }
      return [];
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  mounted() {
    // this.fetchWeather(); // Dipanggil di created, tidak perlu dipanggil lagi di mounted
  }
};
</script>


<style scoped>
.weather-widget-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150vh;
  background: rgba(255, 192, 203, 0.3);
  color: brown;
}

.weather-widget {
  width: 900px;
  height: 900px;
  padding: 20px;
  background-color: rgba(255, 192, 203, 0.7);
  border: 2px dotted pink;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 192, 203, 0.499);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.search {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.search input {
  padding: 10px;
  border: 1px dotted pink;
  color: brown;
  border-radius: 10px;
  width: 70%;
  font-size: 16px;
  margin-right: 10px;
}

.search button {
  padding: 10px;
  border: 1px dotted brown;
  border-radius: 10px;
  background-color: pink;
  color: brown;
  cursor: pointer;
  font-size: 16px;
}

.current-weather {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.temperature {
  font-size: 36px;
  margin-left: 10px;
}

.weather-icon img {
  width: 80px;
  border-radius: 50%;
  background: pink;
  padding: 10px;
  box-shadow: 0 10px 10px rgba(255, 0, 119, 0.5);
}

.forecast-tabs {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 170px;
  margin-bottom: 20px;
}

.tab {
  padding: 9px 9px;
  cursor: pointer;
  background: rgba(255, 192, 203, 0.7);
  border: 1px dotted pink;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.tab:hover {
  background: rgba(255, 192, 203, 0.5)!important;
  color: brown;
}

.tab.active {
  background: rgba(255, 192, 203, 0.7);
  border: 2px dotted whitesmoke;
  color: brown;
}

.tab i {
  font-size: 20px;
  margin-right: -20px;
}

#weatherChart {
  height: 300px !important;
  width: 100% !important;
}

.hourly-forecast {
  margin-bottom: 20px;
  flex-grow: 1;
}

.daily-forecast {
  display: flex;
  justify-content: space-around;
}

.day {
  text-align: center;
}

.temperature-range {
  align-items: center;
}

.additional-info {
  display: flex;
  justify-content: center;
  gap: 155px;
  align-items: center;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.info-item img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: pink;
  padding: 10px;
  box-shadow: 0 10px 10px rgba(255, 0, 119, 0.5);
  margin-bottom: 15px;
}
</style>