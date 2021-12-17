import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '../store';

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '主页',
    },
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '',
        name: 'HomeIndex',
        meta: {
          title: 'HomeIndex',
        },
        component: () => import('../views/Home/Index.vue'),
      },
      {
        path: 'category',
        name: 'HomeCategory',
        meta: {
          title: 'HomeCategory',
        },
        component: () => import('../views/Home/Category.vue'),
      },
      {
        path: 'member',
        name: 'HomeMember',
        meta: {
          title: 'HomeMember',
        },
        component: () => import('../views/Home/Member.vue'),
      },
      {
        path: 'personal',
        name: 'HomePersonal',
        meta: {
          title: 'HomePersonal',
        },
        component: () => import('../views/Home/Personal.vue'),
      },
      {
        path: 'about',
        name: 'HomeAbout',
        meta: {
          title: 'HomeAbout',
        },
        component: () => import('../views/Home/About.vue'),
      },
      {
        path: 'details',
        name: 'Details',
        meta: {
          title: 'Details',
        },
        component: () => import('../views/Home/Details.vue'),
      },
    ],
  },
  {
    path: '/backend',
    name: 'Backend',
    meta: {
      title: '后台管理',
    },
    component: () => import('../views/Backend/Index.vue'),
    children: [
      {
        path: '',
        name: 'BackendSummary',
        meta: {
          title: 'BackendSummary',
        },
        component: () => import('../views/Backend/Summary.vue'),
      },
      {
        path: 'user',
        name: 'BackendUser',
        meta: {
          title: 'BackendUser',
        },
        component: () => import('../views/Backend/User.vue'),
      },
      {
        path: 'tag',
        name: 'BackendTag',
        meta: {
          title: 'BackendTag',
        },
        component: () => import('../views/Backend/Tag.vue'),
      },
      {
        path: 'category',
        name: 'BackendCategory',
        meta: {
          title: 'BackendCategory',
        },
        component: () => import('../views/Backend/Category.vue'),
      },
    ],
  },
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

router.beforeEach((to, from, next) => {
  NProgress.start();
  // //已登录
  // if(store.state.auth.token){
  //   if(['/login', '/register'].includes(to.path)){
  //     return next('/');
  //   }
  // }
  // // 未登录
  // else {
  //   return next();
  // }
  return next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
