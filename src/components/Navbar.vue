<template>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title class="title-left">
            WEATHER
          </q-toolbar-title>
          <q-space />
          <q-btn flat dense round icon-right="arrow_drop_down" class="tugas-hanif">
            TUGAS HANIF
          </q-btn>
        </q-toolbar>
      </q-header>
  
      <q-page-container>
        <q-page>
          <!-- Your main content -->
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        dropdown: false,
        tugasLinks: [
          'https://zidd-project-cv.netlify.app/',
          'https://tugas2-muhammadzackyamaazid.netlify.app/',
          'https://tugas3-muhammadzackyamaazid.netlify.app/',
          'https://tugas4-zidd.netlify.app/',
          'https://filzdudiable.netlify.app/',
          'https://tugas6-zidd.netlify.app/',
          '../components/PageNotFound.vue'
        ]
      };
    },
    methods: {
      navigateTo(url) {
        window.open(url, '_blank');
      }
    }
  };
  </script>
  
  <style scoped>
  .bg-primary {
    background-color: #2c3e50; /* Dark background color */
  }
  
  .text-white {
    color: #ffffff; /* White text color */
  }
  
  .title-left {
    text-align: left; /* Align title to the left */
  }
  
  .tugas-hanif {
    background-color: #004d40; /* Button background color */
    color: #ffffff; /* Button text color */
    text-transform: none; /* Ensure button text is not all uppercase */
  }
  </style>
  