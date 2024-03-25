import { View, Text, TextInput, ScrollView, TouchableOpacity, TextInputChangeEventData } from 'react-native';
import { useState } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { SignUp } from '../types/type';
import axios from '../utils/axios';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import isValidDate from '../lib/validation/date';

const RegisterScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [checked, setChecked] = useState<string>('Male');
    const [user, setUser] = useState<SignUp>({
        email: '',
        fullName: '',
        password: '',
        birthDay: '',
    });
    const handleChange = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            Toast.show({
                type: 'error',
                text1: 'Not Email',
            });
            return;
        }
        if (!isValidDate(user.birthDay)) {
            Toast.show({
                type: 'error',
                text1: 'Please enter the correct date',
            });
            return;
        }
        if (user.email === '' || user.password === '' || user.birthDay === '' || user.fullName === '') {
            Toast.show({
                type: 'error',
                text1: 'Please complete all information',
            });
            return;
        }
        try {
            const { data } = await axios.post('/auths/sendOTP', {
                email: user.email,
            });
            if (data.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Send Code Success',
                });
                navigation.navigate('Code', { user: user, checked: checked, code: data.data, active: 1 });
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="bg-second">
            <View className="relative w-full h-[380px] bg-white rounded-b-[30px] flex flex-col justify-center items-center">
                <View>
                    <Text className="text-5xl text-main">Sneakers</Text>
                    <Text className="text-5xl text-main">for Everyone</Text>
                </View>
                <View className=" absolute flex flex-row items-center justify-between bottom-0">
                    <View className="w-[134px] py-3">
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="text-center text-gray1text-base font-semibold">Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="w-[134px] py-3 border-b-2 border-main">
                        <Text className="text-center  text-main  text-base font-semibold">Register</Text>
                    </View>
                </View>
            </View>
            <View className="flex gap-[30px] flex-col items-center justify-center px-[50px] mt-16 mb-10">
                <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
                    <Text className="text-sm opacity-40">Email</Text>
                    <TextInput
                        value={user.email}
                        onChangeText={(e) => handleChange('email', e)}
                        className="tracking-wider text-base"
                    ></TextInput>
                </View>
                <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
                    <Text className="text-sm opacity-40">Fullname</Text>
                    <TextInput
                        value={user.fullName}
                        onChangeText={(e) => handleChange('fullName', e)}
                        className="tracking-wider text-base"
                    ></TextInput>
                </View>
                <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
                    <Text className="text-sm opacity-40">Password</Text>
                    <TextInput
                        value={user.password}
                        onChangeText={(e) => handleChange('password', e)}
                        secureTextEntry
                        className="tracking-wider text-base"
                    ></TextInput>
                </View>
                <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
                    <Text className="text-sm opacity-40">Re-Password</Text>
                    <TextInput secureTextEntry className="tracking-wider text-base"></TextInput>
                </View>
                <View className="flex flex-row items-center justify-around w-full h-[60px]">
                    <View className="flex flex-row items-center">
                        <RadioButton
                            value="Male"
                            status={checked === 'Male' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Male')}
                        />
                        <Text>Male</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <RadioButton
                            value="Female"
                            status={checked === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Female')}
                        />
                        <Text>Female</Text>
                    </View>
                </View>
                <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
                    <Text className="text-sm opacity-40">Birthday</Text>
                    <TextInput
                        value={user.birthDay}
                        onChangeText={(e) => handleChange('birthDay', e)}
                        className="tracking-wider text-base"
                    ></TextInput>
                </View>
                <View className="bg-main w-full py-4 rounded-[30px]">
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text className="font-bold text-xl text-white text-center">Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;
