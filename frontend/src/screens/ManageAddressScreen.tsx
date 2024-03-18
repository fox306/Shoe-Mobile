import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch } from 'react-native-paper';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { Address } from '../types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import axios from '../utils/axios';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';

const ManageAddressScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [address, setAddress] = useState<Address>({
        user: '',
        districts: '',
        phone: '',
        province: '',
        receiver: '',
        specific: '',
        wards: '',
    });
    const [userId, setUserId] = useState('');

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const handleChange = (feild: string, value: string) => {
        setAddress((prev) => ({ ...prev, [feild]: value }));
    };

    const handleCreate = async () => {
        const { data } = await axios.post('/address', {
            user: userId,
            receiver: address.receiver,
            phone: address.phone,
            province: address.province,
            districts: address.districts,
            wards: address.wards,
            specific: address.specific,
            default: isSwitchOn,
        });
        if (data.success) {
            Toast.show({
                type: 'success',
                text1: 'Create Address Success',
            });
        }
    };

    useEffect(() => {
        const getProfile = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const userObject = JSON.parse(user);
                setUserId(userObject._id);
            }
        };

        getProfile();
    }, []);
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} className="h-screen relative p-10 bg-background">
                <View className="relative flex flex-row items-center justify-center">
                    <TouchableOpacity className="absolute left-0" onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={24} color={'#000000'} />
                    </TouchableOpacity>
                    <Text className="font-medium text-xl">Add New Address</Text>
                </View>
                <View className="flex flex-col gap-10 px-[10px] mt-10">
                    <View className="pb-[5px] border-b">
                        <Text className="text-gray1">Receiver</Text>
                        <TextInput value={address.receiver} onChangeText={(e) => handleChange('receiver', e)} />
                    </View>
                    <View className="pb-[5px] border-b">
                        <Text className="text-gray1">Phone Number</Text>
                        <TextInput value={address.phone} onChangeText={(e) => handleChange('phone', e)} />
                    </View>
                    <View className="pb-[5px] border-b">
                        <Text className="text-gray1">Province / City</Text>
                        <TextInput value={address.province} onChangeText={(e) => handleChange('province', e)} />
                    </View>
                    <View className="pb-[5px] border-b">
                        <Text className="text-gray1">District</Text>
                        <TextInput value={address.districts} onChangeText={(e) => handleChange('districts', e)} />
                    </View>
                    <View className="pb-[5px] border-b">
                        <Text className="text-gray1">Wards</Text>
                        <TextInput value={address.wards} onChangeText={(e) => handleChange('wards', e)} />
                    </View>
                    <View className="pb-[5px] border-b">
                        <Text className="text-gray1">Specific</Text>
                        <TextInput value={address.specific} onChangeText={(e) => handleChange('specific', e)} />
                    </View>
                </View>
                <View className="mt-[30px] w-full flex flex-row items-center justify-between">
                    <Text className="text-base">Default</Text>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>
                <View className="w-full mt-[100px] mb-20">
                    <TouchableOpacity
                        className="w-full h-[60px] px-[10px] rounded-[30px] bg-main flex items-center justify-center"
                        onPress={handleCreate}
                    >
                        <Text className="font-bold text-xl tracking-widest text-white">Create</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ManageAddressScreen;
