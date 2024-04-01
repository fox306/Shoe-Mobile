import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { axiosAuth } from './axios';
import refreshToken from './refreshToken';

const useAxiosAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            async (config) => {
                const newToken = await refreshToken(token || '');
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${newToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );
        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
        };
    }, [token]);
    return axiosAuth;
};

export default useAxiosAuth;
