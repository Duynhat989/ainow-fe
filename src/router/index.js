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
import AboutUsPage from '@/components/AboutUs.vue'
import SupportPage from '@/components/Support.vue'
import CommunityPage from '@/components/Community.vue'
import ProfilePage from '@/components/Profile.vue'
import PaymentPage from '@/components/Payment.vue'
import TrendPage from '@/components/Trend.vue'
import AIImageEditorPage from '@/pages/AIImageEditor.vue'
import GplxView from '../views/GplxView.vue'

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
    // {
    //   path: '/templates',
    //   name: 'templates',
    //   component: TemplatesPage,
    //   meta: { requiresAuth: false }
    // },
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
      path: '/about',
      name: 'aboutus',
      component: AboutUsPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/support',
      name: 'support',
      component: SupportPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/my-profile',
      name: 'profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/explore',
      name: 'Explore',
      component: TrendPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/aieditor',
      name: 'Aiedior',
      component: AIImageEditorPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/gplx',
      name: 'Gplx',
      component: GplxView,
      meta: { requiresAuth: false }
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
})
function notifyDataChange(data) {
  const event = new CustomEvent('dataChanged', {
    detail: data,
    bubbles: true  // Let the event bubble up the DOM
  });
  document.dispatchEvent(event);
}
router.beforeEach((to, from, next) => {
  const isLogin = store.getters.isLogin;
  if (to.meta.requiresAuth && !isLogin) {
    localStorage.setItem('intendedRoute', to.fullPath);
    notifyDataChange({
      isLogin:false
    });
    next('/');
  } else {
    next();
  }
});

export default router
