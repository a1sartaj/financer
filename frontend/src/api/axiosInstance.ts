import axios from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    withCredentials: true,
})

// 401 globle handle
axiosInstance.interceptors.response.use(
    (response) => response, // do nothing if status code with 2XX

    (error) => {
        if (error?.response?.status === 401 && window.location.pathname !== '/login') {
            window.location.href = '/login'
        }

        return Promise.reject(error) // Without this catch block will not run in my code that'why I couldn't run toast notificaiton that's why I need to write this.
    }
)

export default axiosInstance;