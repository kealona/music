import axios from 'axios'

axios.interceptors.request.use(
    config => {
        config.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');
        return config
    }
)

export default axios
