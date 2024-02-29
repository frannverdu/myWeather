import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';

const app = createApp(App);
app.use(vuetify).mount('#app');
