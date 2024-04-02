import axios, { AxiosInstance } from 'axios';
import { getCookie } from "cookies-next";

const axiosConfig: AxiosInstance = axios.create();

axiosConfig.interceptors.request.use(config => {
    const jwt = getCookie('jwt');
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
});

export default axiosConfig;