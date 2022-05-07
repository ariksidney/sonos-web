import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createRouter, createWebHistory } from "vue-router";
import SignIn from "./components/SignIn.vue";
import Overview from "./components/Overview.vue";
import Settings from './components/Settings.vue';
import About from './components/About.vue';
import AuthService from './services/auth.service';

const routes = [
    { path: "/", component: Overview },
    { path: "/SignIn", component: SignIn },
    { path: "/Settings", component: Settings },
    { path: "/about", component: About },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
  });

  router.beforeEach(async (to, from) => {
    if (!AuthService.isLoggedIn() && to.path !== '/SignIn') {
      return '/SignIn'
    }
  })

createApp(App).use(router).mount('#app')
