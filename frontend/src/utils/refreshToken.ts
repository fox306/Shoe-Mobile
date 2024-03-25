import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './axios';
import isTokenExpired from './isTokenExpired';

const refreshToken = async (token: string) => {
    try {
        if (isTokenExpired(token)) {
            const { data } = await axios.post('/auths/refresh');
            await AsyncStorage.setItem('token', data.data.token);
            return data.data.token;
        } else {
            return token;
        }
    } catch (err) {
        console.log(err);
    }
};

export default refreshToken;
