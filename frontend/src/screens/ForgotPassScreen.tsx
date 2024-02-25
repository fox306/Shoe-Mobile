import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import axios from '../utils/axios';
import Toast from 'react-native-toast-message';

const ForgotPassScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [email, setEmail] = useState<string>('');

    const handleEmailChange = (email: string) => {
        setEmail(email);
    };

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post('/auth/sendCode', {
                email: email,
            });
            if (data.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Send Code Success',
                });
                navigation.navigate('Code', { email: email, code: data.code, active: 2 });
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="bg-second ">
            <View className="relative h-screen">
                <View className="relative w-full h-[380px] bg-white rounded-b-[30px] flex flex-col justify-center items-center">
                    <View>
                        <Text className="text-5xl text-main">Sneakers</Text>
                        <Text className="text-5xl text-main">for Everyone</Text>
                    </View>
                    <View className=" absolute flex flex-row items-center justify-between bottom-0">
                        <View className="w-[134px] py-3 border-b-2 border-main">
                            <Text className="text-center text-main text-base font-semibold">Forgot Password</Text>
                        </View>
                    </View>
                </View>
                <View className="flex gap-[30px] flex-col items-center justify-center px-[50px] mt-5">
                    <View className="flex flex-col items-center justify-between w-full space-y-1">
                        <Text className="text-sm">Enter your email address to request</Text>
                        <Text className="text-sm">a password reset.</Text>
                    </View>
                    <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
                        <Text className="text-sm opacity-40">Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={handleEmailChange}
                            className="tracking-wider text-base"
                        ></TextInput>
                    </View>
                </View>
                <View className="absolute bottom-0 w-full mb-10">
                    <View className="px-[30px]">
                        <View className="bg-main py-4 rounded-[30px]">
                            <TouchableOpacity onPress={handleSubmit}>
                                <Text className="font-bold text-xl text-white text-center">Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View className="absolute bottom-0 w-[314px]"></View> */}
            </View>
        </ScrollView>
    );
};

export default ForgotPassScreen;
