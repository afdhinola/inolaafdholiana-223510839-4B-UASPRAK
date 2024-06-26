<template>
  <q-layout view="hHh lpR fFf">
    <Navbar />

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  background-color: #f5f5f5;
  color: #333;
}
</style>
