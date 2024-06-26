import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar } from 'quasar';
import'./assets/index.css';

const app = createApp(App);

app.use(router);
app.use(Quasar, {
  config: {},
});

app.mount('#app');
