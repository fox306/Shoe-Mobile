import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const ChangePasswordScreen = () => {
    return (
        <SafeAreaView>
            <View className="p-10">
                <View className="relative h-screen mt-5 mb-[150px] flex flex-row items-center justify-center">
                    <View>
                        <ArrowLeftIcon className="absolute left-0" color={'#000000'} size={24} />
                    </View>
                    <Text className="font-medium text-xl">Change Password</Text>
                </View>
                <View className="flex flex-col gap-[30px] px-[10px] pb-[10px]">
                    <View className="w-full border-b">
                        <Text className="opacity-40">Old Password</Text>
                        <TextInput secureTextEntry />
                    </View>
                    <View className="w-full border-b">
                        <Text className="opacity-40">New Password</Text>
                        <TextInput secureTextEntry />
                    </View>
                    <View className="w-full border-b">
                        <Text className="opacity-40">Re-type New Password</Text>
                        <TextInput secureTextEntry />
                    </View>
                </View>
                <View className="absolute bottom-0 w-full bg-main rounded-[30px]">
                    <TouchableOpacity>
                        <Text className="text-white text-xl font-bold tracking-widest">Change</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChangePasswordScreen;
