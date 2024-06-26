<template>
  <div id="home">
      <Weather />
  </div>
</template>

<script>
import Weather from '../components/Weather.vue';

export default {
  name: 'Home',
  components: {
    Weather,
  }
};
</script>

<style scoped>

</style>