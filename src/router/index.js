import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '../store';

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
const sign = { hasPublicRoutesAdded: false, hasPrivateRoutesAdded: false };
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
    name: 'Page403',
    meta: {
      title: '没有权限',
    },
    component: () => import('../views/403.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
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

router.beforeEach(async (to, from) => {
  performance.start = Date.now();
  performance.to = to;
  performance.from = from;
  NProgress.start();
  // 获取不受限的路由
  if (!store.getters.hasPublicRoute) {
    await store.dispatch('getPublicRoutes');
  }
  if (!sign.hasPublicRoutesAdded) {
    store.getters.publicRoutes.forEach(route => {
      router.addRoute(route);
    });
    sign.hasPublicRoutesAdded = true;
    return to.fullPath;
  }
  if (store.state.auth.token) {
    if (!store.getters.hasPrivateRoute) {
      // 获取受限的路由
      await store.dispatch('getPrivateRoutes');
    }
    if (!sign.hasPrivateRoutesAdded) {
      store.getters.privateRoutes.forEach(route => {
        router.addRoute(route);
      });
      sign.hasPrivateRoutesAdded = true;
      return to.fullPath;
    }
    // 登录成功后不能访问登录、注册接口
    if (['/login', '/register'].includes(to.path)) {
      return '/';
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
