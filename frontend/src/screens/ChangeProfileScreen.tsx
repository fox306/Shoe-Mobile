import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import { upUser, User } from '../types/type';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from '../utils/axios';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Params = {
    profile: User;
};

const ChangeProfileScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute();
    const { profile } = route.params as Params;
    const [user, setUser] = useState<upUser>({
        user: profile._id,
        email: profile.email,
        fullName: profile.fullName,
        phone: profile.phone,
        birthDay: profile.birthDay,
    });
    const date = new Date(user.birthDay);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const convertDate = `${day}/${month < 10 ? '0' + month : month}/${year}`;
    const [image, setImage] = useState(profile.avatar);
    const [checked, setChecked] = useState<string>(profile.gender);
    const handleChange = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };
    // const handleImageUpload = () => {
    //     ImagePicker.openPicker({
    //         multiple: true,
    //     }).then((images: any) => {
    //         console.log(images);
    //     });
    // };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('user', profile._id);
        const { data } = await axios.patch('/users/upload-avatar', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (data.success) {
            Toast.show({
                type: 'success',
                text1: 'Update image success',
            });
        }
    };
    const handleUpdate = async () => {
        const { email, ...withoutEmail } = profile;
        const item = {
            ...withoutEmail,
            gender: checked,
        };
        const { data } = await axios.patch('/users', item);
        if (data.success) {
            Toast.show({
                type: 'success',
                text1: 'Update info success',
            });
            navigation.replace('Profile');
        }
    };
    return (
        <SafeAreaView className="relative ">
            <ScrollView showsVerticalScrollIndicator={false} className="h-screen">
                <View className="flex flex-col items-center justify-center p-10">
                    <View className="relative flex flex-row items-center justify-center mb-10 w-full">
                        <View className="absolute left-0">
                            <ArrowLeftIcon size={24} color={'#000000'} />
                        </View>
                        <Text className="font-medium text-xl">Change Profile</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={{ uri: image }} style={{ width: 140, height: 140 }} borderRadius={10} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleUpdate}>
                        <View className="px-[60px] h-[50px] w-full bg-main rounded-[30px] flex justify-center">
                            <Text className="font-bold tracking-widest text-white">Upoad Avatar</Text>
                        </View>
                    </TouchableOpacity>
                    <View className="flex gap-[30px] flex-col items-center justify-center mt-10 mb-10 w-full pb-[60px]">
                        <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
                            <Text className="text-sm opacity-40">Email</Text>
                            <Text className="tracking-wider text-base">{user.email}</Text>
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
                                value={convertDate}
                                onChangeText={(e) => handleChange('birthDay', e)}
                                className="tracking-wider text-base"
                            ></TextInput>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className="absolute bottom-0 w-full mb-10">
                <TouchableOpacity onPress={handleUpdate} className="w-full flex justify-center items-center">
                    <View className="bg-main py-4 rounded-[30px] px-[50px] w-[314px]">
                        <Text className="font-bold text-xl text-white text-center">Change</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ChangeProfileScreen;
