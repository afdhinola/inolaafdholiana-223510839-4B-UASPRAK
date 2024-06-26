import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import TaskPage from './components/TaskPage.vue';

// Definisikan rute-rute untuk aplikasi
const routes = [
  { path: '/', component: HomePage },
  { path: '/task/:id', component: TaskPage }
];

// Buat instance router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Buat instance aplikasi dan tambahkan router
createApp(App)
  .use(router)
  .mount('#app');
