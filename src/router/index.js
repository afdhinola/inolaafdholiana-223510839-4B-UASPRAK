import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Task1 from '../views/Task1.vue';
import Task2 from '../views/Task2.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/task/1',
    name: 'Task1',
    component: Task1,
  },
  {
    path: '/task/2',
    name: 'Task2',
    component: Task2,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
