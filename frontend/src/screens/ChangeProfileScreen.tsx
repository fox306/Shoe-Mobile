import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import { upUser } from '../types/type';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const ChangeProfileScreen = () => {
    const [user, setUser] = useState<upUser>({
        user: '',
        email: '',
        fullName: '',
        gender: '',
        phone: '',
        birthDay: '',
    });
    const [checked, setChecked] = useState<string>('Male');
    const handleChange = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };
    return (
        <SafeAreaView>
            <View className="relative h-screen flex flex-col items-center justify-center p-10">
                <View className="relative flex flex-row items-center justify-center mb-10">
                    <View className="absolute left-0">
                        <ArrowLeftIcon size={24} color={'#000000'} />
                    </View>
                    <Text className="font-medium text-xl">Change Profile</Text>
                </View>
                <Image
                    source={require('../../assets/avatar.jpg')}
                    style={{ width: 140, height: 140 }}
                    borderRadius={10}
                />
                <TouchableOpacity>
                    <View className="px-[60px] h-[50px] w-full bg-main rounded-[30px]">
                        <Text className="font-bold tracking-widest">Upoad Avatar</Text>
                    </View>
                </TouchableOpacity>
                <View className="flex gap-[30px] flex-col items-center justify-center mt-10 mb-10">
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
                        <Text className="text-sm opacity-40">Phone Number</Text>
                        <TextInput
                            value={user.phone}
                            onChangeText={(e) => handleChange('phone', e)}
                            secureTextEntry
                            className="tracking-wider text-base"
                        ></TextInput>
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
                </View>
                <View className="absolute bottom-0 bg-main w-full py-4 rounded-[30px]">
                    <TouchableOpacity
                    // onPress={handleSubmit}
                    >
                        <Text className="font-bold text-xl text-white text-center">Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChangeProfileScreen;
