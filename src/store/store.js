import { reactive } from 'vue'
const store = reactive({
    loading: false,
    token: '',
    dark: false,
})
export default store