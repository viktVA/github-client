import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        ...(import.meta.env.VITE_GITHUB_TOKEN
            ? { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
            : {}),
    },
});

export default axiosInstance;
