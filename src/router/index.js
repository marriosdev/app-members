import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/Login.vue')
    },
    {
        path: '/minhas-faturas',
        name: 'minhas-faturas',
        component: () => import('@/views/Incomes/Incomes.vue')
    },
    {
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
