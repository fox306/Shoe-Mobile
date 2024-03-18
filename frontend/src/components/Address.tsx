import { View, Text } from 'react-native';
import React from 'react';
import { Address as A } from '../types/type';

type Props = {
    data: A | undefined;
};

const Address = ({ data }: Props) => {
    return (
        <View className="px-5 py-[10px] rounded-[5px] bg-white">
            <View className="w-full flex flex-row items-center justify-between pb-[10px] border-b border-gray1 mb-[10px]">
                <Text className="font-semibold">{data?.receiver}</Text>
                <Text>+{data?.phone}</Text>
            </View>
            <View className="flex flex-col gap-2">
                <Text className="text-xs">Province/City: {data?.province}</Text>
                <Text className="text-xs">District: {data?.districts}</Text>
                <Text className="text-xs">Wards: {data?.wards}</Text>
                <Text className="text-xs">Specific: {data?.specific}</Text>
            </View>
        </View>
    );
};

export default Address;
