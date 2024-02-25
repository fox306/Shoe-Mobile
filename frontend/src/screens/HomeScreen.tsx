import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import axios from '../utils/axios';
import Toast from 'react-native-toast-message';

type Params = {
    id: string;
};

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [user, setUser] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const user = await AsyncStorage.getItem('token');
            console.log(user);
            setUser(user);
        };
        const getId = async () => {
            const user = await AsyncStorage.getItem('user');
            console.log(user);
            if (user) {
                const userObject = JSON.parse(user);
                setId(userObject._id);
            }
        };

        getUser();
        getId();
    }, []);
    const check = async () => {
        if (user) {
            // Xử lý khi user tồn tại
        } else {
            navigation.navigate('Login');
        }
    };

    const handleLogout = async () => {
        try {
            const { data } = await axios.delete(`/auth/logout/${id}`);
            if (data.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Logout Success',
                });
                navigation.replace('Login');
                AsyncStorage.clear();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={check}>
                <Image source={require('../../assets/avatar.jpg')} style={{ height: hp(5), width: hp(5.5) }} />
            </TouchableOpacity>
            {user && (
                <View>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default HomeScreen;
