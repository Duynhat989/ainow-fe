import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import ProfileView from '../views/ProfileView.vue'
import SetupView from '../views/SetupView.vue'
import UpgradeView from '../views/UpgradeView.vue'
import NotFound from '../views/NotFound.vue'
import store from '@/store';

import HomePage from '@/pages/HomePage.vue'
import AIEditorPage from '@/pages/AIEditorPage.vue'
import MyGalleryPage from '@/pages/MyGalleryPage.vue'
import TemplatesPage from '@/pages/TemplatesPage.vue'
import PricingPage from '@/pages/PricingPage.vue'
import TutorialsPage from '@/pages/TutorialsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: false }
    },
    {
      path: '/editor',
      name: 'editor',
      component: AIEditorPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/my-gallery',
      name: 'mygallery',
      component: MyGalleryPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/templates',
      name: 'templates',
      component: TemplatesPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: PricingPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/tutorials',
      name: 'tutorials',
      component: TutorialsPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
})
router.beforeEach((to, from, next) => {
  const isLogin = store.getters.isLogin;
  if (to.meta.requiresAuth && !isLogin) {
    localStorage.setItem('intendedRoute', to.fullPath);
    next('/');
  } else {
    next();
  }
});

export default router
