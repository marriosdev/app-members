import { createRouter, createWebHistory } from 'vue-router'
import api from '@/services/api'

const routes = [
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
