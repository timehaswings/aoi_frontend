import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '../store';

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

const sign = { hasPublicRoutes: false, hasPrivateRoutes: false };
const performance = { start: 0, end: 0, duration: 0, to: null, from: null };

/** 静态路由 */
const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('../views/Auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册',
    },
    component: () => import('../views/Auth/Register.vue'),
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '没有权限',
    },
    component: () => import('../views/403.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: 'NotFound',
    },
    component: () => import('../views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const addRoute = route => {
  if (router.hasRoute(route.name)) {
    router.removeRoute(route.name);
  }
  router.addRoute(route);
};

router.beforeEach(async (to, from) => {
  performance.start = Date.now();
  performance.to = to;
  performance.from = from;
  NProgress.start();
  if (store.state.auth.token) {
    if (!sign.hasPrivateRoutes) {
      // 获取受限的路由
      await store.dispatch('getPrivateRoutes');
      store.getters.privateRoutes.forEach(route => {
        addRoute(route);
      });
      sign.hasPrivateRoutes = true;
      return to.fullPath;
    }
    // 登录成功后不能访问登录、注册接口
    if (['/login', '/register'].includes(to.path)) {
      return '/';
    }
  } else {
    // 获取不受限的路由
    if (!sign.hasPublicRoutes) {
      await store.dispatch('getPublicRoutes');
      store.getters.publicRoutes.forEach(route => {
        addRoute(route);
      });
      sign.hasPublicRoutes = true;
      return to.fullPath;
    }
  }
  return true;
});

router.afterEach(() => {
  performance.end = Date.now();
  performance.duration = performance.end - performance.start;
  NProgress.done();
});

export default router;
