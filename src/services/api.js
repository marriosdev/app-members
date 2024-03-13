import axios from 'axios'
import store from '@/store/store.js'
import router from '@/router/index.js'
import { createToast } from 'mosha-vue-toastify';
import { ref } from 'vue';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 50000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
    }
});

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token")
        return config;
    }
);

api.interceptors.response.use(
    (response) => {
        store.loading = false
        return response;
    },
    (error) => {
        store.loading = false
        if(error.message == "Network Error") {
            createToast("Erro ao se conectar com o servidor. Entre em contato com os admins do sistema.", {
                type: 'danger',
            });
            router.push("/server-error");
        }
        if (error.response.status == 401) {
            localStorage.clear();
            createToast("Sua sessão expirou. Faça login novamente.", {
                type: 'danger',
            });
            router.push("/login");
        }
        return Promise.reject(error);
        }
    );

export default api