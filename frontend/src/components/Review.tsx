import { View, Text, Image } from 'react-native';
import React from 'react';
import { Rating } from '@mui/material';

const Review = () => {
    return (
        <View className="p-5">
            <View className="flex flex-row items-center">
                <View className="h-[60px] w-[60px] rounded-full overflow-hidden">
                    <Image />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-xs">Nguyễn Văn A</Text>
                    <Text className="mt-[5px]">Giày good</Text>
                </View>
                <View></View>
            </View>
        </View>
    );
};

export default Review;
