import { createRouter, createWebHistory } from 'vue-router'
import api from '@/services/api'

const routes = [
    {
        path: '/server-error',
        name: 'server-error',
        component: () => import('@/views/ErrorPages/ServerError.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/Login.vue')
    },
    {
        meta: {
            requiresAuth: true
        },
        path: '/minhas-faturas',
        name: 'minhas-faturas',
        component: () => import('@/views/Incomes/Incomes.vue')
    },
    {
        meta: {
            requiresAuth: true
        },
        path: '/',
        name: '',
        component: () => import('@/views/Incomes/Incomes.vue')
    },
    {
        meta: {
            requiresAuth: true
        },
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/Home.vue')
    },
    {
        meta: {
            requiresAuth: false
        },
        path: '/password-recovery',
        name: 'password-recovery',
        component: () => import('@/views/PasswordRecovery/PasswordRecovery.vue')
    },
    {
        meta: {
            requiresAuth: false
        },
        path: '/save-new-password',
        name: 'save-new-password',
        component: () => import('@/views/PasswordRecovery/SaveNewPassword.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.name == undefined) {
      next({ path: '/home' })
      return;
    }
    next()
})  

export default router
