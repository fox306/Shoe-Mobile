import { View, Text, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { User } from '../types/type';

type Props = {
    profile: User;
};
const ProfileInfo = ({ profile }: Props) => {
    const date = new Date(profile.birthDay);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const convertDate = `${day}/${month < 10 ? '0' + month : month}/${year}`;
    return (
        <View className="w-full h-[197px] flex flex-row items-end pt-[16px] pb-10 bg-white rounded-[20px]">
            <Image
                source={{ uri: profile.avatar }}
                style={{ width: 100, height: 100 }}
                className="rounded-[10px] mx-[10px]"
            />
            <View className="flex flex-1 flex-col items-center justify-center">
                <Text className="font-medium text-base">{profile.fullName}</Text>
                <View className="flex flex-1 flex-col items-center justify-center w-full">
                    <View className="border-b w-full">
                        <Text className="text-center my-[10px]">{profile.email}</Text>
                    </View>
                    <View className="border-b w-full">
                        <Text className="text-center my-[10px]">{profile.phone}</Text>
                    </View>
                    <View>
                        <Text className="mt-[10px]">{convertDate}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProfileInfo;
