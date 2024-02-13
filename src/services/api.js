import axios from 'axios'
import store from '@/store/store.js'
import router from '@/router/index.js'
import { createToast } from 'mosha-vue-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
});


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status == 401) {
            localStorage.clear();
            router.push("/login");
        }
        return Promise.reject(error);
        }
    );


export default api