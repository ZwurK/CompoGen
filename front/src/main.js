import { createApp } from "vue";
import App from "./App.vue";

import "./assets/css/tailwind.css";
import "./assets/css/style.css";

import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./routes/auth";
import mainRoutes from "./routes/index";

import store from "./store";

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { toastConfig } from './config/toast';

const routes = mainRoutes.concat(authRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

createApp(App).use(router).use(store).use(Toast, toastConfig).mount("#app"); 
