import axios from 'axios';

export default axios.create({
    // baseURL: 'http://10.0.2.2:8800',
    baseURL: 'http://192.168.1.155:8800/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const axiosAuth = axios.create({
    baseURL: 'http://192.168.1.155:8800/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
