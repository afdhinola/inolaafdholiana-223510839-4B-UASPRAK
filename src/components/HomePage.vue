<template>
    <div>
      <h1>Home Page</h1>
      <WeatherWidget />
    </div>
  </template>
  
  <script>
  import WeatherWidget from './WeatherWidget.vue';
  
  export default {
    name: 'HomePage',
    components: {
      WeatherWidget,
    },
  };
  </script>
  