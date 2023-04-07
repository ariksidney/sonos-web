import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { createRouter, createWebHistory } from "vue-router";
import SignIn from "./components/SignIn.vue";
import Overview from "./components/Overview.vue";
import Settings from './components/Settings.vue';
import About from './components/About.vue';
import Favorites from './components/Favorites.vue';
import AuthService from './services/auth.service';

const routes = [
  { path: "/", component: Overview },
  { path: "/SignIn", component: SignIn },
  { path: "/Settings", component: Settings },
  { path: "/about", component: About },
  { path: "/favorites", component: Favorites },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.isReady().then(async () => {
  const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
})

router.beforeEach(async (to, from) => {
  if (!AuthService.isLoggedIn() && to.path !== '/SignIn') {
    return '/SignIn'
  }
})

createApp(App).use(router).mount('#app')
