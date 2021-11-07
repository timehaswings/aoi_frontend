import {createRouter, createWebHistory} from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const routes = [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '主页'
        },
        component: () => import('../views/Index.vue'),
        children: [
            {
                path: '',
                name: 'HomeIndex',
                meta: {
                    title: 'HomeIndex'
                },
                component: () => import('../views/Home/Index.vue')
            },
            {
                path: '/category',
                name: 'HomeCategory',
                meta: {
                    title: 'HomeCategory'
                },
                component: () => import('../views/Home/Category.vue')
            },
            {
                path: '/member',
                name: 'HomeMember',
                meta: {
                    title: 'HomeMember'
                },
                component: () => import('../views/Home/Member.vue')
            },
            {
                path: '/personal',
                name: 'HomePersonal',
                meta: {
                    title: 'HomePersonal'
                },
                component: () => import('../views/Home/Personal.vue')
            },
            {
                path: '/about',
                name: 'HomeAbout',
                meta: {
                    title: 'HomeAbout'
                },
                component: () => import('../views/Home/About.vue')
            }
        ]
    }, {
        path: '/backend',
        name: 'Backend',
        meta: {
            title: '后台管理'
        },
        component: () => import ('../views/Backend/Index.vue'),
        children: [
            {
                path: '',
                name: 'BackendSummary',
                meta: {
                    title: 'BackendSummary'
                },
                component: () => import('../views/Backend/Summary.vue')
            },
        ]
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '找不到页面'
        },
        component: () => import ('../views/404.vue')
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: () => import ('../views/403.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done()
});

export default router;