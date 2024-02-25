import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { SignUp } from '../types/type';
import axios from '../utils/axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

type RouteParams = {
    user: SignUp;
    checked: string;
    email: string;
    code: number;
    active: number;
};

const CodeScreen = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const { user, checked, email, code, active } = route.params as RouteParams;
    console.log(user);
    console.log('CODE: ', code);
    console.log('ACTIVE: ', active);
    const [checkCode, setCheckCode] = useState<string>();
    const handleSubmit = async () => {
        if (checkCode !== code.toString()) {
            Toast.show({
                type: 'error',
                text1: 'Wrong Code',
            });
            return;
        }

        if (active === 1) {
            try {
                const { data } = await axios.post('/auth/register', {
                    email: user.email,
                    fullName: user.fullName,
                    password: user.password,
                    gender: checked,
                    birthDay: user.birthDay,
                });
                if (data.success) {
                    Toast.show({
                        type: 'success',
                        text1: 'Register Success',
                    });
                    navigation.navigate('Login');
                }
            } catch (err: any) {
                console.log(err);
            }
        } else {
            navigation.navigate('ChangePass', { email: email });
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
                            <Text className="text-center text-main text-base font-semibold">Confirm OTP</Text>
                        </View>
                    </View>
                </View>
                <View className="flex gap-[30px] flex-col items-center justify-center px-[50px] mt-5">
                    <View className="flex flex-col items-center justify-between w-full space-y-1">
                        <Text className="text-sm">A OTP code has been sent to your email!</Text>
                    </View>
                    <View>
                        <Text className="font-bold text-base text-gray2">Enter OTP</Text>
                    </View>
                    <View className="w-full">
                        <OTPInputView
                            style={{ width: '100%', height: 20 }}
                            pinCount={6}
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            onCodeChanged={(code) => {
                                setCheckCode(code);
                            }}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code) => {
                                console.log(`Code is ${code}, you are good to go!`);
                            }}
                        />
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

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 50,
        height: 50,
    },

    borderStyleHighLighted: {
        borderColor: '#03DAC6',
    },
    textColor: {
        color: '#33A0FF',
    },

    underlineStyleBase: {
        width: 50,
        height: 50,
        borderWidth: 1,
        color: '#33A0FF',
        backgroundColor: '#ffffff',
        borderRadius: 15,
    },

    underlineStyleHighLighted: {
        borderColor: '#03DAC6',
    },
});

export default CodeScreen;
